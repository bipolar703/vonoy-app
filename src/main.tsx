import { StrictMode, Suspense, lazy, startTransition } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorFallback from './components/ui/ErrorFallback';
import RouteTransition from './components/ui/RouteTransition';
import { initializePerformanceOptimizations, measureRenderTime } from './utils/performance';
import { reportWebVitalsToConsole } from './hooks/useWebVitals';
import './index.css';

// Preload critical assets
const preloadAssets = () => {
  if (typeof document === 'undefined') return;

  // Preload the logo for the loader
  const logoLink = document.createElement('link');
  logoLink.rel = 'preload';
  logoLink.as = 'image';
  logoLink.href = '/logo.svg';
  document.head.appendChild(logoLink);

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.href = '/fonts/inter-var.woff2';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preload YouTube thumbnail for the video section
  const ytThumbnail = document.createElement('link');
  ytThumbnail.rel = 'preload';
  ytThumbnail.as = 'image';
  ytThumbnail.href = 'https://img.youtube.com/vi/hxm2rdVl7Y0/maxresdefault.jpg';
  ytThumbnail.crossOrigin = 'anonymous';
  document.head.appendChild(ytThumbnail);
};

// Use dynamic import for better code splitting
const HomePage = lazy(() => import('./App'));
const AboutUsPage = lazy(() => import('./components/pages/AboutUs'));
const BookDemoPage = lazy(() => import('./components/pages/BookDemo'));
const NotFoundPage = lazy(() => import('./components/pages/NotFound'));
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
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/demo" element={<BookDemoPage />} />
              {/* Catch-all route for pages under development */}
              <Route path="/solutions/*" element={<GenericPage />} />
              <Route path="/features/*" element={<GenericPage />} />
              {/* 404 page for any unmatched routes */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
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
