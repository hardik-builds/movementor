import React, { useEffect, useRef, useState } from 'react';

interface AnimatedRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'scale-in' | 'slide-left' | 'slide-right';
  delayMs?: number;
  durationMs?: number;
  className?: string;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  animation = 'fade-up',
  delayMs = 0,
  durationMs = 850,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Immediate viewport check (Crucial for mobile phones!)
    const checkInView = () => {
      if (!elementRef.current || isVisible) return;
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 60 && rect.bottom >= -60) {
        setIsVisible(true);
      }
    };

    // Run on initial render & tick
    checkInView();
    const timer = setTimeout(checkInView, 50);

    // 2. IntersectionObserver with generous margins for mobile touch scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01, rootMargin: '60px 0px 60px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // 3. Fallback mobile touchmove & scroll listeners
    window.addEventListener('scroll', checkInView, { passive: true });
    window.addEventListener('touchmove', checkInView, { passive: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('touchmove', checkInView);
    };
  }, [isVisible]);

  let transformStyles = '';
  switch (animation) {
    case 'fade-up':
      transformStyles = isVisible 
        ? 'opacity-100 translate-y-0 blur-0' 
        : 'opacity-0 translate-y-8 blur-[1px]';
      break;
    case 'scale-in':
      transformStyles = isVisible 
        ? 'opacity-100 scale-100 blur-0' 
        : 'opacity-0 scale-[0.96] blur-[1px]';
      break;
    case 'slide-left':
      transformStyles = isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-8';
      break;
    case 'slide-right':
      transformStyles = isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 -translate-x-8';
      break;
  }

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: `${delayMs}ms`,
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
      }}
      className={`transition-all will-change-transform ${transformStyles} ${className}`}
    >
      {children}
    </div>
  );
};
