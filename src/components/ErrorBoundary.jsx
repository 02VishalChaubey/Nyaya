import { Component } from 'react'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Keep error logging clean and safe
    console.error('Nyaya caught an unhandled error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-parchment/30">
          <div className="max-w-md w-full bg-paper border border-crimson/30 rounded-xs shadow-sm p-6 sm:p-8 text-center space-y-5">
            <div className="mx-auto w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
              <AlertTriangle size={24} aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-ink">
                Something went wrong
              </h2>
              <p className="text-xs text-ink/70 leading-relaxed">
                An unexpected display error occurred while rendering this legal view. Your saved bookmarks and local data are safe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-navy text-paper text-xs font-semibold rounded-xs hover:bg-navy-light transition-colors"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Try Again</span>
              </button>
              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-border text-ink text-xs font-semibold rounded-xs hover:border-navy hover:text-navy transition-colors bg-white"
              >
                <Home size={14} aria-hidden="true" />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
