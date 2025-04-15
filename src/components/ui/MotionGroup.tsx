import React, { useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import * as motionAnimations from '../../utils/motionAnimations';

interface MotionGroupProps {
  children: React.ReactNode[];
  className?: string;
  animationIn?: keyof typeof motionAnimations;
  animationOut?: keyof typeof motionAnimations;
  staggerDelay?: number;
  duration?: number;
  customVariants?: Variants;
  initiallyVisible?: boolean;
}

/**
 * MotionGroup Component
 * 
 * A modern replacement for GroupTransition using Framer Motion
 * 
 * @param {React.ReactNode[]} children - Array of child elements to animate
 * @param {string} className - Optional CSS class for the container
 * @param {string} animationIn - Animation type for entering (default: 'fadeInUp')
 * @param {string} animationOut - Animation type for exiting (default: 'fadeOut')
 * @param {number} staggerDelay - Delay between each child animation in seconds (default: 0.1)
 * @param {number} duration - Duration of each animation in seconds (default: 0.4)
 * @param {Variants} customVariants - Custom Framer Motion variants
 * @param {boolean} initiallyVisible - Whether items should be visible initially (default: true)
 */
const MotionGroup: React.FC<MotionGroupProps> = ({
  children,
  className = '',
  animationIn = 'fadeInUp',
  animationOut = 'fadeOut',
  staggerDelay = 0.1,
  duration = 0.4,
  customVariants,
  initiallyVisible = true,
}) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(children.length).fill(initiallyVisible)
  );

  // Function to toggle visibility of all items
  const toggleAll = () => {
    const allVisible = visibleItems.every((item) => item);
    setVisibleItems(Array(children.length).fill(!allVisible));
  };

  // Function to toggle visibility of a specific item
  const toggleItem = (index: number) => {
    setVisibleItems((prev) => {
      const newItems = [...prev];
      newItems[index] = !newItems[index];
      return newItems;
    });
  };

  // Create container variants for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay / 2,
        staggerDirection: -1,
      },
    },
  };

  // Use custom variants or get from motionAnimations
  const itemVariants: Variants = 
    customVariants || 
    (motionAnimations[animationIn] as Variants) || 
    motionAnimations.fadeInUp;
  
  // Override duration if provided
  if (duration && itemVariants.visible?.transition) {
    itemVariants.visible.transition.duration = duration;
  }
  
  if (duration && itemVariants.exit?.transition) {
    itemVariants.exit.transition.duration = duration;
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={toggleAll}
        >
          {visibleItems.every((item) => item) ? 'Hide All' : 'Show All'}
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children.map((child, index) => (
          <div key={index} onClick={() => toggleItem(index)}>
            <AnimatePresence mode="wait">
              {visibleItems[index] && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {child}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MotionGroup;
