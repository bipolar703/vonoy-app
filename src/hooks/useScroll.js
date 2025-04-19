// @ts-check
/**
 * @typedef {import('./useScroll.d').UseScrollOptions} UseScrollOptions
 * @typedef {import('./useScroll.d').UseScrollResult} UseScrollResult
 */
import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for tracking scroll position and direction
 *
 * @param {Object} [options] - Configuration options
 * @param {number} [options.threshold=50] - Minimum scroll difference to trigger direction change
 * @param {number} [options.throttleMs=100] - Throttle time in milliseconds
 * @returns {Object} - Scroll information
 */
const useScroll = ({ threshold = 50, throttleMs = 100 } = {}) => {
  const [scrollInfo, setScrollInfo] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    direction: {
      x: null, // 'left', 'right', or null
      y: null, // 'up', 'down', or null
    },
    isAtTop: true,
    isAtBottom: false,
    isScrolling: false,
  });

  // Throttle function to limit the rate of scroll event handling
  const throttle = useCallback((callback, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  }, []);

  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;

    let scrollTimeout;

    // Function to update scroll state
    const updateScrollInfo = throttle(() => {
      const x = window.scrollX;
      const y = window.scrollY;
      const { lastX, lastY } = scrollInfo;

      // Determine scroll direction with threshold
      const directionX =
        x === lastX
          ? scrollInfo.direction.x
          : x > lastX + threshold
            ? 'right'
            : x < lastX - threshold
              ? 'left'
              : scrollInfo.direction.x;

      const directionY =
        y === lastY
          ? scrollInfo.direction.y
          : y > lastY + threshold
            ? 'down'
            : y < lastY - threshold
              ? 'up'
              : scrollInfo.direction.y;

      // Check if at top or bottom
      const isAtTop = y <= 0;
      const isAtBottom = window.innerHeight + y >= document.body.offsetHeight - 5;

      // Set scrolling state
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollInfo((prev) => ({ ...prev, isScrolling: false }));
      }, 150);

      setScrollInfo({
        x,
        y,
        lastX: x,
        lastY: y,
        direction: {
          x: directionX,
          y: directionY,
        },
        isAtTop,
        isAtBottom,
        isScrolling: true,
      });
    }, throttleMs);

    // Initial update
    updateScrollInfo();

    // Add event listener
    window.addEventListener('scroll', updateScrollInfo, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', updateScrollInfo);
      clearTimeout(scrollTimeout);
    };
  }, [
    scrollInfo.lastX,
    scrollInfo.lastY,
    scrollInfo.direction.x,
    scrollInfo.direction.y,
    threshold,
    throttleMs,
    throttle,
  ]);

  /**
   * Scroll to a specific position
   *
   * @param {Object} options - Scroll options
   * @param {number} [options.top] - Y position to scroll to
   * @param {number} [options.left] - X position to scroll to
   * @param {ScrollBehavior} [options.behavior='smooth'] - Scroll behavior
   */
  const scrollTo = useCallback(({ top, left, behavior = 'smooth' } = {}) => {
    /** @type {ScrollToOptions} */
    const opts = {};
    if (typeof top === 'number') opts.top = top;
    if (typeof left === 'number') opts.left = left;
    opts.behavior = behavior;
    window.scrollTo(opts);
  }, []);

  /**
   * Scroll to top of the page
   *
   * @param {ScrollBehavior} [behavior='smooth'] - Scroll behavior
   */
  const scrollToTop = useCallback(
    (behavior = 'smooth') => {
      scrollTo({ top: 0, behavior });
    },
    [scrollTo]
  );

  /**
   * Scroll to bottom of the page
   *
   * @param {ScrollBehavior} [behavior='smooth'] - Scroll behavior
   */
  const scrollToBottom = useCallback(
    (behavior = 'smooth') => {
      scrollTo({ top: document.body.scrollHeight, behavior });
    },
    [scrollTo]
  );

  /**
   * Scroll to an element
   *
   * @param {string|Element} element - Element or selector to scroll to
   * @param {Object} [options] - Scroll options
   * @param {ScrollBehavior} [options.behavior='smooth'] - Scroll behavior
   * @param {number} [options.offset=0] - Offset from the element
   */
  const scrollToElement = useCallback(
    (element, { behavior = 'smooth', offset = 0 } = {}) => {
      const targetElement = typeof element === 'string' ? document.querySelector(element) : element;

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const top = rect.top + window.pageYOffset + offset;
        scrollTo({ top, behavior });
      }
    },
    [scrollTo]
  );

  return {
    ...scrollInfo,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
  };
};

export default useScroll;
