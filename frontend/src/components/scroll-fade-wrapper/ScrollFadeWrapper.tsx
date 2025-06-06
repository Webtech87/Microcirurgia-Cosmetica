// frontend/src/components/scroll-fade-wrapper/ScrollFadeWrapper.tsx
import React, { useEffect, useRef, useState } from 'react';
import './ScrollFadeWrapper.css';

interface ScrollFadeWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
  animateOnce?: boolean; // New prop to control if animation should happen only once
  id?: string;
}

const ScrollFadeWrapper: React.FC<ScrollFadeWrapperProps> = ({
  children,
  delay = 0,
  duration = 800,
  threshold = 0.2, // Increased threshold for better bidirectional control
  direction = 'up',
  className = '',
  animateOnce = false, // Default to false for bidirectional animations
  id
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    if (animateOnce && currentElement) {
      // Force visibility on first mount for full-page route views
      setIsVisible(true);
      setHasAnimated(true);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Clear any pending timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          if (entry.isIntersecting) {
            // Element is coming into view
            if (!animateOnce || !hasAnimated) {
              timeoutRef.current = setTimeout(() => {
                setIsVisible(true);
                if (animateOnce) {
                  setHasAnimated(true);
                }
              }, delay);
            }
          } else {
            // Element is going out of view
            if (!animateOnce) {
              // Only animate out if not set to animate once
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '20px 0px -20px 0px' // Adjusted for better bidirectional detection
      }
    );
    
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, threshold, hasAnimated, animateOnce]);

  return (
    <div
      ref={elementRef}
      id={id}
      className={`scroll-fade-wrapper ${className} scroll-fade-wrapper--${direction} ${
        isVisible ? 'scroll-fade-wrapper--visible' : ''
      }`}
      style={{
        '--animation-duration': `${duration}ms`,
        '--animation-delay': `${delay}ms`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default ScrollFadeWrapper;