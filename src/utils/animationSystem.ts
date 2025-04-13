/**
 * Unified Animation System
 *
 * Combines the TypeScript animation utilities with React hook-based animations.
 * Provides a consistent API for both imperative and declarative animation approaches.
 * Ensures proper cleanup for all animations to prevent memory leaks.
 *
 * @module utils/animationSystem
 */

import anime, { AnimeInstance, AnimeParams } from 'animejs';
import { useCallback, useEffect, useRef, useState } from 'react';

// ======================================================
// Types
// ======================================================

export type AnimationTarget = string | HTMLElement | NodeListOf<HTMLElement> | SVGElement | NodeListOf<SVGElement>;

export interface AnimationOptions {
  duration?: number;
  delay?: number | ((el: HTMLElement, i: number, l: number) => number);
  easing?: string;
  loop?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate';
  autoplay?: boolean;
}

export interface AnimationHookOptions {
  animation?: string;
  duration?: number;
  delay?: number;
  timing?: string;
  infinite?: boolean;
  autoPlay?: boolean;
  observeIntersection?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export interface AnimationControls {
  play: () => void;
  pause: () => void;
  restart: () => void;
  seek: (time: number) => void;
  reverse: () => void;
  complete: () => void;
  remove: () => void;
}

// ======================================================
// Utility Functions
// ======================================================

/**
 * Safely apply will-change property to elements for better performance
 * @param element - Target element or elements
 * @param properties - CSS properties that will change
 */
const applyWillChange = (
  element: AnimationTarget,
  properties: string = 'transform, opacity'
): void => {
  if (typeof element === 'string') return;

  try {
    const targets = element instanceof HTMLElement || element instanceof SVGElement
      ? [element]
      : (element && typeof element[Symbol.iterator] === 'function')
        ? Array.from(element)
        : [];

    targets.forEach(el => {
      if (el && el instanceof HTMLElement && el.style) {
        el.style.willChange = properties;
        el.style.backfaceVisibility = 'hidden'; // Prevent flickering
      }
    });
  } catch (error) {
    console.warn('Animation System: Error applying will-change', error);
  }
};

/**
 * Clean up will-change property after animation completes
 * @param elements - Elements to clean up
 */
const cleanupWillChange = (elements: (HTMLElement | SVGElement)[]): void => {
  try {
    elements.forEach(el => {
      if (el instanceof HTMLElement && el.style) {
        el.style.willChange = 'auto';
      }
    });
  } catch (error) {
    console.warn('Animation System: Error cleaning up will-change', error);
  }
};

/**
 * Create a complete callback that cleans up will-change
 * @param originalCallback - Original complete callback if any
 * @returns Enhanced complete callback
 */
const createCompleteCallback = (
  originalCallback?: (anim: AnimeInstance) => void
): ((anim: AnimeInstance) => void) => {
  return (anim: AnimeInstance) => {
    try {
      // Clean up will-change after animation
      if (anim && anim.animatables) {
        const targets = anim.animatables.map(a => a.target);
        cleanupWillChange(targets as HTMLElement[]);
      }

      // Call original callback if provided
      if (originalCallback) {
        originalCallback(anim);
      }
    } catch (error) {
      console.warn('Animation System: Error in complete callback', error);
    }
  };
};

// ======================================================
// Core Animation Functions
// ======================================================

/**
 * Create an animation with proper performance optimizations and cleanup
 * @param params - Animation parameters
 * @returns Anime.js animation instance with enhanced controls
 */
export const createAnimation = (params: AnimeParams): AnimeInstance & AnimationControls => {
  // Apply will-change for better performance
  if (params.targets) {
    applyWillChange(params.targets as AnimationTarget);
  }

  // Enhance the complete callback to clean up will-change
  const enhancedParams = {
    ...params,
    complete: createCompleteCallback(params.complete as (anim: AnimeInstance) => void)
  };

  // Create the animation
  const animation = anime(enhancedParams);

  // Add enhanced controls
  const enhancedAnimation = animation as AnimeInstance & AnimationControls;
  
  // Add remove method for proper cleanup
  enhancedAnimation.remove = () => {
    try {
      if (animation.children) {
        animation.children.forEach(child => {
          if (typeof child.remove === 'function') {
            child.remove();
          }
        });
      }
      
      // Clean up will-change on targets
      if (animation.animatables) {
        const targets = animation.animatables.map(a => a.target);
        cleanupWillChange(targets as HTMLElement[]);
      }
      
      // Remove the animation
      animation.pause();
      animation.reset();
    } catch (error) {
      console.warn('Animation System: Error removing animation', error);
    }
  };

  return enhancedAnimation;
};

/**
 * Fade in element with a slight upward movement
 * @param element - Target element or selector
 * @param options - Animation options
 * @returns Enhanced animation instance
 */
export const fadeInUp = (
  element: AnimationTarget,
  options: AnimationOptions = {}
): AnimeInstance & AnimationControls => {
  const {
    duration = 800,
    delay = 0,
    easing = 'cubicBezier(0.25, 0.1, 0.25, 1)',
    autoplay = true
  } = options;

  // Safety check for null or undefined elements
  if (!element) {
    console.warn('fadeInUp: Element is null or undefined');
    return createAnimation({ targets: [] });
  }

  return createAnimation({
    targets: element,
    opacity: [0, 1],
    translateY: [20, 0],
    easing,
    duration,
    delay: typeof delay === 'function' ? delay : anime.stagger(100, { start: delay as number }),
    autoplay
  });
};

/**
 * Reveal content when scrolled into view
 * @param element - Target element or selector
 * @param threshold - Percentage of element visible before triggering
 * @param options - Animation options
 * @returns IntersectionObserver instance with disconnect method
 */
export const scrollReveal = (
  element: AnimationTarget,
  threshold = 0.1,
  options: AnimationOptions = {}
): { disconnect: () => void } => {
  const {
    duration = 800,
    easing = 'cubicBezier(0.25, 0.1, 0.25, 1)'
  } = options;

  const targets = typeof element === 'string'
    ? document.querySelectorAll(element)
    : element instanceof HTMLElement || element instanceof SVGElement
      ? [element]
      : element;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          createAnimation({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [20, 0],
            easing,
            duration,
            delay: anime.stagger(100)
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  Array.from(targets as NodeListOf<Element>).forEach((target) => {
    if (target instanceof HTMLElement) {
      target.style.opacity = '0';
      observer.observe(target);
    }
  });

  return observer;
};

/**
 * Create a staggered animation for multiple elements
 * @param element - Target elements or selector
 * @param properties - Animation properties
 * @param options - Animation options
 * @returns Enhanced animation instance
 */
export const staggerAnimation = (
  element: AnimationTarget,
  properties: Record<string, any>,
  options: AnimationOptions = {}
): AnimeInstance & AnimationControls => {
  const {
    duration = 500,
    delay = 50,
    easing = 'cubicBezier(0.25, 0.1, 0.25, 1)',
    autoplay = true
  } = options;

  return createAnimation({
    targets: element,
    ...properties,
    delay: typeof delay === 'number' ? anime.stagger(delay) : delay,
    easing,
    duration,
    autoplay
  });
};

/**
 * Create a timeline animation
 * @param animations - Array of animation configurations
 * @param options - Timeline options
 * @returns Enhanced timeline instance
 */
export const createTimeline = (
  animations: Array<{
    targets: AnimationTarget;
    properties: Record<string, any>;
    offset?: string | number;
  }>,
  options: AnimationOptions = {}
): AnimeInstance & AnimationControls => {
  const {
    duration = 500,
    easing = 'cubicBezier(0.25, 0.1, 0.25, 1)',
    autoplay = true
  } = options;

  const timeline = anime.timeline({
    easing,
    duration,
    autoplay
  });

  animations.forEach((animation) => {
    // Apply will-change for better performance
    applyWillChange(animation.targets);

    timeline.add({
      targets: animation.targets,
      ...animation.properties,
      offset: animation.offset,
    });
  });

  // Add cleanup function
  const enhancedTimeline = timeline as AnimeInstance & AnimationControls;
  
  const originalComplete = timeline.complete;
  timeline.complete = function() {
    // Clean up will-change on all targets
    animations.forEach(animation => {
      if (typeof animation.targets !== 'string') {
        const targets = animation.targets instanceof HTMLElement || animation.targets instanceof SVGElement
          ? [animation.targets]
          : Array.from(animation.targets as NodeListOf<Element>);
          
        cleanupWillChange(targets as HTMLElement[]);
      }
    });
    
    if (originalComplete) {
      originalComplete.call(this);
    }
  };
  
  enhancedTimeline.remove = () => {
    try {
      // Clean up will-change on all targets
      animations.forEach(animation => {
        if (typeof animation.targets !== 'string') {
          const targets = animation.targets instanceof HTMLElement || animation.targets instanceof SVGElement
            ? [animation.targets]
            : Array.from(animation.targets as NodeListOf<Element>);
            
          cleanupWillChange(targets as HTMLElement[]);
        }
      });
      
      // Remove the timeline
      timeline.pause();
      timeline.reset();
    } catch (error) {
      console.warn('Animation System: Error removing timeline', error);
    }
  };

  return enhancedTimeline;
};

// ======================================================
// React Hooks
// ======================================================

/**
 * Custom hook for managing CSS animations
 * @param options - Animation hook options
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
}: AnimationHookOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay && !observeIntersection);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate animation style
  const getAnimationStyle = useCallback(() => {
    if (!isPlaying) return {};

    return {
      animation: `${animation} ${duration}ms ${timing} ${delay}ms ${infinite ? 'infinite' : 'forwards'}`,
      WebkitAnimation: `${animation} ${duration}ms ${timing} ${delay}ms ${infinite ? 'infinite' : 'forwards'}`,
    };
  }, [animation, duration, delay, timing, infinite, isPlaying]);

  // Play animation
  const play = useCallback(() => {
    setIsPlaying(true);
    setHasPlayed(true);
  }, []);

  // Pause animation
  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Reset animation
  const reset = useCallback(() => {
    setIsPlaying(false);
    setHasPlayed(false);
    
    // Small delay to ensure the animation is reset
    setTimeout(() => {
      if (autoPlay) {
        setIsPlaying(true);
      }
    }, 10);
  }, [autoPlay]);

  // Set up intersection observer
  useEffect(() => {
    if (!observeIntersection || !elementRef.current) return;

    const options = {
      root: null,
      rootMargin,
      threshold,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && !hasPlayed) {
          play();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [observeIntersection, rootMargin, threshold, hasPlayed, play]);

  return {
    ref: elementRef,
    style: getAnimationStyle(),
    isPlaying,
    hasPlayed,
    isVisible,
    play,
    pause,
    reset,
  };
};

/**
 * Custom hook for using Anime.js animations in React components
 * @param params - Animation parameters
 * @param dependencies - Dependencies array for when to recreate the animation
 * @returns Animation instance and controls
 */
export const useAnimeAnimation = (
  params: AnimeParams,
  dependencies: any[] = []
): { animation: AnimeInstance & AnimationControls | null } & AnimationControls => {
  const animationRef = useRef<AnimeInstance & AnimationControls | null>(null);

  // Create or update animation when dependencies change
  useEffect(() => {
    // Clean up previous animation if it exists
    if (animationRef.current) {
      animationRef.current.remove();
    }

    // Create new animation
    animationRef.current = createAnimation({
      ...params,
      autoplay: false // Don't autoplay initially
    });

    // Return cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.remove();
        animationRef.current = null;
      }
    };
  }, dependencies);

  // Animation controls
  const play = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  }, []);

  const restart = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.restart();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (animationRef.current) {
      animationRef.current.seek(time);
    }
  }, []);

  const reverse = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.reverse();
    }
  }, []);

  const complete = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.complete();
    }
  }, []);

  const remove = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.remove();
      animationRef.current = null;
    }
  }, []);

  return {
    animation: animationRef.current,
    play,
    pause,
    restart,
    seek,
    reverse,
    complete,
    remove
  };
};

/**
 * Custom hook for creating an intersection observer
 * @param options - IntersectionObserver options
 * @returns Ref and intersection state
 */
export const useIntersectionObserver = (
  options: {
    threshold?: number;
    rootMargin?: string;
    root?: Element | null;
    once?: boolean;
  } = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', root = null, once = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        // If once is true and element is intersecting, unobserve it
        if (once && isElementIntersecting && observerRef.current) {
          observerRef.current.unobserve(element);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, root, once]);

  return { ref: elementRef, isIntersecting };
};

// Export all animation functions from the original animations.ts
export {
  hoverAnimation,
  morphPath,
  typeText,
  parallaxScroll,
  pulseAnimation,
  waveAnimation,
  countUp,
  glassEffect
} from './animations';

// Default export for convenience
export default {
  createAnimation,
  fadeInUp,
  scrollReveal,
  staggerAnimation,
  createTimeline,
  useAnimation,
  useAnimeAnimation,
  useIntersectionObserver
};
