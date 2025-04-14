/**
 * Motion Animation System
 *
 * A unified animation system using Framer Motion for React components.
 * Provides a consistent API for animations throughout the application.
 */

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { variants } from './motionUtils';

// Types
export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface UseAnimationOptions {
  animation?: string;
  duration?: number;
  delay?: number;
  timing?: string;
  infinite?: boolean;
  autoPlay?: boolean;
  observeIntersection?: boolean;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

export interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  triggerOnce?: boolean;
}

/**
 * Custom hook for using CSS animations
 * @param options - Animation options
 * @returns Animation controls and ref
 */
export const useAnimation = ({
  animation = 'fadeIn',
  duration = 300,
  delay = 0,
  timing = 'ease',
  infinite = false,
  autoPlay = true,
  observeIntersection = false,
  rootMargin = '0px',
  threshold = 0.1,
  once = true
}: UseAnimationOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay && !observeIntersection);
  const [hasPlayed, setHasPlayed] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  
  // Use Framer Motion's useInView for intersection detection
  const isInView = useInView(elementRef, {
    once,
    margin: rootMargin,
    amount: threshold
  });

  // Play animation when in view if observeIntersection is true
  useEffect(() => {
    if (observeIntersection && isInView && !hasPlayed) {
      setIsPlaying(true);
      setHasPlayed(true);
    }
  }, [isInView, observeIntersection, hasPlayed]);

  // Get animation style
  const getAnimationStyle = () => {
    if (!isPlaying) return {};

    return {
      animation: `${animation} ${duration}ms ${timing} ${delay}ms ${infinite ? 'infinite' : 'forwards'}`,
      visibility: 'visible'
    };
  };

  // Animation controls
  const play = () => {
    setIsPlaying(true);
    setHasPlayed(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    setHasPlayed(false);
  };

  return {
    ref: elementRef,
    style: getAnimationStyle(),
    isPlaying,
    hasPlayed,
    isInView,
    play,
    pause,
    reset
  };
};

/**
 * Custom hook for detecting when an element is in the viewport
 * @param options - Intersection observer options
 * @returns Ref and inView state
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  triggerOnce = true
}: UseIntersectionOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: triggerOnce || once,
    margin: rootMargin,
    amount: threshold
  });

  return { ref, isInView };
};

// Export all variants from motionUtils
export { variants };

// Default export for convenience
export default {
  useAnimation,
  useIntersectionObserver,
  variants
};
