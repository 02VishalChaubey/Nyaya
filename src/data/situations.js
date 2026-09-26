// Mock mapping used ONLY to simulate the "I Have Been Harmed" result screen.
// In production this selection will be made by a backend/AI matching engine —
// this file exists purely so the frontend has something realistic to render.

export const situationCategories = [
  { id: 'money-fraud', icon: 'Landmark', label: 'Money / Fraud' },
  { id: 'property', icon: 'Home', label: 'Property' },
  { id: 'cyber', icon: 'Wifi', label: 'Online / Cyber' },
  { id: 'consumer', icon: 'ShoppingBag', label: 'Consumer' },
  { id: 'workplace', icon: 'Briefcase', label: 'Workplace' },
  { id: 'personal-rights', icon: 'ShieldOff', label: 'Personal Rights' },
  { id: 'family', icon: 'Users', label: 'Family' },
  { id: 'other', icon: 'MoreHorizontal', label: 'Other' },
]

export const mockSituationResult = {
  legalArea: 'Consumer Protection & Contract Remedies',
  areaDescription:
    'Based on the information provided, this situation may relate to consumer rights regarding deficient goods or services, as well as contractual obligations under Indian law. This provides an educational starting point for your reading, not a legal determination.',
  potentiallyRelevantLaws: [
    'Consumer Protection Act, 2019',
    'Indian Contract Act, 1872',
  ],
  relevantProvisions: [
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Section 35 — Manner of filing complaint',
      explanation:
        'Potentially relevant provisions include Section 35, which outlines how a consumer may file a formal complaint regarding defective goods, deficient services, or unfair trade practices before the District Consumer Commission.',
    },
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Section 2(11) — Deficiency in service',
      explanation:
        'Defines deficiency as any fault, imperfection, shortcoming, or inadequacy in the quality, nature, and manner of performance required to be maintained by or under any law or contract.',
    },
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Section 73 — Compensation for loss or damage caused by breach',
      explanation:
        'Establishes that when a contract is broken, the party who suffers is entitled to receive compensation for any loss or damage caused naturally in the usual course of things.',
    },
  ],
  plainLanguageExplanation:
    'Based on the information provided, when an individual purchases goods or pays for a service that is not delivered as promised, Indian consumer law provides specific protections. Under the Consumer Protection Act, 2019, consumers have the statutory right to seek redressal against unfair trade practices or deficient service. This may involve seeking a replacement, repair, or full refund along with compensation for harassment. Separately, general contract law recognises that broken agreements may give rise to compensation claims for actual financial loss.',
  possibleNextSteps: [
    {
      title: 'Preserve all transaction evidence',
      description:
        'Keep safe copies of invoices, receipts, order confirmations, chat transcripts, payment debit alerts, and all written correspondence with the seller or provider.',
      category: 'documentation',
    },
    {
      title: 'Register a grievance with the National Consumer Helpline (NCH)',
      description:
        'You may call toll-free helpline 1915 or register a grievance online at consumerhelpline.gov.in for mediation before initiating formal court proceedings.',
      category: 'reporting',
    },
    {
      title: 'File an online complaint via e-Daakhil',
      description:
        'If informal resolution fails, consumers may file a formal complaint electronically through the e-Daakhil portal (edaakhil.nic.in) before the appropriate District Commission.',
      category: 'remedy',
    },
    {
      title: 'Consult a Legal Aid Clinic (DLSA / NALSA)',
      description:
        'If you require assistance drafting your complaint or representation, free legal aid is available to eligible citizens through District Legal Services Authorities across India.',
      category: 'legal-aid',
    },
  ],
  // Legacy aliases for backward compatibility
  relevantLaws: [
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Section 35 — Manner of filing complaint',
      explanation:
        'Potentially relevant provisions include Section 35, which outlines how a consumer may file a formal complaint regarding defective goods, deficient services, or unfair trade practices.',
    },
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Section 73 — Compensation for breach',
      explanation:
        'Establishes that when a contract is broken, the suffering party is entitled to receive compensation for natural losses.',
    },
  ],
  remedies: [
    {
      title: 'National Consumer Helpline (1915)',
      description:
        'Call 1915 or file on consumerhelpline.gov.in to initiate grievance mediation.',
    },
    {
      title: 'e-Daakhil Consumer Commission Complaint',
      description:
        'File an online complaint before the District Consumer Commission via edaakhil.nic.in.',
    },
  ],
  sources: [
    {
      lawId: 'consumer-protection-2019',
      lawName: 'Consumer Protection Act, 2019',
      officialSource: 'consumeraffairs.nic.in',
      lastVerified: 'Department of Consumer Affairs',
      verified: true,
    },
    {
      lawId: 'indian-contract-1872',
      lawName: 'Indian Contract Act, 1872',
      officialSource: 'indiacode.nic.in',
      lastVerified: 'India Code legislative database',
      verified: true,
    },
  ],
  importantLimitation:
    'This information is strictly educational and does not constitute a legal determination, legal opinion, or legal advice. It does not establish whether an offence has occurred or predict how any police authority, regulatory body, or court of law will evaluate your situation. Laws apply differently based on specific facts, evidence, and jurisdiction. If you need legal advice, consult a qualified advocate or your local District Legal Services Authority (DLSA).',
}

