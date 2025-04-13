import { StrictMode, Suspense, lazy, startTransition } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider, Routes, Route, createRoutesFromElements } from 'react-router-dom';
import ErrorFallback from './components/ui/ErrorFallback';
import RouteTransition from './components/ui/RouteTransition';
// PageTransition is now included in App.tsx
import { initializePerformanceOptimizations, measureRenderTime } from './utils/performance';
import { reportWebVitalsToConsole } from './hooks/useWebVitals';
import './index.css';
import './styles/navbar.css';
// text-quality.css and mcp-optimization.css are now consolidated in unified-optimizations.css
// which is imported in index.css

// Preload critical assets - optimized for MCP servers
const preloadAssets = () => {
  if (typeof document === 'undefined') return;

  // Create and append all resource hints in a single document fragment for better performance
  const fragment = document.createDocumentFragment();

  // Create resource hints
  const resources = [
    // Preload the logo for the loader - used immediately
    { rel: 'preload', as: 'image', href: '/logo.svg', fetchPriority: 'high' },

    // Prefetch critical fonts - will be used soon but not immediately
    { rel: 'prefetch', href: '/fonts/inter-var.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },

    // Use preconnect for YouTube domain - better than preload for external resources
    { rel: 'preconnect', href: 'https://img.youtube.com', crossOrigin: 'anonymous' },

    // Add DNS prefetch as well for even faster resolution
    { rel: 'dns-prefetch', href: 'https://img.youtube.com' }
  ];

  // Create and append all link elements
  resources.forEach(resource => {
    const link = document.createElement('link');
    Object.entries(resource).forEach(([key, value]) => {
      if (value !== undefined) {
        // @ts-ignore - TypeScript doesn't know about all possible attributes
        link[key] = value;
      }
    });
    fragment.appendChild(link);
  });

  // Append all links at once for better performance
  document.head.appendChild(fragment);
};

// Use dynamic import for better code splitting
const HomePage = lazy(() => import('./App'));
const AboutUsPage = lazy(() => import('./components/pages/AboutUs'));
const BookDemoPage = lazy(() => import('./components/pages/BookDemo'));
const UnderDevelopmentPage = lazy(() => import('./components/pages/UnderDevelopment'));
const GenericPage = lazy(() => import('./components/pages/GenericPage'));

// Get the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (!rootElement) {
  throw new Error('Root element not found');
}

// Initialize performance optimizations
initializePerformanceOptimizations();

// Preload critical assets
preloadAssets();

// Create root and render app
const root = ReactDOM.createRoot(rootElement);

// Single global loading indicator to prevent multiple loading states
let isFirstLoad = true;

// Use startTransition to prioritize UI responsiveness
startTransition(() => {
  root.render(
    <StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
        onError={(error) => console.error('Application error:', error)}
      >
        <Suspense fallback={<RouteTransition />}>
          <RouterProvider router={createBrowserRouter(
            createRoutesFromElements(
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/demo" element={<BookDemoPage />} />

                {/* Solutions routes */}
                <Route path="/solutions/*" element={<UnderDevelopmentPage />} />

                {/* Industries routes */}
                <Route path="/industries/*" element={<UnderDevelopmentPage />} />

                {/* Resources routes */}
                <Route path="/resources/*" element={<UnderDevelopmentPage />} />

                {/* More dropdown routes */}
                <Route path="/careers" element={<UnderDevelopmentPage />} />
                <Route path="/contact" element={<UnderDevelopmentPage />} />
                <Route path="/faq" element={<UnderDevelopmentPage />} />

                {/* Legacy routes */}
                <Route path="/features/*" element={<UnderDevelopmentPage />} />
                <Route path="/why-vonoy" element={<UnderDevelopmentPage />} />

                {/* 404 page for any unmatched routes */}
                <Route path="*" element={<UnderDevelopmentPage />} />
              </>
            ),
            {
              // Enable all future flags to resolve warnings and prepare for v7
              future: {
                v7_startTransition: true,
                v7_relativeSplatPath: true,
                v7_normalizeFormMethod: true,
                v7_prependBasename: true
              }
            }
          )} />
        </Suspense>
      </ErrorBoundary>
    </StrictMode>
  );
});

// Report web vitals in development
if (process.env.NODE_ENV !== 'production') {
  reportWebVitalsToConsole();
}

// Add event listener to track when the app is fully loaded
window.addEventListener('load', () => {
  // Mark first load as complete
  isFirstLoad = false;

  // Register service worker for caching (if in production)
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(error => {
      console.error('SW registration failed:', error);
    });
  }
});

// Add enhanced performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Measure app initialization time
  const appInitTimer = measureRenderTime('AppInitialization');
  appInitTimer.start();

  // Report Core Web Vitals using web-vitals library
  reportWebVitalsToConsole();

  // Additional performance monitoring
  window.addEventListener('load', () => {
    // Mark app initialization complete
    appInitTimer.end();

    // Register PerformanceObserver for long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry) => {
            // Log long tasks (tasks that block the main thread for more than 50ms)
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
            }
          });
        });

        longTaskObserver.observe({ type: 'longtask', buffered: true });
      } catch (e) {
        console.error('PerformanceObserver for long tasks not supported', e);
      }
    }

    // Report navigation timing metrics
    if (window.performance && 'getEntriesByType' in window.performance) {
      const entries = performance.getEntriesByType('navigation');
      if (entries.length > 0) {
        const navigationEntry = entries[0] as PerformanceNavigationTiming;

        // Calculate and log key metrics
        console.info('Navigation timing metrics:', {
          // Time to first byte
          TTFB: navigationEntry.responseStart - navigationEntry.requestStart,
          // DOM Content Loaded
          DCL: navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart,
          // Load event
          loadTime: navigationEntry.loadEventEnd - navigationEntry.fetchStart,
          // Time to Interactive approximation
          TTI: navigationEntry.domInteractive - navigationEntry.fetchStart,
        });
      }
    }
  });
}

// Enable hot module replacement for faster development
if (import.meta.hot) {
  import.meta.hot.accept();
}
