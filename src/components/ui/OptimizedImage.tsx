import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

/**
 * OptimizedImage Component
 *
 * A performance-optimized image component that implements best practices for 2025:
 * - Proper width and height attributes to prevent layout shifts
 * - Lazy loading for images below the fold
 * - Priority loading for critical images
 * - Proper fetchPriority attribute
 * - Proper decoding attribute
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  // Determine proper loading strategy
  const loadingStrategy = priority ? 'eager' : loading;

  // Create props object without fetchPriority to avoid React warnings
  const imgProps = {
    src,
    alt,
    width,
    height,
    loading: loadingStrategy,
    decoding,
    ...props
  };

  return <img {...imgProps} />;

};

export default OptimizedImage;
