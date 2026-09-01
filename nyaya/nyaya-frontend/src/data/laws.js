// Placeholder law data. Names of real statutes are used for orientation only —
// descriptions are simplified and section content is illustrative, not authoritative.
// Replace this file with a live API response when the backend is connected.

export const laws = [
  {
    id: 'bns-2023',
    name: 'Bharatiya Nyaya Sanhita, 2023',
    year: 2023,
    category: 'criminal',
    description:
      "India's principal legislation defining various criminal offences and their punishments.",
    sections: [
      {
        id: 'sec-1',
        number: 'Section 1',
        title: 'Title and application',
        content:
          'Placeholder text — sets out the short title, extent, and commencement of the law.',
      },
      {
        id: 'sec-2',
        number: 'Section 2',
        title: 'Definitions',
        content:
          'Placeholder text — defines key terms used throughout the statute.',
      },
      {
        id: 'sec-3',
        number: 'Section 3',
        title: 'Example provision',
        content:
          'Placeholder text — illustrates how an operative provision is typically structured.',
      },
    ],
    officialSource: 'egazette.gov.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: ['bnss-2023', 'bsa-2023'],
  },
  {
    id: 'bnss-2023',
    name: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    year: 2023,
    category: 'criminal',
    description:
      'Governs criminal procedure — how investigations, arrests, and trials are conducted.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 1',
        title: 'Title and application',
        content: 'Placeholder text — procedural code coverage and applicability.',
      },
      {
        id: 'sec-2',
        number: 'Section 2',
        title: 'Definitions',
        content: 'Placeholder text — defines procedural terms such as complaint and inquiry.',
      },
    ],
    officialSource: 'egazette.gov.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: ['bns-2023'],
  },
  {
    id: 'consumer-protection-2019',
    name: 'Consumer Protection Act, 2019',
    year: 2019,
    category: 'consumer',
    description:
      'Protects consumer interests and establishes authorities to resolve consumer disputes.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 2',
        title: 'Definitions',
        content: 'Placeholder text — defines "consumer", "goods", "service", and "unfair trade practice".',
      },
      {
        id: 'sec-2',
        number: 'Section 35',
        title: 'Manner of filing complaint',
        content: 'Placeholder text — outlines how a consumer complaint may be filed.',
      },
    ],
    officialSource: 'consumeraffairs.nic.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: ['it-act-2000'],
  },
  {
    id: 'it-act-2000',
    name: 'Information Technology Act, 2000',
    year: 2000,
    category: 'cyber',
    description:
      'Covers electronic governance, cybercrime, and data-related offences in India.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 43',
        title: 'Penalty for damage to computer systems',
        content: 'Placeholder text — describes unauthorised access and related penalties.',
      },
      {
        id: 'sec-2',
        number: 'Section 66',
        title: 'Computer-related offences',
        content: 'Placeholder text — outlines offences involving dishonest or fraudulent acts.',
      },
    ],
    officialSource: 'meity.gov.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: ['consumer-protection-2019'],
  },
  {
    id: 'hindu-marriage-1955',
    name: 'Hindu Marriage Act, 1955',
    year: 1955,
    category: 'family',
    description:
      'Governs marriage, divorce, and related matters for Hindus, Buddhists, Jains, and Sikhs.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 5',
        title: 'Conditions for a Hindu marriage',
        content: 'Placeholder text — sets out requirements such as age and consent.',
      },
      {
        id: 'sec-2',
        number: 'Section 13',
        title: 'Divorce',
        content: 'Placeholder text — describes grounds on which divorce may be sought.',
      },
    ],
    officialSource: 'indiacode.nic.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: [],
  },
  {
    id: 'industrial-disputes-1947',
    name: 'Industrial Disputes Act, 1947',
    year: 1947,
    category: 'labour',
    description:
      'Provides a framework for resolving disputes between employers and workers.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 2',
        title: 'Definitions',
        content: 'Placeholder text — defines "workman", "industry", and "industrial dispute".',
      },
      {
        id: 'sec-2',
        number: 'Section 25F',
        title: 'Conditions for retrenchment',
        content: 'Placeholder text — outlines notice and compensation requirements.',
      },
    ],
    officialSource: 'labour.gov.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: [],
  },
  {
    id: 'transfer-of-property-1882',
    name: 'Transfer of Property Act, 1882',
    year: 1882,
    category: 'property',
    description:
      'Regulates how property may be transferred between living persons in India.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 5',
        title: '"Transfer of property" defined',
        content: 'Placeholder text — defines what counts as a transfer of property.',
      },
      {
        id: 'sec-2',
        number: 'Section 54',
        title: 'Sale defined',
        content: 'Placeholder text — describes the essential elements of a valid sale.',
      },
    ],
    officialSource: 'indiacode.nic.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: [],
  },
  {
    id: 'indian-contract-1872',
    name: 'Indian Contract Act, 1872',
    year: 1872,
    category: 'civil',
    description:
      'Lays down the general principles governing contracts in India.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 10',
        title: 'What agreements are contracts',
        content: 'Placeholder text — sets out the requirements for a valid contract.',
      },
      {
        id: 'sec-2',
        number: 'Section 73',
        title: 'Compensation for breach',
        content: 'Placeholder text — describes compensation available for breach of contract.',
      },
    ],
    officialSource: 'indiacode.nic.in (placeholder link)',
    lastVerified: 'Not yet verified — placeholder content',
    relatedLaws: ['consumer-protection-2019'],
  },
]
