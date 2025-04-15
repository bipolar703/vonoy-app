import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    dots?: any;
    logo?: any;
    progress?: any;
    glow?: any;
    maskGlow?: any;
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

  // Clean up animations safely - no longer needed with Framer Motion
  const cleanupAnimations = () => {
    // Framer Motion handles cleanup automatically
  };

  // Start loading animation with Framer Motion
  const startLoading = useCallback(() => {
    // Show loading and set random text
    setIsVisible(true);
    setLoadingText(getRandomLoadingText());

    // Generate random loading time between 1.5 and 2 seconds
    const loadingTime = getRandomLoadingTime(1.5, 2);

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
      setIsVisible(false);
      setPrevLocation(location.pathname);
      isPageNavigation.current = false;
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="page-transition-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="page-transition-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="enhanced-loader"
              animate={{
                boxShadow: ['0 0 20px rgba(42, 157, 143, 0.3)', '0 0 40px rgba(42, 157, 143, 0.6)', '0 0 20px rgba(42, 157, 143, 0.3)'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img src="/favicon.svg" alt="Loading" />
            </motion.div>
            <motion.p
              className="mt-4 text-white/80 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {loadingText}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
