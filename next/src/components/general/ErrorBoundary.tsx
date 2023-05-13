/* eslint-disable react/destructuring-assignment */
import React, { ComponentProps } from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: ComponentProps<any>) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
