import React, { useEffect, useState } from 'react';

interface PreloadProps {
  resources: Array<{
    href: string;
    as: 'script' | 'style' | 'image' | 'font' | 'fetch' | 'audio' | 'video' | 'document' | 'embed' | 'object' | 'track';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    importance?: 'high' | 'low' | 'auto';
    // Flag to indicate if the resource will be used immediately
    immediateUse?: boolean;
  }>;
}

/**
 * Preload Component
 *
 * A component that preloads critical resources for better performance.
 * This helps improve metrics like Largest Contentful Paint (LCP).
 */
const Preload: React.FC<PreloadProps> = ({ resources }) => {
  // Track which resources are loaded
  const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Create and append link elements for preloading
    const linkElements = resources.map(resource => {
      // Skip if already loaded
      if (loadedResources.has(resource.href)) {
        return null;
      }

      const link = document.createElement('link');

      // Use modulepreload for scripts, preconnect for external domains, and prefetch for other resources
      // This approach reduces console warnings while still optimizing performance
      if (resource.as === 'script') {
        link.rel = 'modulepreload'; // Better for scripts
      } else if (resource.href.startsWith('http')) {
        // For external resources, use preconnect instead of preload
        link.rel = 'preconnect';
        if (!resource.crossOrigin || resource.crossOrigin === 'anonymous') {
          link.crossOrigin = 'anonymous';
        }
      } else if (resource.immediateUse) {
        // Only use preload for immediate resources that are on the same domain
        link.rel = 'preload';
      } else {
        // Use prefetch for non-immediate resources to avoid console warnings
        link.rel = 'prefetch';
      }
      link.href = resource.href;

      // Only set 'as' attribute for preload (required)
      if (link.rel === 'preload') {
        link.as = resource.as;
      }

      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      if (resource.importance) link.setAttribute('importance', resource.importance);

      // Add onload handler to track loaded resources
      link.onload = () => {
        setLoadedResources(prev => {
          const updated = new Set(prev);
          updated.add(resource.href);
          return updated;
        });
      };

      return link;
    }).filter(Boolean); // Remove null entries

    // Append all links to head
    linkElements.forEach(link => {
      if (link) document.head.appendChild(link);
    });

    // Cleanup on unmount
    return () => {
      linkElements.forEach(link => {
        if (link && document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources, loadedResources]);

  // This component doesn't render anything
  return null;
};

export default Preload;
