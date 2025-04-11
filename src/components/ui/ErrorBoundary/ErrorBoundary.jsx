import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorFallback from '../ErrorFallback.jsx';
import './ErrorBoundary.css';

/**
 * ErrorBoundary Component
 * 
 * A component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * @extends {Component}
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  /**
   * Update state when an error occurs
   * 
   * @param {Error} error - The error that was thrown
   * @returns {Object} - New state with error information
   */
  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error 
    };
  }

  /**
   * Catch errors in any components below and re-render with error message
   * 
   * @param {Error} error - The error that was thrown
   * @param {React.ErrorInfo} errorInfo - Component stack information
   */
  componentDidCatch(error, errorInfo) {
    // Update state with error info
    this.setState({
      errorInfo
    });

    // Log the error to an error reporting service
    this.logErrorToService(error, errorInfo);
    
    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Log error to an error reporting service
   * 
   * @param {Error} error - The error that was thrown
   * @param {React.ErrorInfo} errorInfo - Component stack information
   */
  logErrorToService(error, errorInfo) {
    // In a real app, you would send this to an error reporting service like Sentry
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo?.componentStack);
  }

  /**
   * Reset the error boundary state
   */
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Call onReset callback if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;

    // If there's an error, render the fallback UI
    if (hasError) {
      // Use custom fallback if provided, otherwise use default ErrorFallback
      if (fallback) {
        return React.isValidElement(fallback)
          ? React.cloneElement(fallback, {
              error,
              errorInfo,
              resetErrorBoundary: this.resetErrorBoundary
            })
          : fallback(error, errorInfo, this.resetErrorBoundary);
      }

      // Default fallback
      return (
        <ErrorFallback
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    // Otherwise, render children normally
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  onError: PropTypes.func,
  onReset: PropTypes.func
};

export default ErrorBoundary;
