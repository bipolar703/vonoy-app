/**
 * Utility function to categorize errors based on their message or status.
 */

export interface RouteErrorResponse {
  status: number;
  data?: any; // Keeping any for data property as its structure might vary
  statusText?: string;
}

export type CategorizableError = Error | RouteErrorResponse | string;

export const categorizeError = (error: CategorizableError): string => {
  // Default error code
  let errorCode = 'UNKNOWN_ERROR';

  if (error instanceof Error) {
    // Categorize common JavaScript errors
    if (error.message.includes('does not provide an export named')) {
      errorCode = 'MODULE_EXPORT_ERROR';
    } else if (error.message.includes('Cannot read properties of')) {
      errorCode = 'NULL_REFERENCE_ERROR';
    } else if (
      error.message.includes('Failed to fetch') ||
      error.message.includes('Network Error')
    ) {
      errorCode = 'NETWORK_ERROR';
    } else if (error.message.includes('Maximum update depth exceeded')) {
      errorCode = 'INFINITE_LOOP_ERROR';
    } else if (error.message.includes('Unexpected token')) {
      errorCode = 'SYNTAX_ERROR';
    }
  } else if (typeof error === 'object' && error !== null && 'status' in error) {
    // Categorize common route errors (assuming structure from react-router-dom isRouteErrorResponse)
    const routeError = error as RouteErrorResponse;
    if (routeError.status === 404) {
      errorCode = 'NOT_FOUND';
    } else if (routeError.status === 401) {
      errorCode = 'UNAUTHORIZED';
    } else if (routeError.status === 403) {
      errorCode = 'FORBIDDEN';
    } else if (routeError.status === 500) {
      errorCode = 'SERVER_ERROR';
    }
  } else if (typeof error === 'string') {
    // Handle simple string errors if necessary, though less common with structured errors
    errorCode = 'STRING_ERROR';
  }

  return errorCode;
};
