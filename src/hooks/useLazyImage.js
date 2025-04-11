import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lazy loading images with IntersectionObserver
 * 
 * @param {string} src - The image source URL
 * @param {string} [placeholderSrc] - Optional placeholder image to show while loading
 * @param {Object} [options] - IntersectionObserver options
 * @param {string} [options.rootMargin='200px'] - Margin around the root
 * @param {number} [options.threshold=0.1] - Threshold of intersection
 * @returns {Object} - { isLoaded, currentSrc, imageRef }
 */
const useLazyImage = (src, placeholderSrc = '', options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || '');
  const imageRef = useRef(null);

  useEffect(() => {
    // Reset state if src changes
    if (src !== currentSrc) {
      setIsLoaded(false);
      if (placeholderSrc) {
        setCurrentSrc(placeholderSrc);
      }
    }

    let observer;
    let mounted = true;

    // Create a new image to preload
    const img = new Image();

    // Handle image load
    const onLoad = () => {
      if (mounted) {
        setCurrentSrc(src);
        setIsLoaded(true);
      }
    };

    // Handle image error
    const onError = () => {
      if (mounted) {
        console.error(`Error loading image: ${src}`);
        setIsLoaded(true); // Mark as loaded even on error to prevent infinite loading state
      }
    };

    // Set up IntersectionObserver
    if (imageRef.current && !isLoaded) {
      const defaultOptions = {
        rootMargin: '200px',
        threshold: 0.1,
        ...options
      };

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // When image is visible, start loading
          if (entry.isIntersecting) {
            img.src = src;
            img.onload = onLoad;
            img.onerror = onError;
            
            // Disconnect observer after triggering load
            observer.disconnect();
          }
        });
      }, defaultOptions);

      observer.observe(imageRef.current);
    }

    // Clean up
    return () => {
      mounted = false;
      if (observer) {
        observer.disconnect();
      }
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [src, placeholderSrc, isLoaded, currentSrc, options]);

  return { isLoaded, currentSrc, imageRef };
};

export default useLazyImage;
