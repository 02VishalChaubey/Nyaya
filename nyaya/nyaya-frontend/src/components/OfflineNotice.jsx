import { WifiOff } from 'lucide-react'

/**
 * Small inline notice shown when a page couldn't reach the Django backend
 * and fell back to its local sample data instead.
 */
export default function OfflineNotice({ className = '' }) {
  return (
    <div
      role="status"
      className={`flex items-center gap-2 rounded-sm border border-brass/30 bg-brass/5 px-3 py-2 text-xs text-brass-dark ${className}`}
    >
      <WifiOff size={13} aria-hidden="true" />
      Showing offline sample content — couldn't reach the backend at{' '}
      <code className="font-mono">127.0.0.1:8000</code>.
    </div>
  )
}
