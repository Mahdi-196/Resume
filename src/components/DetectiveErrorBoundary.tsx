import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class DetectiveErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Detective Office Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen bg-noir-shadow flex items-center justify-center">
          <div className="text-center space-y-4 p-8 bg-detective-wood border border-detective-brass rounded-lg">
            <h2 className="text-2xl font-bold text-detective-glow">
              Case Files Temporarily Unavailable
            </h2>
            <p className="text-detective-paper">
              The detective is investigating a technical issue.
            </p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-detective-brass text-noir-shadow rounded hover:bg-detective-glow transition-colors"
            >
              Retry Investigation
            </button>
            {this.state.error && (
              <details className="text-left text-xs text-detective-smoke mt-4">
                <summary>Technical Details</summary>
                <pre className="mt-2 p-2 bg-noir-shadow rounded">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}