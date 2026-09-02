/**
 * Reusable page-header hero. The homepage uses the richer `children` slot
 * for its two CTAs and search bar; inner pages pass just eyebrow/title/subtitle.
 */
export default function Hero({ eyebrow, title, subtitle, children, size = 'lg' }) {
  const isLarge = size === 'lg'

  return (
    <section className="border-b border-border bg-paper">
      <div className={`container-content ${isLarge ? 'py-16 sm:py-24' : 'py-12 sm:py-16'}`}>
        <div className={isLarge ? 'max-w-3xl' : 'max-w-2xl'}>
          {eyebrow && (
            <span className="article-tab mb-5">{eyebrow}</span>
          )}
          <h1
            className={`font-display font-semibold leading-[1.1] text-navy ${
              isLarge ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            {title}
          </h1>
          <div className="rule-divider mt-6 mb-6" aria-hidden="true" />
          {subtitle && (
            <p className={`text-ink/70 leading-relaxed ${isLarge ? 'text-lg sm:text-xl' : 'text-base'}`}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
