import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const { OPENAI_API_KEY } = process.env;
const { OPENAI_ORGANIZATION } = process.env;

if (!OPENAI_API_KEY || !OPENAI_ORGANIZATION) {
  console.warn(
    "Missing OpenAI API key or organization, OpenAI functionalities will not work. Define OPENAI_API_KEY and OPENAI_ORGANIZATION in .env (or root .env.production in production)"
  );
}

export default OPENAI_API_KEY && OPENAI_ORGANIZATION
  ? new OpenAI({
      apiKey: OPENAI_API_KEY,
      organization: OPENAI_ORGANIZATION,
    })
  : null;
