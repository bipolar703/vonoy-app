import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import anime from 'animejs';
import OptimizedImage from '../ui/OptimizedImage';

/**
 * PageTransition Component
 * 
 * Provides a smooth transition between routes with a loading animation
 * featuring the logo and animated dots.
 * 
 * Uses Anime.js with Web Animation API considerations for optimal performance.
 */
const PageTransition: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [prevLocation, setPrevLocation] = useState('');

  useEffect(() => {
    // Only show transition when location changes
    if (prevLocation !== location.pathname) {
      // Show transition
      setIsVisible(true);
      
      // Animate dots using Anime.js
      const dotsAnimation = anime({
        targets: '.loading-dot',
        scale: [0.8, 1.2, 0.8],
        opacity: [0.5, 1, 0.5],
        // Using Web Animation API differences from Anime.js documentation
        // https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations
        // Setting iterations to Infinity for continuous animation
        loop: true,
        easing: 'easeInOutSine',
        duration: 1500,
        delay: anime.stagger(200),
        // Ensure smooth animation with proper timing
        update: function(anim) {
          // Smooth animation handling
        }
      });
      
      // Animate logo using Anime.js
      const logoAnimation = anime({
        targets: '.page-transition-logo',
        scale: [0.98, 1.02],
        opacity: [0.7, 1],
        // Using Web Animation API differences
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        duration: 2000
      });
      
      // Hide transition after delay
      const timer = setTimeout(() => {
        setIsVisible(false);
        
        // Clean up animations
        dotsAnimation.pause();
        logoAnimation.pause();
      }, 1200);
      
      // Update previous location
      setPrevLocation(location.pathname);
      
      return () => {
        clearTimeout(timer);
        dotsAnimation.pause();
        logoAnimation.pause();
      };
    }
  }, [location, prevLocation]);

  return (
    <div className={`page-transition-loader ${isVisible ? '' : 'hidden'}`}>
      <OptimizedImage
        src="/logo.svg"
        alt="Vonoy"
        width={120}
        height={40}
        className="page-transition-logo"
      />
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default PageTransition;
