import React, { useEffect, useState } from 'react';

// Define valid 'as' values that are actually supported by browsers
type SupportedPreloadTypes =
  | 'script'
  | 'style'
  | 'image'
  | 'font'
  | 'audio'
  | 'video'
  | 'document'
  | 'fetch';

interface PreloadProps {
  resources: Array<{
    href: string;
    as: SupportedPreloadTypes;
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
    const linkElements = resources
      .map((resource) => {
        // Skip if already loaded
        if (loadedResources.has(resource.href)) {
          return null;
        }

        const link = document.createElement('link');

        // Determine the appropriate rel attribute based on resource type
        if (resource.as === 'script') {
          // Modern browsers prefer modulepreload for JS
          link.rel = 'modulepreload';
        } else if (resource.href.startsWith('http') && !resource.immediateUse) {
          // For external resources that aren't needed immediately, use preconnect
          link.rel = 'preconnect';
          if (!resource.crossOrigin || resource.crossOrigin === 'anonymous') {
            link.crossOrigin = 'anonymous';
          }
        } else if (resource.immediateUse) {
          // Use preload for resources needed on the current page
          link.rel = 'preload';
          link.as = resource.as;
        } else {
          // Use prefetch for resources likely needed for future navigation
          link.rel = 'prefetch';
        }

        link.href = resource.href;

        // Add additional attributes if provided
        if (resource.type) link.type = resource.type;
        if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
        if (resource.importance) link.setAttribute('importance', resource.importance);

        // Add onload handler to track loaded resources
        link.onload = () => {
          setLoadedResources((prev) => {
            const updated = new Set(prev);
            updated.add(resource.href);
            return updated;
          });
        };

        // Add onerror handler for better error tracking
        link.onerror = (e) => {
          console.warn(`Failed to preload resource: ${resource.href}`, e);
        };

        return link;
      })
      .filter(Boolean); // Remove null entries

    // Append all links to head
    linkElements.forEach((link) => {
      if (link) document.head.appendChild(link);
    });

    // Cleanup on unmount
    return () => {
      linkElements.forEach((link) => {
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
