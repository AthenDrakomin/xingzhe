import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#020617] text-slate-300">
          <h1 className="text-2xl font-bold text-red-400 mb-4">糟糕，出错了！</h1>
          <p className="text-slate-400 mb-6">应用程序遇到了意外错误。</p>
          <button 
            className="px-4 py-2 bg-emerald-800/50 border border-emerald-700/50 rounded text-slate-300 hover:bg-emerald-800/70 transition-colors"
            onClick={() => window.location.reload()}
          >
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;