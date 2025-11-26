import React, { useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * ADMIN PANEL — Generate full articles using backend API
 * The backend uses:
 *  - ChatGPT to generate the article JSON
 *  - NanoBanana to generate the image
 *  - Saves both to /public/articles & /public/images
 */

export const InputSection: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;

    setIsGenerating(true);
    setOutput(null);

    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setOutput("Error: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-4 border-black">
        <h1 className="font-display font-black text-4xl mb-6">
          ADMIN: AI Article Generator
        </h1>

        <p className="mb-6 font-serif text-sm text-gray-600">
          This admin tool automatically generates:
          <br />
          • A complete Futurism-style article using ChatGPT
          <br />
          • A matching AI image generated using NanoBanana
          <br />
          • A saved JSON file in <code>/public/articles</code>
          <br />
          • A saved image in <code>/public/images</code>
          <br />• Returns final JSON output below
        </p>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            className="flex-grow border-2 border-black p-3 font-bold uppercase"
            placeholder="Enter Topic (e.g. Quantum Mars Elevator)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-black text-white px-6 font-bold uppercase hover:bg-brand-accent disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating && <Loader2 className="animate-spin" size={16} />}
            {isGenerating ? "GENERATING..." : "GENERATE ARTICLE"}
          </button>
        </div>

        {output && (
          <div className="bg-gray-900 text-green-400 p-4 font-mono text-xs overflow-auto max-h-[500px] border-2 border-black rounded relative">
            <button
              className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-[10px] font-bold uppercase"
              onClick={() => navigator.clipboard.writeText(output)}
            >
              COPY
            </button>

            <pre className="whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
