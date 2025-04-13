/**
 * Animation Utilities
 *
 * A collection of reusable animation functions using Anime.js 4.
 * Implements modern animation techniques for a more interactive UI.
 * Optimized for performance with will-change hints and GPU acceleration.
 *
 * @module utils/animations
 */

import anime from 'animejs';

/**
 * Fade in element with a slight upward movement
 *
 * @param element - Target element or selector
 * @param delay - Delay before animation starts (ms)
 * @param duration - Animation duration (ms)
 * @returns Anime.js animation instance
 *
 * @example
 * // Fade in a single element
 * fadeInUp(document.querySelector('.hero-title'), 300, 800);
 *
 * // Fade in multiple elements with staggered delay
 * fadeInUp(document.querySelectorAll('.card'), 0, 800);
 */
export const fadeInUp = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  delay = 0,
  duration = 800
) => {
  // Safety check for null or undefined elements
  if (!element) {
    console.warn('fadeInUp: Element is null or undefined');
    return anime();
  }

  // Apply will-change for better performance
  if (typeof element !== 'string') {
    try {
      // Safely handle potential null or non-iterable elements
      const targets = element instanceof HTMLElement ?
        [element] :
        (element && typeof element[Symbol.iterator] === 'function') ?
          Array.from(element) :
          [];

      targets.forEach(el => {
        if (el && el.style) {
          el.style.willChange = 'transform, opacity';
          el.style.backfaceVisibility = 'hidden'; // Prevent flickering
        }
      });
    } catch (error) {
      console.warn('fadeInUp: Error applying styles', error);
    }
  }

  return anime({
    targets: element,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
    duration,
    delay: typeof delay === 'function' ? delay : anime.stagger(100, { start: delay }),
    complete: (anim) => {
      try {
        // Clean up will-change after animation
        if (anim && anim.animatables) {
          const targets = anim.animatables.map(a => a.target);
          targets.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.willChange = 'auto';
            }
          });
        }
      } catch (error) {
        console.warn('fadeInUp: Error in complete callback', error);
      }
    }
  });
};

/**
 * Reveal content when scrolled into view
 * @param element - Target element or selector
 * @param threshold - Percentage of element visible before triggering
 */
export const scrollReveal = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  threshold = 0.1
) => {
  const targets = typeof element === 'string'
    ? document.querySelectorAll(element)
    : element instanceof HTMLElement
      ? [element]
      : element;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
            duration: 800,
            delay: anime.stagger(100),
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  Array.from(targets).forEach((target) => {
    target.style.opacity = '0';
    observer.observe(target);
  });

  return observer;
};

/**
 * Create a staggered animation for multiple elements
 * @param element - Target elements or selector
 * @param properties - Animation properties
 * @param staggerDelay - Delay between each element animation
 */
export const staggerAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  properties: Record<string, any>,
  staggerDelay = 50
) => {
  return anime({
    targets: element,
    ...properties,
    delay: anime.stagger(staggerDelay),
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
  });
};

/**
 * Create a hover animation
 * @param element - Target element or selector
 * @param enterProps - Animation properties on mouse enter
 * @param leaveProps - Animation properties on mouse leave
 */
export const hoverAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  enterProps: Record<string, any>,
  leaveProps: Record<string, any>
) => {
  const targets = typeof element === 'string'
    ? document.querySelectorAll(element)
    : element instanceof HTMLElement
      ? [element]
      : element;

  Array.from(targets).forEach((target) => {
    target.addEventListener('mouseenter', () => {
      anime({
        targets: target,
        ...enterProps,
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
        duration: 300,
      });
    });

    target.addEventListener('mouseleave', () => {
      anime({
        targets: target,
        ...leaveProps,
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
        duration: 300,
      });
    });
  });
};

/**
 * Create a morphing animation between two paths
 * @param element - Target SVG path element or selector
 * @param startPath - Starting path data
 * @param endPath - Ending path data
 * @param duration - Animation duration (ms)
 */
export const morphPath = (
  element: string | SVGPathElement,
  startPath: string,
  endPath: string,
  duration = 1000
) => {
  return anime({
    targets: element,
    d: [
      { value: startPath },
      { value: endPath },
    ],
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
    duration,
  });
};

/**
 * Create a text typing animation with cursor effect
 *
 * @param element - Target element or selector
 * @param text - Text to type
 * @param speed - Typing speed (ms per character)
 * @param startDelay - Delay before typing starts (ms)
 * @returns Timer ID for the animation
 *
 * @example
 * // Type text in an element
 * typeText(document.querySelector('.hero-subtitle'), 'Welcome to Vonoy', 50);
 */
export const typeText = (
  element: string | HTMLElement,
  text: string,
  speed = 50,
  startDelay = 0
) => {
  const target = typeof element === 'string'
    ? document.querySelector(element)
    : element;

  if (!target) return;

  // Safety check - if target is not in the DOM, don't proceed
  if (!document.body.contains(target as Node)) {
    console.warn('typeText: Target element is not in the DOM');
    return;
  }

  // Create a span for the cursor
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  cursor.style.animation = 'blink 1s step-end infinite';

  // Add CSS for cursor blinking if not already in the document
  if (!document.querySelector('#typing-cursor-style')) {
    const style = document.createElement('style');
    style.id = 'typing-cursor-style';
    style.textContent = `
      @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
      }
      .typing-cursor {
        display: inline-block;
        margin-left: 2px;
        font-weight: normal;
      }
    `;
    document.head.appendChild(style);
  }

  // Clear the element initially
  target.textContent = '';
  target.appendChild(cursor);

  let index = 0;
  let intervalId: number | null = null;

  // Start typing after the delay
  const startTimer = setTimeout(() => {
    intervalId = window.setInterval(() => {
      // Safety check - if element was removed from DOM during animation
      if (!document.body.contains(target as Node)) {
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
        return;
      }

      if (index < text.length) {
        try {
          // Create a text node and insert before the cursor
          const char = document.createTextNode(text.charAt(index));

          // Check if cursor is still a child of target before inserting
          if (cursor.parentNode === target) {
            target.insertBefore(char, cursor);
            index++;
          } else {
            // If cursor is no longer a child, append text and stop
            target.textContent += text.charAt(index);
            index++;
            if (index >= text.length && intervalId !== null) {
              clearInterval(intervalId);
            }
          }
        } catch (error) {
          console.warn('typeText: Error during animation', error);
          // Fallback: just set the full text
          target.textContent = text;
          if (intervalId !== null) {
            clearInterval(intervalId);
          }
        }
      } else {
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
        // Remove cursor after typing is complete (optional)
        setTimeout(() => {
          if (cursor.parentNode === target) {
            cursor.remove();
          }
        }, 2000);
      }
    }, speed);

    return intervalId;
  }, startDelay);

  return startTimer;
};

/**
 * Create a parallax scrolling effect
 * @param element - Target element or selector
 * @param speed - Parallax speed (1 = normal, < 1 = slower, > 1 = faster)
 */
export const parallaxScroll = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  speed = 0.5
) => {
  const targets = typeof element === 'string'
    ? document.querySelectorAll(element)
    : element instanceof HTMLElement
      ? [element]
      : element;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    Array.from(targets).forEach((target) => {
      const offsetY = scrollY * speed;
      target.style.transform = `translateY(${offsetY}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll);

  return {
    destroy: () => window.removeEventListener('scroll', handleScroll),
  };
};

/**
 * Create a timeline animation
 * @param animations - Array of animation configurations
 */
export const createTimeline = (
  animations: Array<{
    targets: string | HTMLElement | NodeListOf<HTMLElement>;
    properties: Record<string, any>;
    offset?: string | number;
  }>
) => {
  const timeline = anime.timeline({
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
    duration: 500,
  });

  animations.forEach((animation) => {
    timeline.add({
      targets: animation.targets,
      ...animation.properties,
      offset: animation.offset,
    });
  });

  return timeline;
};

/**
 * Create a pulse animation
 * @param element - Target element or selector
 * @param scale - Scale factor
 * @param duration - Animation duration (ms)
 */
export const pulseAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  scale = 1.05,
  duration = 1000
) => {
  return anime({
    targets: element,
    scale: [1, scale, 1],
    opacity: [0.8, 1, 0.8],
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
    duration,
    loop: true,
  });
};

/**
 * Create a wave animation for multiple elements
 * @param element - Target elements or selector
 * @param property - Property to animate
 * @param from - Starting value
 * @param to - Ending value
 * @param delay - Delay between each element (ms)
 */
export const waveAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  property: string,
  from: number,
  to: number,
  delay = 100
) => {
  return anime({
    targets: element,
    [property]: [from, to, from],
    delay: anime.stagger(delay),
    loop: true,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
    duration: 1500,
  });
};

/**
 * Count up animation for numbers
 *
 * @param element - Target element or selector
 * @param start - Starting number
 * @param end - Ending number
 * @param duration - Animation duration (ms)
 * @param formatter - Function to format the number
 * @returns Anime.js animation instance
 *
 * @example
 * // Animate a counter from 0 to 1000
 * countUp(document.querySelector('.stats-number'), 0, 1000);
 */
export const countUp = (
  element: string | HTMLElement,
  start = 0,
  end: number,
  duration = 2000,
  formatter: (num: number) => string = (num) => Math.round(num).toLocaleString()
) => {
  const target = typeof element === 'string'
    ? document.querySelector(element)
    : element;

  if (!target) return;

  // Create an object to animate
  const obj = { value: start };

  // Update the element's text on each animation frame
  const update = () => {
    if (target) {
      target.textContent = formatter(obj.value);
    }
  };

  // Create and return the animation
  return anime({
    targets: obj,
    value: end,
    duration,
    easing: 'easeInOutCubic',
    round: 1, // Round to nearest integer
    update,
    autoplay: true
  });
};

/**
 * Create a glass morphism effect on hover
 *
 * @param element - Target element or selector
 * @param baseOpacity - Base opacity of the glass effect
 * @param hoverOpacity - Opacity on hover
 * @param duration - Animation duration (ms)
 *
 * @example
 * // Add glass morphism effect to cards
 * glassEffect(document.querySelectorAll('.card'), 0.2, 0.4);
 */
export const glassEffect = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  baseOpacity = 0.2,
  hoverOpacity = 0.4,
  duration = 300
) => {
  const targets = typeof element === 'string'
    ? document.querySelectorAll(element)
    : element instanceof HTMLElement
      ? [element]
      : element;

  Array.from(targets).forEach(target => {
    // Apply base glass effect styles
    target.style.backgroundColor = `rgba(255, 255, 255, ${baseOpacity})`;
    target.style.backdropFilter = 'blur(10px)';
    target.style.WebkitBackdropFilter = 'blur(10px)';
    target.style.borderRadius = '8px';
    target.style.border = '1px solid rgba(255, 255, 255, 0.18)';
    target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    target.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;

    // Add hover effect
    target.addEventListener('mouseenter', () => {
      target.style.backgroundColor = `rgba(255, 255, 255, ${hoverOpacity})`;
      target.style.transform = 'translateY(-5px)';
      target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
    });

    target.addEventListener('mouseleave', () => {
      target.style.backgroundColor = `rgba(255, 255, 255, ${baseOpacity})`;
      target.style.transform = 'translateY(0)';
      target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
  });
};

export default {
  fadeInUp,
  scrollReveal,
  staggerAnimation,
  hoverAnimation,
  morphPath,
  typeText,
  parallaxScroll,
  createTimeline,
  pulseAnimation,
  waveAnimation,
  countUp,
  glassEffect
};
