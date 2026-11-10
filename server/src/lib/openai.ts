import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY was not found in .env.local");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
