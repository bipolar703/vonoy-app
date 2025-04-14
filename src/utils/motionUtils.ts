/**
 * Motion Utilities
 *
 * A collection of reusable animation utilities using Framer Motion.
 * Provides a simpler, more reliable animation system than anime.js.
 */

import { motion } from 'framer-motion';

// Define our own Variants type to avoid import issues
type Transition = {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  repeat?: number;
  repeatType?: string;
  staggerChildren?: number;
  delayChildren?: number;
};

type VariantState = {
  [key: string]: any;
  transition?: Transition;
};

type Variants = {
  [key: string]: VariantState;
};

// Common animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const scaleInUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Staggered animation helper
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Pulse animation
export const pulse: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

// Hover animation variants
export const hoverScale = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Create custom transition options
export const createTransition = (
  duration = 0.5,
  delay = 0,
  ease = [0.25, 0.1, 0.25, 1]
) => ({
  duration,
  delay,
  ease
});

// Create custom stagger options
export const createStagger = (
  staggerChildren = 0.1,
  delayChildren = 0
) => ({
  staggerChildren,
  delayChildren
});

// Create custom variants
export const createVariants = (
  hidden: any,
  visible: any,
  transition = createTransition()
): Variants => ({
  hidden,
  visible: {
    ...visible,
    transition
  }
});

// Create a scroll-triggered animation variant
export const createScrollAnimation = (
  hidden: any,
  visible: any,
  transition = createTransition()
): Variants => ({
  hidden,
  visible: {
    ...visible,
    transition
  }
});

// Export all variants
export const variants = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInUp,
  staggerContainer,
  pulse,
  hoverScale
};

export default variants;
