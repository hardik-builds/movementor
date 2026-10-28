import React, { useEffect, useRef, useState } from 'react';

interface ApproachLinerProps {
  delayMs?: number;
  className?: string;
  color?: string;
}

export const ApproachLiner: React.FC<ApproachLinerProps> = ({
  delayMs = 100,
  className = '',
  color = 'bg-[#ddca24]'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkInView = () => {
      if (!lineRef.current || isVisible) return;
      const rect = lineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 60 && rect.bottom >= -60) {
        setIsVisible(true);
      }
    };

    checkInView();
    const timer = setTimeout(checkInView, 50);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01, rootMargin: '60px 0px 60px 0px' }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
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
    <div className={`w-full overflow-hidden h-[2px] bg-neutral-200 relative my-4 ${className}`}>
      <div
        ref={lineRef}
        style={{
          transformOrigin: 'left',
          transitionDelay: `${delayMs}ms`,
          transitionDuration: '1400ms',
          transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}
        className={`absolute inset-0 ${color} transform transition-transform ${
          isVisible ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </div>
  );
};
