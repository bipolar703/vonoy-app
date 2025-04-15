import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../ui/LoadingScreen';

/**
 * PageTransition Component
 *
 * Provides a smooth transition between routes with a loading animation
 * featuring the logo and animated text.
 *
 * Uses Framer Motion for smooth animations and transitions.
 */
const PageTransition: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [prevLocation, setPrevLocation] = useState('');

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

  // Start loading animation
  const startLoading = useCallback(() => {
    // Show loading screen
    setIsVisible(true);

    // Preload resources during the loading time
    scheduleIdleTask(() => {
      // Preload critical resources for the next page
      const linkPrefetch = document.createElement('link');
      linkPrefetch.rel = 'prefetch';
      linkPrefetch.href = location.pathname;
      document.head.appendChild(linkPrefetch);
    });

    // No need to return a timer as LoadingScreen handles its own timing
    return null;
  }, [location.pathname]);

  // Handle initial page load
  useEffect(() => {
    if (prevLocation === '') {
      startLoading();
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    // Skip the first render (initial load is handled separately)
    if (prevLocation === '') return;

    // Only show loading for actual navigation (not back/forward)
    if (prevLocation !== location.pathname) {
      isPageNavigation.current = true;
      startLoading();
    }
  }, [location.pathname, prevLocation, startLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <LoadingScreen
          randomizeMessage={true}
          minLoadTime={1.75}
          maxLoadTime={2}
          onLoadComplete={() => {
            setIsVisible(false);
            setPrevLocation(location.pathname);
            isPageNavigation.current = false;
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
