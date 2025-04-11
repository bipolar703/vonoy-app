import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing animations
 * 
 * @param {Object} options - Animation options
 * @param {string} [options.animation='fadeIn'] - Animation name
 * @param {number} [options.duration=300] - Animation duration in ms
 * @param {number} [options.delay=0] - Animation delay in ms
 * @param {string} [options.timing='ease'] - Animation timing function
 * @param {boolean} [options.infinite=false] - Whether the animation should loop
 * @param {boolean} [options.autoPlay=true] - Whether to play the animation automatically
 * @param {boolean} [options.observeIntersection=false] - Whether to play animation when element enters viewport
 * @param {string} [options.rootMargin='0px'] - Root margin for IntersectionObserver
 * @param {number} [options.threshold=0.1] - Threshold for IntersectionObserver
 * @returns {Object} - Animation controls and ref
 */
const useAnimation = ({
  animation = 'fadeIn',
  duration = 300,
  delay = 0,
  timing = 'ease',
  infinite = false,
  autoPlay = true,
  observeIntersection = false,
  rootMargin = '0px',
  threshold = 0.1,
} = {}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay && !observeIntersection);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

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

    const handleIntersection = (entries) => {
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

export default useAnimation;
