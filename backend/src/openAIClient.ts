import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const { OPENAI_API_KEY } = process.env;
const { OPENAI_ORGANIZATION } = process.env;

if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API key, define OPENAI_API_KEY in .env (or root .env.production in production)");
if (!OPENAI_ORGANIZATION) throw new Error("Missing OpenAI organization, define OPENAI_ORGANIZATION in .env (or root .env.production in production)");

export default new OpenAI({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORGANIZATION,
});
