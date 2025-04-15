import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import * as motionAnimations from '../../utils/motionAnimations';

interface MotionTransitionProps {
  in: boolean;
  duration?: number;
  variants?: Variants;
  animationType?: keyof typeof motionAnimations;
  children: React.ReactNode;
  className?: string;
  onExitComplete?: () => void;
}

/**
 * MotionTransition Component
 * 
 * A modern replacement for TransitionComponent using Framer Motion
 * 
 * @param {boolean} in - Whether the component should be shown
 * @param {number} duration - Animation duration in seconds (default: 0.4)
 * @param {Variants} variants - Custom Framer Motion variants
 * @param {string} animationType - Type of animation from motionAnimations (default: 'fadeIn')
 * @param {React.ReactNode} children - Child component(s) to animate
 * @param {string} className - Optional CSS class for the container
 * @param {Function} onExitComplete - Callback fired after the exit animation completes
 */
const MotionTransition: React.FC<MotionTransitionProps> = ({
  in: inProp,
  duration,
  variants,
  animationType = 'fadeIn',
  children,
  className = '',
  onExitComplete,
}) => {
  // Get the animation variants from motionAnimations or use custom variants
  const animationVariants = variants || motionAnimations[animationType] || motionAnimations.fadeIn;
  
  // Override duration if provided
  if (duration && animationVariants.visible?.transition) {
    animationVariants.visible.transition.duration = duration;
  }
  
  if (duration && animationVariants.exit?.transition) {
    animationVariants.exit.transition.duration = duration;
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {inProp && (
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotionTransition;
