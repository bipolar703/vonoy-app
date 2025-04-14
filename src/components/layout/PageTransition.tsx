import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import anime from 'animejs';
import OptimizedImage from '../ui/OptimizedImage';

/**
 * Generate a random loading time between min and max seconds
 * @param {number} min - Minimum time in seconds
 * @param {number} max - Maximum time in seconds
 * @returns {number} - Random time in milliseconds
 */
const getRandomLoadingTime = (min: number, max: number): number => {
  // Use a more precise random calculation with decimal points
  return (Math.random() * (max - min) + min) * 1000;
};

/**
 * Get a random loading text from the available options
 * @returns {string} - Random loading text
 */
const getRandomLoadingText = (): string => {
  const loadingTexts = ['Initializing...', 'Loading...'];
  const randomIndex = Math.floor(Math.random() * loadingTexts.length);
  return loadingTexts[randomIndex];
};

/**
 * PageTransition Component
 *
 * Provides a smooth transition between routes with a loading animation
 * featuring the logo and animated dots.
 *
 * Uses Anime.js with Web Animation API considerations for optimal performance.
 */
const PageTransition: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [prevLocation, setPrevLocation] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(getRandomLoadingText());
  const animationsRef = useRef<{
    dots?: anime.AnimeInstance;
    logo?: anime.AnimeInstance;
    progress?: anime.AnimeInstance;
    glow?: anime.AnimeInstance;
    maskGlow?: anime.AnimeInstance;
  }>({});

  // Get navigation type (POP, PUSH, REPLACE)
  const navigationType = useNavigationType();

  // Track if this is a page navigation or initial load
  const isPageNavigation = useRef(false);

  // Performance optimization: Use requestIdleCallback for non-critical tasks
  const scheduleIdleTask = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      return window.requestIdleCallback(callback);
    } else {
      return setTimeout(callback, 1);
    }
  };

  // Clean up animations safely
  const cleanupAnimations = () => {
    if (animationsRef.current.dots) {
      animationsRef.current.dots.pause();
    }
    if (animationsRef.current.logo) {
      animationsRef.current.logo.pause();
    }
    if (animationsRef.current.progress) {
      animationsRef.current.progress.pause();
    }
    if (animationsRef.current.glow) {
      animationsRef.current.glow.pause();
    }
    if (animationsRef.current.maskGlow) {
      animationsRef.current.maskGlow.pause();
    }
  };

  // Start loading animation
  const startLoading = useCallback(() => {
    // Show loading and set random text
    setIsVisible(true);
    setLoadingText(getRandomLoadingText());

    // Generate random loading time between 1.5 and 2 seconds
    const loadingTime = getRandomLoadingTime(1.5, 2);

    // Animate the enhanced loader glow effects
    animationsRef.current.glow = anime({
      targets: '.enhanced-loader::before',
      opacity: [0.3, 0.6, 0.3],
      scale: [1.1, 1.15, 1.1],
      easing: 'easeInOutSine',
      duration: 2500,
      loop: true
    });

    // Animate the SVG mask glow
    animationsRef.current.maskGlow = anime({
      targets: '.enhanced-loader::after',
      opacity: [0.2, 0.5, 0.2],
      easing: 'easeInOutSine',
      duration: 2500,
      loop: true
    });

    // Preload resources during the loading time
    scheduleIdleTask(() => {
      // Preload critical resources for the next page
      const linkPrefetch = document.createElement('link');
      linkPrefetch.rel = 'prefetch';
      linkPrefetch.href = location.pathname;
      document.head.appendChild(linkPrefetch);
    });

    // Hide transition after the loading time
    const timer = setTimeout(() => {
      // Fade out animation with improved transition
      anime({
        targets: '.page-transition-loader',
        opacity: [1, 0],
        duration: 600,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)', // Improved easing for smoother transition
        begin: () => {
          // Fade out the content first for a smoother transition
          anime({
            targets: '.page-transition-content',
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 400,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
          });
        },
        complete: () => {
          setIsVisible(false);
          cleanupAnimations();
          setPrevLocation(location.pathname);
          isPageNavigation.current = false;
        }
      });
    }, loadingTime);

    return timer;
  }, [location.pathname]);

  // Handle initial page load
  useEffect(() => {
    if (prevLocation === '') {
      const timer = startLoading();
      return () => {
        clearTimeout(timer);
        cleanupAnimations();
      };
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    // Skip the first render (initial load is handled separately)
    if (prevLocation === '') return;

    // Only show loading for actual navigation (not back/forward)
    if (prevLocation !== location.pathname) {
      isPageNavigation.current = true;
      const timer = startLoading();
      return () => {
        clearTimeout(timer);
        cleanupAnimations();
      };
    }
  }, [location.pathname, prevLocation, startLoading]);

  return (
    <div className={`page-transition-loader ${isVisible ? '' : 'hidden'}`}>
      <div className="page-transition-content">
        <div className="enhanced-loader">
          <img src="/favicon.svg" alt="Loading" />
        </div>
        <p className="mt-4 text-white/80 text-sm font-medium">{loadingText}</p>
      </div>
    </div>
  );
};

export default PageTransition;
