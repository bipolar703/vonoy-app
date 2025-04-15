import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

/**
 * A consistent loading screen component used throughout the application
 * Uses the same animation as PageTransition for consistency
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Initializing...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary/95 backdrop-blur-md">
      <div className="enhanced-loader">
        <img src="/favicon.svg" alt="Loading" />
      </div>
      <motion.p
        className="mt-4 text-white/80 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
