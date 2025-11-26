/**
 * NODE.JS SCRIPT - DO NOT IMPORT IN FRONTEND
 * Run this script to generate static article JSON and images.
 * Usage: node services/geminiService.js "Topic Name"
 */

/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-nocheck

const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require("@google/genai");

// Configuration
// Ensure you have process.env.API_KEY set or pass it manually here
const API_KEY = process.env.API_KEY; 
const OUTPUT_DIR = path.join(__dirname, '../public/articles');
const IMAGE_DIR = path.join(__dirname, '../public/images');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are the lead writer for "NeonFuture". Generate a JSON article about the user's topic.
Strictly adhere to this JSON schema:
{
  "id": "kebab-case-slug-unique",
  "title": "Bold Headline",
  "subtitle": "Short summary",
  "category": "One of [AI, SPACE, SOCIETY, MACHINES, HEALTH, SCIENCE, TRANSPORT, LATEST]",
  "author": "Fictional Name",
  "publishDate": "2045-05-12",
  "readTime": "4 min read",
  "imagePrompt": "Detailed visual description, cinematic, photorealistic, sci-fi concept art",
  "introduction": "Markdown text...",
  "whatHappened": "Markdown text...",
  "whyItMatters": "Markdown text...",
  "theTech": "Markdown text...",
  "expertReactions": "Markdown text...",
  "futureOutlook": "Markdown text...",
  "conclusion": "Markdown text...",
  "pullQuote": "Provocative quote",
  "relatedStories": [{ "title": "...", "category": "...", "id": "related-id-placeholder" }],
  "editorsPicks": [{ "title": "...", "category": "...", "id": "pick-id-placeholder" }]
}
`;

async function generateArticle(topic) {
  console.log(`Generating text for: ${topic}...`);
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Write a future tech news article about: ${topic}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json"
    }
  });

  let articleData;
  try {
      articleData = JSON.parse(response.text);
  } catch (e) {
      console.error("Failed to parse JSON response", e);
      return;
  }
  
  // Generate Image
  console.log(`Generating image for: ${articleData.imagePrompt}...`);
  let imageFilename = `${articleData.id}.jpg`;

  try {
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: articleData.imagePrompt }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    // Extract Image
    let base64Image = null;
    const parts = imageResponse.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (base64Image) {
      const imagePath = path.join(IMAGE_DIR, imageFilename);
      fs.writeFileSync(imagePath, Buffer.from(base64Image, 'base64'));
      console.log(`Saved image to ${imagePath}`);
      
      // Update article data with local path
      articleData.imageUrl = `/images/${imageFilename}`;
    } else {
      console.warn("No image data found in response.");
      articleData.imageUrl = "https://images.unsplash.com/photo-1535378437321-6a8fd74f9c01?q=80&w=1200&auto=format&fit=crop";
    }
  } catch (err) {
    console.error("Image generation failed:", err);
    articleData.imageUrl = "https://images.unsplash.com/photo-1535378437321-6a8fd74f9c01?q=80&w=1200&auto=format&fit=crop";
  }

  delete articleData.imagePrompt; // Remove prompt from final JSON

  // Save JSON
  const jsonPath = path.join(OUTPUT_DIR, `${articleData.id}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(articleData, null, 2));
  console.log(`Saved article to ${jsonPath}`);
  console.log(`SUCCESS: Created ${articleData.id}`);
}

// Get topic from command line
const topic = process.argv[2];
if (topic) {
  generateArticle(topic).catch(console.error);
} else {
  console.log("Usage: node services/geminiService.js 'Topic Name'");
}
