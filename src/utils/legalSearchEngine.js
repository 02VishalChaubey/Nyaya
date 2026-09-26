// Dedicated Legal Research Search Engine for Nyaya
// Specialized for Indian Statutes, Penal Codes (BNS/IPC), Criminal Procedure (BNSS/CrPC),
// Constitutional Articles, Landmark Judgments, Legal Terms, and Procedural Guides.

import { laws } from '../data/laws.js'
import { fundamentalRights, landmarkCases, article13Principles } from '../data/rights.js'
import { legalTerms } from '../data/legalTerms.js'
import { legalGuides } from '../data/guides.js'
import { bnssCoreSections } from '../data/bnssDetailedNotes.js'
import { lawComparisonsData } from '../data/lawComparisons.js'

// Known abbreviations and statutory aliases
const ACRONYM_MAP = {
  ipc: { name: 'Indian Penal Code, 1860', successor: 'Bharatiya Nyaya Sanhita (BNS), 2023', id: 'bns-2023' },
  bns: { name: 'Bharatiya Nyaya Sanhita, 2023', id: 'bns-2023' },
  crpc: { name: 'Code of Criminal Procedure, 1973', successor: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023', id: 'bnss-2023' },
  bnss: { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', id: 'bnss-2023' },
  bsa: { name: 'Bharatiya Sakshya Adhiniyam, 2023', successor: 'Indian Evidence Act, 1872' },
  iea: { name: 'Indian Evidence Act, 1872', successor: 'Bharatiya Sakshya Adhiniyam, 2023' },
  pocso: { name: 'Protection of Children from Sexual Offences Act, 2012', id: 'pocso-2012' },
  posh: { name: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013', id: 'posh-2013' },
  copra: { name: 'Consumer Protection Act, 2019', id: 'consumer-protection-2019' },
  cpa: { name: 'Consumer Protection Act, 2019', id: 'consumer-protection-2019' },
  itact: { name: 'Information Technology Act, 2000', id: 'it-act-2000' },
  it: { name: 'Information Technology Act, 2000', id: 'it-act-2000' },
  hma: { name: 'Hindu Marriage Act, 1955', id: 'hindu-marriage-1955' },
  rti: { name: 'Right to Information Act, 2005' },
  coi: { name: 'Constitution of India, 1950' },
}

// Prominent historical IPC to BNS section mapping for legal research cross-referencing
const IPC_TRANSITION_MAP = {
  '302': { oldOffence: 'Murder', newSection: '103', bnsLawId: 'bns-2023', note: 'Punishment for murder (Section 103) & Mob lynching (Section 103(2))' },
  '307': { oldOffence: 'Attempt to murder', newSection: '109', bnsLawId: 'bns-2023', note: 'Attempt to commit murder' },
  '376': { oldOffence: 'Rape', newSection: '63/64', bnsLawId: 'bns-2023', note: 'Rape and aggravated rape with strict consent standards' },
  '420': { oldOffence: 'Cheating and dishonestly inducing delivery of property', newSection: '318', bnsLawId: 'bns-2023', note: 'Cheating and dishonestly inducing delivery of property (BNS Sec 318)' },
  '124a': { oldOffence: 'Sedition', newSection: '152', bnsLawId: 'bns-2023', note: 'Acts endangering sovereignty, unity and integrity of India (BNS Sec 152)' },
  '379': { oldOffence: 'Theft', newSection: '303', bnsLawId: 'bns-2023', note: 'Theft, with community service proviso under ₹5,000' },
  '499': { oldOffence: 'Defamation', newSection: '356', bnsLawId: 'bns-2023', note: 'Defamation with community service option' },
  '500': { oldOffence: 'Punishment for Defamation', newSection: '356', bnsLawId: 'bns-2023', note: 'Defamation with community service option' },
  '506': { oldOffence: 'Criminal intimidation', newSection: '351', bnsLawId: 'bns-2023', note: 'Criminal intimidation' },
}

// Prominent historical CrPC to BNSS section mapping
const CRPC_TRANSITION_MAP = {
  '41': { oldProvision: 'Arrest without warrant', newSection: '35', bnssLawId: 'bnss-2023', note: 'Arrest without warrant & Senior citizen / infirm safeguards' },
  '41b': { oldProvision: 'Arrest procedure and memo', newSection: '36', bnssLawId: 'bnss-2023', note: 'Arrest memo & obligation to inform family' },
  '41d': { oldProvision: 'Right of arrested person to meet advocate', newSection: '38', bnssLawId: 'bnss-2023', note: 'Right to meet advocate of choice during interrogation' },
  '46': { oldProvision: 'Arrest how made & women arrest hours', newSection: '43', bnssLawId: 'bnss-2023', note: 'Arrest procedure, handcuffs regulations, and women arrest ban between sunset and sunrise' },
  '50': { oldProvision: 'Grounds of arrest & right to bail', newSection: '47', bnssLawId: 'bnss-2023', note: 'Mandatory grounds of arrest & notification of right to bail' },
  '54': { oldProvision: 'Medical examination of arrested person', newSection: '53', bnssLawId: 'bnss-2023', note: 'Mandatory medical examination with copy furnished to accused free' },
  '57': { oldProvision: '24-hour detention limit', newSection: '58', bnssLawId: 'bnss-2023', note: 'Maximum 24 hours police custody without special Magisterial remand' },
  '91': { oldProvision: 'Summons to produce document', newSection: '94', bnssLawId: 'bnss-2023', note: 'Summons to produce documents and electronic communication devices' },
  '125': { oldProvision: 'Maintenance of wives, children and parents', newSection: '144', bnssLawId: 'bnss-2023', note: 'Maintenance of wives, children & parents with 60-day interim relief disposal' },
  '144': { oldProvision: 'Urgent orders in nuisance or danger', newSection: '163', bnssLawId: 'bnss-2023', note: 'Urgent orders in cases of nuisance or apprehended danger (Note: BNSS 144 is maintenance)' },
  '154': { oldProvision: 'FIR in cognizable cases', newSection: '173', bnssLawId: 'bnss-2023', note: 'Zero FIR across India and electronic FIR (e-FIR)' },
  '157': { oldProvision: 'Procedure for investigation', newSection: '176', bnssLawId: 'bnss-2023', note: 'Mandatory crime-scene forensics for offences punishable with 7+ years' },
  '164': { oldProvision: 'Recording of confessions and statements', newSection: '183', bnssLawId: 'bnss-2023', note: 'Statements & confessions recorded by Judicial Magistrate' },
  '167': { oldProvision: 'Remand and police custody', newSection: '187', bnssLawId: 'bnss-2023', note: 'Police custody authorization across initial 40/60 days' },
  '173': { oldProvision: 'Police report / chargesheet', newSection: '193', bnssLawId: 'bnss-2023', note: 'Chargesheet submission & 90-day progress communication to victim' },
  '207': { oldProvision: 'Supply of police report to accused', newSection: '230', bnssLawId: 'bnss-2023', note: 'Mandatory supply of chargesheet and records to accused and victim within 14 days' },
  '436a': { oldProvision: 'Maximum undertrial detention', newSection: '481', bnssLawId: 'bnss-2023', note: 'Bail for first-time undertrial prisoners on undergoing 1/3rd maximum sentence' },
  '438': { oldProvision: 'Anticipatory bail', newSection: '484', bnssLawId: 'bnss-2023', note: 'Anticipatory bail by High Court or Sessions Court' },
  '482': { oldProvision: 'Inherent powers of High Court', newSection: '530', bnssLawId: 'bnss-2023', note: 'Plenary inherent powers of the High Court to prevent abuse of court process' },
}

// Plain-language conceptual legal mappings
const CONCEPT_MAPPINGS = [
  {
    triggers: ['privacy', 'right to privacy', 'surveillance', 'data protection', 'phone tap', 'aadhaar'],
    articles: ['Article 21'],
    cases: ['puttaswamy-2017'],
    laws: ['it-act-2000'],
    rights: ['freedom'],
    reason: 'Recognized as an intrinsic part of the Right to Life and Personal Liberty under Article 21 by a unanimous 9-judge bench in K.S. Puttaswamy (2017).',
  },
  {
    triggers: ['bail', 'what is bail', 'anticipatory bail', 'regular bail', 'bailable', 'non bailable', 'surety', 'bond'],
    terms: ['bail', 'anticipatory-bail'],
    sections: ['sec-47', 'sec-481', 'sec-484'],
    guides: ['guide-bail-undertrial'],
    laws: ['bnss-2023'],
    reason: 'Bail is the temporary judicial release of an accused; governed primarily by BNSS 2023 Sections 47, 478–498, and Section 481 for undertrials.',
  },
  {
    triggers: ['fir', 'file fir', 'zero fir', 'efir', 'police report', 'police complaint', 'what is fir'],
    terms: ['fir', 'zero-fir'],
    sections: ['sec-173'],
    guides: ['guide-zero-fir'],
    laws: ['bnss-2023'],
    reason: 'First Information Report (FIR) initiates investigation; Section 173 of BNSS 2023 statutorily establishes Zero FIR across all police stations.',
  },
  {
    triggers: ['arrest', 'police arrest', 'arrested', 'handcuff', 'custody', 'police custody', 'detention'],
    sections: ['sec-35', 'sec-36', 'sec-38', 'sec-43', 'sec-47', 'sec-48', 'sec-53', 'sec-58'],
    cases: ['dk-basu-1997'],
    guides: ['guide-arrest-rights'],
    articles: ['Article 22'],
    rights: ['freedom'],
    reason: 'Statutory safeguards against unlawful arrest under BNSS Sections 35–58 and Article 22, codifying the Supreme Court D.K. Basu guidelines.',
  },
  {
    triggers: ['murder', 'mob lynching', 'lynching', 'homicide', 'killed', 'killing'],
    sections: ['sec-103'],
    laws: ['bns-2023'],
    reason: 'Section 103 of Bharatiya Nyaya Sanhita, 2023 governs murder; Section 103(2) introduces statutory punishment (death/life) for mob lynching.',
  },
  {
    triggers: ['speech', 'free speech', 'freedom of speech', 'expression', 'censorship', 'internet ban', 'online post'],
    articles: ['Article 19'],
    rights: ['freedom'],
    cases: ['shreya-singhal-2015', 'anuradha-bhasin-2020'],
    sections: ['sec-356'],
    reason: 'Protected under Article 19(1)(a) subject to reasonable restrictions; reaffirmed in Shreya Singhal (online speech) and Anuradha Bhasin (internet access).',
  },
  {
    triggers: ['equality', 'discrimination', 'caste', 'reservation', 'gender equality', 'equal opportunity'],
    articles: ['Article 14', 'Article 15', 'Article 16'],
    rights: ['equality'],
    cases: ['indra-sawhney-1992', 'vishaka-1997', 'navtej-johar-2018'],
    reason: 'Guaranteed by Articles 14–18 of the Constitution prohibiting discrimination and establishing equal protection of the laws.',
  },
  {
    triggers: ['remedy', 'writ', 'writs', 'habeas corpus', 'mandamus', 'certiorari', 'quo warranto', 'court protection'],
    articles: ['Article 32', 'Article 226'],
    terms: ['habeas-corpus', 'mandamus', 'certiorari', 'quo-warranto'],
    rights: ['constitutional-remedies'],
    guides: ['guide-free-legal-aid'],
    reason: 'Direct constitutional remedies via prerogative writs issued by the Supreme Court (Art. 32) and High Courts (Art. 226).',
  },
  {
    triggers: ['consumer', 'fraud seller', 'defective', 'fake product', 'warranty', 'refund', 'e-commerce', 'shopping'],
    laws: ['consumer-protection-2019'],
    sections: ['sec-1', 'sec-2'],
    guides: ['guide-consumer-complaint'],
    terms: ['compensation'],
    reason: 'Governed by Consumer Protection Act, 2019 providing redressal through District Commissions and the e-Daakhil filing portal.',
  },
  {
    triggers: ['cyber', 'online fraud', 'hacking', 'otp fraud', 'phishing', 'data theft', 'identity theft', 'upi scam'],
    laws: ['it-act-2000'],
    sections: ['sec-1', 'sec-2'],
    guides: ['guide-cyber-crime'],
    reason: 'Governed by Information Technology Act, 2000 (Sections 43 & 66) and National Cyber Crime Reporting Portal (Helpline 1930).',
  },
  {
    triggers: ['harassment', 'sexual harassment', 'workplace', 'posh', 'vishaka'],
    cases: ['vishaka-1997'],
    guides: ['guide-posh-workplace'],
    articles: ['Article 21'],
    reason: 'Regulated under the POSH Act, 2013 and the landmark Supreme Court Vishaka (1997) jurisprudence.',
  },
  {
    triggers: ['speedy trial', 'delay in court', 'undertrial', 'jail', 'undertrial prisoner'],
    sections: ['sec-258', 'sec-481'],
    guides: ['guide-bail-undertrial'],
    articles: ['Article 21'],
    reason: 'Right to a speedy trial is a fundamental component of Article 21; codified in BNSS Sections 258 (30-day judgment) and 481 (1/3rd sentence bail).',
  },
]

const STOP_WORDS = new Set(['right', 'rights', 'to', 'the', 'of', 'in', 'and', 'or', 'for', 'a', 'an', 'what', 'is', 'law', 'laws', 'act', 'code'])

function cleanQuery(q) {
  if (!q) return ''
  return q.toLowerCase().trim()
}

function tokenize(text, filterStopWords = false) {
  if (!text) return []
  const list = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1)
  return filterStopWords ? list.filter((w) => !STOP_WORDS.has(w)) : list
}

function stringMatchScore(haystack, needle) {
  if (!haystack || !needle) return 0
  const h = haystack.toLowerCase()
  const n = needle.toLowerCase()
  if (h === n) return 100
  if (h.startsWith(n)) return 75
  if (h.includes(n)) return 50

  const nTokensDistinct = tokenize(n, true)
  if (nTokensDistinct.length > 0) {
    let hits = 0
    for (const t of nTokensDistinct) {
      if (h.includes(t)) hits++
    }
    if (hits > 0) {
      return (hits / nTokensDistinct.length) * 45
    }
  }

  const allTokens = tokenize(n, false)
  let hits = 0
  for (const t of allTokens) {
    if (h.includes(t)) hits++
  }
  return allTokens.length > 0 ? (hits / allTokens.length) * 20 : 0
}

/**
 * Parses query to detect section numbers, article numbers, abbreviations, and concepts.
 */
export function analyzeQuery(rawQuery) {
  const q = cleanQuery(rawQuery)
  if (!q) return { raw: '', clean: '', tokens: [] }

  // Extract explicit section number: e.g. "section 103", "sec 103", "s. 103", "section 481", "103"
  let sectionNumber = null
  const secMatch = q.match(/\b(?:section|sec|s\.?)\s*([0-9]+[a-z]?)\b/i)
  if (secMatch) {
    sectionNumber = secMatch[1].toLowerCase()
  } else {
    // Isolated number check if preceded or followed by law name or standalone 2-4 digit number
    const numOnlyMatch = q.match(/^([0-9]{1,4}[a-z]?)$/i)
    if (numOnlyMatch) {
      sectionNumber = numOnlyMatch[1].toLowerCase()
    }
  }

  // Extract explicit article number: e.g. "article 21", "art 21", "art. 21", "article 21a", "a21"
  let articleNumber = null
  const artMatch = q.match(/\b(?:article|art\.?)\s*([0-9]+[a-z]?)\b/i)
  if (artMatch) {
    articleNumber = artMatch[1].toLowerCase()
  } else {
    const artShortMatch = q.match(/\ba([0-9]{1,3}[a-z]?)\b/i)
    if (artShortMatch) {
      articleNumber = artShortMatch[1].toLowerCase()
    }
  }

  // Check abbreviation matches
  const matchedAcronyms = []
  const tokens = tokenize(q)
  for (const t of tokens) {
    if (ACRONYM_MAP[t]) {
      matchedAcronyms.push({ key: t, ...ACRONYM_MAP[t] })
    }
  }

  // Check old IPC / CrPC mappings
  const historicalConversions = []
  if (sectionNumber) {
    if (IPC_TRANSITION_MAP[sectionNumber]) {
      historicalConversions.push({
        type: 'IPC',
        oldSection: sectionNumber,
        ...IPC_TRANSITION_MAP[sectionNumber],
      })
    }
    if (CRPC_TRANSITION_MAP[sectionNumber]) {
      historicalConversions.push({
        type: 'CrPC',
        oldSection: sectionNumber,
        ...CRPC_TRANSITION_MAP[sectionNumber],
      })
    }
  }

  // Check concepts
  const activeConcepts = CONCEPT_MAPPINGS.filter((c) =>
    c.triggers.some((tr) => q.includes(tr) || tr.includes(q))
  )

  return {
    raw: rawQuery,
    clean: q,
    tokens,
    sectionNumber,
    articleNumber,
    matchedAcronyms,
    historicalConversions,
    activeConcepts,
  }
}

/**
 * Searches across all Laws.
 */
function searchLaws(queryAnalysis) {
  const { clean: q, matchedAcronyms, activeConcepts, tokens } = queryAnalysis
  const results = []

  laws.forEach((law) => {
    let score = 0
    let matchReason = ''

    // Law name direct match
    const nameScore = stringMatchScore(law.name, q)
    if (nameScore > 0) {
      score = Math.max(score, nameScore + 20)
      matchReason = `Direct title match for "${law.name}".`
    }

    // Short name or alias match
    if (law.shortName && cleanQuery(law.shortName) === q) {
      score = Math.max(score, 95)
      matchReason = `Exact acronym match for ${law.shortName} (${law.name}).`
    } else if (law.shortName && law.shortName.toLowerCase().includes(q)) {
      score = Math.max(score, 80)
      matchReason = `Acronym match for ${law.shortName}.`
    }

    if (law.aliases) {
      law.aliases.forEach((alias) => {
        const aScore = stringMatchScore(alias, q)
        if (aScore > 40 && aScore + 10 > score) {
          score = aScore + 10
          matchReason = `Matches recognized legal alias "${alias}".`
        }
      })
    }

    // Acronym lookup check (e.g. IPC -> BNS 2023, CrPC -> BNSS 2023)
    matchedAcronyms.forEach((acro) => {
      if (acro.id === law.id) {
        score = Math.max(score, 90)
        matchReason = `Searched abbreviation "${acro.key.toUpperCase()}" corresponds to ${law.name}.`
      }
    })

    // Description match
    if (law.description && law.description.toLowerCase().includes(q)) {
      score = Math.max(score, 45)
      if (!matchReason) matchReason = `Provisions described in ${law.shortName || law.name} match query.`
    }

    // Concept link
    activeConcepts.forEach((c) => {
      if (c.laws && c.laws.includes(law.id)) {
        score = Math.max(score, 60)
        if (!matchReason) matchReason = c.reason
      }
    })

    if (score > 25) {
      results.push({
        id: law.id,
        title: law.name,
        type: 'Law',
        subtitle: `${law.shortName ? law.shortName + ' · ' : ''}Year ${law.year} · ${law.category.toUpperCase()}`,
        explanation: law.description,
        whyItMatches: matchReason || `Matches inquiry terms for ${law.name}.`,
        url: `/laws/${law.id}`,
        score,
        badge: law.shortName || 'Statute',
        metadata: {
          year: law.year,
          category: law.category,
          officialSource: law.officialSource,
        },
      })
    }
  })

  // Also include the Constitution of India as a Law entry if searched
  if (
    q.includes('constitution') ||
    q.includes('part iii') ||
    q.includes('fundamental right') ||
    q === 'coi'
  ) {
    results.unshift({
      id: 'constitution-of-india',
      title: 'The Constitution of India, 1950',
      type: 'Law',
      subtitle: 'The Supreme Law of India · Part III Fundamental Rights',
      explanation:
        'The foundational legal document of India guaranteeing fundamental rights, democratic framework, executive separation, and judicial review under Articles 12–35 and Article 226.',
      whyItMatches: 'The supreme legal authority governing all fundamental rights, articles, and constitutional remedies.',
      url: '/fundamental-rights',
      score: 95,
      badge: 'Constitution',
      metadata: {
        year: 1950,
        category: 'Constitutional Law',
      },
    })
  }

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Searches across all Sections across all laws (BNS, BNSS, Consumer Protection, IT Act, etc.).
 */
function searchSections(queryAnalysis) {
  const { clean: q, sectionNumber, historicalConversions, activeConcepts } = queryAnalysis
  const results = []

  // Check all sections in laws
  laws.forEach((law) => {
    (law.sections || []).forEach((sec) => {
      let score = 0
      let matchReason = ''

      const secNumClean = sec.number.toLowerCase().replace(/[^0-9a-z]/g, '')
      const secDigits = sec.number.toLowerCase().replace(/^(?:section|sec|s\.?)\s*/i, '').replace(/[^0-9a-z]/g, '')
      const targetSecClean = sectionNumber ? sectionNumber.replace(/[^0-9a-z]/g, '') : null

      // Exact section number match (e.g. "section 103" matching "Section 103")
      if (targetSecClean && (secNumClean === targetSecClean || secDigits === targetSecClean)) {
        score = 100
        matchReason = `Exact match for ${sec.number} in ${law.shortName || law.name}.`
      } else if (targetSecClean && (secNumClean.startsWith(targetSecClean) || secDigits.startsWith(targetSecClean))) {
        score = 80
        matchReason = `Matches section prefix ${sec.number} in ${law.shortName || law.name}.`
      }

      // Title match
      const titleScore = stringMatchScore(sec.title, q)
      if (titleScore > score) {
        score = titleScore
        matchReason = `Section title "${sec.title}" matches your query.`
      }

      // Content match
      if (sec.content && sec.content.toLowerCase().includes(q)) {
        score = Math.max(score, 50)
        if (!matchReason) {
          matchReason = `Statutory text of ${sec.number} addresses terms in "${q}".`
        }
      }

      // Concept triggers
      activeConcepts.forEach((concept) => {
        if (concept.sections && concept.sections.includes(sec.id)) {
          score = Math.max(score, 70)
          if (!matchReason) matchReason = concept.reason
        }
      })

      if (score > 30) {
        results.push({
          id: `${law.id}-${sec.id}`,
          title: `${sec.number}: ${sec.title}`,
          type: 'Section',
          subtitle: `${law.name} (${law.shortName || law.year})`,
          explanation: sec.content,
          whyItMatches: matchReason || `Matches terms for ${sec.number}.`,
          url: `/laws/${law.id}#${sec.id}`,
          score,
          badge: law.shortName || 'Section',
          metadata: {
            sectionNumber: sec.number,
            lawId: law.id,
            lawName: law.name,
          },
        })
      }
    })
  })

  // Also include rich BNSS core sections from bnssCoreSections
  bnssCoreSections.forEach((sec, idx) => {
    let score = 0
    let matchReason = ''
    const secNumMatch = sectionNumber && sec.section.toLowerCase().includes(sectionNumber)

    if (secNumMatch) {
      score = 95
      matchReason = `Matches ${sec.section} in Bharatiya Nagarik Suraksha Sanhita (BNSS 2023).`
    }

    const titleScore = stringMatchScore(sec.title, q)
    if (titleScore > score) {
      score = titleScore
      matchReason = `Section title matches "${q}".`
    }

    if (sec.description && sec.description.toLowerCase().includes(q)) {
      score = Math.max(score, 45)
      if (!matchReason) matchReason = `Procedural provisions in ${sec.section} match your query.`
    }

    if (sec.tags && sec.tags.some((t) => t.toLowerCase().includes(q))) {
      score = Math.max(score, 65)
      if (!matchReason) matchReason = `Direct procedural classification in BNSS 2023.`
    }

    if (score > 35) {
      const existing = results.find((r) => r.title.startsWith(sec.section))
      if (!existing) {
        results.push({
          id: `bnss-core-${idx}`,
          title: `${sec.section}: ${sec.title}`,
          type: 'Section',
          subtitle: `Bharatiya Nagarik Suraksha Sanhita, 2023 · ${sec.chapter}`,
          explanation: sec.description,
          whyItMatches: matchReason || `Procedural provision in BNSS 2023.`,
          url: `/laws/bnss-2023`,
          score,
          badge: 'BNSS 2023',
          metadata: {
            sectionNumber: sec.section,
            crpcEquivalent: sec.crpcEquivalent,
            timeline: sec.timeline,
          },
        })
      }
    }
  })

  // Historical Conversion Matches (e.g. user typed "section 302" or "sec 420" or "crpc 144")
  historicalConversions.forEach((conv) => {
    if (conv.type === 'IPC') {
      const compMatch = lawComparisonsData.find(
        (c) =>
          c.oldProvision.section.toLowerCase().includes(conv.oldSection) ||
          (c.searchKeywords && c.searchKeywords.includes(conv.oldSection))
      )
      const targetUrl = compMatch ? `/compare#${compMatch.id}` : '/compare'

      results.unshift({
        id: `conversion-ipc-${conv.oldSection}`,
        title: `IPC Section ${conv.oldSection} (${conv.oldOffence}) → BNS Section ${conv.newSection}`,
        type: 'Section',
        subtitle: `Legal Transition · Indian Penal Code (1860) to Bharatiya Nyaya Sanhita (2023)`,
        explanation: `Under the new criminal penal code effective 1 July 2024, historical IPC Section ${conv.oldSection} (${conv.oldOffence}) is replaced by BNS Section ${conv.newSection}: ${conv.note}.`,
        whyItMatches: `Historical conversion: Your query "Section ${conv.oldSection}" corresponds to BNS Section ${conv.newSection}.`,
        url: targetUrl,
        score: 110,
        badge: 'IPC → BNS',
        metadata: {
          sectionNumber: `BNS Sec ${conv.newSection}`,
          oldSection: `IPC Sec ${conv.oldSection}`,
        },
      })
    } else if (conv.type === 'CrPC') {
      results.unshift({
        id: `conversion-crpc-${conv.oldSection}`,
        title: `CrPC Section ${conv.oldSection} (${conv.oldProvision}) → BNSS Section ${conv.newSection}`,
        type: 'Section',
        subtitle: `Legal Transition · Code of Criminal Procedure (1973) to Bharatiya Nagarik Suraksha Sanhita (2023)`,
        explanation: `Under the modern criminal procedure code, historical CrPC Section ${conv.oldSection} (${conv.oldProvision}) is now enacted as BNSS Section ${conv.newSection}: ${conv.note}.`,
        whyItMatches: `Historical procedural conversion: CrPC Section ${conv.oldSection} is codified as BNSS Section ${conv.newSection}.`,
        url: `/laws/bnss-2023`,
        score: 110,
        badge: 'CrPC → BNSS',
        metadata: {
          sectionNumber: `BNSS Sec ${conv.newSection}`,
          oldSection: `CrPC Sec ${conv.oldSection}`,
        },
      })
    }
  })

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Searches across Constitution: Fundamental Rights, Articles (Article 14, 19, 21, etc.), and Article 13 Principles.
 */
function searchConstitution(queryAnalysis) {
  const { clean: q, articleNumber, activeConcepts } = queryAnalysis
  const results = []

  // Check each Fundamental Right category
  fundamentalRights.forEach((r) => {
    let score = 0
    let matchReason = ''
    const distinctQTokens = tokenize(q, true)

    // Title match — only if distinctive non-stop query words match the right's title
    const titleScore = stringMatchScore(r.title, q)
    if (
      titleScore > 0 &&
      (distinctQTokens.length === 0 || distinctQTokens.some((t) => r.title.toLowerCase().includes(t)))
    ) {
      score = titleScore + 20
      matchReason = `Direct match for fundamental right: "${r.title}".`
    }

    // Article range match (e.g. "Articles 14–18")
    if (r.articles && r.articles.toLowerCase().includes(q)) {
      score = Math.max(score, 85)
      matchReason = `Constitutional span: ${r.articles}.`
    }

    // Concept check
    activeConcepts.forEach((c) => {
      if (c.rights && c.rights.includes(r.id)) {
        score = Math.max(score, 75)
        if (!matchReason) matchReason = c.reason
      }
    })

    if (score > 30) {
      results.push({
        id: `right-${r.id}`,
        title: r.title,
        type: 'Constitution',
        subtitle: `${r.articles} · Part III of the Constitution of India`,
        explanation: r.summary,
        whyItMatches: matchReason || `Guaranteed under Part III of the Constitution.`,
        url: `/fundamental-rights#${r.id}`,
        score,
        badge: 'Fundamental Right',
        metadata: {
          articles: r.articles,
          hindi: r.hindi,
          remedy: r.citizenRemedy?.primaryWrit,
        },
      })
    }

    // Check specific articles in articlesList
    (r.articlesList || []).forEach((art) => {
      let artScore = 0
      let artReason = ''

      const cleanArtNum = art.number.toLowerCase().replace(/[^0-9a-z]/g, '')
      const artDigits = art.number.toLowerCase().replace(/^(?:article|art\.?)\s*/i, '').replace(/[^0-9a-z]/g, '')
      const targetArtClean = articleNumber ? articleNumber.replace(/[^0-9a-z]/g, '') : null

      // Exact article number match (e.g. "article 21" matching "Article 21")
      if (targetArtClean && (cleanArtNum === targetArtClean || artDigits === targetArtClean)) {
        artScore = 100
        artReason = `Exact match for ${art.number} of the Indian Constitution.`
      } else if (targetArtClean && (cleanArtNum.startsWith(targetArtClean) || artDigits.startsWith(targetArtClean))) {
        artScore = 80
        artReason = `Matches constitutional article prefix ${art.number}.`
      }

      // Title match
      const titleScore = stringMatchScore(art.title, q)
      if (titleScore > artScore) {
        artScore = titleScore
        artReason = `Constitutional provision "${art.title}" matches query.`
      }

      // Description match
      if (art.description && art.description.toLowerCase().includes(q)) {
        artScore = Math.max(artScore, 45)
        if (!artReason) artReason = `Text of ${art.number} protects rights related to "${q}".`
      }

      // Active concepts (e.g. "privacy" -> Article 21)
      activeConcepts.forEach((concept) => {
        if (concept.articles && concept.articles.some((a) => art.number.toLowerCase().includes(a.toLowerCase()))) {
          artScore = Math.max(artScore, 90)
          artReason = concept.reason
        }
      })

      if (artScore > 35) {
        results.push({
          id: `art-${art.number.toLowerCase().replace(/\s+/g, '-')}`,
          title: `${art.number}: ${art.title}`,
          type: 'Constitution',
          subtitle: `Constitution of India · Part III (${r.title})`,
          explanation: art.description,
          whyItMatches: artReason || `Enforceable constitutional guarantee under ${art.number}.`,
          url: `/fundamental-rights#${r.id}`,
          score: artScore,
          badge: 'Constitutional Article',
          metadata: {
            articleNumber: art.number,
            parentRight: r.title,
          },
        })
      }
    })
  })

  // Article 13 & Judicial Review Principles
  article13Principles.forEach((principle, idx) => {
    let pScore = 0
    if (principle.situation.toLowerCase().includes(q) || principle.explanation.toLowerCase().includes(q)) {
      pScore = 65
    }
    if (q.includes('article 13') || q.includes('judicial review') || q.includes('severability') || q.includes('void')) {
      pScore = 90
    }
    if (pScore > 40) {
      results.push({
        id: `art13-${idx}`,
        title: `Article 13 Doctrine: ${principle.situation}`,
        type: 'Constitution',
        subtitle: 'Constitution of India · Shield of Fundamental Rights',
        explanation: `${principle.actionConsequence} ${principle.explanation}`,
        whyItMatches: `Article 13 principle governing judicial striking down of unconstitutional statutes.`,
        url: `/fundamental-rights#article-13-section`,
        score: pScore,
        badge: 'Article 13 Doctrine',
      })
    }
  })

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Searches across Landmark Cases (Puttaswamy, Kesavananda, Maneka Gandhi, Shreya Singhal, D.K. Basu, etc.).
 */
function searchCases(queryAnalysis) {
  const { clean: q, activeConcepts } = queryAnalysis
  const results = []

  landmarkCases.forEach((c) => {
    let score = 0
    let matchReason = ''

    // Case name match
    const nameScore = stringMatchScore(c.caseName, q)
    if (nameScore > 0) {
      score = nameScore + 25
      matchReason = `Matches case title "${c.caseName}".`
    }

    // Related article match
    if (c.relatedArticle && c.relatedArticle.toLowerCase().includes(q)) {
      score = Math.max(score, 65)
      matchReason = `Landmark judgment interpreting ${c.relatedArticle}.`
    }

    // Importance & Key Takeaway
    if (c.importance && c.importance.toLowerCase().includes(q)) {
      score = Math.max(score, 50)
      if (!matchReason) matchReason = c.importance
    }
    if (c.keyTakeaway && c.keyTakeaway.toLowerCase().includes(q)) {
      score = Math.max(score, 50)
      if (!matchReason) matchReason = `Established legal precedent: ${c.keyTakeaway}`
    }

    // Concept link (e.g. "privacy" -> Puttaswamy, "arrest" -> D.K. Basu, "free speech" -> Shreya Singhal)
    activeConcepts.forEach((concept) => {
      if (concept.cases && concept.cases.includes(c.id)) {
        score = Math.max(score, 90)
        matchReason = concept.reason
      }
    })

    if (score > 30) {
      results.push({
        id: `case-${c.id}`,
        title: `${c.caseName} (${c.year})`,
        type: 'Case',
        subtitle: `Supreme Court of India · Landmark Precedent · ${c.relatedArticle}`,
        explanation: `${c.importance} Key takeaway: ${c.keyTakeaway}`,
        whyItMatches: matchReason || `Binding Supreme Court precedent interpreting constitutional rights.`,
        url: `/fundamental-rights#cases-section`,
        score,
        badge: 'Landmark Case',
        metadata: {
          caseName: c.caseName,
          year: c.year,
          relatedArticle: c.relatedArticle,
        },
      })
    }
  })

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Searches across Legal Terms (Bail, FIR, Zero FIR, Cognizable Offence, Habeas Corpus, Mandamus, etc.).
 */
function searchLegalTerms(queryAnalysis) {
  const { clean: q, activeConcepts } = queryAnalysis
  const results = []

  legalTerms.forEach((term) => {
    let score = 0
    let matchReason = ''

    const termClean = term.term.toLowerCase()
    const fullFormClean = (term.fullForm || '').toLowerCase()

    // Exact match for the legal term (e.g. "what is bail" matching "Bail", "bail" matching "Bail")
    if (q === termClean || q.includes(termClean) || (term.id && q.includes(term.id))) {
      score = 95
      matchReason = `Exact legal definition for "${term.term}".`
    } else if (termClean.includes(q)) {
      score = 75
      matchReason = `Matches legal term "${term.term}".`
    }

    if (fullFormClean && fullFormClean.includes(q)) {
      score = Math.max(score, 80)
      matchReason = `Matches codified term full form: ${term.fullForm}.`
    }

    if (term.plainLanguage && term.plainLanguage.toLowerCase().includes(q)) {
      score = Math.max(score, 55)
      if (!matchReason) matchReason = `Plain-language definition addresses "${q}".`
    }

    if (term.legalMeaning && term.legalMeaning.toLowerCase().includes(q)) {
      score = Math.max(score, 50)
      if (!matchReason) matchReason = `Statutory legal framework addresses "${q}".`
    }

    if (term.relevantLaw && term.relevantLaw.toLowerCase().includes(q)) {
      score = Math.max(score, 60)
      if (!matchReason) matchReason = `Governed under ${term.relevantLaw}.`
    }

    if (term.definition && term.definition.toLowerCase().includes(q)) {
      score = Math.max(score, 45)
      if (!matchReason) matchReason = `Definition addresses "${q}".`
    }

    // Concept triggers
    activeConcepts.forEach((c) => {
      if (c.terms && c.terms.includes(term.id)) {
        score = Math.max(score, 85)
        if (!matchReason) matchReason = c.reason
      }
    })

    if (score > 30) {
      results.push({
        id: `term-${term.id}`,
        title: term.fullForm ? `${term.term} (${term.fullForm})` : term.term,
        type: 'Legal Term',
        subtitle: `Legal Definition · ${term.relatedLaws ? term.relatedLaws.join(', ').toUpperCase() : 'General Jurisprudence'}`,
        explanation: term.plainLanguage || term.definition,
        whyItMatches: matchReason || `Codified legal terminology definition.`,
        url: `/legal-terms#${term.id}`,
        score,
        badge: 'Legal Term',
        metadata: {
          term: term.term,
          relatedLaws: term.relatedLaws,
        },
      })
    }
  })

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Searches across Practical Guides & Standard Operating Procedures.
 */
function searchGuides(queryAnalysis) {
  const { clean: q, activeConcepts } = queryAnalysis
  const results = []

  legalGuides.forEach((g) => {
    let score = 0
    let matchReason = ''

    // Title match
    const titleScore = stringMatchScore(g.title, q)
    if (titleScore > 0) {
      score = titleScore + 20
      matchReason = `Procedural guide matching "${g.title}".`
    }

    // Keywords match
    if (g.keywords && g.keywords.some((kw) => q.includes(kw) || kw.includes(q))) {
      score = Math.max(score, 80)
      matchReason = `Step-by-step procedural standard for ${g.category}.`
    }

    // Summary & whyUseful
    if (g.summary && g.summary.toLowerCase().includes(q)) {
      score = Math.max(score, 50)
      if (!matchReason) matchReason = g.whyUseful
    }

    // Concept triggers
    activeConcepts.forEach((c) => {
      if (c.guides && c.guides.includes(g.id)) {
        score = Math.max(score, 85)
        matchReason = c.reason
      }
    })

    if (score > 30) {
      results.push({
        id: g.id,
        title: g.title,
        type: 'Guide',
        subtitle: `${g.category} · ${g.statuteReference}`,
        explanation: `${g.summary} Key utility: ${g.whyUseful}`,
        whyItMatches: matchReason || `Practical legal standard operating procedure.`,
        url: `/laws/bnss-2023`, // contextual link
        score,
        badge: 'Practical Guide',
        metadata: {
          statuteReference: g.statuteReference,
          officialPortal: g.officialPortal,
          stepsCount: g.steps?.length || 0,
        },
      })
    }
  })

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Searches across Law Comparisons (IPC ↔ BNS Concordance Ledger).
 */
function searchComparisons(queryAnalysis) {
  const { clean: q } = queryAnalysis
  const results = []
  if (!q) return results

  lawComparisonsData.forEach((c) => {
    let score = 0
    let matchReason = ''

    if (c.offenceTitle.toLowerCase().includes(q)) {
      score = 95
      matchReason = `Statutory concordance for "${c.offenceTitle}".`
    } else if (c.oldProvision.section.toLowerCase().includes(q)) {
      score = 100
      matchReason = `Direct match for predecessor ${c.oldProvision.section}.`
    } else if (c.newProvision.section.toLowerCase().includes(q)) {
      score = 100
      matchReason = `Direct match for successor ${c.newProvision.section}.`
    } else if (c.searchKeywords && c.searchKeywords.some((k) => k.toLowerCase() === q || q.includes(k))) {
      score = 80
      matchReason = `Concordance keyword match for ${c.offenceTitle}.`
    } else if (c.topic.toLowerCase().includes(q) || c.plainLanguageDifference.toLowerCase().includes(q)) {
      score = 55
      matchReason = `Comparative legal analysis match.`
    }

    if (score > 40) {
      results.push({
        id: `comparison-${c.id}`,
        title: `${c.oldProvision.section} ↔ ${c.newProvision.section}: ${c.offenceTitle}`,
        type: 'Comparison',
        subtitle: `Statutory Concordance · ${c.mappingStatus === 'verified' ? 'Verified Mapping' : 'Requires Verification'}`,
        explanation: c.plainLanguageDifference,
        whyItMatches: matchReason || `Comparative analysis between IPC 1860 and BNS 2023.`,
        url: `/compare#${c.id}`,
        score,
        badge: c.mappingStatus === 'verified' ? 'Verified Concordance' : 'Requires Verification',
        metadata: {
          topic: c.topic,
          oldSection: c.oldProvision.section,
          newSection: c.newProvision.section,
          source: c.source,
          mappingStatus: c.mappingStatus,
        },
      })
    }
  })

  return results.sort((a, b) => b.score - a.score)
}

/**
 * Primary search coordinator function.
 * Returns results grouped by type, each with Title, Type, Short Explanation, and Why It Matches.
 */
export function executeUnifiedSearch(rawQuery) {
  const queryAnalysis = analyzeQuery(rawQuery)
  if (!queryAnalysis.clean) {
    return {
      query: rawQuery,
      totalCount: 0,
      groups: {
        laws: [],
        sections: [],
        comparisons: [],
        constitution: [],
        cases: [],
        terms: [],
        guides: [],
      },
      // Backward-compatibility fields:
      rights: [],
      laws: [],
      sections: [],
      comparisons: [],
      terms: [],
      cases: [],
      guides: [],
    }
  }

  const matchedLaws = searchLaws(queryAnalysis)
  const matchedSections = searchSections(queryAnalysis)
  const matchedComparisons = searchComparisons(queryAnalysis)
  const matchedConstitution = searchConstitution(queryAnalysis)
  const matchedCases = searchCases(queryAnalysis)
  const matchedTerms = searchLegalTerms(queryAnalysis)
  const matchedGuides = searchGuides(queryAnalysis)

  const totalCount =
    matchedLaws.length +
    matchedSections.length +
    matchedComparisons.length +
    matchedConstitution.length +
    matchedCases.length +
    matchedTerms.length +
    matchedGuides.length

  return {
    query: rawQuery,
    queryAnalysis: {
      sectionNumber: queryAnalysis.sectionNumber,
      articleNumber: queryAnalysis.articleNumber,
      matchedAcronyms: queryAnalysis.matchedAcronyms.map((a) => a.key),
      hasHistoricalConversions: queryAnalysis.historicalConversions.length > 0,
    },
    totalCount,
    groups: {
      laws: matchedLaws,
      sections: matchedSections,
      comparisons: matchedComparisons,
      constitution: matchedConstitution,
      cases: matchedCases,
      terms: matchedTerms,
      guides: matchedGuides,
    },
    // Backward-compatibility aliases for existing components
    laws: matchedLaws,
    sections: matchedSections,
    comparisons: matchedComparisons,
    rights: matchedConstitution,
    terms: matchedTerms,
    cases: matchedCases,
    guides: matchedGuides,
  }
}
