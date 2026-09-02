import { useEffect, useState } from 'react'

/**
 * Generic data-fetching hook.
 *
 * Calls `fetchFn` (a zero-arg async function) whenever `deps` changes.
 * If the call fails — most commonly because the Django backend isn't
 * running — and a `fallback` value was provided, `data` is set to that
 * fallback instead of staying empty, so pages keep working (read-only,
 * with the seed/mock content) even with the backend offline. `usingFallback`
 * tells the page whether that happened, so it can show a small notice.
 */
export function useApi(fetchFn, deps = [], fallback = null) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchFn()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setUsingFallback(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        if (fallback !== null) {
          setData(fallback)
          setUsingFallback(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // fetchFn is intentionally excluded — callers pass a fresh arrow function
    // each render, and re-running the effect is controlled by `deps`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error, usingFallback }
}
