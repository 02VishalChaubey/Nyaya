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
  legalArea: 'Consumer / Contract dispute',
  areaDescription:
    'Based on the general pattern of what you described, this may fall under consumer protection or contract-related law. This is only a starting point for your own reading — not a legal determination.',
  relevantLaws: [
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Section 35 — Manner of filing complaint',
      explanation:
        'Placeholder: describes the process for a consumer to file a complaint about defective goods or deficient services.',
    },
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Section 73 — Compensation for breach',
      explanation:
        'Placeholder: describes the general principle of compensation when one party fails to honour an agreement.',
    },
  ],
  remedies: [
    {
      title: 'Consumer complaint',
      description:
        'Placeholder: a complaint may be filed with the relevant consumer forum describing the loss suffered.',
    },
    {
      title: 'Civil suit for breach of contract',
      description:
        'Placeholder: a civil suit may be an option if there was a written or verbal agreement that was not honoured.',
    },
  ],
  penalties: [
    {
      title: 'Compensation to the affected party',
      description:
        'Placeholder: courts or forums may direct the responsible party to pay compensation for proven loss.',
    },
    {
      title: 'Refund or replacement',
      description:
        'Placeholder: in consumer matters, a refund, replacement, or repair may be ordered depending on the facts.',
    },
  ],
}
