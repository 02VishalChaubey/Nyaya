// Privacy-Safe Local Recent Searches Management
// Stored strictly in browser localStorage; never transmitted to any telemetry or server.

const STORAGE_KEY = 'nyaya_legal_recent_searches'
const MAX_RECENT = 8

export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveRecentSearch(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') return []
  const clean = rawQuery.trim()
  if (!clean || clean.length < 2) return getRecentSearches()

  try {
    const current = getRecentSearches()
    const filtered = current.filter((item) => item.toLowerCase() !== clean.toLowerCase())
    const updated = [clean, ...filtered].slice(0, MAX_RECENT)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export function removeRecentSearch(queryToRemove) {
  if (!queryToRemove) return getRecentSearches()
  try {
    const current = getRecentSearches()
    const updated = current.filter((item) => item.toLowerCase() !== queryToRemove.toLowerCase().trim())
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export function clearRecentSearches() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return []
  } catch {
    return []
  }
}
