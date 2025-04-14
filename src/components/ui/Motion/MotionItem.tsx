import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { fadeInUp } from '../../../utils/motionUtils';

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

interface MotionItemProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  variants?: Variants;
}

/**
 * MotionItem component for use within StaggerContainer
 *
 * @param {React.ReactNode} children - Content to animate
 * @param {string} className - Additional CSS classes
 * @param {number} duration - Animation duration in seconds
 * @param {string} direction - Animation direction (up, down, left, right, none)
 * @param {number} distance - Animation distance in pixels
 * @param {Variants} variants - Custom framer-motion variants
 */
const MotionItem: React.FC<MotionItemProps> = ({
  children,
  className = '',
  duration = 0.5,
  direction = 'up',
  distance = 20,
  variants,
  ...props
}) => {
  // Create custom variants based on direction
  const getVariants = (): Variants => {
    if (variants) return variants;

    const baseVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    };

    switch (direction) {
      case 'up':
        baseVariants.hidden = { ...baseVariants.hidden, y: distance };
        baseVariants.visible = { ...baseVariants.visible, y: 0 };
        break;
      case 'down':
        baseVariants.hidden = { ...baseVariants.hidden, y: -distance };
        baseVariants.visible = { ...baseVariants.visible, y: 0 };
        break;
      case 'left':
        baseVariants.hidden = { ...baseVariants.hidden, x: -distance };
        baseVariants.visible = { ...baseVariants.visible, x: 0 };
        break;
      case 'right':
        baseVariants.hidden = { ...baseVariants.hidden, x: distance };
        baseVariants.visible = { ...baseVariants.visible, x: 0 };
        break;
      default:
        // No direction, just fade
        break;
    }

    return baseVariants;
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
