import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "@env";

const configuration = new Configuration({
  organization: "org-KD2e9drn2SMwNPVdV1bPuzWx",
  apiKey: OPENAI_API_KEY,
});
export default new OpenAIApi(configuration);
