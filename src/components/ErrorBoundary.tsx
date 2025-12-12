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
    // 更新 state 使下一次渲染可以显示降级 UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // 你可以自定义降级 UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-slate-300 p-4">
          <div className="max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-red-400">糟糕，出现了一些问题</h2>
            <p className="mb-4">应用程序遇到了一个错误，无法正常运行。</p>
            <div className="bg-slate-900/50 border border-white/10 rounded-sm p-4 mb-4 text-left">
              <p className="text-sm text-slate-400 mb-2">错误详情:</p>
              <p className="text-xs font-mono text-red-400">
                {this.state.error?.message || '未知错误'}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-900/50 hover:bg-emerald-900 text-slate-300 rounded-sm transition-colors"
            >
              重新加载页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;