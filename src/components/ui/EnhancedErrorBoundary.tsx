import React, { Component, ErrorInfo, ReactNode } from 'react';
import ApplicationError from './ApplicationError';

interface Props {
  children: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, info: ErrorInfo) => void;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorDetails: {
    message: string;
    stack: string;
    componentStack: string;
    errorCode: string;
  };
}

/**
 * EnhancedErrorBoundary Component
 *
 * A robust error boundary component that provides a better UX when errors occur.
 * Features:
 * - Detailed error information for developers
 * - User-friendly error messages
 * - Recovery options
 * - Error tracking
 * - Specific handling for common errors
 */
class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: {
        message: '',
        stack: '',
        componentStack: '',
        errorCode: '',
      }
    };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Process the error
    const errorDetails = this.processError(error, errorInfo);

    // Update state with error details
    this.setState({
      errorInfo,
      errorDetails
    });

    // Log the error to the console
    console.error('Error caught by EnhancedErrorBoundary:', error, errorInfo);

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Process the error to extract useful information and categorize it
   */
  processError(error: Error, errorInfo: ErrorInfo) {
    // Default error details
    const errorDetails = {
      message: error.message || 'An unknown error occurred',
      stack: error.stack || '',
      componentStack: errorInfo.componentStack || '',
      errorCode: 'UNKNOWN_ERROR',
    };

    // Categorize common errors
    if (error.message.includes('does not provide an export named')) {
      errorDetails.errorCode = 'MODULE_EXPORT_ERROR';
    } else if (error.message.includes('Cannot read properties of')) {
      errorDetails.errorCode = 'NULL_REFERENCE_ERROR';
    } else if (error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
      errorDetails.errorCode = 'NETWORK_ERROR';
    } else if (error.message.includes('Maximum update depth exceeded')) {
      errorDetails.errorCode = 'INFINITE_LOOP_ERROR';
    } else if (error.message.includes('Unexpected token')) {
      errorDetails.errorCode = 'SYNTAX_ERROR';
    }

    return errorDetails;
  }

  /**
   * Get a user-friendly error message based on the error code
   */
  getUserFriendlyMessage() {
    const { errorCode } = this.state.errorDetails;

    switch (errorCode) {
      case 'MODULE_EXPORT_ERROR':
        return 'There was a problem loading a required component. This is likely a temporary issue.';
      case 'NULL_REFERENCE_ERROR':
        return 'The application tried to access data that wasn\'t available yet.';
      case 'NETWORK_ERROR':
        return 'There was a problem connecting to the server. Please check your internet connection.';
      case 'INFINITE_LOOP_ERROR':
        return 'The application encountered a processing error.';
      case 'SYNTAX_ERROR':
        return 'There was a problem with the application code.';
      default:
        return 'Something went wrong. We\'re working to fix the issue.';
    }
  }

  /**
   * Get recovery suggestions based on the error code
   */
  getRecoverySuggestions() {
    const { errorCode } = this.state.errorDetails;

    const suggestions = [
      'Try refreshing the page',
      'Clear your browser cache and cookies',
    ];

    switch (errorCode) {
      case 'MODULE_EXPORT_ERROR':
        suggestions.push('Try clearing your browser cache');
        suggestions.push('Reload the application');
        break;
      case 'NETWORK_ERROR':
        suggestions.push('Check your internet connection');
        suggestions.push('Try again in a few minutes');
        break;
      default:
        suggestions.push('Return to the homepage');
        break;
    }

    return suggestions;
  }

  resetErrorBoundary(): void {
    // Reset the error boundary state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: {
        message: '',
        stack: '',
        componentStack: '',
        errorCode: '',
      }
    });

    // Call the onReset callback if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Use our enhanced ApplicationError component
      return (
        <ApplicationError
          error={this.state.error!}
          resetErrorBoundary={this.resetErrorBoundary}
          errorCode={this.state.errorDetails.errorCode}
        />
      );
    }

    // Render children if there's no error
    return this.props.children;
  }
}

export default EnhancedErrorBoundary;
