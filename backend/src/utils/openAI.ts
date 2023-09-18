import { Evaluation } from "types";
import openAIClient from "../openAIClient";
import { formatDate } from "./date";

export type EvaluationData = Partial<Pick<Evaluation, "skillsRating" | "behaviourRating" | "notes">> & {
  date: Date;
  environment: string;
};

export async function generateStudentSummary(evaluations: EvaluationData[]) {
  const startMessage = `Olen kyseisen oppilaan liikunnanopettaja, ja minun tulee antaa hänelle yleinen palaute, kehitysehdotus ja huomio vahvuusalueesta hänen suoritustensa perusteella. Päivämäärät, ympäristöt, taitojen ja työskentelyn arvosanat sekä opettajan huomiot on annettu listana. Arvosanat on annettu asteikoilla 6-10, joista 6 on heikoin ja 10 paras. Minun tulee tehdä vertailua työskentelyn ja taitojen välillä sekä eri ympäristöjen kesken, mikäli arvosanoissa on selkeitä eroavaisuuksia. Jos oppilaan taidot tai työskentely on jossain ympäristössä 7 tai alle, minun pitää antaa siitä ympäristöstä selkeästi kehitettävää palautetta. Jos taidot tai työskentely taas on jossain ympäristössä 9 tai enemmän, minun pitää kehua oppilasta kyseisestä ympäristöstä. Pyydän sinua kirjoittamaan noin 50 sanaisen palautteen oppilaalle sinuttelevassa muodossa ja hampurilaismallin mukaisesti:\n\n Tässä on lista oppilaan suorituksista:\n\n`;
  const notes = evaluations.map((it) => {
    let note = "";
    note += `${formatDate(it.date)} - ${it.environment}\n`;
    note += `Taidot: ${it.skillsRating ? it.skillsRating : "Ei arvioitu"}\n`;
    note += `Työskentely: ${it.behaviourRating ? it.behaviourRating : "Ei arvioitu"}\n`;
    note += `Huomiot: ${it.notes ? it.notes : "Ei huomioita"}`;
    return note;
  });
  // const endMessage = `\n\nKirjoita oppilaalle noin ${length} sanan pituinen palaute näiden muistiinpanojen pohjalta`;
  const prompt = startMessage + notes.join("\n\n");

  try {
    const completion = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    if (completion.choices[0]?.message?.content) {
      return completion.choices[0].message.content;
    }
    throw new Error(`Error with generateSumamry: no message found from result`);
  } catch (error: any) {
    // console.log();

    console.error("error", error?.response?.data || error);
    throw new Error(`Unknown error: ${error?.response?.data?.error}` || "");
  }
}
