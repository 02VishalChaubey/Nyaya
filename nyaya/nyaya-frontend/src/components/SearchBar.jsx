import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

/**
 * Controlled or uncontrolled search input. Pass `onSearch` to receive the
 * query string on submit (Enter key or button click).
 */
export default function SearchBar({
  placeholder = 'Search...',
  size = 'md',
  onSearch,
  autoFocus = false,
  initialValue = '',
  className = '',
}) {
  const [value, setValue] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    onSearch?.(value.trim())
  }

  const isLarge = size === 'lg'

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-stretch overflow-hidden rounded-md border border-border bg-paper
        focus-within:border-brass shadow-card ${className}`}
    >
      <label htmlFor="site-search-input" className="sr-only">
        {placeholder}
      </label>
      <span className="flex items-center pl-4 text-navy/50" aria-hidden="true">
        <SearchIcon size={isLarge ? 22 : 18} />
      </span>
      <input
        id="site-search-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full flex-1 bg-transparent px-3 outline-none placeholder:text-ink/40
          ${isLarge ? 'py-4 text-lg' : 'py-2.5 text-sm'}`}
      />
      <button
        type="submit"
        className={`shrink-0 bg-navy font-medium text-paper hover:bg-navy-light transition-colors
          ${isLarge ? 'px-6 text-base' : 'px-4 text-sm'}`}
      >
        Search
      </button>
    </form>
  )
}
