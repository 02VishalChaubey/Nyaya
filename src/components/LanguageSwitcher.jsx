import React from 'react'
import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Accessible Language Switcher:
 *   English | हिंदी
 *
 * Provides:
 * - Proper ARIA pressed and group semantics
 * - Correct lang attributes for assistive technology
 * - Clean institutional Nyaya styling
 */
export default function LanguageSwitcher({ className = '', showIcon = false, size = 'sm' }) {
  const { language, setLanguage } = useLanguage()

  const isSmall = size === 'sm'

  return (
    <div
      role="group"
      aria-label="Language selection / भाषा चयन"
      className={`inline-flex items-center rounded-sm border border-border bg-page/80 p-0.5 text-xs font-medium text-ink/75 transition-colors ${className}`}
    >
      {showIcon && (
        <span className="pl-1.5 pr-1 text-navy/60" aria-hidden="true">
          <Languages size={13} />
        </span>
      )}

      {/* English Option */}
      <button
        type="button"
        lang="en"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`rounded-xs transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-brass ${
          isSmall ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1 text-xs'
        } ${
          language === 'en'
            ? 'bg-navy font-semibold text-white shadow-2xs'
            : 'text-ink/70 hover:text-navy hover:bg-black/5'
        }`}
      >
        English
      </button>

      {/* Divider */}
      <span className="px-1 text-border font-light select-none" aria-hidden="true">
        |
      </span>

      {/* Hindi Option */}
      <button
        type="button"
        lang="hi"
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
        className={`rounded-xs font-serif transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-brass ${
          isSmall ? 'px-2 py-1 text-[12px]' : 'px-2.5 py-1 text-xs'
        } ${
          language === 'hi'
            ? 'bg-navy font-semibold text-white shadow-2xs'
            : 'text-ink/70 hover:text-navy hover:bg-black/5'
        }`}
      >
        हिंदी
      </button>
    </div>
  )
}
