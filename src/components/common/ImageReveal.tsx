import React, { useEffect, useRef, useState } from 'react';

interface ImageRevealProps {
  src: string;
  alt: string;
  delayMs?: number;
  className?: string;
  aspectRatio?: string;
  parallax?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  delayMs = 0,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  parallax = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkInView = () => {
      if (!containerRef.current || isVisible) return;
      const rect = containerRef.current.getBoundingClientRect();
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

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate normalized offset from center of viewport
        const centerOffset = (rect.top + rect.height / 2) - windowHeight / 2;
        setOffsetY(centerOffset * 0.08);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [parallax]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative bg-neutral-900 rounded-[4px] ${aspectRatio} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          transform: `${isVisible ? 'scale(1.0)' : 'scale(1.25)'} translateY(${offsetY}px)`,
          transitionDelay: `${delayMs}ms`,
          transitionDuration: '1300ms',
          transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}
        className={`w-full h-full object-cover object-center transition-all will-change-transform ${
          isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        }`}
      />
      {/* Subtle athletic contrast vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
