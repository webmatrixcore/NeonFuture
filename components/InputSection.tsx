import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2 } from 'lucide-react';

// ADMIN TOOL - Helper to generate JSON blobs using client-side API calls.
// In a production static site, this logic would live in the Node script services/geminiService.js
// This component provides a UI to easily create that data.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const InputSection: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    
    try {
       const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Write a futuristic news article about: ${topic}`,
        config: {
          systemInstruction: `Generate a JSON object for a news article with fields: id (kebab-case), title, subtitle, category (one of AI, SPACE, SOCIETY, MACHINES, HEALTH), author, publishDate, readTime, imageUrl (use a placeholder url), introduction, whatHappened, whyItMatters, theTech, expertReactions, futureOutlook, conclusion, pullQuote, relatedStories (array of {title, category, id}), editorsPicks (array of {title, category, id}). Return JSON only.`,
          responseMimeType: "application/json"
        }
      });
      setOutput(response.text);
    } catch (e) {
      setOutput(`Error: ${e}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-4 border-black">
        <h1 className="font-display font-black text-4xl mb-6">ADMIN: Content Generator</h1>
        <p className="mb-6 font-serif text-sm text-gray-600">
           This tool helps you generate the initial JSON structure for a new article.
           <br/>
           1. Enter a topic below.<br/>
           2. Click Generate.<br/>
           3. Copy the JSON output and save it to <code>/public/articles/[id].json</code>.<br/>
           4. Run the Node script for image generation if needed.
        </p>
        
        <div className="flex gap-4 mb-6">
          <input 
            type="text" 
            className="flex-grow border-2 border-black p-3 font-bold uppercase"
            placeholder="Enter Topic (e.g. Moon Base)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-black text-white px-6 font-bold uppercase hover:bg-brand-accent disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating && <Loader2 className="animate-spin" size={16} />}
            {isGenerating ? 'GENERATING...' : 'GENERATE JSON'}
          </button>
        </div>

        {output && (
          <div className="bg-gray-900 text-green-400 p-4 font-mono text-xs overflow-auto max-h-[500px] border-2 border-black rounded relative">
            <button 
              className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-[10px] font-bold uppercase"
              onClick={() => navigator.clipboard.writeText(output)}
            >
              Copy
            </button>
            <pre className="whitespace-pre-wrap">{JSON.stringify(JSON.parse(output), null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
