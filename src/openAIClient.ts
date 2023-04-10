import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-KD2e9drn2SMwNPVdV1bPuzWx",
  apiKey: process.env.OPENAI_API_KEY,
});
export default new OpenAIApi(configuration);
