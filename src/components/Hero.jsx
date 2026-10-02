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
    <section className="border-b border-border/80 bg-paper">
      <div className={`container-content ${isLarge ? 'py-14 sm:py-20 lg:py-24' : 'py-10 sm:py-16'}`}>
        {image ? (
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-16">
            <div className="md:col-span-7 lg:col-span-7">
              {eyebrow && (
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-3 block">
                  {eyebrow}
                </span>
              )}
              <h1
                className={`font-display font-semibold text-navy tracking-tight leading-[1.08] ${
                  isLarge ? 'text-4xl sm:text-5xl lg:text-[3.5rem]' : 'text-3xl sm:text-4xl'
                }`}
              >
                {title}
              </h1>
              <div className="h-[2px] w-12 bg-maroon mt-5 mb-5" aria-hidden="true" />
              {subtitle && (
                <p className={`text-ink/75 leading-relaxed font-normal ${isLarge ? 'text-lg sm:text-xl' : 'text-base'}`}>
                  {subtitle}
                </p>
              )}
              {children && <div className="mt-8">{children}</div>}
            </div>

            <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-none flex items-center justify-center p-2">
                {image}
              </div>
            </div>
          </div>
        ) : (
          <div className={isLarge ? 'max-w-3xl' : 'max-w-2xl'}>
            {eyebrow && (
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-3 block">
                {eyebrow}
              </span>
            )}
            <h1
              className={`font-display font-semibold text-navy tracking-tight leading-[1.08] ${
                isLarge ? 'text-4xl sm:text-5xl lg:text-[3.5rem]' : 'text-3xl sm:text-4xl'
              }`}
            >
              {title}
            </h1>
            <div className="h-[2px] w-12 bg-maroon mt-5 mb-5" aria-hidden="true" />
            {subtitle && (
              <p className={`text-ink/75 leading-relaxed font-normal ${isLarge ? 'text-lg sm:text-xl' : 'text-base'}`}>
                {subtitle}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
        )}
      </div>
    </section>
  )
}
