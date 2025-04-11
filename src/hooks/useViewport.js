import { useState, useEffect } from 'react';

/**
 * Breakpoint definitions
 */
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Custom hook for responsive design
 * Tracks viewport size and provides helper methods for responsive design
 * 
 * @returns {Object} - Viewport information and helper methods
 */
const useViewport = () => {
  // Initialize with default values
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: 'md',
  });

  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;

    // Function to update viewport state
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine current breakpoint
      let currentBreakpoint = 'sm';
      if (width >= breakpoints['2xl']) currentBreakpoint = '2xl';
      else if (width >= breakpoints.xl) currentBreakpoint = 'xl';
      else if (width >= breakpoints.lg) currentBreakpoint = 'lg';
      else if (width >= breakpoints.md) currentBreakpoint = 'md';
      
      setViewport({
        width,
        height,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        breakpoint: currentBreakpoint,
      });
    };

    // Initial update
    updateViewport();

    // Add event listener
    window.addEventListener('resize', updateViewport);

    // Clean up
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  /**
   * Check if viewport is at least the specified breakpoint
   * 
   * @param {string} breakpoint - Breakpoint to check (sm, md, lg, xl, 2xl)
   * @returns {boolean} - True if viewport is at least the specified breakpoint
   */
  const isMin = (breakpoint) => {
    if (!breakpoints[breakpoint]) {
      console.warn(`Unknown breakpoint: ${breakpoint}`);
      return false;
    }
    return viewport.width >= breakpoints[breakpoint];
  };

  /**
   * Check if viewport is at most the specified breakpoint
   * 
   * @param {string} breakpoint - Breakpoint to check (sm, md, lg, xl, 2xl)
   * @returns {boolean} - True if viewport is at most the specified breakpoint
   */
  const isMax = (breakpoint) => {
    if (!breakpoints[breakpoint]) {
      console.warn(`Unknown breakpoint: ${breakpoint}`);
      return false;
    }
    return viewport.width < breakpoints[breakpoint];
  };

  /**
   * Check if viewport is between the specified breakpoints
   * 
   * @param {string} minBreakpoint - Minimum breakpoint (inclusive)
   * @param {string} maxBreakpoint - Maximum breakpoint (exclusive)
   * @returns {boolean} - True if viewport is between the specified breakpoints
   */
  const isBetween = (minBreakpoint, maxBreakpoint) => {
    return isMin(minBreakpoint) && isMax(maxBreakpoint);
  };

  return {
    ...viewport,
    breakpoints,
    isMin,
    isMax,
    isBetween,
  };
};

export default useViewport;
