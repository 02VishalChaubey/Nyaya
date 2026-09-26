import { CheckCircle2, AlertTriangle } from 'lucide-react'

/**
 * A small inline marker of verification state — for placing next to a
 * claim, heading, or list row without taking up a full source block.
 * Never claims "verified" unless a real verification note was supplied.
 */
export default function SourceBadge({ verified, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
        verified ? 'text-emerald-700' : 'text-brass-dark'
      }`}
    >
      {verified ? (
        <>
          <CheckCircle2 size={11} aria-hidden="true" />
          {label || 'Verified source'}
        </>
      ) : (
        <>
          <AlertTriangle size={11} aria-hidden="true" />
          {label || 'Unverified'}
        </>
      )}
    </span>
  )
}
