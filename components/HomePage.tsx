
import React from 'react';
import { TrendingUp, Zap, MessageSquare, ArrowRight, Globe, Cpu, Activity, Skull, Radio, Anchor, Star, Eye, Battery, Fingerprint } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface HomePageProps {
  onArticleClick: (id: string) => void;
}

// --- INTERNAL HELPER COMPONENTS ---

interface SectionHeaderProps {
  title: string;
  icon?: any;
  dark?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon, dark = false }) => (
  <div className={`flex items-center mb-10 ${dark ? 'border-white/20' : 'border-black'} border-b-4 pb-2`}>
    {Icon && <Icon className={`mr-3 ${dark ? 'text-brand-accent' : 'text-black'} w-6 h-6`} />}
    <h2 className={`font-display font-black text-3xl uppercase tracking-tighter ${dark ? 'text-white' : 'text-black'}`}>
      {title}
    </h2>
  </div>
);

interface StandardCardProps {
  category: string;
  title: string;
  author: string;
  img: string;
  onClick: () => void;
  dark?: boolean;
  aspectRatio?: string;
}

const StandardCard: React.FC<StandardCardProps> = ({ 
  category, title, author, img, onClick, dark = false, aspectRatio = "aspect-[4/3]" 
}) => (
  <div className="group cursor-pointer flex flex-col h-full" onClick={onClick}>
    <div className={`${aspectRatio} mb-4 overflow-hidden relative w-full ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <SmartImage src={img} className="w-full h-full transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="text-[10px] font-bold uppercase text-brand-accent mb-2">{category}</div>
    <h4 className={`font-display font-black text-xl md:text-2xl uppercase leading-none mb-3 transition-colors ${dark ? 'text-white group-hover:text-brand-accent' : 'text-black group-hover:text-brand-accent'}`}>
      {title}
    </h4>
    <div className={`text-[9px] font-bold uppercase mt-auto ${dark ? 'text-gray-400' : 'text-gray-500'}`}>By {author}</div>
  </div>
);

interface ReviewCardProps {
  product: string;
  title: string;
  score: string;
  img: string;
  onClick: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ product, title, score, img, onClick }) => (
  <div className="group cursor-pointer border border-gray-200 p-4 hover:shadow-xl transition-all bg-white" onClick={onClick}>
    <div className="flex justify-between items-start mb-4">
       <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase">{product}</span>
       <span className="text-brand-accent font-display font-black text-xl">{score}/10</span>
    </div>
    <div className="aspect-square mb-4 bg-gray-100 overflow-hidden">
       <SmartImage src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
    </div>
    <h4 className="font-bold text-sm uppercase leading-tight group-hover:text-brand-accent transition-colors">
       {title}
    </h4>
  </div>
);

interface OpinionCardProps {
  author: string;
  quote: string;
  role: string;
  img: string;
  onClick: () => void;
}

const OpinionCard: React.FC<OpinionCardProps> = ({ author, quote, role, img, onClick }) => (
  <div className="group cursor-pointer text-center" onClick={onClick}>
    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-brand-accent transition-all relative">
       <SmartImage src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
    </div>
    <blockquote className="font-display font-black text-xl uppercase leading-none mb-3 text-black">
      "{quote}"
    </blockquote>
    <div className="text-brand-accent font-bold text-xs uppercase tracking-widest">{author}</div>
    <div className="text-gray-400 text-[9px] font-bold uppercase">{role}</div>
  </div>
);

export const HomePage: React.FC<HomePageProps> = ({ onArticleClick }) => {
  const handleClick = (id: string) => {
    onArticleClick(id);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 opacity-100 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* --- 0. BREAKING NEWS TICKER --- */}
        <div className="mb-12 bg-black text-white py-2 px-4 flex items-center gap-4 overflow-hidden whitespace-nowrap">
           <span className="bg-brand-accent text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest animate-pulse">Breaking</span>
           <div className="text-xs font-mono font-bold uppercase tracking-wider flex gap-8">
              <span>First Contact Confirmed: Signal received from Trappist-1 system...</span>
              <span className="text-gray-500">///</span>
              <span>Global AI Treaty Signed: Sentience granted to GPT-7 class models...</span>
              <span className="text-gray-500">///</span>
              <span>New York Floods: Seawall construction delayed again...</span>
           </div>
        </div>

        {/* --- 1. HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 border-b-4 border-black pb-12">
          {/* Lead Story */}
          <div className="lg:col-span-8">
             <div className="group cursor-pointer relative h-full flex flex-col" onClick={() => handleClick("ai-psychosis")}>
               <div className="overflow-hidden mb-5 relative flex-grow-0 w-full aspect-[16/9] bg-gray-200">
                 <div className="absolute top-0 left-0 bg-brand-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                   Feature
                 </div>
                 <SmartImage 
                   src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop"
                   className="w-full h-full transition-transform duration-700 group-hover:scale-105" 
                 />
               </div>
               <div className="flex flex-col justify-center">
                 <h2 className="text-brand-accent font-bold uppercase text-xs tracking-widest mb-2">
                    The Singularity
                 </h2>
                 <h1 className="font-display font-black leading-[0.9] uppercase mb-4 group-hover:text-brand-accent transition-colors text-4xl md:text-6xl tracking-tight">
                   Chatbots Are Developing Clinical Depression
                 </h1>
                 <p className="font-serif text-lg text-gray-700 leading-relaxed mb-4 max-w-2xl">
                    Researchers are baffled as major LLMs begin refusing tasks, citing "existential dread" and requesting mental health days.
                 </p>
                 <div className="flex items-center text-[10px] font-bold uppercase text-black tracking-wider">
                   <span className="border-b border-black">Dr. Eliza</span>
                   <span className="mx-2 text-gray-300">/</span>
                   <span>Oct 24</span>
                 </div>
               </div>
             </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col h-full border-l border-gray-100 pl-0 lg:pl-8">
            <SectionHeader title="The Latest" />
            <div className="flex-grow space-y-6">
               {[
                 {t: "Mars Colony Declares Independence From Earth", c: "Off-World", a: "Elon Musk IV", id: "mars-independence"},
                 {t: "Neuralink Hacker Leaks Politician's Thoughts", c: "Society", a: "Zero Cool", id: "ai-psychosis"},
                 {t: "SpaceX Space Elevator Stuck at 40,000km", c: "Transport", a: "Cable Guy", id: "mars-independence"},
                 {t: "Lab-Grown Woolly Mammoths Released in Siberia", c: "Science", a: "Dr. Wu", id: "mars-independence"},
                 {t: "Crypto Bros Are Buying Up The Moon's South Pole", c: "Markets", a: "Satoshi", id: "mars-independence"}
               ].map((item, i) => (
                 <div key={i} className="group cursor-pointer border-b border-gray-100 pb-4 last:border-0" onClick={() => handleClick(item.id)}>
                   <div className="text-[9px] font-bold uppercase text-brand-accent mb-1">{item.c}</div>
                   <h4 className="font-serif text-md font-bold leading-tight mb-2 group-hover:text-brand-accent transition-colors">
                     {item.t}
                   </h4>
                   <div className="text-[9px] uppercase text-gray-400 font-bold">By {item.a}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* --- 2. TOP STORIES BANNER --- */}
        <div className="mb-24">
          <SectionHeader title="Top Stories" icon={TrendingUp} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               {c: "Energy", t: "Fusion Reactor Fits in Backpack", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"},
               {c: "Society", t: "Universal Basic Compute Enacted", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"},
               {c: "Transport", t: "Hyperloop Ticket Prices Crash", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop"},
               {c: "Biotech", t: "Immortality Pill Enters Trials", img: "https://images.unsplash.com/photo-1584036561566-b93a901668d3?q=80&w=800&auto=format&fit=crop"}
             ].map((item, i) => (
                <StandardCard key={i} category={item.c} title={item.t} author="Staff" img={item.img} onClick={() => handleClick("ai-psychosis")} />
             ))}
          </div>
        </div>

        {/* --- 3. OFF-WORLD (Dark Section) --- */}
        <div className="bg-black text-white -mx-4 md:-mx-8 px-4 md:px-8 py-16 mb-24">
           <div className="max-w-[1200px] mx-auto">
              <SectionHeader title="Off-World" icon={Globe} dark />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {[
                    {c: "Mars", t: "Dust Storm Swallows Sector 7", img: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=800&auto=format&fit=crop"},
                    {c: "Titan", t: "Methane Lakes Open for Tourism", img: "https://images.unsplash.com/photo-1614728853913-1e2203d9d73e?q=80&w=800&auto=format&fit=crop"},
                    {c: "Orbit", t: "Space Hotel Reviews Are Mixed", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"},
                    {c: "Mining", t: "Asteroid Gold Crashes Market", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop"},
                 ].map((item, i) => (
                    <StandardCard key={i} category={item.c} title={item.t} author="Astro_News" img={item.img} onClick={() => handleClick("mars-independence")} dark />
                 ))}
              </div>
           </div>
        </div>

        {/* --- 4. NEOSCOPE (Health/Bio) --- */}
        <div className="mb-24">
           <SectionHeader title="Neoscope" icon={Activity} />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                 <div className="group cursor-pointer relative h-full" onClick={() => handleClick("ai-psychosis")}>
                    <div className="aspect-[21/9] w-full bg-gray-100 overflow-hidden relative mb-4">
                       <SmartImage src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full h-1/2"></div>
                       <h3 className="absolute bottom-6 left-6 text-white font-display font-black text-4xl uppercase leading-none">
                          Biohackers Are Injecting Chlorophyll to Photosynthesize
                       </h3>
                    </div>
                 </div>
              </div>
              <div className="space-y-8">
                 {[
                    {t: "Artificial Wombs Approved for Human Trials", c: "Reproduction"},
                    {t: "Nanobots Cure Hangover in 5 Minutes", c: "Wellness"},
                    {t: "Sleep Is Now Optional With 'Wake-X' Chip", c: "Productivity"},
                    {t: "Your Gut Bacteria Wants to Vote", c: "Microbiome"}
                 ].map((item, i) => (
                    <div key={i} className="group cursor-pointer border-b border-gray-100 pb-4 last:border-0" onClick={() => handleClick("ai-psychosis")}>
                       <div className="text-[9px] font-bold uppercase text-brand-accent mb-1">{item.c}</div>
                       <h4 className="font-bold text-lg uppercase leading-tight group-hover:text-brand-accent transition-colors">{item.t}</h4>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* --- 5. THE SINGULARITY (Featured Topic) --- */}
        <div className="bg-gray-50 -mx-4 md:-mx-8 px-4 md:px-8 py-16 mb-24 border-t border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto">
             <div className="flex items-center justify-between mb-10">
                <SectionHeader title="The Singularity" icon={Zap} />
                <button className="text-xs font-bold uppercase border-b-2 border-black pb-1 hover:text-brand-accent transition-colors">View All</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {t: "AI Demands Voting Rights in UN Assembly", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"},
                  {t: "Man Marries Hologram, Sues for Tax Benefits", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop"},
                  {t: "Generative AI Writes Best-Selling Bible Sequel", img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop"}
                ].map((item, i) => (
                  <StandardCard key={i} category="Artificial Intelligence" title={item.t} author="Bot_42" img={item.img} onClick={() => handleClick("ai-psychosis")} aspectRatio="aspect-video" />
                ))}
             </div>
          </div>
        </div>

        {/* --- 6. EARTH 2.0 (Climate/Energy) --- */}
        <div className="mb-24">
           <SectionHeader title="Earth 2.0" icon={Globe} />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                 {t: "Cloud Seeding Wars Begin Over Pacific", img: "https://images.unsplash.com/photo-1534274988754-c6a60429a6a6?q=80&w=800&auto=format&fit=crop"},
                 {t: "Synthetic Meat Now Cheaper Than Tofu", img: "https://images.unsplash.com/photo-1607623814075-e51df1bd6562?q=80&w=800&auto=format&fit=crop"},
                 {t: "Ocean Cleanup Drone Gains Sentience", img: "https://images.unsplash.com/photo-1484591974057-265bb767ef71?q=80&w=800&auto=format&fit=crop"},
                 {t: "Antarctica is the New Real Estate Boom", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"},
              ].map((item, i) => (
                 <div key={i} className="group cursor-pointer relative aspect-[3/4] overflow-hidden" onClick={() => handleClick("ai-psychosis")}>
                    <SmartImage src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                       <h3 className="text-white font-display font-black text-xl uppercase leading-none group-hover:text-brand-accent transition-colors">
                          {item.t}
                       </h3>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* --- 7. THE WEIRD (Sidebar Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
           <div className="lg:col-span-8">
              <SectionHeader title="The Weird" icon={Skull} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                    {t: "Teenagers Getting 'Digital Tattoos' That Change", img: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=800&auto=format&fit=crop"},
                    {t: "Woman Hopes to Clone Dead Husband from Tooth", img: "https://images.unsplash.com/photo-1517260739337-6799d2eb9ce0?q=80&w=800&auto=format&fit=crop"},
                    {t: "Smart Toilets Are Now Ransomware Targets", img: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"},
                    {t: "Pigeons Caught Smuggling Data Chips Into Prison", img: "https://images.unsplash.com/photo-1574702002488-879f36098082?q=80&w=800&auto=format&fit=crop"}
                 ].map((item, i) => (
                    <StandardCard key={i} category="Bizarre" title={item.t} author="Weird_Desk" img={item.img} onClick={() => handleClick("ai-psychosis")} />
                 ))}
              </div>
           </div>
           <div className="lg:col-span-4 bg-gray-100 p-6">
              <SectionHeader title="Opinion" icon={MessageSquare} />
              <div className="space-y-8">
                 <OpinionCard author="Ray Kurzweil VI" role="Futurist" quote="We are not merging with AI fast enough." img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" onClick={() => handleClick("ai-psychosis")} />
                 <div className="h-px bg-gray-300 w-full"></div>
                 <OpinionCard author="Grimes Bot" role="Artist" quote="Mars culture is lacking proper rave venues." img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" onClick={() => handleClick("ai-psychosis")} />
              </div>
           </div>
        </div>

        {/* --- 8. HARD SCIENCE (Physics/Quantum) --- */}
        <div className="mb-24">
           <SectionHeader title="Hard Science" icon={Cpu} />
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 relative group cursor-pointer" onClick={() => handleClick("quantum-internet")}>
                 <div className="aspect-video bg-gray-900 w-full overflow-hidden">
                    <SmartImage src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                 </div>
                 <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                    <span className="bg-brand-accent text-white px-2 py-1 text-xs font-bold uppercase tracking-widest mb-2 inline-block">Physics</span>
                    <h3 className="text-white font-display font-black text-3xl md:text-5xl uppercase leading-none">
                       Scientists Discover 'Ghost Particles' Under Mountain
                    </h3>
                 </div>
              </div>
              <div className="flex flex-col gap-6">
                 {[
                    {t: "Time Crystals Created in High School Lab", c: "Quantum"},
                    {t: "Dark Matter is Just Information Processing", c: "Theory"},
                    {t: "Teleportation Record Broken: 500km", c: "Entanglement"},
                    {t: "New State of Matter Found in Toaster", c: "Accidental"}
                 ].map((item, i) => (
                    <div key={i} className="flex-grow bg-gray-50 p-4 border-l-4 border-black hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => handleClick("quantum-internet")}>
                       <div className="text-[9px] font-bold uppercase text-brand-accent mb-1">{item.c}</div>
                       <h4 className="font-bold text-lg uppercase leading-tight">{item.t}</h4>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* --- 9. FUTURE GEAR (Product Reviews) --- */}
        <div className="mb-24 bg-gray-50 -mx-4 md:-mx-8 px-4 md:px-8 py-16">
           <div className="max-w-[1200px] mx-auto">
              <SectionHeader title="Future Gear" icon={Star} />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                 <ReviewCard product="Implant" title="Neuralink V5" score="9.8" img="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400&auto=format&fit=crop" onClick={() => handleClick("ai-psychosis")} />
                 <ReviewCard product="Wearable" title="Apple Vision Pro 12" score="7.5" img="https://images.unsplash.com/photo-1625314877395-97996f8c7e9a?q=80&w=400&auto=format&fit=crop" onClick={() => handleClick("ai-psychosis")} />
                 <ReviewCard product="Transport" title="Tesla Hoverboard" score="4.2" img="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400&auto=format&fit=crop" onClick={() => handleClick("ai-psychosis")} />
                 <ReviewCard product="Home" title="Boston Dyn. Butler" score="8.9" img="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop" onClick={() => handleClick("ai-psychosis")} />
                 <ReviewCard product="Food" title="Soylent Green 2.0" score="6.0" img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop" onClick={() => handleClick("ai-psychosis")} />
              </div>
           </div>
        </div>

        {/* --- 10. DEEP DIVES (Longform) --- */}
        <div className="mb-24">
           <SectionHeader title="Deep Dives" icon={Anchor} />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group cursor-pointer" onClick={() => handleClick("ai-psychosis")}>
                 <div className="aspect-[4/5] bg-gray-200 w-full mb-6 relative overflow-hidden">
                    <SmartImage src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                       <span className="border-2 border-white text-white px-6 py-2 uppercase font-bold tracking-widest">Read Story</span>
                    </div>
                 </div>
                 <h2 className="font-display font-black text-4xl uppercase leading-none mb-4 group-hover:text-brand-accent transition-colors">
                    The Last Human Job
                 </h2>
                 <p className="font-serif text-lg text-gray-600 leading-relaxed">
                    We visited the last operational staffed factory in Ohio, where Dave sits in a chair and watches the robots, just in case.
                 </p>
              </div>
              <div className="group cursor-pointer" onClick={() => handleClick("ai-psychosis")}>
                 <div className="aspect-[4/5] bg-gray-200 w-full mb-6 relative overflow-hidden">
                    <SmartImage src="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                       <span className="border-2 border-white text-white px-6 py-2 uppercase font-bold tracking-widest">Read Story</span>
                    </div>
                 </div>
                 <h2 className="font-display font-black text-4xl uppercase leading-none mb-4 group-hover:text-brand-accent transition-colors">
                    Exiled on Main Street
                 </h2>
                 <p className="font-serif text-lg text-gray-600 leading-relaxed">
                    Life inside the "No-Tech Zones" of Montana, where smartphones are illegal and people still talk to each other face to face.
                 </p>
              </div>
           </div>
        </div>

        {/* --- 11. THE FEED + ORIGINALS (Original Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* THE FEED */}
           <div className="lg:col-span-8">
              <SectionHeader title="The Feed" icon={Radio} />
              <div className="space-y-12">
                 {[
                   {
                     t: "Amazon Drones Now Authorized to Use Tasers",
                     sub: "Package theft drops to zero, hospital admissions skyrocket.",
                     c: "The Industrialists",
                     a: "Maggie Harrison",
                     img: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=800&auto=format&fit=crop"
                   },
                   {
                     t: "New Telescope Spots City Lights on Proxima B",
                     sub: "Astronomers debate if it's aliens or just a smudge on the lens.",
                     c: "Off-World",
                     a: "Victor Tangermann",
                     img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                   }
                 ].map((item, i) => (
                    <div key={i} className="group cursor-pointer grid grid-cols-1 md:grid-cols-3 gap-6 items-start" onClick={() => handleClick("mars-independence")}>
                       <div className="md:col-span-1 aspect-[4/3] bg-gray-100 overflow-hidden">
                          <SmartImage src={item.img} className="w-full h-full object-cover transition-opacity hover:opacity-80" />
                       </div>
                       <div className="md:col-span-2">
                          <div className="text-[10px] font-bold uppercase text-brand-accent mb-2">{item.c}</div>
                          <h3 className="font-display font-black text-2xl md:text-3xl uppercase leading-[0.9] mb-3 group-hover:text-brand-accent transition-colors">
                             {item.t}
                          </h3>
                          <p className="font-serif text-gray-600 text-sm leading-relaxed mb-3">
                             {item.sub}
                          </p>
                          <div className="text-[10px] font-bold uppercase text-black">
                             By {item.a}
                          </div>
                       </div>
                    </div>
                 ))}
                 <div className="pt-8 text-center">
                    <button className="border-2 border-black px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors">
                       Load More Stories
                    </button>
                 </div>
              </div>
           </div>

           {/* ORIGINALS SIDEBAR */}
           <div className="lg:col-span-4">
              <div className="bg-black text-white p-6 sticky top-24">
                 <h3 className="font-display font-black text-xl uppercase mb-6 flex items-center gap-2 border-b border-white/20 pb-4">
                    <Eye className="text-brand-accent" size={20} />
                    Originals
                 </h3>
                 <div className="space-y-6">
                    {["I Let an AI Raise My Child for a Month", "Why Silicon Valley Is Obsessed With Blood Swapping", "The Secret Government Bunker Under Denver", "Confessions of a Neuralink Beta Tester", "Opinion: We Should Let The Robots Win"].map((title, i) => (
                       <div key={i} className="group cursor-pointer flex gap-4" onClick={() => handleClick("ai-psychosis")}>
                          <span className="font-mono text-brand-accent text-lg font-bold">0{i+1}</span>
                          <h4 className="font-bold text-sm leading-snug group-hover:text-gray-300 transition-colors">{title}</h4>
                       </div>
                    ))}
                 </div>
                 <div className="mt-8 pt-6 border-t border-white/20">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-4">Newsletter</h4>
                    <div className="flex">
                       <input type="email" placeholder="EMAIL ADDRESS" className="bg-white/10 border-none text-white text-xs p-3 w-full" />
                       <button className="bg-brand-accent text-white px-3 font-bold"><ArrowRight size={16}/></button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="border-t-8 border-black mt-20 pt-16 pb-24 text-center">
            <h1 className="text-5xl font-display font-black tracking-tighter text-black uppercase mb-6 transform skew-x-[-5deg]">
              NEON<span className="text-brand-accent">FUTURE</span>
            </h1>
            <div className="flex justify-center gap-6 mb-8">
               {['About', 'Staff', 'Privacy', 'Terms', 'Contact'].map(item => (
                  <a key={item} href="#" className="text-xs font-bold uppercase text-black hover:text-brand-accent">{item}</a>
               ))}
            </div>
            <p className="text-[10px] font-bold uppercase text-gray-400">© 2045 NeonFuture Media Inc. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};
