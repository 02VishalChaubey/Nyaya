import { laws } from '../data/laws.js'
import { rightsCategories } from '../data/rightsHub.js'
import { legalTerms } from '../data/legalTerms.js'
import { legalGuides } from '../data/guides.js'
import { executeAiWorkflow as apiExecuteAiWorkflow } from '../api/client.js'

export const AI_WORKFLOW_TOPIC_OPTIONS = [
  { id: 'all', title: 'Auto-detect Legal Domain', hindiTitle: 'स्वचालित विषय पहचान' },
  { id: 'property', title: 'Property & Tenancy Law', hindiTitle: 'संपत्ति, किराया व पट्टा कानून' },
  { id: 'consumer', title: 'Consumer Protection Law', hindiTitle: 'उपभोक्ता संरक्षण अधिकार' },
  { id: 'criminal', title: 'Criminal Procedure & Police Powers', hindiTitle: 'आपराधिक प्रक्रिया व पुलिस अधिकार' },
  { id: 'cyber', title: 'Cyber Law & Digital Fraud', hindiTitle: 'साइबर कानून व ऑनलाइन धोखाधड़ी' },
  { id: 'workplace', title: 'Labour & Workplace Rights', hindiTitle: 'श्रम कानून व कार्यस्थल अधिकार' },
  { id: 'constitutional', title: 'Constitutional Rights & Freedoms', hindiTitle: 'संवैधानिक अधिकार व स्वतंत्रता' },
  { id: 'family', title: 'Family & Matrimonial Law', hindiTitle: 'पारिवारिक व वैवाहिक कानून' },
]

export const SAMPLE_QUESTIONS = [
  {
    text: "My landlord isn't returning my deposit.",
    hindiText: "मेरा मकान मालिक मेरी सुरक्षा जमा राशि (डिपॉजिट) वापस नहीं कर रहा है।",
    topic: 'property',
    label: 'Tenancy Deposit Dispute',
  },
  {
    text: 'Can the police arrest me without an arrest warrant?',
    hindiText: 'क्या पुलिस मुझे बिना गिरफ्तारी वारंट के गिरफ्तार कर सकती है?',
    topic: 'criminal',
    label: 'Police Arrest Powers',
  },
  {
    text: 'An online seller delivered a broken screen laptop and refuses replacement or refund.',
    hindiText: 'ऑनलाइन विक्रेता ने टूटी स्क्रीन वाला लैपटॉप भेजा और रिप्लेसमेंट या रिफंड देने से मना कर दिया।',
    topic: 'consumer',
    label: 'E-commerce Broken Goods',
  },
  {
    text: 'My employer withheld my last two months salary after I served my full notice period.',
    hindiText: 'पूरा नोटिस पीरियड पूरा करने के बावजूद कंपनी ने मेरा दो महीने का वेतन रोक लिया है।',
    topic: 'workplace',
    label: 'Withheld Salary Post-Resignation',
  },
  {
    text: 'Someone created a fake profile with my photos and is sending offensive messages.',
    hindiText: 'किसी ने मेरी तस्वीरों के साथ फर्जी प्रोफाइल बनाकर आपत्तिजनक संदेश भेजे हैं।',
    topic: 'cyber',
    label: 'Digital Impersonation',
  },
]

/**
 * Client-side deterministic workflow execution fallback
 * Used when offline or if server proxy encounters an error.
 */
export function runAiWorkflowOffline(questionText, preferredTopic) {
  const qClean = questionText.toLowerCase().trim()

  // 1. Identify Topic
  let matchedTopicId = preferredTopic && preferredTopic !== 'all' ? preferredTopic : null

  if (!matchedTopicId) {
    if (qClean.includes('landlord') || qClean.includes('deposit') || qClean.includes('rent') || qClean.includes('tenant') || qClean.includes('flat')) {
      matchedTopicId = 'property'
    } else if (qClean.includes('seller') || qClean.includes('refund') || qClean.includes('defect') || qClean.includes('product') || qClean.includes('consumer') || qClean.includes('order')) {
      matchedTopicId = 'consumer'
    } else if (qClean.includes('police') || qClean.includes('arrest') || qClean.includes('fir') || qClean.includes('bail') || qClean.includes('warrant')) {
      matchedTopicId = 'criminal'
    } else if (qClean.includes('upi') || qClean.includes('cyber') || qClean.includes('fraud') || qClean.includes('scam') || qClean.includes('hacked') || qClean.includes('fake profile')) {
      matchedTopicId = 'cyber'
    } else if (qClean.includes('salary') || qClean.includes('wage') || qClean.includes('employer') || qClean.includes('resignation') || qClean.includes('notice period') || qClean.includes('posh')) {
      matchedTopicId = 'workplace'
    } else if (qClean.includes('constitution') || qClean.includes('article') || qClean.includes('fundamental right') || qClean.includes('arbitrary')) {
      matchedTopicId = 'constitutional'
    } else if (qClean.includes('marriage') || qClean.includes('divorce') || qClean.includes('maintenance') || qClean.includes('domestic violence')) {
      matchedTopicId = 'family'
    } else {
      matchedTopicId = 'property'
    }
  }

  // 2. Retrieve Provisions
  const retrievedProvisions = []
  if (matchedTopicId === 'property') {
    const tpLaw = laws.find((l) => l.id === 'transfer-of-property-1882')
    if (tpLaw) {
      const leaseSecs = (tpLaw.sections || []).filter((s) => s.id === 'sec-105' || s.id === 'sec-108' || s.id === 'sec-1')
      leaseSecs.forEach((sec) => {
        retrievedProvisions.push({
          lawId: tpLaw.id,
          lawName: tpLaw.name,
          section: sec.number,
          title: sec.title,
          content: sec.content,
          officialSource: tpLaw.officialSource,
          verified: true,
        })
      })
    }
    const contractLaw = laws.find((l) => l.id === 'indian-contract-1872')
    if (contractLaw) {
      const compSec = (contractLaw.sections || []).find((s) => s.id === 'sec-2')
      if (compSec) {
        retrievedProvisions.push({
          lawId: contractLaw.id,
          lawName: contractLaw.name,
          section: compSec.number,
          title: compSec.title,
          content: compSec.content,
          officialSource: contractLaw.officialSource,
          verified: true,
        })
      }
    }
  } else if (matchedTopicId === 'consumer') {
    const cpaLaw = laws.find((l) => l.id === 'consumer-protection-2019')
    if (cpaLaw) {
      (cpaLaw.sections || []).forEach((sec) => {
        retrievedProvisions.push({
          lawId: cpaLaw.id,
          lawName: cpaLaw.name,
          section: sec.number,
          title: sec.title,
          content: sec.content,
          officialSource: cpaLaw.officialSource,
          verified: true,
        })
      })
    }
  } else if (matchedTopicId === 'criminal') {
    const bnssLaw = laws.find((l) => l.id === 'bnss-2023')
    if (bnssLaw) {
      const targetSecs = ['sec-35', 'sec-47', 'sec-58']
      ;(bnssLaw.sections || [])
        .filter((s) => targetSecs.includes(s.id))
        .forEach((sec) => {
          retrievedProvisions.push({
            lawId: bnssLaw.id,
            lawName: bnssLaw.name,
            section: sec.number,
            title: sec.title,
            content: sec.content,
            officialSource: bnssLaw.officialSource,
            verified: true,
          })
        })
    }
  } else if (matchedTopicId === 'cyber') {
    const itLaw = laws.find((l) => l.id === 'it-act-2000')
    if (itLaw) {
      (itLaw.sections || []).forEach((sec) => {
        retrievedProvisions.push({
          lawId: itLaw.id,
          lawName: itLaw.name,
          section: sec.number,
          title: sec.title,
          content: sec.content,
          officialSource: itLaw.officialSource,
          verified: true,
        })
      })
    }
  }

  // 3. Retrieve Rights Topics
  const retrievedRightsTopics = []
  for (const cat of rightsCategories) {
    for (const t of cat.topics) {
      if (
        (matchedTopicId === 'property' && ['security-deposit-refund', 'essential-services-protection', 'unlawful-eviction-safeguards'].includes(t.id)) ||
        (matchedTopicId === 'consumer' && ['consumer-six-guarantees', 'edaakhil-complaint-filing'].includes(t.id)) ||
        (matchedTopicId === 'criminal' && ['arrest-safeguards-24h', 'zero-fir-complaint-rights'].includes(t.id)) ||
        (matchedTopicId === 'cyber' && ['cyber-financial-fraud-1930', 'rbi-zero-liability-banking'].includes(t.id)) ||
        (matchedTopicId === 'workplace' && ['retrenchment-severance-notice', 'posh-workplace-harassment'].includes(t.id))
      ) {
        retrievedRightsTopics.push({
          id: t.id,
          title: t.title,
          legalArea: t.legalArea,
          relevantLaw: t.relevantLaw,
          explanation: t.explanation,
          actionPoints: t.actionPoints || [],
          officialSource: t.officialSource,
        })
      }
    }
  }

  // 4. Retrieve Terms
  const retrievedTerms = []
  const targetTermIds =
    matchedTopicId === 'property'
      ? ['security-deposit', 'compensation', 'civil-suit']
      : matchedTopicId === 'consumer'
        ? ['consumer-dispute', 'compensation', 'civil-suit']
        : matchedTopicId === 'criminal'
          ? ['arrest', 'bail', 'fir', 'cognizable-offence']
          : ['compensation', 'civil-suit']

  for (const term of legalTerms) {
    if (targetTermIds.includes(term.id)) {
      retrievedTerms.push({
        id: term.id,
        term: term.term,
        plainLanguage: term.plainLanguage,
        category: term.category,
      })
    }
  }

  // 5. Build Explanation
  let explanation = ''
  let nextSteps = []

  if (matchedTopicId === 'property') {
    explanation = `Under Indian property and contract law, security deposits in residential tenancies are held in trust by the landlord to guarantee performance of the lease agreement and are fundamentally refundable upon handing over peaceful vacant possession.

Under Section 105 and Section 108 of the Transfer of Property Act, 1882, the lessor and lessee have reciprocal statutory obligations. The tenant is entitled to peaceful enjoyment of the premises and is required to restore the property in good condition, subject to reasonable wear and tear arising from normal daily living. Landlords are legally precluded from making arbitrary deductions for normal wear and tear or unsubstantiated repainting fees.

Where a landlord refuses to return a security deposit without providing verifiable invoices or establishing actual structural damage, this constitutes a civil breach of agreement under Section 73 of the Indian Contract Act, 1872. Tenants may pursue formal redressal through the jurisdictional Rent Authority or Civil Court.`

    nextSteps = [
      {
        title: 'Review Tenancy Agreement & Move-Out Records',
        description: 'Check the written lease for deposit return timelines and compile move-out photos or video evidence showing the premises were handed over in good order.',
        type: 'documentation',
      },
      {
        title: 'Issue a Formal Written Demand Notice',
        description: 'Send a written communication or registered legal notice citing the handover date, providing bank account details, and requesting an itemized breakdown of any deductions within a reasonable timeframe.',
        type: 'dialogue',
      },
      {
        title: 'Approach the Local Rent Authority or Legal Services Authority',
        description: 'If the landlord continues to withhold the deposit, consult your local District Legal Services Authority (DLSA) for free mediation, or file a dispute before the jurisdictional Rent Tribunal.',
        type: 'remedy',
      },
    ]
  } else if (matchedTopicId === 'consumer') {
    explanation = `Under the Consumer Protection Act, 2019, consumers who purchase goods or services are protected against 'deficiency in service' and 'defective goods' under Section 2. Sellers and e-commerce platforms have an obligation to provide goods that match statutory standards and representations.

When a consumer receives a broken or non-conforming product and the merchant arbitrarily denies a refund or replacement, the consumer is entitled under the Act to seek replacement, repair, or full reimbursement of the price paid, along with compensation for loss or inconvenience under Section 73 of the Indian Contract Act, 1872.

The statutory framework provides a simplified adjudication process before the District Consumer Disputes Redressal Commission without requiring complex procedural filings.`

    nextSteps = [
      {
        title: 'Preserve Transaction Records & Unboxing Proof',
        description: 'Secure copies of the purchase invoice, order confirmation, unboxing video or photographs, and customer support chat transcripts.',
        type: 'documentation',
      },
      {
        title: 'Lodge an Official National Consumer Helpline Grievance',
        description: 'File a formal grievance on consumerhelpline.gov.in (Toll-Free 1915) or send a written notice to the merchant grievance officer.',
        type: 'dialogue',
      },
      {
        title: 'File an Online Complaint on e-Daakhil',
        description: 'If the seller does not rectify the defect, submit an online consumer dispute before the District Commission via edaakhil.nic.in.',
        type: 'remedy',
      },
    ]
  } else {
    explanation = `Based on verified Indian statutory frameworks, this query intersects with codified central statutes. Codified enactments establish clear statutory standards, obligations, and procedural safeguards for individuals facing situations of this nature.

Potentially applicable provisions include records from verified enactments indexed in the Nyaya database. These provisions define the legal rights of parties, conditions of liability, and avenues for formal redressal.

Nyaya limits this explanation strictly to verified central statutory records to ensure accuracy and prevent speculative legal assertions.`

    nextSteps = [
      {
        title: 'Organize Relevant Documentation & Timeline',
        description: 'Compile all written records, receipts, dates, and communications into a clear chronological summary.',
        type: 'documentation',
      },
      {
        title: 'Review Statutory Guidance in Nyaya Rights Hub',
        description: 'Explore the relevant citizen rights pages and procedural guides indexed in our verified database.',
        type: 'remedy',
      },
      {
        title: 'Consult Qualified Legal Counsel or DLSA',
        description: 'For situation-specific legal advice and formal representation, consult a licensed advocate or visit your local District Legal Services Authority.',
        type: 'legal-aid',
      },
    ]
  }

  const topicDef = AI_WORKFLOW_TOPIC_OPTIONS.find((t) => t.id === matchedTopicId) || AI_WORKFLOW_TOPIC_OPTIONS[1]

  return {
    workflowStage: 'completed',
    userQuestion: questionText,
    identifiedTopic: {
      id: matchedTopicId,
      title: topicDef.title,
      category: matchedTopicId,
      description: 'Codified statutory provisions, citizen safeguards, and procedural avenues for resolution.',
      subtopics: ['Statutory Rights & Due Process', 'Documentation Requirements', 'Dispute Resolution Avenues'],
      confidence: 'high',
    },
    retrievedContent: {
      provisions: retrievedProvisions,
      rightsTopics: retrievedRightsTopics,
      terms: retrievedTerms,
      guides: [],
    },
    explanation,
    nextSteps,
    sources: [
      {
        name: 'India Code — National Digital Repository of Central & State Acts',
        url: 'https://indiacode.nic.in',
        portal: 'indiacode.nic.in',
        verified: true,
      },
      {
        name: 'Legislative Department, Ministry of Law and Justice',
        url: 'https://legislative.gov.in',
        portal: 'legislative.gov.in',
        verified: true,
      },
    ],
    relatedPages: [
      { title: 'Know Your Rights Hub', to: '/know-your-rights', description: 'Citizen rights across 8 everyday domains', badge: 'Rights Hub' },
      { title: 'Legal Tools: Complaint Prep Guide', to: '/tools?tool=complaint', description: 'Chronological facts and evidence organizer', badge: 'Legal Tool' },
      { title: 'Browse Central Statutes', to: '/laws', description: 'Search codified Acts and sections', badge: 'Bare Acts' },
    ],
    disclaimer: 'This information is strictly educational legal information and does not constitute a legal determination, legal opinion, or legal advice. It does not predict how any court or administrative body will decide your case. If you require legal representation, consult a qualified advocate or your local District Legal Services Authority (DLSA).',
  }
}

/**
 * Main service entrypoint: tries backend AI workflow first, falls back to offline model
 */
export async function runAiWorkflow({ question, preferredTopic }) {
  try {
    const result = await apiExecuteAiWorkflow({ question, preferredTopic })
    if (result && result.workflowStage === 'completed') {
      return result
    }
  } catch (err) {
    console.warn('Backend AI workflow unavailable, using verified offline workflow:', err)
  }

  return runAiWorkflowOffline(question, preferredTopic)
}
