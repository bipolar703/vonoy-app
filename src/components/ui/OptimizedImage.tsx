import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean | 'high' | 'low' | 'auto';
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
  
  // Determine proper fetch priority
  const fetchPriority = priority || 'auto';
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loadingStrategy}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};

export default OptimizedImage;
