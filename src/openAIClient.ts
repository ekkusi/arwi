import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-PmleiLyYFN4YVMg0marHju0R",
  apiKey: process.env.OPENAI_API_KEY,
});
export default new OpenAIApi(configuration);
