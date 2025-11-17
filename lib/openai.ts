import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-demo",
  dangerouslyAllowBrowser: false
});

export async function mockVisionAnalysis(imageUrl: string) {
  return {
    summary: "Изображение распознано, определён тип 2B. Влажность в норме, кончики сухие.",
    imageUrl
  };
}

