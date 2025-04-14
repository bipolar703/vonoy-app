import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';

interface Props {
  children: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * CustomErrorBoundary Component
 * 
 * A custom error boundary component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * This component is used as a replacement for react-error-boundary to avoid issues with
 * lockdown-install.js and intrinsics.
 */
class CustomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log the error to the console
    console.error('Error caught by CustomErrorBoundary:', error, info);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  resetErrorBoundary(): void {
    // Reset the error boundary state
    this.setState({ hasError: false, error: null });
    
    // Call the onReset callback if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Render the error fallback UI
      return (
        <ErrorFallback 
          error={this.state.error} 
          resetErrorBoundary={this.resetErrorBoundary} 
        />
      );
    }

    // Render the children if there's no error
    return this.props.children;
  }
}

export default CustomErrorBoundary;
