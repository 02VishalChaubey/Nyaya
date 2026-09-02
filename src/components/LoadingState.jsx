import { Loader2 } from 'lucide-react'

export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-16 text-ink/50">
      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
