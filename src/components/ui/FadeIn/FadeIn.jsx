import PropTypes from 'prop-types';
import React from 'react';
import useAnimation from '../../../hooks/useAnimation';
import './FadeIn.css';

/**
 * FadeIn Component
 *
 * A component that fades in its children when they enter the viewport.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to fade in
 * @param {string} [props.direction='up'] - Direction to fade from (up, down, left, right, none)
 * @param {number} [props.duration=600] - Animation duration in ms
 * @param {number} [props.delay=0] - Animation delay in ms
 * @param {string} [props.timing='ease-out'] - Animation timing function
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.rootMargin='0px'] - Root margin for IntersectionObserver
 * @param {number} [props.threshold=0.1] - Threshold for IntersectionObserver
 * @param {string} [props.as='div'] - HTML element to render
 * @returns {JSX.Element}
 */
const FadeIn = ({
  children,
  direction = 'up',
  duration = 600,
  delay = 0,
  timing = 'ease-out',
  className = '',
  rootMargin = '0px',
  threshold = 0.1,
  as = 'div',
  ...rest
}) => {
  // Determine animation name based on direction
  const animationName =
    direction === 'none'
      ? 'fadeIn'
      : `fadeIn${direction.charAt(0).toUpperCase() + direction.slice(1)}`;

  // Use animation hook
  const { ref, style, isVisible } = useAnimation({
    animation: animationName,
    duration,
    delay,
    timing,
    observeIntersection: true,
    rootMargin,
    threshold,
  });

  // Combine classes
  const componentClasses = [
    'fade-in',
    `fade-in-${direction}`,
    isVisible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Render the component with the specified HTML element
  const Component = as;

  return (
    <Component ref={ref} className={componentClasses} style={style} {...rest}>
      {children}
    </Component>
  );
};

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'none']),
  duration: PropTypes.number,
  delay: PropTypes.number,
  timing: PropTypes.string,
  className: PropTypes.string,
  rootMargin: PropTypes.string,
  threshold: PropTypes.number,
  as: PropTypes.string,
};

export default FadeIn;
