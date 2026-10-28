import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItemProps {
  number: string;
  title: string;
  category: string;
  description: string;
  capacity: string;
  image: string;
  coaches: string[];
  isActive?: boolean;
  onSelect?: () => void;
}

export const InteractiveServiceCard: React.FC<ServiceItemProps> = ({
  number,
  title,
  category,
  description,
  capacity,
  image,
  coaches,
  isActive = false,
  onSelect
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // On touch devices without mouse cursor, trigger energetic periodic preview
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) {
      const interval = setInterval(() => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 1400);
      }, 8000 + Math.random() * 5000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
      onClick={() => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 2000);
        if (onSelect) onSelect();
      }}
      className="group relative bg-white border border-[#e4e7eb] rounded-[4px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:shadow-xl hover:border-[#131313] active:scale-[0.99]"
    >
      {/* Background Expand Overlay (Webflow Service Hover Animation) */}
      <div
        style={{
          transformOrigin: 'bottom',
          transitionDuration: '700ms',
          transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}
        className={`absolute inset-0 bg-[#131313] transition-transform ${
          isHovered || isActive ? 'scale-y-100' : 'scale-y-0'
        }`}
      />

      {/* Content wrapper */}
      <div className="relative z-10 p-6 flex flex-col justify-between h-full space-y-6">
        
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span
              className={`font-mono text-xs font-bold transition-colors duration-400 ${
                isHovered || isActive ? 'text-[#ddca24]' : 'text-[#667085]'
              }`}
            >
              {number}
            </span>
            <div
              className={`text-[10px] font-heading font-black uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block transition-colors duration-400 ${
                isHovered || isActive ? 'bg-[#ddca24] text-[#131313]' : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {category}
            </div>
          </div>

          {/* Interactive Dual-Arrow Indicator */}
          <div
            className={`w-9 h-9 rounded-[3px] border flex items-center justify-center relative overflow-hidden transition-colors duration-400 ${
              isHovered || isActive
                ? 'bg-[#ddca24] border-[#ddca24] text-[#131313]'
                : 'bg-neutral-50 border-[#e4e7eb] text-[#131313]'
            }`}
          >
            {/* Arrow 1 */}
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
                isHovered || isActive
                  ? 'translate-x-full -translate-y-full opacity-0'
                  : 'translate-x-0 translate-y-0 opacity-100'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </span>
            {/* Arrow 2 */}
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
                isHovered || isActive
                  ? 'translate-x-0 translate-y-0 opacity-100'
                  : '-translate-x-full translate-y-full opacity-0'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Middle: Title & Image preview */}
        <div className="space-y-3">
          <h3
            className={`font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight transition-colors duration-400 ${
              isHovered || isActive ? 'text-white' : 'text-[#131313]'
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-xs leading-relaxed transition-colors duration-400 ${
              isHovered || isActive ? 'text-neutral-300' : 'text-[#667085]'
            }`}
          >
            {description}
          </p>

          {/* Micro preview athlete photo */}
          <div className="h-32 w-full overflow-hidden rounded-[3px] relative bg-neutral-900">
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
                isHovered || isActive ? 'scale-105 filter-none' : 'scale-100 filter grayscale contrast-125'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-white">
              <span>Capacity: {capacity}</span>
              <span className="text-[#ddca24]">Active</span>
            </div>
          </div>
        </div>

        {/* Footer coaches */}
        <div
          className={`pt-3 border-t text-[11px] flex items-center justify-between transition-colors duration-400 ${
            isHovered || isActive
              ? 'border-neutral-800 text-neutral-400'
              : 'border-neutral-100 text-[#667085]'
          }`}
        >
          <div className="flex items-center space-x-1">
            <span className="font-bold">Lead Coaches:</span>
            <span>{coaches.join(', ')}</span>
          </div>
          <span
            className={`font-heading font-black uppercase tracking-wider text-[10px] ${
              isHovered || isActive ? 'text-[#ddca24]' : 'text-[#131313]'
            }`}
          >
            Explore →
          </span>
        </div>

      </div>
    </div>
  );
};
