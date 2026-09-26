import { useState, useEffect, useRef, useId } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Controlled or uncontrolled search input.
 * Supports onSearch, value, onClear, onChange, and shortcut indicator.
 */
export default function SearchBar({
  id: customId,
  placeholder = 'Search...',
  size = 'md',
  onSearch,
  onChange,
  onClear,
  autoFocus = false,
  initialValue = '',
  value: controlledValue,
  className = '',
  showShortcut = false,
}) {
  const { t, isHindi } = useLanguage()
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(initialValue)
  const inputRef = useRef(null)
  const generatedId = useId()
  const inputId = customId || (showShortcut ? 'site-search-input' : `search-input-${generatedId}`)

  const currentValue = isControlled ? controlledValue : internalValue

  useEffect(() => {
    if (!isControlled && initialValue !== undefined) {
      setInternalValue(initialValue)
    }
  }, [initialValue, isControlled])

  function handleChange(e) {
    const val = e.target.value
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSearch?.(currentValue.trim())
  }

  function handleClear() {
    if (!isControlled) {
      setInternalValue('')
    }
    onChange?.('')
    onClear?.()
    onSearch?.('')
    inputRef.current?.focus()
  }

  const isLarge = size === 'lg'

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-stretch overflow-hidden rounded-md border border-border bg-paper
        focus-within:border-brass focus-within:ring-1 focus-within:ring-brass/30 shadow-card transition-all ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <span className="flex items-center pl-4 text-navy/60" aria-hidden="true">
        <SearchIcon size={isLarge ? 22 : 18} />
      </span>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full flex-1 bg-transparent px-3 outline-none placeholder:text-ink/65 text-navy
          ${isLarge ? 'py-4 text-base sm:text-lg min-h-[48px]' : 'py-2.5 text-sm min-h-[44px]'}`}
      />
      {currentValue ? (
        <button
          type="button"
          onClick={handleClear}
          title={isHindi ? 'खोज साफ़ करें' : 'Clear search'}
          aria-label={isHindi ? 'खोज साफ़ करें' : 'Clear search query'}
          className="flex min-w-[44px] min-h-[44px] items-center justify-center px-3 text-ink/60 hover:text-navy focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass transition-colors"
        >
          <X size={18} aria-hidden="true" />
        </button>
      ) : showShortcut ? (
        <div className="hidden sm:flex items-center pr-3" aria-hidden="true">
          <kbd className="rounded border border-border/80 bg-paper-dim px-1.5 py-0.5 font-mono text-[10px] text-ink/60 shadow-xs">
            /
          </kbd>
        </div>
      ) : null}
      <button
        type="submit"
        className={`shrink-0 bg-navy font-medium text-paper hover:bg-navy-light focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-1 transition-colors min-h-[44px]
          ${isLarge ? 'px-6 text-sm sm:text-base' : 'px-4 text-sm'}`}
      >
        {t('actions.search', 'Search')}
      </button>
    </form>
  )
}

