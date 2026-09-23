// Client library for Enmachi's legal intelligence API.
// Defaults to the local server's `/api` proxy or custom VITE_API_BASE_URL.

const RAW_BASE = import.meta.env.VITE_API_BASE_URL || '/api'
export const API_BASE_URL = RAW_BASE.replace(/\/$/, '')

async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API error ${res.status}: ${body || res.statusText}`)
  }
  return res.json()
}

// DRF & Express normalizer to ensure callers get a plain array back
function unwrapList(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  return []
}

export function fetchRights() {
  return request('/rights/').then(unwrapList)
}

export function fetchLandmarkCases() {
  return request('/landmark-cases/').then(unwrapList)
}

export function fetchArticle13() {
  return request('/article-13/').then(unwrapList)
}

export function fetchRightsQuiz() {
  return request('/rights-quiz/').then(unwrapList)
}

export function fetchConstitutionalOrigins() {
  return request('/constitutional-origins')
}

export function fetchBnsData() {
  return request('/bns/')
}

export function fetchBnssData() {
  return request('/bnss/')
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

export function fetchLegalTermDetail(id) {
  return request(`/legal-terms/${encodeURIComponent(id)}/`)
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

export function checkBackendHealth() {
  return request('/health')
}
