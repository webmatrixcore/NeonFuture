import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onCategoryClick?: (category: string) => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCategoryClick, onHomeClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={onHomeClick}>
            <h1 className="text-5xl font-display font-black tracking-tighter text-black uppercase transform skew-x-[-5deg] hover:text-brand-accent transition-colors duration-300">
              NEON<span className="text-brand-accent">FUTURE</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden xl:flex space-x-6 items-center">
            {['AI', 'SOCIETY', 'HEALTH', 'MACHINES', 'SCIENCE', 'SPACE', 'TRANSPORT', 'LATEST', 'NEWSLETTER'].map((item) => (
              <button 
                key={item} 
                onClick={() => onCategoryClick && onCategoryClick(item)}
                className="text-xs font-bold font-sans text-black hover:bg-black hover:text-white px-2 py-1 transition-colors uppercase tracking-widest bg-transparent border-none cursor-pointer"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2">
               <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                  <span className="font-mono text-[10px] font-bold">IG</span>
               </div>
               <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                  <span className="font-mono text-[10px] font-bold">BS</span>
               </div>
               <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                  <span className="font-mono text-[10px] font-bold">FB</span>
               </div>
            </div>
            <div className="xl:hidden">
              <Menu className="w-8 h-8 text-black" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};