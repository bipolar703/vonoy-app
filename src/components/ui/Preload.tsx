import React, { useEffect } from 'react';

interface PreloadProps {
  resources: Array<{
    href: string;
    as: 'script' | 'style' | 'image' | 'font' | 'fetch';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    importance?: 'high' | 'low' | 'auto';
  }>;
}

/**
 * Preload Component
 * 
 * A component that preloads critical resources for better performance.
 * This helps improve metrics like Largest Contentful Paint (LCP).
 */
const Preload: React.FC<PreloadProps> = ({ resources }) => {
  useEffect(() => {
    // Create and append link elements for preloading
    const linkElements = resources.map(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      if (resource.importance) link.setAttribute('importance', resource.importance);
      
      return link;
    });
    
    // Append all links to head
    linkElements.forEach(link => {
      document.head.appendChild(link);
    });
    
    // Cleanup on unmount
    return () => {
      linkElements.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources]);
  
  // This component doesn't render anything
  return null;
};

export default Preload;
