import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

/**
 * A consistent loading screen component used throughout the application
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Initializing...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary/95 backdrop-blur-md">
      <div className="enhanced-loader">
        <img src="/favicon.svg" alt="Loading" />
      </div>
      <p className="mt-4 text-white/80 text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingScreen;
