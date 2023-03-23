/* eslint-disable no-console */
import { generateStudentSummary } from "./utils/openAiUtils";

const testNotes = [
  "Hyvä tunti, ok työskentelyä ja pallon heitto sujui melko hyvin.",
  "Hieman levoton tunti, lähti mukaan muiden pelleilyihin ja ei oikein keskittynyt tuntiin.",
  "Tunti meni hyvin, hyvä työskentely ja krooliuinti onnistui mallikkaasti.",
  "Keskittyminen ei mallikkainta, mutta taidot hiihdossa sujuivat hyvin.",
  "Mahtavaa työskentelyä. Avitti muitakin oppilaita keillä pallo ei pysynyt niin hyvin hallinnassa ja yleisesti levitti hyvää ilmapiiriä tunnilla",
];

// openAIClient
//   .listModels()
//   .then((result) => {
//     console.log("listModels result", result);
//     const { data } = result.data;
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("listModels error");
//     const error = e as any;
//     console.log(error.response);
//   });

generateStudentSummary(testNotes)
  .then((result) => console.log("generateSummary result", result))
  .catch((e) => console.log("generateSummary error", e));
