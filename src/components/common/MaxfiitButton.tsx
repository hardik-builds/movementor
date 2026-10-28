import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface MaxfiitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost';
  iconType?: 'arrow-up-right' | 'arrow-right' | 'none';
  children: React.ReactNode;
  className?: string;
}

export const MaxfiitButton: React.FC<MaxfiitButtonProps> = ({
  variant = 'primary',
  iconType = 'arrow-up-right',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // On touch devices without mouse cursor, trigger energetic periodic hover preview
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) {
      const timer = setTimeout(() => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 900);
      }, 1500 + Math.random() * 3000);

      const interval = setInterval(() => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 900);
      }, 7000 + Math.random() * 4000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, []);

  let variantStyles = '';
  let iconColor = '';

  switch (variant) {
    case 'primary':
      // Authentic Maxfiit Cyber-Yellow #ddca24
      variantStyles = 'bg-[#ddca24] text-[#131313] hover:bg-[#131313] hover:text-[#ddca24] border border-[#ddca24] hover:border-[#131313] shadow-sm';
      iconColor = isHovered ? 'text-[#ddca24]' : 'text-[#131313]';
      break;
    case 'dark':
      variantStyles = 'bg-[#131313] text-white hover:bg-[#ddca24] hover:text-[#131313] border border-[#131313] hover:border-[#ddca24] shadow-sm';
      iconColor = isHovered ? 'text-[#131313]' : 'text-white';
      break;
    case 'outline':
      variantStyles = 'bg-white text-[#131313] border border-[#e4e7eb] hover:border-[#131313] hover:bg-neutral-50 shadow-sm';
      iconColor = 'text-[#131313]';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent text-[#131313] hover:text-[#ddca24] hover:bg-[#131313] border border-transparent';
      iconColor = isHovered ? 'text-[#ddca24]' : 'text-[#131313]';
      break;
  }

  const IconComponent = iconType === 'arrow-right' ? ArrowRight : ArrowUpRight;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 900)}
      className={`group relative inline-flex items-center justify-center font-heading font-black uppercase text-xs tracking-wider px-4 sm:px-5 py-2.5 rounded-[3px] transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] active:scale-[0.98] select-none whitespace-normal sm:whitespace-nowrap max-w-full text-center ${variantStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center space-x-2">
        <span>{children}</span>

        {iconType !== 'none' && (
          <span className="relative w-4 h-4 overflow-hidden inline-flex items-center justify-center shrink-0">
            {/* Arrow 1: Slides out to top-right on hover */}
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
                isHovered
                  ? 'translate-x-full -translate-y-full opacity-0'
                  : 'translate-x-0 translate-y-0 opacity-100'
              } ${iconColor}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </span>

            {/* Arrow 2: Slides in from bottom-left on hover */}
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
                isHovered
                  ? 'translate-x-0 translate-y-0 opacity-100'
                  : '-translate-x-full translate-y-full opacity-0'
              } ${iconColor}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </span>
          </span>
        )}
      </span>
    </button>
  );
};
