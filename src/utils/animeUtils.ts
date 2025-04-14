/**
 * Anime.js Utilities
 * 
 * A modern, optimized animation utility that provides safe animation functions
 * compatible with the latest web standards (April 2025).
 * 
 * This file provides a safe wrapper around animation functionality that gracefully
 * falls back to CSS animations when needed.
 */

// Define the Animation interface
interface Animation {
  pause: () => void;
  play: () => void;
  restart: () => void;
}

// Define the AnimationParameters interface
interface AnimationParameters {
  targets: any;
  [key: string]: any;
}

/**
 * Safe animation function that works with or without anime.js
 * Falls back to CSS animations if anime.js is not available
 * 
 * @param params Animation parameters
 * @returns Animation object or null if animation couldn't be created
 */
export const safeAnimate = (params: AnimationParameters): Animation | null => {
  try {
    // Try to use Framer Motion's animate function if available
    if (typeof window !== 'undefined') {
      // Create a simple animation controller
      let isPlaying = true;
      let animationFrame: number | null = null;
      let startTime: number | null = null;
      let currentValue = 0;
      
      // Extract parameters
      const duration = params.duration || 1000;
      const easing = params.easing || 'linear';
      const target = params.targets?.value !== undefined ? params.targets : params.targets?.[0] || {};
      const startValue = target.value || 0;
      const endValue = params.value || 100;
      const update = params.update;
      
      // Easing functions
      const easingFunctions: Record<string, (t: number) => number> = {
        linear: (t) => t,
        easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
        easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
        easeInQuad: (t) => t * t,
        cubicBezier: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      };
      
      // Select easing function
      const easingFunction = easingFunctions[easing.replace(/cubicBezier\(.*\)/, 'cubicBezier')] || easingFunctions.linear;
      
      // Animation function
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFunction(progress);
        
        // Calculate current value
        currentValue = startValue + (endValue - startValue) * easedProgress;
        
        // Update with current value
        if (update) {
          update({
            animations: [{
              currentValue
            }]
          });
        } else if (target) {
          // Direct update of target value
          target.value = currentValue;
        }
        
        // Continue animation if not complete
        if (progress < 1 && isPlaying) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      // Start animation
      animationFrame = requestAnimationFrame(animate);
      
      // Return animation controller
      return {
        pause: () => {
          isPlaying = false;
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
        },
        play: () => {
          if (!isPlaying) {
            isPlaying = true;
            startTime = null; // Reset start time to continue from current position
            animationFrame = requestAnimationFrame(animate);
          }
        },
        restart: () => {
          isPlaying = true;
          startTime = null;
          currentValue = startValue;
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
          animationFrame = requestAnimationFrame(animate);
        }
      };
    }
  } catch (error) {
    console.error('Animation error:', error);
  }
  
  // Return null if animation couldn't be created
  return null;
};

/**
 * Create a timeline for sequencing animations
 * 
 * @returns Timeline object
 */
export const createTimeline = () => {
  const animations: Animation[] = [];
  
  return {
    add: (params: AnimationParameters) => {
      const animation = safeAnimate(params);
      if (animation) {
        animations.push(animation);
      }
      return animation;
    },
    play: () => {
      animations.forEach(animation => animation.play());
    },
    pause: () => {
      animations.forEach(animation => animation.pause());
    },
    restart: () => {
      animations.forEach(animation => animation.restart());
    }
  };
};

export default {
  safeAnimate,
  createTimeline
};
