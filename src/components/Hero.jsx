/**
 * Reusable page-header hero. Inner pages pass eyebrow/title/subtitle;
 * the homepage additionally uses the `children` slot for its CTAs and
 * search bar. A single institutional style is used everywhere so the
 * site reads as one product rather than switching visual language
 * page to page.
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  children,
  size = 'lg',
  image,
}) {
  const isLarge = size === 'lg'

  return (
    <section className="border-b border-border bg-paper">
      <div className={`container-content ${isLarge ? 'py-12 sm:py-20' : 'py-10 sm:py-16'}`}>
        <div className={image ? 'flex flex-col gap-8 md:flex-row md:items-center md:justify-between' : ''}>
          <div className={image ? 'max-w-xl' : isLarge ? 'max-w-3xl' : 'max-w-2xl'}>
            {eyebrow && (
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-3 block">
                {eyebrow}
              </span>
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

          {image && (
            <div className="shrink-0 flex justify-center md:justify-end">
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
