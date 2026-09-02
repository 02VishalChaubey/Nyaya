import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function SectionCard({ section }) {
  const [open, setOpen] = useState(false)
  const panelId = `section-panel-${section.id}`

  return (
    <div className="card-surface overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          <span className="article-tab mr-2">{section.number}</span>
          <span className="font-medium text-navy">{section.title}</span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-navy/50 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={panelId} className="border-t border-border px-4 pb-4 pt-3">
          <p className="text-sm leading-relaxed text-ink/70">{section.content}</p>
        </div>
      )}
    </div>
  )
}
