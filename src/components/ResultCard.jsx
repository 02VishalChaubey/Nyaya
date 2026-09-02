/**
 * Generic result card used on the Situation Result page for relevant laws,
 * remedies, and penalties. Kept flexible (tag + title + description) so the
 * same component covers all three sections without duplication.
 */
export default function ResultCard({ tag, title, description, className = '' }) {
  return (
    <div className={`card-surface p-5 ${className}`}>
      {tag && <span className="article-tab mb-3 inline-block">{tag}</span>}
      <h3 className="font-semibold text-navy leading-snug">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>
      )}
    </div>
  )
}
