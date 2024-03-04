import { Evaluation } from "@prisma/client";
import matomo from "../matomo";
import openAIClient from "@/openAIClient";
import { formatDate } from "./date";
import { MATOMO_EVENT_CATEGORIES } from "../config";

export type ClassParticipationEvaluationData = Partial<Pick<Evaluation, "skillsRating" | "behaviourRating" | "notes">> & {
  date: Date;
  environmentLabel: string;
};

export type DefaultEvaluationData = Partial<Pick<Evaluation, "generalRating" | "notes">> & {
  date: Date;
  collectionTypeName: string;
};

export type FeedbackGenerationEvaluationData = ClassParticipationEvaluationData | DefaultEvaluationData;

export function isClassParticipationEvaluationData(evaluation: any): evaluation is ClassParticipationEvaluationData {
  return !!evaluation.environmentLabel;
}

export function isDefaultEvaluationData(evaluation: any): evaluation is DefaultEvaluationData {
  return !evaluation.environmentLabel;
}

const CHARACTERS_PER_TOKEN = 2.5;

function getTeacherLabel(subjectCode: string): string {
  switch (subjectCode) {
    case "LI":
      return "liikunnanopettaja";
    case "BI":
      return "biologianopettaja";
    case "MA":
      return "matematiikanopettaja";
    case "US":
      return "uskonnonopettaja";
    case "FY":
      return "fysiikanopettaja";
    case "HI":
      return "historianopettaja";
    case "AI":
      return "äidinkielenopettaja";
    case "KA":
      return "käsityönopettaja";
    case "MU":
      return "musiikinopettaja";
    case "KU":
      return "kuvataiteenopettaja";
    case "TE":
      return "terveystiedonopettaja";
    case "KO":
      return "kotitaloudenopettaja";
    default:
      return "opettaja";
  }
}

export async function generateStudentSummary(evaluations: FeedbackGenerationEvaluationData[], userId: string, subjectCode: string) {
  if (openAIClient === null) throw new Error("OpenAI client not initialized, cannot generate student summary");
  let prompt = `Olen kyseisen oppilaan ${getTeacherLabel(subjectCode)}, ja minun tulee antaa hänelle yleinen palaute,
                        kehitysehdotus ja huomio vahvuusalueesta hänen suoritustensa perusteella. Päivämäärät,
                        oppimisympäristöt/-sisällöt, taitojen ja työskentelyn arvosanat sekä opettajan huomiot on annettu listana.
                        Arvosanat on annettu asteikoilla 4-10, joista 4 on heikoin ja 10 paras. Minun tulee tehdä
                        vertailua työskentelyn ja taitojen välillä sekä eri oppimisympäristöjen kesken, mikäli arvosanoissa
                        on selkeitä eroavaisuuksia. Jos oppilaan taidot tai työskentely on jossain ympäristössä 7 tai alle,
                        minun pitää antaa siitä ympäristöstä selkeästi kehitettävää palautetta. Jos taidot tai työskentely
                        taas on jossain ympäristössä 9 tai enemmän, minun pitää kehua oppilasta kyseisestä ympäristöstä.
                        \n\nTässä on lista oppilaan tuntityöskentelyjen arvioinneista:\n\n`;
  const classParticipationEvaluations = evaluations.filter(isClassParticipationEvaluationData);
  const defaultEvaluations = evaluations.filter(isDefaultEvaluationData);
  const classParticipationNotes = classParticipationEvaluations.map((it) => {
    let note = "";
    if (it.environmentLabel) note += `${formatDate(it.date)} - ${it.environmentLabel}\n`;
    note += `Taidot: ${it.skillsRating ? it.skillsRating : "Ei arvioitu"}\n`;
    note += `Työskentely: ${it.behaviourRating ? it.behaviourRating : "Ei arvioitu"}\n`;
    note += `Huomiot: ${it.notes ? it.notes : "Ei huomioita"}`;
    return note;
  });

  prompt += classParticipationNotes.join("\n\n");
  if (defaultEvaluations.length > 0) {
    prompt += "\n\nJa tässä lista hänen kokeiden ja muiden arviointikohteiden arvioinneista:\n\n";
  }

  const defaultEvaluationNotes = defaultEvaluations.map((it) => {
    let note = `Arviointikohde: ${it.collectionTypeName}\n`;
    note += `Päivämäärä: ${formatDate(it.date)}\n`;
    note += `Arvosana: ${it.generalRating ?? "Ei arvioitu"}\n`;
    note += `Huomiot: ${it.notes ?? "Ei huomioita"}`;
    return note;
  });

  prompt += defaultEvaluationNotes.join("\n\n");
  prompt +=
    "\n\nKirjoita edellä annetun datan pohjalta noin 100 sanan pituinen palautte oppilaalle sinuttelevassa muodossa ja hampurilaismallin mukaisesti.";

  const tokenCountFallback = prompt.length / CHARACTERS_PER_TOKEN;

  try {
    const completion = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    if (completion.choices[0]?.message?.content) {
      const tokenCount = completion.usage?.total_tokens || tokenCountFallback;
      matomo.trackEventWithValue(MATOMO_EVENT_CATEGORIES.OPEN_AI, "Generate student feedback", tokenCount, {
        userInfo: {
          uid: userId,
        },
        custom: {
          token_count: tokenCount,
        },
      });

      return completion.choices[0].message.content;
    }

    throw new Error(`Error with generateSumamry: no message found from result`);
  } catch (error: any) {
    console.error("error", error?.response?.data || error);
    throw new Error(`Unknown error: ${error?.response?.data?.error}` || "");
  }
}

export async function fixTextGrammatics(text: string, userId: string) {
  if (openAIClient === null) throw new Error("OpenAI client not initialized, cannot fix text grammatics");
  const startMessage = `Seuraava teksti on saatu äänittämällä puhetta. Teksti sisältää palautteen/muistiinpanoja oppilaan suoriutumisesta oppitunnilla/tehtävässä. Korjaa teksti selvälle suomen kielelle ja kieliopillisesti oikeaksi siten, että korjattu teksti on maksimissaan ${text.length + 30
    } kirjainta pitkä. Teksti saattaa sisältää puheentunnistuksen aiheuttamia virheitä, kuten väärin tunnistettuja sanoja. Palauta pelkkä korjattu teksti: \n\n`;
  const prompt = startMessage + text;
  const tokenCount = prompt.length / CHARACTERS_PER_TOKEN;

  matomo.trackEventWithValue(MATOMO_EVENT_CATEGORIES.OPEN_AI, "Fix text grammatics", tokenCount, {
    userInfo: {
      uid: userId,
    },
  });

  try {
    const process = openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    const completion = await process;

    if (completion.choices[0]?.message?.content) {
      return completion.choices[0].message.content;
    }
    throw new Error(`Error with generateSumamry: no message found from result`);
  } catch (error: any) {
    console.error("error", error?.response?.data || error);
    throw new Error(`Unknown error: ${error?.response?.data?.error}` || "");
  }
}
