import { getCLS, getFCP, getFID, getLCP, getTTFB, type Metric } from 'web-vitals';

/**
 * Custom hook to report web vitals metrics
 * 
 * @param onPerfEntry - Callback function to handle the metrics
 */
export function useWebVitals(onPerfEntry?: (metric: Metric) => void): void {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Core Web Vitals
    getCLS(onPerfEntry); // Cumulative Layout Shift
    getFID(onPerfEntry); // First Input Delay
    getLCP(onPerfEntry); // Largest Contentful Paint
    
    // Other metrics
    getFCP(onPerfEntry); // First Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
  }
}

/**
 * Helper function to log web vitals to console
 */
export function reportWebVitalsToConsole(): void {
  useWebVitals((metric) => {
    console.log(`Web Vitals: ${metric.name}`, metric);
  });
}
