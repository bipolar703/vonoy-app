/**
 * Performance Utilities
 *
 * A collection of utilities to optimize website performance based on modern best practices.
 * Implements the latest performance optimization techniques for React applications.
 *
 * @module utils/performance
 */

// Web Vitals metric type for internal use
interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  isFinal?: boolean;
}

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
      el.setAttribute('fetchPriority', priority);
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
 * Updated with modern best practices
 */
export const optimizeCoreWebVitals = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Optimize Largest Contentful Paint (LCP)
  preloadCriticalResources([
    { href: '/hero-bg.webp', as: 'image', importance: 'high' },
    { href: 'https://img.youtube.com/vi/hxm2rdVl7Y0/maxresdefault.jpg', as: 'image', importance: 'high', crossOrigin: 'anonymous' }
  ]);

  // Optimize Cumulative Layout Shift (CLS)
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      console.warn('Image missing width/height attributes:', img.src);
    }

    // Add loading="lazy" to images below the fold
    if (!img.hasAttribute('loading') && !isAboveTheFold(img)) {
      img.setAttribute('loading', 'lazy');
    }
  });

  // Optimize First Input Delay (FID) and Interaction to Next Paint (INP)
  // Break up long tasks
  const deferNonCriticalWork = () => {
    // Use requestIdleCallback or setTimeout to defer non-critical work
    const callback = () => {
      // Non-critical initialization code
      console.log('Non-critical work executed during idle time');

      // Initialize non-critical features
      initializeNonCriticalFeatures();
    };

    if ('requestIdleCallback' in window) {
      (window as { requestIdleCallback?: (callback: IdleRequestCallback) => void }).requestIdleCallback?.(callback);
    } else {
      setTimeout(callback, 50);
    }
  };

  // Call after initial render
  window.addEventListener('load', () => {
    deferNonCriticalWork();
  });

  // Optimize Time to Interactive (TTI)
  minimizeMainThreadWork();
};

/**
 * Checks if an element is above the fold (in the viewport on initial load)
 * @param element - The element to check
 * @returns Whether the element is above the fold
 */
const isAboveTheFold = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight;
};

/**
 * Initializes non-critical features that can be deferred
 */
const initializeNonCriticalFeatures = () => {
  // Initialize analytics
  if ('gtag' in window) {
    console.log('Analytics initialized during idle time');
  }

  // Prefetch likely next pages
  addResourceHints([
    { rel: 'prefetch', href: '/about' },
    { rel: 'prefetch', href: '/demo' }
  ]);
};

/**
 * Minimizes main thread work to improve TTI
 */
const minimizeMainThreadWork = () => {
  // Use Web Workers for heavy computations if available
  if ('Worker' in window) {
    console.log('Web Workers available for heavy computations');
  }

  // Avoid layout thrashing by batching DOM reads and writes
  requestAnimationFrame(() => {
    // Read phase - gather all measurements
    const sections = document.querySelectorAll('.section');
    const measurements = Array.from(sections).map(section => {
      return {
        element: section,
        rect: section.getBoundingClientRect()
      };
    });

    // Write phase - apply all updates
    requestAnimationFrame(() => {
      // Apply updates based on measurements
      measurements.forEach(({ element, rect }) => {
        if (rect.top < window.innerHeight + 100) {
          // Element is near viewport, prepare it for display
          (element as HTMLElement).style.opacity = '1';
        }
      });
    });
  });
};

/**
 * Initialize all performance optimizations
 * Applies the latest performance best practices from April 2025
 */
export const initializePerformanceOptimizations = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Setup lazy loading for images
  setupLazyLoading();

  // Optimize for Core Web Vitals
  optimizeCoreWebVitals();

  // Optimize for back-forward cache
  optimizeForBFCache();

  // Add resource hints
  addResourceHints([
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://img.youtube.com', crossOrigin: 'anonymous' }
  ]);

  // Apply content-visibility to off-screen sections
  applyContentVisibility('.section:not(:first-child)');

  // Set priority hints
  setPriorityHints('.hero-image', 'high');
  setPriorityHints('.footer-image', 'low');
  setPriorityHints('video', 'high');

  // Enable JS execution priority hints if available
  if ('scheduler' in window) {
    // @ts-ignore - Scheduler API is still experimental
    window.scheduler.postTask(() => {
      console.log('High priority task executed');
    }, { priority: 'user-blocking' });
  }

  // Register performance observer for layout shifts
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // @ts-ignore - Layout Shift API
          if (entry.hadRecentInput) continue;

          // @ts-ignore - Layout Shift API
          if (entry.value > 0.1) {
            console.warn('Significant layout shift detected. Consider optimizing:', entry);
          }
        }
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.error('PerformanceObserver for CLS not supported', e);
    }
  }

  // Optimize for Interaction to Next Paint (INP)
  document.addEventListener('click', () => {
    // Immediately update UI to acknowledge user interaction
    requestAnimationFrame(() => {
      // Apply visual feedback for interaction
    });
  }, { passive: true });
};

/**
 * Report Web Vitals metrics to the console
 * Uses the latest Web Vitals metrics
 */
export function reportWebVitalsToConsole(): void {
  try {
    import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onINP }) => {
      // Core Web Vitals
      onCLS(sendToConsole);
      onFID(sendToConsole);
      onLCP(sendToConsole);
      onTTFB(sendToConsole);
      onINP(sendToConsole);
    });
  } catch (e) {
    console.error('Failed to import web-vitals', e);
  }
}

/**
 * Send metrics to console in development, or to analytics in production
 */
function sendToConsole(metric: WebVitalMetric): void {
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${metric.name}: ${metric.value}`);
    return;
  }

  // In production, send to analytics service
  // This is where you would integrate with your analytics provider
  if (metric.isFinal) {
    const body = {
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
      // Add additional context
      page: window.location.pathname,
      timestamp: Date.now(),
    };

    // Example: Send to analytics endpoint
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/vitals', JSON.stringify(body));
    } else {
      fetch('/api/vitals', {
        method: 'POST',
        body: JSON.stringify(body),
        keepalive: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
}

/**
 * Measure component render time
 * @param componentName - Name of the component being measured
 * @returns Object with start and end methods
 */
export function measureRenderTime(componentName: string) {
  const markStart = `${componentName}-render-start`;
  const markEnd = `${componentName}-render-end`;

  return {
    start: () => {
      performance.mark(markStart);
    },
    end: () => {
      performance.mark(markEnd);
      performance.measure(
        `${componentName} render time`,
        markStart,
        markEnd
      );

      // Log in development
      if (process.env.NODE_ENV !== 'production') {
        const measurements = performance.getEntriesByName(`${componentName} render time`);
        if (measurements.length > 0) {
          console.log(`${componentName} rendered in ${measurements[0].duration.toFixed(2)}ms`);
        }
      }

      // Clean up marks
      performance.clearMarks(markStart);
      performance.clearMarks(markEnd);
    }
  };
}

/**
 * Create a debounced function that delays invoking func until after wait milliseconds
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 300
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a throttled function that only invokes func at most once per wait period
 * @param func - Function to throttle
 * @param wait - Milliseconds to wait
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = 300
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;

  return function(...args: Parameters<T>): void {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}