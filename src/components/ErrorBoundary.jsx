import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("WSET Atlas error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-icon">⚠</div>
          <h2 className="error-title">Something went wrong</h2>
          <p className="error-msg">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            className="error-btn"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
          >
            ← Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
