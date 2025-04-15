import React from 'react';

interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
  className?: string;
}

/**
 * AnimatedCounter Component - Simplified
 *
 * A simple component that displays a number with an optional suffix.
 * No animations to avoid potential issues.
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  className = '',
}) => {
  // Parse the value to handle both number and string inputs
  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;

  // Determine if the value has decimals
  const hasDecimals = parsedValue % 1 !== 0;
  const decimals = hasDecimals ? 1 : 0;

  // Format the value
  const formattedValue = parsedValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {formattedValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
