import React, { useEffect, useState } from 'react';
import LogoLoader from './LogoLoader';
import './LogoLoader.css';

/**
 * RouteTransition Component
 *
 * A component to display during route transitions and section loading.
 * Uses the LogoLoader for a consistent loading experience.
 *
 * @returns {JSX.Element}
 */
const RouteTransition: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpacity(0);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center transition-opacity duration-300" style={{ opacity }}>
      <LogoLoader />
    </div>
  );
};

export default RouteTransition;
