/**
 * Animation Utilities
 *
 * This file is a compatibility layer for legacy code.
 * It forwards to the modern motionAnimations.ts which uses Framer Motion.
 *
 * @module utils/animations
 * @deprecated Use motionAnimations.ts instead
 */

import motionAnimations from './motionAnimations';

// Log a deprecation warning when this file is imported
console.warn(
  'animations.ts is deprecated. Import from motionAnimations.ts instead for better performance and modern animations.'
);

/**
 * Fade in element with a slight upward movement
 * @deprecated Use motionAnimations.fadeInUp instead
 */
export const fadeInUp = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  delay = 0,
  duration = 800
) => {
  console.warn('fadeInUp: This function is deprecated. Use Framer Motion variants from motionAnimations.ts instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Reveal content when scrolled into view
 * @deprecated Use Framer Motion's useInView hook instead
 */
export const scrollReveal = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  threshold = 0.1
) => {
  console.warn('scrollReveal: This function is deprecated. Use Framer Motion\'s useInView hook instead.');
  return { disconnect: () => {} }; // Return a dummy object with a disconnect method for backward compatibility
};

/**
 * Create a staggered animation for multiple elements
 * @deprecated Use motionAnimations.staggerChildren instead
 */
export const staggerAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  properties: Record<string, any>,
  staggerDelay = 50
) => {
  console.warn('staggerAnimation: This function is deprecated. Use motionAnimations.staggerChildren instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Create a hover animation
 * @deprecated Use motionAnimations.hover instead
 */
export const hoverAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  enterProps: Record<string, any>,
  leaveProps: Record<string, any>
) => {
  console.warn('hoverAnimation: This function is deprecated. Use motionAnimations.hover instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Create a morphing animation between two paths
 * @deprecated Use motionAnimations.drawPath instead
 */
export const morphPath = (
  element: string | SVGPathElement,
  startPath: string,
  endPath: string,
  duration = 1000
) => {
  console.warn('morphPath: This function is deprecated. Use motionAnimations.drawPath instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Create a text typing animation with cursor effect
 * @deprecated Use a dedicated typing animation library with Framer Motion
 */
export const typeText = (
  element: string | HTMLElement,
  text: string,
  speed = 50,
  startDelay = 0
) => {
  console.warn('typeText: This function is deprecated. Use a dedicated typing animation library with Framer Motion.');
  // Just set the text immediately as a fallback
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (target) target.textContent = text;
  return null;
};

/**
 * Create a parallax scrolling effect
 * @deprecated Use Framer Motion's useScroll hook instead
 */
export const parallaxScroll = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  speed = 0.5
) => {
  console.warn('parallaxScroll: This function is deprecated. Use Framer Motion\'s useScroll hook instead.');
  return { destroy: () => {} }; // Return a dummy object with a destroy method for backward compatibility
};

/**
 * Create a timeline animation
 * @deprecated Use Framer Motion's sequential animations instead
 */
export const createTimeline = (
  animations: Array<{
    targets: string | HTMLElement | NodeListOf<HTMLElement>;
    properties: Record<string, any>;
    offset?: string | number;
  }>
) => {
  console.warn('createTimeline: This function is deprecated. Use Framer Motion\'s sequential animations instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Create a pulse animation
 * @deprecated Use motionAnimations.pulse instead
 */
export const pulseAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  scale = 1.05,
  duration = 1000
) => {
  console.warn('pulseAnimation: This function is deprecated. Use motionAnimations.pulse instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Create a wave animation for multiple elements
 * @deprecated Use motionAnimations.staggerChildren with custom variants instead
 */
export const waveAnimation = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  property: string,
  from: number,
  to: number,
  delay = 100
) => {
  console.warn('waveAnimation: This function is deprecated. Use motionAnimations.staggerChildren with custom variants instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Count up animation for numbers
 * @deprecated Use motionAnimations.countUp instead
 */
export const countUp = (
  element: string | HTMLElement,
  start = 0,
  end: number,
  duration = 2000,
  formatter: (num: number) => string = (num) => Math.round(num).toLocaleString()
) => {
  console.warn('countUp: This function is deprecated. Use motionAnimations.countUp instead.');
  // Just set the end value immediately as a fallback
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (target) target.textContent = formatter(end);
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

/**
 * Create a glass morphism effect on hover
 * @deprecated Use motionAnimations.glassEffect instead
 */
export const glassEffect = (
  element: string | HTMLElement | NodeListOf<HTMLElement>,
  baseOpacity = 0.2,
  hoverOpacity = 0.4,
  duration = 300
) => {
  console.warn('glassEffect: This function is deprecated. Use motionAnimations.glassEffect instead.');
  return { pause: () => {} }; // Return a dummy object with a pause method for backward compatibility
};

// Export the modern motionAnimations as the default export
export default motionAnimations;
