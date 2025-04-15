/**
 * Motion Animations Utilities
 *
 * A collection of reusable animation variants and functions using Framer Motion.
 * Implements modern animation techniques for a more interactive UI.
 * Optimized for performance with will-change hints and GPU acceleration.
 *
 * @module utils/motionAnimations
 */

import { Variants } from 'framer-motion';

/**
 * Standard easing options for animations
 */
export const easings = {
  // Standard easings
  easeInOut: [0.42, 0, 0.58, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  // Custom easings
  gentle: [0.25, 0.1, 0.25, 1],
  bounce: [0.175, 0.885, 0.32, 1.275],
  premium: [0.25, 0.1, 0.25, 1.1],
};

/**
 * Standard durations for animations (in seconds)
 */
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1,
};

/**
 * Fade in animation variants
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: durations.normal,
      ease: easings.easeOut 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: durations.fast,
      ease: easings.easeIn 
    }
  }
};

/**
 * Fade in up animation variants
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    willChange: 'opacity, transform' 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.normal,
      ease: easings.gentle 
    }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.fast,
      ease: easings.easeIn 
    }
  }
};

/**
 * Fade in down animation variants
 */
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20,
    willChange: 'opacity, transform' 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.normal,
      ease: easings.gentle 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.fast,
      ease: easings.easeIn 
    }
  }
};

/**
 * Fade in left animation variants
 */
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    willChange: 'opacity, transform' 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.normal,
      ease: easings.gentle 
    }
  },
  exit: { 
    opacity: 0, 
    x: -10,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.fast,
      ease: easings.easeIn 
    }
  }
};

/**
 * Fade in right animation variants
 */
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20,
    willChange: 'opacity, transform' 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.normal,
      ease: easings.gentle 
    }
  },
  exit: { 
    opacity: 0, 
    x: 10,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.fast,
      ease: easings.easeIn 
    }
  }
};

/**
 * Scale animation variants
 */
export const scale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    willChange: 'opacity, transform' 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.normal,
      ease: easings.gentle 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    willChange: 'opacity, transform',
    transition: { 
      duration: durations.fast,
      ease: easings.easeIn 
    }
  }
};

/**
 * Staggered children animation variants
 * @param staggerDuration - Duration between each child animation (in seconds)
 * @param childVariants - Variants to apply to each child
 */
export const staggerChildren = (staggerDuration = 0.1, childVariants = fadeInUp): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDuration,
      delayChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: staggerDuration / 2,
      staggerDirection: -1,
    }
  },
  children: childVariants
});

/**
 * Pulse animation variants
 */
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.gentle
    }
  }
};

/**
 * Breathing glow animation variants
 * @param color - Color of the glow (default: rgb(88, 164, 157))
 */
export const breathingGlow = (color = 'rgb(88, 164, 157)'): Variants => ({
  initial: { 
    boxShadow: `0 0 10px ${color}40` 
  },
  animate: {
    boxShadow: [
      `0 0 10px ${color}40`,
      `0 0 20px ${color}60`,
      `0 0 10px ${color}40`
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.gentle
    }
  }
});

/**
 * Count up animation for numbers
 * @param start - Starting number
 * @param end - Ending number
 * @param duration - Animation duration (in seconds)
 * @param delay - Delay before starting animation (in seconds)
 */
export const countUp = {
  initial: (start = 0) => ({ count: start }),
  animate: (end: number, duration = 2, delay = 0) => ({
    count: end,
    transition: {
      duration,
      delay,
      ease: easings.easeOut
    }
  })
};

/**
 * Draw SVG path animation variants
 */
export const drawPath: Variants = {
  hidden: { 
    pathLength: 0,
    opacity: 0 
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { 
        duration: 1.5, 
        ease: easings.easeOut 
      },
      opacity: { 
        duration: 0.3, 
        ease: easings.easeOut 
      }
    }
  }
};

/**
 * Hover animation variants
 */
export const hover: Variants = {
  initial: { 
    y: 0, 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
  },
  hover: { 
    y: -5, 
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.3,
      ease: easings.gentle
    }
  }
};

/**
 * Glass effect animation variants
 * @param baseOpacity - Base opacity of the glass effect
 * @param hoverOpacity - Opacity on hover
 */
export const glassEffect = (baseOpacity = 0.2, hoverOpacity = 0.4): Variants => ({
  initial: { 
    backgroundColor: `rgba(255, 255, 255, ${baseOpacity})`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    y: 0
  },
  hover: { 
    backgroundColor: `rgba(255, 255, 255, ${hoverOpacity})`,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
    y: -5,
    transition: {
      duration: 0.3,
      ease: easings.gentle
    }
  }
});

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scale,
  staggerChildren,
  pulse,
  breathingGlow,
  countUp,
  drawPath,
  hover,
  glassEffect,
  easings,
  durations
};
