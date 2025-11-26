import type { IncomingMessage, ServerResponse } from "http";
import { generateArticle } from "../server/chatgptService";
import { generateImage } from "../server/nanobananaService";
import fs from "fs";
import path from "path";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const { topic } = JSON.parse(body);

      if (!topic) {
        res.statusCode = 400;
        res.end("Missing topic");
        return;
      }

      // 1. Generate article text via ChatGPT
      const articleResult = await generateArticle(topic);

      // 2. Generate article image via NanoBanana
      const imageUrl = await generateImage(`Futuristic news photo for: ${topic}`, articleResult.id);

      // 3. Save final article JSON (with the image URL inserted)
      const finalData = {
        id: articleResult.id,
        topic,
        article: articleResult.article,
        imageUrl,
      };

      const filePath = path.join("public", "articles", `${articleResult.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2));

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(finalData));
    } catch (error) {
      res.statusCode = 500;
      res.end("Server Error: " + error);
    }
  });
}
