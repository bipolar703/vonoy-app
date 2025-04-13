import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  const animationsRef = useRef<{
    dots?: anime.AnimeInstance;
    logo?: anime.AnimeInstance;
    progress?: anime.AnimeInstance;
  }>({});

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
  };

  useEffect(() => {
    // Set initial location on first render
    if (prevLocation === '') {
      setPrevLocation(location.pathname);
      return;
    }

    // Only show transition when location changes
    if (prevLocation !== location.pathname) {
      // Reset loading progress
      setLoadingProgress(0);

      // Show transition
      setIsVisible(true);

      // Generate random loading time between 1.75 and 4 seconds
      const loadingTime = getRandomLoadingTime(1.75, 4);

      // Animate dots using Anime.js with Web Animation API considerations
      animationsRef.current.dots = anime({
        targets: '.loading-dot',
        scale: [0.8, 1.2, 0.8],
        opacity: [0.5, 1, 0.5],
        // Using Web Animation API differences from Anime.js documentation
        // https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations
        loop: true,
        easing: 'cubicBezier(0.455, 0.03, 0.515, 0.955)', // Improved easing for smoother animation
        duration: 1500,
        delay: anime.stagger(200),
        // Use hardware acceleration for better performance
        willChange: 'opacity, transform'
      });

      // Animate logo using Anime.js
      animationsRef.current.logo = anime({
        targets: '.page-transition-logo',
        scale: [0.98, 1.02],
        opacity: [0.7, 1],
        loop: true,
        direction: 'alternate',
        easing: 'cubicBezier(0.445, 0.05, 0.55, 0.95)', // Improved easing
        duration: 2000,
        // Use hardware acceleration
        willChange: 'opacity, transform'
      });

      // Animate progress bar
      animationsRef.current.progress = anime({
        targets: '.loading-progress-bar-inner',
        width: ['0%', '100%'],
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
        duration: loadingTime,
        update: function(anim) {
          setLoadingProgress(Math.round(anim.progress));
        }
      });

      // Preload resources during the loading time
      scheduleIdleTask(() => {
        // Preload critical resources for the next page
        const linkPrefetch = document.createElement('link');
        linkPrefetch.rel = 'prefetch';
        linkPrefetch.href = location.pathname;
        document.head.appendChild(linkPrefetch);
      });

      // Hide transition after the random loading time
      const timer = setTimeout(() => {
        // Fade out animation
        anime({
          targets: '.page-transition-loader',
          opacity: [1, 0],
          duration: 400,
          easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
          complete: () => {
            setIsVisible(false);
            cleanupAnimations();
          }
        });
      }, loadingTime);

      // Update previous location
      setPrevLocation(location.pathname);

      return () => {
        clearTimeout(timer);
        cleanupAnimations();
      };
    }
  }, [location, prevLocation]);

  return (
    <div className={`page-transition-loader ${isVisible ? '' : 'hidden'}`}>
      <div className="page-transition-content">
        <OptimizedImage
          src="/logo.svg"
          alt="Vonoy"
          width={120}
          height={40}
          className="page-transition-logo"
          priority={true}
          loading="eager"
        />
        <div className="loading-dots">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>

        {/* Progress bar */}
        <div className="loading-progress">
          <div className="loading-progress-bar">
            <div className="loading-progress-bar-inner"></div>
          </div>
          <div className="loading-progress-text">{loadingProgress}%</div>
        </div>

        {/* Loading message */}
        <div className="loading-message">
          {loadingProgress < 30 && "Initializing..."}
          {loadingProgress >= 30 && loadingProgress < 60 && "Loading resources..."}
          {loadingProgress >= 60 && loadingProgress < 90 && "Optimizing performance..."}
          {loadingProgress >= 90 && "Almost ready..."}
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
