import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
  randomizeMessage?: boolean;
  minLoadTime?: number;
  maxLoadTime?: number;
  onLoadComplete?: () => void;
}

/**
 * Consolidated LoadingScreen Component
 *
 * A consistent loading screen component used throughout the application
 * Features:
 * - SVG-shaped glow effect that follows the favicon edges
 * - Randomized loading messages (optional)
 * - Configurable loading time
 * - Smooth animations with Framer Motion
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Initializing...',
  randomizeMessage = false,
  minLoadTime = 1.75,
  maxLoadTime = 4,
  onLoadComplete
}) => {
  const [displayMessage, setDisplayMessage] = useState(message);

  // Randomize loading message if enabled
  useEffect(() => {
    if (!randomizeMessage) return;

    const messages = ['Initializing...', 'Loading...'];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setDisplayMessage(messages[randomIndex]);

    // If a loading time is specified, trigger the completion callback
    if (onLoadComplete) {
      const loadTime = (Math.random() * (maxLoadTime - minLoadTime) + minLoadTime) * 1000;
      const timer = setTimeout(() => {
        onLoadComplete();
      }, loadTime);

      return () => clearTimeout(timer);
    }
  }, [randomizeMessage, minLoadTime, maxLoadTime, onLoadComplete]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#141f2e] backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="enhanced-loader">
        <img src="/favicon.svg" alt="Loading" />
      </div>
      <motion.p
        className="mt-4 text-white/80 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {displayMessage}
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
