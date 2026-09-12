/**
 * Reusable page-header hero. The homepage uses the richer `children` slot
 * for its two CTAs and search bar; inner pages pass just eyebrow/title/subtitle.
 */
/**
 * Reusable page-header hero. The homepage uses the richer `children` slot
 * and the 'enmachi' background variant. Inner pages pass standard eyebrow/title/subtitle.
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  children,
  size = 'lg',
  background = 'default',
  image,
}) {
  const isLarge = size === 'lg'
  const isEnmachi = background === 'enmachi'

  if (isEnmachi) {
    return (
      <section
        id="enmachi-hero-section"
        className="relative overflow-hidden border-b border-slate-800/90 bg-[#050B14] text-white"
      >
        {/* Full-bleed Enmachi Background Artwork */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat opacity-95"
          style={{ backgroundImage: "url('/enmachi-bg.svg')" }}
        />

        {/* Ambient Dark Overlay to ensure 100% WCAG AA contrast for text content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/80 to-transparent sm:from-[#050B14]/95 sm:via-[#050B14]/70"
        />

        <div className={`container-content relative z-10 ${isLarge ? 'py-16 sm:py-24' : 'py-12 sm:py-16'}`}>
          <div className={isLarge ? 'max-w-3xl' : 'max-w-2xl'}>
            {eyebrow && (
              <span className="mb-5 inline-flex items-center gap-2 rounded-sm border border-cyan-500/40 bg-cyan-950/80 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-cyan-300 uppercase backdrop-blur-xs">
                {eyebrow}
              </span>
            )}
            <h1
              className={`font-display font-semibold leading-[1.1] text-white drop-shadow-sm ${
                isLarge ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl'
              }`}
            >
              {title}
            </h1>
            <div
              className="my-6 h-[3px] w-20 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-transparent"
              aria-hidden="true"
            />
            {subtitle && (
              <p
                className={`font-normal leading-relaxed text-slate-300 ${
                  isLarge ? 'text-lg sm:text-xl' : 'text-base'
                }`}
              >
                {subtitle}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="border-b border-border bg-paper">
      <div className={`container-content ${isLarge ? 'py-12 sm:py-20' : 'py-10 sm:py-16'}`}>
        <div className={image ? 'flex flex-col gap-8 md:flex-row md:items-center md:justify-between' : ''}>
          <div className={image ? 'max-w-xl' : isLarge ? 'max-w-3xl' : 'max-w-2xl'}>
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

