import { FragmentType, getFragmentData, graphql } from "../gql";
import openAIClient from "../openAIClient";
import { formatRatingNumber } from "./dataMappers";
import { formatDate } from "./dateHelpers";

const OpenAIUtils_Evaluation_Fragment = graphql(`
  fragment OpenAIUtils_Evaluation on Evaluation {
    notes
    skillsRating
    behaviourRating
    collection {
      date
      environment {
        label
      }
    }
  }
`);

export async function generateStudentSummary(evaluationFragments: FragmentType<typeof OpenAIUtils_Evaluation_Fragment>[]) {
  const startMessage = `Olen kyseisen oppilaan liikunnanopettaja, ja minun tulee antaa hänelle yleinen palaute, kehitysehdotus ja huomio vahvuusalueesta hänen suoritustensa perusteella. Päivämäärät, ympäristöt, taitojen ja työskentelyn arvosanat sekä opettajan huomiot on annettu listana. Arvosanat on annettu asteikoilla 6-10, joista 6 on heikoin ja 10 paras. Minun tulee tehdä vertailua työskentelyn ja taitojen välillä sekä eri ympäristöjen kesken, mikäli arvosanoissa on selkeitä eroavaisuuksia. Jos oppilaan taidot tai työskentely on jossain ympäristössä 7 tai alle, minun pitää antaa siitä ympäristöstä selkeästi kehitettävää palautetta. Jos taidot tai työskentely taas on jossain ympäristössä 9 tai enemmän, minun pitää kehua oppilasta kyseisestä ympäristöstä. Pyydän sinua kirjoittamaan noin 50 sanaisen palautteen oppilaalle sinuttelevassa muodossa ja hampurilaismallin mukaisesti:\n\n Tässä on lista oppilaan suorituksista:\n\n`;
  const evaluations = getFragmentData(OpenAIUtils_Evaluation_Fragment, evaluationFragments);
  const notes = evaluations.map((it) => {
    let note = "";
    note += `${formatDate(it.collection.date)} - ${it.collection.environment.label}\n`;
    note += `Taidot: ${it.skillsRating ? formatRatingNumber(it.skillsRating) : "Ei arvioitu"}\n`;
    note += `Työskentely: ${it.behaviourRating ? formatRatingNumber(it.behaviourRating) : "Ei arvioitu"}\n`;
    note += `Huomiot: ${it.notes ? it.notes : "Ei huomioita"}`;
    return note;
  });
  // const endMessage = `\n\nKirjoita oppilaalle noin ${length} sanan pituinen palaute näiden muistiinpanojen pohjalta`;
  const prompt = startMessage + notes.join("\n\n");

  try {
    const completion = await openAIClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    if (completion.data.choices[0]?.message?.content) {
      return completion.data.choices[0].message.content;
    }
    throw new Error(`Error with generateSumamry: no message found from result`);
  } catch (error: any) {
    // console.log();

    console.error("error", error?.response?.data || error);
    throw new Error(`Unknown error: ${error?.response?.data?.error}` || "");
  }
}
