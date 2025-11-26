import React from 'react';

interface SmartImageProps {
  src?: string; 
  alt?: string;
  className?: string;
  // Legacy props kept for compatibility to prevent build errors in consumers, but ignored
  prompt?: string; 
  aspectRatio?: string; 
}

export const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className }) => {
  // Use the provided src or a default fallback if missing
  const imageSource = src && src.length > 0 
    ? src 
    : "https://images.unsplash.com/photo-1535378437321-6a8fd74f9c01?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className={`bg-gray-900 relative overflow-hidden ${className}`}>
      <img 
        src={imageSource} 
        alt={alt || "Future Tech"} 
        className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
        loading="lazy"
      />
    </div>
  );
};
