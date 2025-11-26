import { generateFullContent } from "../server/generateArticle.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Missing topic" });

  try {
    const result = await generateFullContent(topic);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
