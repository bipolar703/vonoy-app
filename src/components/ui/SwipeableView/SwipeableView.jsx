import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SwipeableView.css';

/**
 * SwipeableView Component
 * 
 * A component that enables swipe gestures for mobile interactions.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render
 * @param {Function} [props.onSwipeLeft] - Callback for left swipe
 * @param {Function} [props.onSwipeRight] - Callback for right swipe
 * @param {Function} [props.onSwipeUp] - Callback for up swipe
 * @param {Function} [props.onSwipeDown] - Callback for down swipe
 * @param {number} [props.threshold=50] - Minimum distance to trigger swipe
 * @param {boolean} [props.preventScrollOnSwipe=false] - Whether to prevent scrolling during swipe
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
const SwipeableView = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  preventScrollOnSwipe = false,
  className = '',
  ...rest
}) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef(null);

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setIsSwiping(true);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });

    if (preventScrollOnSwipe) {
      // Calculate if the swipe is primarily horizontal
      const deltaX = Math.abs(touchEnd.x - touchStart.x);
      const deltaY = Math.abs(touchEnd.y - touchStart.y);
      
      // If horizontal swipe is dominant and exceeds threshold, prevent default
      if (deltaX > deltaY && deltaX > threshold / 2) {
        e.preventDefault();
      }
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    
    // Check if swipe distance exceeds threshold
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        onSwipeRight && onSwipeRight();
      } else {
        onSwipeLeft && onSwipeLeft();
      }
    }
    
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        onSwipeDown && onSwipeDown();
      } else {
        onSwipeUp && onSwipeUp();
      }
    }
    
    setIsSwiping(false);
  };

  // Add passive touch listeners for better performance
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    
    const options = { passive: !preventScrollOnSwipe };
    
    element.addEventListener('touchstart', handleTouchStart, options);
    element.addEventListener('touchmove', handleTouchMove, options);
    element.addEventListener('touchend', handleTouchEnd, options);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventScrollOnSwipe]);

  // Calculate swipe distance for visual feedback
  const swipeDistance = {
    x: touchEnd.x - touchStart.x,
    y: touchEnd.y - touchStart.y,
  };

  // Apply transform only if actively swiping and has callbacks
  const hasHorizontalCallbacks = onSwipeLeft || onSwipeRight;
  const hasVerticalCallbacks = onSwipeUp || onSwipeDown;
  
  const style = isSwiping ? {
    transform: `translate(${hasHorizontalCallbacks ? swipeDistance.x * 0.3 : 0}px, ${hasVerticalCallbacks ? swipeDistance.y * 0.3 : 0}px)`,
    transition: 'transform 0.1s ease',
  } : {
    transform: 'translate(0, 0)',
    transition: 'transform 0.3s ease',
  };

  return (
    <div
      ref={containerRef}
      className={`swipeable-view ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

SwipeableView.propTypes = {
  children: PropTypes.node.isRequired,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  onSwipeUp: PropTypes.func,
  onSwipeDown: PropTypes.func,
  threshold: PropTypes.number,
  preventScrollOnSwipe: PropTypes.bool,
  className: PropTypes.string,
};

export default SwipeableView;
