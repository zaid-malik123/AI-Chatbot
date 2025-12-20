import { GoogleGenAI } from "@google/genai";
import {config} from "dotenv"
config()
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


async function generateAiRes(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content.message,
  });
  return response.text;
}

export default generateAiRes;