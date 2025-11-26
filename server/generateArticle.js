import { generateArticle } from "./chatgptService.js";
import { generateImage } from "./nanobananaService.js";

export async function generateFullContent(topic) {
  const article = await generateArticle(topic);
  const imageUrl = await generateImage(topic, article.id);

  // 更新 JSON 文件，添加 imageUrl
  const fs = await import("fs");
  const path = await import("path");

  const filePath = path.join(process.cwd(), "public", "articles", `${article.id}.json`);
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  json.imageUrl = imageUrl;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

  return json;
}
