import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-[24px] font-semibold text-[#111827] mb-3">
              Something went wrong
            </h2>
            <p className="text-[#6B7280] mb-6">
              Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 h-[48px] rounded-xl bg-[#034EA2] hover:bg-[#8DC63F] text-white font-medium transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
