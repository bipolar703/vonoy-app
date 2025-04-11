/**
 * Performance Utilities
 * 
 * A collection of utilities to optimize website performance based on 2025 best practices.
 */

/**
 * Lazy loads images that are not in the viewport
 * @param options - IntersectionObserver options
 */
export const setupLazyLoading = (options = {
  rootMargin: '200px 0px',
  threshold: 0.01
}) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset');
        
        if (src) img.src = src;
        if (srcset) img.srcset = srcset;
        
        img.onload = () => {
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          img.classList.add('loaded');
        };
        
        observer.unobserve(img);
      }
    });
  }, options);

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
};

/**
 * Preloads critical resources
 * @param resources - Array of resources to preload
 */
export const preloadCriticalResources = (resources: Array<{
  href: string;
  as: 'script' | 'style' | 'image' | 'font' | 'fetch';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  importance?: 'high' | 'low' | 'auto';
}>) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) link.type = resource.type;
    if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
    if (resource.importance) link.setAttribute('importance', resource.importance);
    
    document.head.appendChild(link);
  });
};

/**
 * Implements priority hints for resources
 * @param selector - CSS selector for elements to apply priority hints
 * @param priority - Priority level
 */
export const setPriorityHints = (selector: string, priority: 'high' | 'low' | 'auto') => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  document.querySelectorAll(selector).forEach(el => {
    if (el instanceof HTMLImageElement || 
        el instanceof HTMLScriptElement || 
        el instanceof HTMLLinkElement) {
      el.setAttribute('fetchpriority', priority);
    }
  });
};

/**
 * Implements content-visibility for off-screen content
 * @param selector - CSS selector for elements to apply content-visibility
 */
export const applyContentVisibility = (selector: string) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  document.querySelectorAll(selector).forEach(el => {
    (el as HTMLElement).style.contentVisibility = 'auto';
    (el as HTMLElement).style.containIntrinsicSize = 'auto';
  });
};

/**
 * Implements back-forward cache optimization
 */
export const optimizeForBFCache = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Avoid using unload event
  window.addEventListener('pagehide', (event) => {
    // Page is being unloaded, perform cleanup
    if (event.persisted) {
      console.log('Page is being cached for back-forward navigation');
    }
  });

  // Listen for page show events
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      console.log('Page was restored from back-forward cache');
      // Reinitialize any necessary state
    }
  });
};

/**
 * Implements resource hints for performance optimization
 * @param hints - Array of resource hints
 */
export const addResourceHints = (hints: Array<{
  rel: 'preconnect' | 'dns-prefetch' | 'prefetch' | 'prerender';
  href: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}>) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    
    if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
    
    document.head.appendChild(link);
  });
};

/**
 * Implements Core Web Vitals optimization
 */
export const optimizeCoreWebVitals = () => {
  // Optimize Largest Contentful Paint (LCP)
  preloadCriticalResources([
    { href: '/hero-bg.webp', as: 'image', importance: 'high' }
  ]);
  
  // Optimize Cumulative Layout Shift (CLS)
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      console.warn('Image missing width/height attributes:', img.src);
    }
  });
  
  // Optimize First Input Delay (FID) and Interaction to Next Paint (INP)
  // Break up long tasks
  const deferNonCriticalWork = () => {
    // Use requestIdleCallback or setTimeout to defer non-critical work
    const callback = () => {
      // Non-critical initialization code
      console.log('Non-critical work executed during idle time');
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback);
    } else {
      setTimeout(callback, 50);
    }
  };
  
  // Call after initial render
  window.addEventListener('load', () => {
    deferNonCriticalWork();
  });
};

/**
 * Initialize all performance optimizations
 */
export const initializePerformanceOptimizations = () => {
  // Setup lazy loading for images
  setupLazyLoading();
  
  // Optimize for Core Web Vitals
  optimizeCoreWebVitals();
  
  // Optimize for back-forward cache
  optimizeForBFCache();
  
  // Add resource hints
  addResourceHints([
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ]);
  
  // Apply content-visibility to off-screen sections
  applyContentVisibility('.section:not(:first-child)');
  
  // Set priority hints
  setPriorityHints('.hero-image', 'high');
  setPriorityHints('.footer-image', 'low');
};
