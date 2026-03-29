import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-8 border border-red-500/50">
            <span className="text-red-500 text-4xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">System Failure</h1>
          <p className="text-white/60 max-w-md mb-8 font-mono text-sm">
            A critical error has occurred in the OS. Please refresh or contact support if the issue persists.
          </p>
          <div className="bg-zinc-900 border border-white/10 p-4 rounded-xl text-left w-full max-w-lg overflow-auto max-h-48 mb-8">
            <pre className="text-red-400 text-xs font-mono">
              {this.state.error?.message}
            </pre>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

