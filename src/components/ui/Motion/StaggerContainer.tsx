import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { staggerContainer } from '../../../utils/motionUtils';

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

interface StaggerContainerProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  viewport?: boolean;
  once?: boolean;
  margin?: string;
  amount?: number | 'some' | 'all';
  variants?: Variants;
}

/**
 * StaggerContainer component for staggered animations
 *
 * @param {React.ReactNode} children - Content to animate (should be Motion components)
 * @param {string} className - Additional CSS classes
 * @param {number} delay - Initial delay before starting animations
 * @param {number} staggerDelay - Delay between each child animation
 * @param {boolean} viewport - Whether to trigger animation when in viewport
 * @param {boolean} once - Whether to trigger animation only once
 * @param {string} margin - Viewport margin
 * @param {number|string} amount - Amount of element that needs to be in viewport
 * @param {Variants} variants - Custom framer-motion variants
 */
const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  viewport = true,
  once = true,
  margin = '0px',
  amount = 0.1,
  variants,
  ...props
}) => {
  // Create custom stagger variants
  const getVariants = (): Variants => {
    if (variants) return variants;

    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: staggerDelay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    };
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={viewport ? undefined : "visible"}
      whileInView={viewport ? "visible" : undefined}
      viewport={viewport ? { once, margin, amount } : undefined}
      variants={getVariants()}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
