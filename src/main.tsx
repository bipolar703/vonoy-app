import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { reportWebVitalsToConsole } from './hooks/useWebVitals';
import ErrorFallback from './components/ui/ErrorFallback';
import RouteTransition from './components/ui/RouteTransition';
import { initializePerformanceOptimizations } from './utils/performance';
import './index.css';

// Use dynamic import for better code splitting
const App = lazy(() => import('./App'));

// Get the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (!rootElement) {
  throw new Error('Root element not found');
}

// Initialize performance optimizations
initializePerformanceOptimizations();

// Create root and render app
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
      onError={(error) => console.error('Application error:', error)}
    >
      <Suspense fallback={<RouteTransition />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

// Report web vitals
reportWebVitalsToConsole();

// Enable hot module replacement for faster development
if (import.meta.hot) {
  import.meta.hot.accept();
}
