import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateArticle(topic) {
  const prompt = `
Write a full Futurism-style news article about: ${topic}

Requirements:
- Fictional future-tech news only
- Include headline, subheadline, author name, reading time
- Sections:
  • What Happened
  • Why It Matters
  • Tech Behind It
  • Expert Reactions
  • Future Outlook
- Tone must match Futurism.com
- Do NOT use real people or events
`;

  const response = await client.responses.create({
    model: "o3-mini",
    input: prompt,
  });

  const article = response.output_text;
  const id = Date.now().toString();

  const filePath = path.join(process.cwd(), "public", "articles", `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify({ id, topic, article }, null, 2));

  return { id, article };
}
