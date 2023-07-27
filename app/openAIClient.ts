import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API key, define EXPO_PUBLIC_OPENAI_API_KEY in .env");

const configuration = new Configuration({
  organization: "org-KD2e9drn2SMwNPVdV1bPuzWx",
  apiKey: OPENAI_API_KEY,
});
export default new OpenAIApi(configuration);
