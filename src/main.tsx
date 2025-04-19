import { StrictMode, Suspense, lazy, startTransition } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorFallback from './components/ui/ErrorFallback';
import LoadingScreen from './components/ui/LoadingScreen';
import { reportWebVitalsToConsole } from './hooks/useWebVitals';
import './index.css';
import './styles/phone-input.css';
import './styles/text-quality.css';
import { initializePerformanceOptimizations, measureRenderTime } from './utils/performance';

// Preload the logo for the loader - used immediately
const logoLink = document.createElement('link');
logoLink.rel = 'preload';
logoLink.as = 'image';
logoLink.href = '/logo.svg';
logoLink.fetchPriority = 'high';
document.head.appendChild(logoLink);

// Use prefetch for non-immediate resources to avoid warnings
// Prefetch critical fonts - will be used soon but not immediately
const fontLink = document.createElement('link');
fontLink.rel = 'prefetch'; // Changed from preload to prefetch
fontLink.href = '/fonts/inter-var.woff2';
fontLink.type = 'font/woff2';
fontLink.crossOrigin = 'anonymous';
document.head.appendChild(fontLink);

// Use DNS prefetch for YouTube domain - better than preconnect for external resources
const ytDNS = document.createElement('link');
ytDNS.rel = 'dns-prefetch';
ytDNS.href = 'https://img.youtube.com';

// Use dynamic import for better code splitting
const HomePage = lazy(() => import('./App'));
const AboutUsPage = lazy(() => import('./components/pages/AboutUs'));
const BookDemoPage = lazy(() => import('./components/pages/BookDemo'));
const UnderDevelopmentPage = lazy(() => import('./components/pages/UnderDevelopment'));
const SolutionsPage = lazy(() => import('./components/pages/Solutions'));

// Get the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (!rootElement) {
  throw new Error('Root element not found');
}

// Initialize performance optimizations
initializePerformanceOptimizations();

// Create root and render app
const root = ReactDOM.createRoot(rootElement);

// Use startTransition to prioritize UI responsiveness
startTransition(() => {
  root.render(
    <StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
        onError={(error) => console.error('Application error:', error)}
      >
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider
            router={createBrowserRouter(
              createRoutesFromElements(
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/book-demo" element={<BookDemoPage />} />
                  <Route path="/solutions/:type" element={<SolutionsPage />} />
                  <Route path="/solutions" element={<SolutionsPage />} />
                  <Route path="/solutions/*" element={<UnderDevelopmentPage />} />
                  <Route path="/features/*" element={<UnderDevelopmentPage />} />
                  <Route path="/why-vonoy" element={<UnderDevelopmentPage />} />
                  {/* 404 page for any unmatched routes */}
                  <Route path="*" element={<UnderDevelopmentPage />} />
                </>
              ),
              {
                // Enable all future flags to resolve warnings and prepare for v7
                future: {
                  // v7_prependBasename: true,
                },
              }
            )}
          />
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
  // Register service worker for caching (if in production)
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
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
