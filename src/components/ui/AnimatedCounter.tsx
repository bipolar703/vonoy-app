import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
  easing?: string;
}

/**
 * AnimatedCounter Component
 * 
 * Animates a number from 0 to the target value when it comes into view.
 * Supports percentage values, decimal numbers, and custom suffixes.
 * 
 * @param {number|string} value - The target value to count to
 * @param {number} duration - Animation duration in milliseconds
 * @param {number} delay - Delay before animation starts
 * @param {string} suffix - Suffix to append to the number (e.g., "%", "+")
 * @param {string} className - Additional CSS classes
 * @param {string} easing - Animation easing function
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  delay = 0,
  suffix = '',
  className = '',
  easing = 'cubicBezier(0.16, 1, 0.3, 1)'
}) => {
  // Parse the value to handle both number and string inputs
  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  
  // Use Intersection Observer to trigger animation when in view
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Combine refs
  const setRefs = (element: HTMLSpanElement | null) => {
    counterRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    }
  };
  
  useEffect(() => {
    if (inView && counterRef.current) {
      // Determine if the value has decimals
      const hasDecimals = parsedValue % 1 !== 0;
      const decimals = hasDecimals ? 1 : 0;
      
      // Create the animation
      anime({
        targets: { value: 0 },
        value: parsedValue,
        duration: duration,
        delay: delay,
        easing: easing,
        round: decimals,
        update: (anim) => {
          const currentValue = anim.animations[0].currentValue;
          setDisplayValue(currentValue);
        }
      });
    }
  }, [inView, parsedValue, duration, delay, easing]);
  
  return (
    <span ref={setRefs} className={className}>
      {displayValue.toLocaleString(undefined, { 
        minimumFractionDigits: parsedValue % 1 !== 0 ? 1 : 0,
        maximumFractionDigits: parsedValue % 1 !== 0 ? 1 : 0
      })}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
