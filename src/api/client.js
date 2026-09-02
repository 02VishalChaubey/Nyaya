// Thin wrapper around fetch() for the Django backend.
//
// Base URL comes from VITE_API_BASE_URL (see .env.example) and falls back to
// the default local dev address, so this works out of the box with
// `python manage.py runserver` on 127.0.0.1:8000.

const RAW_BASE = import.meta.env.VITE_API_BASE_URL || '/api'
export const API_BASE_URL = RAW_BASE.replace(/\/$/, '')

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API error ${res.status}: ${body || res.statusText}`)
  }
  return res.json()
}

// DRF's default ListAPIView pagination wraps results as
// {count, next, previous, results: [...]}. Some list views on this backend
// have pagination disabled (plain arrays), others don't — this normalizes
// both so callers always get a plain array back.
function unwrapList(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  return []
}

export function fetchRights() {
  return request('/rights/').then(unwrapList)
}

export function fetchCategories() {
  return request('/categories/').then(unwrapList)
}

export function fetchLaws({ category, q } = {}) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (q) params.set('q', q)
  const qs = params.toString()
  return request(`/laws/${qs ? `?${qs}` : ''}`).then(unwrapList)
}

export function fetchLawDetail(id) {
  return request(`/laws/${encodeURIComponent(id)}/`)
}

export function fetchLegalTerms({ q } = {}) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  const qs = params.toString()
  return request(`/legal-terms/${qs ? `?${qs}` : ''}`).then(unwrapList)
}

export function fetchSituationCategories() {
  return request('/situation-categories/').then(unwrapList)
}

export function searchAll(q) {
  if (!q) return Promise.resolve({ rights: [], laws: [], sections: [], terms: [] })
  return request(`/search/?q=${encodeURIComponent(q)}`)
}

export function analyzeSituation({ description, category }) {
  return request('/situations/analyze/', {
    method: 'POST',
    body: JSON.stringify({ description, category }),
  })
}
