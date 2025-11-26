
import React, { useEffect, useState } from 'react';
import { TrendingUp, Loader2, Mail, ArrowRight, Zap } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { fetchArticlesByCategory } from '../services/contentService';
import { ArticleSummary } from '../types';

interface CategoryPageProps {
  category: string;
  onArticleClick: (id: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onArticleClick }) => {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setArticles([]); // Clear previous state

    fetchArticlesByCategory(category).then(data => {
      if (mounted) {
        setArticles(data || []);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [category]);

  const hero = articles.length > 0 ? articles[0] : null;
  const grid = articles.length > 1 ? articles.slice(1, 7) : [];
  const mustRead = articles.length > 7 ? articles.slice(7) : [];

  if (loading) {
    return (
       <div className="min-h-screen pt-32 flex justify-center">
         <Loader2 className="animate-spin" size={32} />
       </div>
    );
  }

  // If no articles found, show a friendly message but keep layout
  if (!hero) {
    return (
      <div className="min-h-screen bg-white pt-32 px-8">
        <h1 className="font-display font-black text-4xl uppercase">{category}</h1>
        <p className="mt-4 font-serif">No articles found in this category.</p>
        <p className="text-sm text-gray-500 mt-2">
          (Ensure <code>node services/generateIndex.js</code> has been run)
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 font-sans animate-fade-in">
       <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="mb-12 border-b-8 border-black pb-4 flex justify-between items-end">
             <h1 className="font-display font-black text-6xl md:text-8xl text-black uppercase tracking-tighter leading-none">
                {category}
             </h1>
             <div className="hidden md:block text-right pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Curated by NeonFuture AI</p>
             </div>
          </div>

          {/* HERO SECTION */}
          {hero && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
               <div className="lg:col-span-8 group cursor-pointer" onClick={() => onArticleClick(hero.id)}>
                  <div className="aspect-[16/9] overflow-hidden mb-6 relative w-full bg-gray-200">
                     <SmartImage src={hero.imageUrl} className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h2 className="font-display font-black text-4xl md:text-5xl uppercase leading-[0.95] mb-4 group-hover:text-brand-accent transition-colors">
                     {hero.title}
                  </h2>
                  <p className="font-serif text-xl text-gray-700 leading-relaxed mb-4">
                     {hero.excerpt}
                  </p>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                     By <span className="text-black border-b border-black">{hero.author}</span>
                  </div>
               </div>
               
               {/* SIDEBAR */}
               <div className="lg:col-span-4 flex flex-col gap-12">
                  <div className="bg-gray-50 p-6 border-t-4 border-black">
                     <h3 className="font-display font-black text-2xl uppercase mb-6 flex items-center gap-2">
                        <TrendingUp className="text-brand-accent"/> Trending
                     </h3>
                     <div className="space-y-6">
                        {[1,2,3].map((i) => (
                           <div key={i} className="flex gap-4 group cursor-pointer">
                              <span className="font-display font-black text-3xl text-gray-300 group-hover:text-black transition-colors">0{i}</span>
                              <h4 className="font-bold text-sm uppercase leading-tight group-hover:text-brand-accent transition-colors pt-1">
                                 Trending Story #{i}
                              </h4>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* NEWSLETTER SIGNUP */}
                  <div className="bg-black text-white p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Mail size={100} />
                     </div>
                     <h3 className="font-display font-black text-2xl uppercase mb-2 relative z-10">
                        {category} Weekly
                     </h3>
                     <p className="text-xs text-gray-400 mb-6 font-mono relative z-10">
                        Get the latest {category.toLowerCase()} predictions delivered to your neural interface.
                     </p>
                     <div className="flex relative z-10">
                        <input type="email" placeholder="ENTER EMAIL" className="bg-white/10 text-white text-xs p-3 flex-grow border-none placeholder-gray-500" />
                        <button className="bg-brand-accent px-3 text-white hover:bg-white hover:text-black transition-colors">
                           <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* GRID SECTION */}
          <div className="mb-20">
             <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-black flex-grow"></div>
                <h3 className="font-display font-black text-2xl uppercase">Latest Stories</h3>
                <div className="h-px bg-black flex-grow"></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {grid.map((story, i) => (
                   <div key={i} className="group cursor-pointer flex flex-col h-full" onClick={() => onArticleClick(story.id)}>
                      <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden relative w-full">
                         <SmartImage src={story.imageUrl} className="w-full h-full transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="text-[10px] font-bold uppercase text-brand-accent mb-2">{story.category}</div>
                      <h4 className="font-display font-black text-2xl uppercase leading-none mb-3 group-hover:text-brand-accent transition-colors">
                         {story.title}
                      </h4>
                      <p className="font-serif text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                         {story.excerpt}
                      </p>
                   </div>
                ))}
             </div>
          </div>

          {/* MUST READ SECTION */}
          {mustRead.length > 0 && (
            <div className="bg-gray-100 p-8 -mx-4 md:-mx-8">
               <h3 className="font-display font-black text-3xl uppercase mb-8 flex items-center gap-3">
                  <Zap className="text-brand-accent fill-current" /> Must Read
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {mustRead.map((story, i) => (
                     <div key={i} className="group cursor-pointer" onClick={() => onArticleClick(story.id)}>
                        <div className="aspect-video mb-3 overflow-hidden bg-gray-200">
                           <SmartImage src={story.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <h4 className="font-bold text-sm uppercase leading-tight group-hover:text-brand-accent transition-colors">
                           {story.title}
                        </h4>
                     </div>
                  ))}
               </div>
            </div>
          )}

       </div>
    </div>
  );
};
    