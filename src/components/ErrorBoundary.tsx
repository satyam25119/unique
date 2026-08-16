"use client";

import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  private handleRetry = (): void => {
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[400px] px-6 py-20">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12 text-center max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-brand" strokeWidth={1.8} />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Something went wrong
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              An unexpected error occurred. This has been logged and we&apos;ll look into it.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-300 btn-press"
            >
              <RotateCcw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
