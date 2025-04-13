import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { createAnimation, createTimeline } from '../../utils/animationSystem';

/**
 * UnderDevelopment Component
 *
 * A modern, animated "under development" page that replaces the 404 error page.
 * Features smooth animations using Anime.js with Web Animation API considerations.
 */
const UnderDevelopment: React.FC = () => {
  useEffect(() => {
    // Animate elements using enhanced createTimeline for proper cleanup
    const animations = [
      {
        targets: '.development-title',
        properties: {
          opacity: [0, 1],
          translateY: [20, 0]
        },
        offset: 0
      },
      {
        targets: '.development-message',
        properties: {
          opacity: [0, 1],
          translateY: [20, 0]
        },
        offset: '-=600'
      },
      {
        targets: '.development-button',
        properties: {
          opacity: [0, 1],
          translateY: [20, 0]
        },
        offset: '-=600'
      }
    ];

    // Create the timeline with proper cleanup
    const timeline = createTimeline(animations, {
      duration: 800,
      easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
    });

    // Animate gear icons with continuous rotation using enhanced createAnimation
    createAnimation({
      targets: '.gear-icon',
      rotate: '1turn',
      loop: true,
      duration: 8000,
      easing: 'linear'
    });

    // Animate small dots using enhanced createAnimation
    createAnimation({
      targets: '.development-dot',
      scale: [0.8, 1.2],
      opacity: [0.5, 1],
      delay: anime.stagger(100),
      loop: true,
      direction: 'alternate',
      duration: 1500,
      easing: 'easeInOutSine'
    });

    // Return cleanup function
    return () => {
      // Timeline and animations will be automatically cleaned up
      // by the enhanced createAnimation and createTimeline functions
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary p-4 text-center">
      <div className="relative max-w-2xl mx-auto">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="gear-icon absolute top-10 right-10 text-secondary/20 w-24 h-24">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
          </div>
          <div className="gear-icon absolute bottom-10 left-10 text-secondary/20 w-16 h-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
          </div>

          {/* Animated dots */}
          <div className="development-dot absolute top-20 right-40 w-2 h-2 rounded-full bg-secondary/40"></div>
          <div className="development-dot absolute top-40 right-20 w-3 h-3 rounded-full bg-secondary/40"></div>
          <div className="development-dot absolute bottom-20 right-30 w-2 h-2 rounded-full bg-secondary/40"></div>
          <div className="development-dot absolute bottom-40 left-20 w-3 h-3 rounded-full bg-secondary/40"></div>
          <div className="development-dot absolute top-30 left-40 w-2 h-2 rounded-full bg-secondary/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl">
          <h1 className="development-title text-4xl md:text-5xl font-bold text-white mb-6">
            Page Under Development
          </h1>

          <p className="development-message text-lg text-white/80 mb-8 max-w-xl mx-auto">
            We're working hard to bring you an amazing experience. This page is currently under development and will be available soon. Thank you for your patience!
          </p>

          <Link
            to="/"
            className="development-button inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300"
          >
            Return to Home
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
