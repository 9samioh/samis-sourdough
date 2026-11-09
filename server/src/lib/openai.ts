import dotenv from "dotenv";
import OpenAI from "openai";
import { fileURLToPath } from "url";

const envPath = fileURLToPath(new URL("../../.env.local", import.meta.url));

dotenv.config({ path: envPath });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY was not found in .env.local");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
