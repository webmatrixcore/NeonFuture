import axios from "axios";
import fs from "fs";
import path from "path";

export async function generateImage(prompt, id) {
  const res = await axios.post(
    "https://api.nanobanana.ai/v1/generate",
    { prompt, size: "landscape" },
    { headers: { Authorization: `Bearer ${process.env.NANO_API_KEY}` } }
  );

  const base64 = res.data.image;
  const buffer = Buffer.from(base64, "base64");

  const filePath = path.join(process.cwd(), "public", "images", `${id}.webp`);
  fs.writeFileSync(filePath, buffer);

  return `/images/${id}.webp`;
}
