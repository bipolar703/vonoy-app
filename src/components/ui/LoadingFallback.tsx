import React from 'react';
import LogoLoader from './LogoLoader';
import './LogoLoader.css';

/**
 * LoadingFallback Component
 *
 * Displays a loading animation while content is being loaded.
 * Uses the brand colors and styling for a consistent look and feel.
 *
 * @returns JSX.Element
 */
const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <LogoLoader />
    </div>
  );
};

export default LoadingFallback;
