import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <p>⚠️ Что-то пошло не так</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {this.state.error?.message}
          </p>
          <button 
            onClick={this.handleRetry}
            style={{
              padding: '8px 16px',
              marginTop: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Повторить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;