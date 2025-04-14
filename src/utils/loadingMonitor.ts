/**
 * Loading Monitor Utility
 * 
 * This utility helps monitor and diagnose loading issues in the application.
 * It tracks resource loading, network requests, and performance metrics.
 */

// Track loading state
let loadingState = {
  appInitialized: false,
  domContentLoaded: false,
  windowLoaded: false,
  resourcesLoaded: false,
  pendingRequests: 0,
  errors: [] as string[],
  lastActivity: 'Initializing...',
  loadingStartTime: Date.now(),
};

// Track resource loading
const resourceLoadTimes: Record<string, number> = {};

/**
 * Initialize the loading monitor
 */
export function initLoadingMonitor() {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Track DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadingState.domContentLoaded = true;
      loadingState.lastActivity = 'DOM content loaded';
      logLoadingState('DOMContentLoaded');
    });
  } else {
    loadingState.domContentLoaded = true;
    loadingState.lastActivity = 'DOM already loaded';
    logLoadingState('DOMContentLoaded (already)');
  }

  // Track window load complete
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
      loadingState.windowLoaded = true;
      loadingState.lastActivity = 'Window loaded';
      checkResourcesLoaded();
      logLoadingState('Window load');
    });
  } else {
    loadingState.windowLoaded = true;
    loadingState.lastActivity = 'Window already loaded';
    checkResourcesLoaded();
    logLoadingState('Window load (already)');
  }

  // Track resource loading
  if ('PerformanceObserver' in window) {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            resourceLoadTimes[resourceEntry.name] = resourceEntry.duration;
            
            // Check for slow resources (taking more than 2 seconds)
            if (resourceEntry.duration > 2000) {
              console.warn(`Slow resource load: ${resourceEntry.name} (${resourceEntry.duration.toFixed(2)}ms)`);
            }
          }
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.error('PerformanceObserver for resources not supported', e);
    }
  }

  // Track JavaScript errors
  window.addEventListener('error', (event) => {
    loadingState.errors.push(`JS Error: ${event.message} at ${event.filename}:${event.lineno}`);
    loadingState.lastActivity = `JavaScript error occurred: ${event.message}`;
    logLoadingState('JavaScript error');
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    loadingState.errors.push(`Promise rejection: ${event.reason}`);
    loadingState.lastActivity = `Unhandled promise rejection: ${event.reason}`;
    logLoadingState('Unhandled promise rejection');
  });

  // Mark app as initialized
  loadingState.appInitialized = true;
  logLoadingState('App initialized');
}

/**
 * Check if all resources are loaded
 */
function checkResourcesLoaded() {
  const resources = Array.from(document.querySelectorAll('img, script, link[rel="stylesheet"]'));
  const allLoaded = resources.every((resource: any) => {
    if (resource.tagName === 'IMG') {
      return resource.complete;
    }
    return true;
  });
  
  loadingState.resourcesLoaded = allLoaded;
  loadingState.lastActivity = allLoaded ? 'All resources loaded' : 'Some resources still loading';
  
  if (!allLoaded) {
    // Find incomplete resources
    const incompleteResources = Array.from(document.querySelectorAll('img'))
      .filter((img: HTMLImageElement) => !img.complete)
      .map((img: HTMLImageElement) => img.src);
    
    if (incompleteResources.length > 0) {
      console.warn('Incomplete resources:', incompleteResources);
    }
  }
}

/**
 * Log the current loading state
 */
function logLoadingState(trigger: string) {
  const loadTime = Date.now() - loadingState.loadingStartTime;
  console.log(`[LoadingMonitor] ${trigger} - ${loadTime}ms`, {
    ...loadingState,
    loadTime: `${loadTime}ms`,
  });
}

/**
 * Get the current loading state
 */
export function getLoadingState() {
  return { ...loadingState };
}

/**
 * Mark a specific loading milestone
 */
export function markLoadingMilestone(milestone: string) {
  const loadTime = Date.now() - loadingState.loadingStartTime;
  loadingState.lastActivity = milestone;
  console.log(`[LoadingMonitor] Milestone: ${milestone} - ${loadTime}ms`);
}

/**
 * Report a loading error
 */
export function reportLoadingError(error: string) {
  loadingState.errors.push(error);
  loadingState.lastActivity = `Error: ${error}`;
  console.error(`[LoadingMonitor] Error: ${error}`);
}

// Export the loading monitor
export default {
  initLoadingMonitor,
  getLoadingState,
  markLoadingMilestone,
  reportLoadingError,
};
