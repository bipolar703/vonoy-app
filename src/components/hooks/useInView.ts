import { useState, useEffect, RefObject } from 'react';

interface InViewOptions {
  /**
   * The threshold value between 0 and 1 that indicates what percentage 
   * of the element should be visible before triggering
   */
  threshold?: number;
  
  /**
   * Root margin value similar to CSS margin, e.g., "10px 20px 30px 40px"
   */
  rootMargin?: string;
  
  /**
   * Whether the observer should only trigger once
   */
  once?: boolean;
}

/**
 * Custom hook that tracks whether an element is in the viewport
 * using the Intersection Observer API for better performance.
 * 
 * @param elementRef - React ref object for the element to observe
 * @param options - Configuration options for the Intersection Observer
 * @returns boolean indicating if the element is in view
 */
export function useInView(
  elementRef: RefObject<Element>,
  options: InViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);
  
  const { threshold = 0, rootMargin = '0px', once = false } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip if already in view and once is true
    if (isInView && once) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementInView = entry.isIntersecting;
        
        // Update state only if needed
        if (isElementInView !== isInView) {
          setIsInView(isElementInView);
          
          // Unobserve after first detection if once is true
          if (isElementInView && once && element) {
            observer.unobserve(element);
          }
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, rootMargin, once, isInView]);
  
  return isInView;
}
