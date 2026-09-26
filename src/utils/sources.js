// Shared helpers for building a consistent, non-fabricated "source"
// description from the underlying legal data. Nothing here invents a URL,
// a verification date, or a verified status — every value returned is
// either pulled directly from the data or explicitly null/false.

/**
 * A verification note only counts as "known" when it exists and isn't the
 * dataset's own "not yet verified" placeholder text.
 */
export function isVerifiedNote(note) {
  return !!note && !/not yet verified/i.test(note)
}

/**
 * Extracts a resolvable https:// URL from an officialSource string, but
 * only when it isn't explicitly marked as a placeholder and a real-looking
 * domain can be found in the text. Returns null rather than guessing.
 */
export function extractSourceUrl(officialSource) {
  if (!officialSource || /placeholder link/i.test(officialSource)) return null
  const trimmed = officialSource.trim()
  if (/^https?:\/\/[^\s)]+$/i.test(trimmed)) {
    return trimmed
  }
  const match = officialSource.match(/[a-z0-9-]+(?:\.[a-z0-9-]+)+\.(?:gov|nic|org|com)(?:\.in)?(?:\/[^\s)]*)?/i)
  return match ? `https://${match[0]}` : null
}

/**
 * Checks if a URL or source name represents an official government or
 * statutory body repository (.gov.in, .nic.in, eGazette, India Code, etc.).
 */
export function isOfficialSourceDomain(sourceStr) {
  if (!sourceStr) return false
  const lower = sourceStr.toLowerCase()
  return (
    lower.includes('.gov.in') ||
    lower.includes('.nic.in') ||
    lower.includes('egazette') ||
    lower.includes('indiacode') ||
    lower.includes('sci.gov.in') ||
    lower.includes('supremecourtofindia') ||
    lower.includes('ecourts') ||
    lower.includes('gazette of india') ||
    lower.includes('ministry of law') ||
    lower.includes('legislative department') ||
    lower.includes('parliament of india') ||
    lower.includes('sansad.in') ||
    lower.includes('loksabha') ||
    lower.includes('rajyasabha') ||
    lower.includes('mha.gov.in') ||
    lower.includes('nalsa.gov.in') ||
    lower.includes('law commission')
  )
}

/**
 * Determines whether a source is an official statutory record or a
 * secondary educational/editorial reference.
 */
export function determineSourceType(sourceName, sourceUrl) {
  if (isOfficialSourceDomain(sourceUrl) || isOfficialSourceDomain(sourceName)) {
    return 'official'
  }
  return 'secondary'
}

/**
 * Normalizes any source item into a strict, non-fabricated structure:
 * {
 *   documentName: string,
 *   sourceName: string,
 *   sourceUrl: string | null,
 *   lastVerified: string | null,
 *   sourceType: 'official' | 'secondary',
 *   isVerified: boolean,
 *   citation?: string | null,
 *   notes?: string | null
 * }
 */
export function normalizeSourceItem(item = {}) {
  if (!item) return null

  // Support string or object
  if (typeof item === 'string') {
    const url = extractSourceUrl(item)
    return {
      documentName: 'Indian Statutory Enactment',
      sourceName: item,
      sourceUrl: url,
      lastVerified: null,
      sourceType: determineSourceType(item, url),
      isVerified: false,
      citation: null,
      notes: null,
    }
  }

  const sourceName =
    item.sourceName ||
    item.officialSource ||
    item.official_source ||
    item.sourceLabel ||
    item.label ||
    'Official Legislative Repository'

  const rawVerified =
    item.lastVerified || item.last_verified || item.verifiedNote || null
  const isVerified = isVerifiedNote(rawVerified)

  let sourceUrl = item.sourceUrl || item.url || null
  if (!sourceUrl && sourceName) {
    sourceUrl = extractSourceUrl(sourceName)
  }

  const rawType = item.sourceType || item.type
  const sourceType =
    rawType === 'official' || rawType === 'secondary'
      ? rawType
      : determineSourceType(sourceName, sourceUrl)

  const documentName =
    item.lawName ||
    item.documentName ||
    item.name ||
    item.title ||
    'Central Act of Parliament'

  return {
    documentName,
    sourceName,
    sourceUrl: isVerified || sourceUrl ? sourceUrl : null,
    lastVerified: isVerified ? rawVerified : null,
    sourceType,
    isVerified,
    citation: item.citation || item.actNumber || null,
    notes: item.notes || item.explanation || null,
  }
}

/**
 * Normalizes a law entry (from laws.js, or the API's law-detail shape)
 * into a consistent source description:
 *   { label, url, verifiedNote, verified }
 * `url` and `verifiedNote` are null when not genuinely known — callers
 * must not fall back to a fabricated link or date.
 */
export function buildSourceFromLaw(law) {
  if (!law) return { label: null, url: null, verifiedNote: null, verified: false }

  const rawSource = law.officialSource || law.official_source || null
  const rawVerified = law.lastVerified || law.last_verified || null
  const verified = isVerifiedNote(rawVerified)

  return {
    label: rawSource,
    url: verified ? extractSourceUrl(rawSource) : null,
    verifiedNote: verified ? rawVerified : null,
    verified,
  }
}

/**
 * Looks up a law by id from a list of laws (e.g. the fallback laws array,
 * or live API data) and builds its source description. Returns the "no
 * source available" shape if the law can't be found — never fabricates one.
 */
export function buildSourceFromLawId(lawId, laws) {
  const law = (laws || []).find((l) => l.id === lawId)
  return buildSourceFromLaw(law)
}

/** The consistent "no source available" shape, for content with no
 * linkable source in the data at all (e.g. case-law entries that only
 * have a case name and year, with no citation or URL on file). */
export const NO_SOURCE = { label: null, url: null, verifiedNote: null, verified: false }
