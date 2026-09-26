// Client wrapper around fetch() for the Nyaya API backend.
//
// Base URL comes from VITE_API_BASE_URL (see .env.example) and defaults to '/api'.

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

export function fetchRightsHub() {
  return request('/rights-hub/').then(unwrapList)
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

export function fetchLegalTerms({ q, category } = {}) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (category && category !== 'all') params.set('category', category)
  const qs = params.toString()
  return request(`/legal-terms/${qs ? `?${qs}` : ''}`).then(unwrapList)
}

export function fetchLawComparisons({ q, topic, status, pair } = {}) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (topic && topic !== 'all') params.set('topic', topic)
  if (status && status !== 'all') params.set('status', status)
  if (pair) params.set('pair', pair)
  const qs = params.toString()
  return request(`/law-comparisons/${qs ? `?${qs}` : ''}`).then(unwrapList)
}

export function fetchComparisonPairs() {
  return request('/law-comparisons/pairs').then(unwrapList)
}

export function fetchComparisonTopics() {
  return request('/law-comparisons/topics').then(unwrapList)
}

export function fetchLawComparisonDetail(id) {
  return request(`/law-comparisons/${encodeURIComponent(id)}/`)
}

export function fetchSituationCategories() {
  return request('/situation-categories/').then(unwrapList)
}

export function searchAll(q) {
  if (!q || !q.trim()) {
    return Promise.resolve({
      query: '',
      totalCount: 0,
      groups: {
        laws: [],
        sections: [],
        constitution: [],
        cases: [],
        terms: [],
        guides: [],
      },
      laws: [],
      sections: [],
      rights: [],
      terms: [],
      cases: [],
      guides: [],
    })
  }
  return request(`/search/?q=${encodeURIComponent(q.trim())}`)
}

export function analyzeSituation({ description, category, focus }) {
  return request('/situations/analyze/', {
    method: 'POST',
    body: JSON.stringify({ description, category, focus }),
  })
}

export function executeAiWorkflow({ question, preferredTopic }) {
  return request('/ai/workflow/', {
    method: 'POST',
    body: JSON.stringify({ question, preferredTopic }),
  })
}

