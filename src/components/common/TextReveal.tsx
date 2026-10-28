import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  delayMs = 0,
  className = '',
  as: Component = 'div'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkInView = () => {
      if (!containerRef.current || isVisible) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 50 && rect.bottom >= -50) {
        setIsVisible(true);
      }
    };

    checkInView();
    const timer = setTimeout(checkInView, 60);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01, rootMargin: '50px 0px 50px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('scroll', checkInView, { passive: true });
    window.addEventListener('touchmove', checkInView, { passive: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('touchmove', checkInView);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="overflow-hidden block w-full max-w-full pb-0.5 min-w-0">
      <Component
        style={{
          transitionDelay: `${delayMs}ms`,
          transitionDuration: '950ms',
          transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}
        className={`transform transition-all will-change-transform break-words ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
        } ${className}`}
      >
        {children}
      </Component>
    </div>
  );
};
