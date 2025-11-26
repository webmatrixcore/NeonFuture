
import React, { useState, useEffect } from 'react';
import { ArticleData } from '../types';
import { ArrowLeft, AlertTriangle, Loader2, Twitter, Facebook, Link as LinkIcon, Share2 } from 'lucide-react';
import { fetchArticleById } from '../services/contentService';
import { SmartImage } from './SmartImage';

interface ArticleDisplayProps {
  articleId: string;
  onBack: () => void;
  onArticleClick: (id: string) => void;
}

export const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ articleId, onBack, onArticleClick }) => {
  const [data, setData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(false);
    window.scrollTo(0,0);

    fetchArticleById(articleId)
      .then(article => {
        if (!mounted) return;
        if (article) {
          setData(article);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      });

    const handleScroll = () => {
       const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
       const progress = (window.scrollY / totalHeight) * 100;
       setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => { 
       mounted = false; 
       window.removeEventListener('scroll', handleScroll);
    };
  }, [articleId]);

  const renderMarkdown = (text: string) => {
    return { __html: text ? text.replace(/\n/g, '<br/>') : '' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex justify-center">
        <Loader2 className="animate-spin text-black" size={48} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white pt-32 flex flex-col items-center justify-center">
        <AlertTriangle size={48} className="text-red-500 mb-4" />
        <h2 className="font-display font-black text-2xl uppercase">Article Not Found</h2>
        <p className="font-serif text-gray-500 mt-2">Could not load /articles/{articleId}.json</p>
        <button onClick={onBack} className="mt-8 underline font-bold uppercase">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 font-sans animate-fade-in relative">
      
      {/* READING PROGRESS BAR */}
      <div className="fixed top-20 left-0 h-1 bg-brand-accent z-40 transition-all duration-300" style={{ width: `${readingProgress}%` }}></div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Main Grid: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* MAIN COLUMN (Content) */}
          <main className="lg:col-span-8 pt-8">
            
            {/* 1. Hero Image */}
            <figure className="w-full mb-8 relative">
               <div className="w-full aspect-[16/9] bg-black relative overflow-hidden">
                 <SmartImage src={data.imageUrl} alt={data.title} className="w-full h-full" />
               </div>
            </figure>

            {/* 2. Centered Header Info */}
            <div className="text-center max-w-2xl mx-auto mb-12">
               <span className="text-brand-accent font-bold uppercase text-xs tracking-[0.2em] mb-4 block">
                 {data.category}
               </span>
               <h1 className="text-4xl md:text-6xl font-display font-black text-black leading-[0.95] mb-6 uppercase tracking-tight">
                 {data.title}
               </h1>
               <p className="text-xl text-gray-700 font-serif italic leading-relaxed">
                 {data.subtitle}
               </p>

               {/* Author Line */}
               <div className="flex items-center justify-center gap-2 mt-6 text-[11px] font-bold uppercase tracking-widest text-black">
                 <span className="border-b border-black pb-0.5">By {data.author}</span>
                 <span className="text-gray-400">/</span>
                 <span className="text-gray-500">{data.publishDate}</span>
                 <span className="text-gray-400">/</span>
                 <span className="text-gray-500">{data.readTime}</span>
               </div>
            </div>

            {/* 3. Article Body */}
            <div className="article-body max-w-3xl mx-auto border-t border-gray-100 pt-8 relative">
               
               {/* Share Buttons (Sticky on Desktop) */}
               <div className="hidden xl:flex flex-col gap-4 absolute -left-20 top-8 text-gray-400">
                  <button className="hover:text-brand-accent transition-colors"><Twitter size={20}/></button>
                  <button className="hover:text-brand-accent transition-colors"><Facebook size={20}/></button>
                  <button className="hover:text-brand-accent transition-colors"><LinkIcon size={20}/></button>
               </div>

               <div className="drop-cap" dangerouslySetInnerHTML={renderMarkdown(data.introduction)} />

               {data.whatHappened && (
                 <>
                   <h3>What Happened</h3>
                   <div dangerouslySetInnerHTML={renderMarkdown(data.whatHappened)} />
                 </>
               )}

               {data.whyItMatters && (
                 <>
                   <h3>Why It Matters</h3>
                   <div dangerouslySetInnerHTML={renderMarkdown(data.whyItMatters)} />
                 </>
               )}

               {data.pullQuote && (
                  <blockquote className="my-10 pl-6 border-l-[6px] border-brand-accent font-display text-2xl font-bold uppercase leading-none text-black tracking-tight">
                     "{data.pullQuote}"
                  </blockquote>
               )}

               {data.theTech && (
                 <>
                   <h3>The Tech Behind It</h3>
                   <div dangerouslySetInnerHTML={renderMarkdown(data.theTech)} />
                 </>
               )}

               {data.expertReactions && (
                 <>
                   <h3>Expert Reactions</h3>
                   <div dangerouslySetInnerHTML={renderMarkdown(data.expertReactions)} />
                 </>
               )}

               {data.futureOutlook && (
                 <>
                   <h3>Future Outlook</h3>
                   <div dangerouslySetInnerHTML={renderMarkdown(data.futureOutlook)} />
                 </>
               )}
               
               {data.conclusion && (
                 <>
                   <div className="mt-8 pt-8 border-t border-gray-200" dangerouslySetInnerHTML={renderMarkdown(data.conclusion)} />
                 </>
               )}

              {/* Mobile Share Bar */}
              <div className="xl:hidden mt-8 flex justify-center gap-6 border-t border-gray-100 pt-6 text-gray-400">
                  <button className="hover:text-brand-accent transition-colors flex items-center gap-2"><Twitter size={18}/> <span className="text-xs font-bold uppercase">Tweet</span></button>
                  <button className="hover:text-brand-accent transition-colors flex items-center gap-2"><Facebook size={18}/> <span className="text-xs font-bold uppercase">Share</span></button>
                  <button className="hover:text-brand-accent transition-colors flex items-center gap-2"><Share2 size={18}/> <span className="text-xs font-bold uppercase">Copy</span></button>
              </div>

              <div className="mt-16 text-center border-t border-gray-200 pt-12">
                 <button onClick={onBack} className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors">
                   <ArrowLeft size={14} /> Back to Home
                 </button>
              </div>
            </div>

          </main>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-12 pt-8">
            
            {/* Editor's Picks */}
            <div>
               <h4 className="font-sans font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                 <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                 Editor's Picks
               </h4>
               <div className="space-y-8">
                 {data.editorsPicks && data.editorsPicks.map((story, i) => (
                   <div key={i} className="group cursor-pointer" onClick={() => onArticleClick(story.id || 'mars-independence')}>
                      <div className="text-[9px] font-bold uppercase text-brand-accent mb-1">{story.category}</div>
                      <h5 className="font-serif text-lg leading-tight mb-2 group-hover:text-brand-accent transition-colors">
                        {story.title}
                      </h5>
                   </div>
                 ))}
               </div>
            </div>

            <div className="h-px bg-gray-200 w-full"></div>

            {/* Related Stories */}
            <div>
               <h4 className="font-sans font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                 <span className="w-2 h-2 bg-black rounded-full"></span>
                 Related Stories
               </h4>
               
               <div className="space-y-6">
                 {data.relatedStories && data.relatedStories.map((story, i) => (
                   <div key={i} className="group cursor-pointer border-b border-dashed border-gray-200 pb-4 last:border-0" onClick={() => onArticleClick(story.id || 'ai-psychosis')}>
                      <div className="flex items-start gap-3">
                         <span className="font-display font-black text-xl text-gray-200 group-hover:text-black">0{i+1}</span>
                         <div>
                            <span className="text-[9px] font-bold uppercase text-gray-400 block mb-1">{story.category}</span>
                            <h5 className="font-bold text-sm uppercase leading-tight group-hover:text-brand-accent transition-colors">
                              {story.title}
                            </h5>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};
    