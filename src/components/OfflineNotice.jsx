import { WifiOff } from 'lucide-react'

/**
 * Small inline notice shown if a query could not reach the backend API
 * and fell back to cached educational reference data instead.
 */
export default function OfflineNotice({ className = '' }) {
  return (
    <div
      role="status"
      className={`flex items-center gap-2 rounded-sm border border-brass/30 bg-brass/5 px-3 py-2 text-xs text-brass-dark ${className}`}
    >
      <WifiOff size={13} aria-hidden="true" />
      Showing local reference content — connecting to backend API...
    </div>
  )
}
