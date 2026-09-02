import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-Memory Database for Indian Legal Awareness System
const rightsData = [
  {
    id: 'equality',
    icon: 'Scale',
    title: 'Right to Equality',
    articles: 'Articles 14–18',
    summary:
      'Guarantees that every person is equal before the law and prohibits discrimination on grounds such as religion, race, caste, sex, or place of birth.',
    example:
      'Example: a government office cannot refuse to process your application because of your caste or religion.',
  },
  {
    id: 'freedom',
    icon: 'Wind',
    title: 'Right to Freedom',
    articles: 'Articles 19–22',
    summary:
      'Covers freedom of speech, assembly, movement, and the right to practise any profession, along with protections around arrest and detention.',
    example:
      'Example: you generally have the right to express an opinion publicly, within reasonable restrictions defined by law.',
  },
  {
    id: 'exploitation',
    icon: 'ShieldOff',
    title: 'Right against Exploitation',
    articles: 'Articles 23–24',
    summary:
      'Prohibits human trafficking, forced labour, and the employment of children below fourteen years in hazardous work.',
    example:
      'Example: an employer cannot force someone to work without fair wages or consent.',
  },
  {
    id: 'religion',
    icon: 'Landmark',
    title: 'Right to Freedom of Religion',
    articles: 'Articles 25–28',
    summary:
      'Protects the freedom of conscience and the right to freely profess, practise, and propagate any religion.',
    example:
      'Example: a person cannot be compelled to follow a religious practice against their will.',
  },
  {
    id: 'cultural-educational',
    icon: 'BookOpen',
    title: 'Cultural & Educational Rights',
    articles: 'Articles 29–30',
    summary:
      'Protects the right of any community to conserve its language, script, and culture, and to establish educational institutions.',
    example:
      'Example: a linguistic minority can run its own school to teach in its native language.',
  },
  {
    id: 'constitutional-remedies',
    icon: 'Gavel',
    title: 'Right to Constitutional Remedies',
    articles: 'Article 32',
    summary:
      'Allows individuals to directly approach the courts if any of their fundamental rights are violated — often described as the provision that gives the other rights their force.',
    example:
      'Example: if a fundamental right is violated, a person may petition the courts for enforcement.',
  },
];

const categoriesData = [
  {
    id: 'criminal',
    icon: 'Gavel',
    title: 'Criminal Law',
    description: 'Offences, punishments, and criminal procedure.',
  },
  {
    id: 'civil',
    icon: 'Scale',
    title: 'Civil Law',
    description: 'Disputes between individuals or organisations.',
  },
  {
    id: 'property',
    icon: 'Home',
    title: 'Property Law',
    description: 'Ownership, transfer, and disputes over property.',
  },
  {
    id: 'consumer',
    icon: 'ShoppingBag',
    title: 'Consumer Law',
    description: 'Protections for buyers of goods and services.',
  },
  {
    id: 'cyber',
    icon: 'Wifi',
    title: 'Cyber Law',
    description: 'Online fraud, data misuse, and digital offences.',
  },
  {
    id: 'family',
    icon: 'Users',
    title: 'Family Law',
    description: 'Marriage, custody, inheritance, and maintenance.',
  },
  {
    id: 'labour',
    icon: 'Briefcase',
    title: 'Labour Law',
    description: 'Workplace rights, wages, and working conditions.',
  },
  {
    id: 'constitutional',
    icon: 'Landmark',
    title: 'Constitutional Law',
    description: 'Rights, government structure, and public authority.',
  },
];

const situationCategoriesData = [
  { id: 'money-fraud', icon: 'Landmark', label: 'Money / Fraud' },
  { id: 'property', icon: 'Home', label: 'Property' },
  { id: 'cyber', icon: 'Wifi', label: 'Online / Cyber' },
  { id: 'consumer', icon: 'ShoppingBag', label: 'Consumer' },
  { id: 'workplace', icon: 'Briefcase', label: 'Workplace' },
  { id: 'personal-rights', icon: 'ShieldOff', label: 'Personal Rights' },
  { id: 'family', icon: 'Users', label: 'Family' },
  { id: 'other', icon: 'MoreHorizontal', label: 'Other' },
];

const legalTermsData = [
  {
    id: 'fir',
    term: 'FIR',
    fullForm: 'First Information Report',
    definition:
      'A written document prepared by police when they receive information about a cognizable offence — usually the first step in a criminal investigation.',
    relatedLaws: ['bnss-2023'],
  },
  {
    id: 'bail',
    term: 'Bail',
    definition:
      'The temporary release of an accused person while their case is ongoing, usually on conditions set by a court or police officer.',
    relatedLaws: ['bnss-2023'],
  },
  {
    id: 'cognizable-offence',
    term: 'Cognizable offence',
    definition:
      'An offence for which police can arrest without a warrant and start an investigation without prior court permission, such as serious crimes like theft or assault.',
    relatedLaws: ['bnss-2023'],
  },
  {
    id: 'non-cognizable-offence',
    term: 'Non-cognizable offence',
    definition:
      'A less serious offence where police cannot arrest without a warrant and generally need court permission to investigate.',
    relatedLaws: ['bnss-2023'],
  },
  {
    id: 'summons',
    term: 'Summons',
    definition:
      'A formal order from a court requiring a person to appear before it on a given date, usually in connection with a case.',
    relatedLaws: ['bnss-2023'],
  },
  {
    id: 'warrant',
    term: 'Warrant',
    definition:
      'A written order issued by a court authorising an action, such as the arrest of a person or the search of a place.',
    relatedLaws: ['bnss-2023'],
  },
  {
    id: 'civil-suit',
    term: 'Civil suit',
    definition:
      'A legal case filed in court to resolve a dispute between individuals or organisations, such as over property or a contract, rather than a criminal offence.',
    relatedLaws: ['indian-contract-1872'],
  },
  {
    id: 'criminal-complaint',
    term: 'Criminal complaint',
    definition:
      'A formal allegation made to a magistrate or police that a person has committed an offence, which may lead to an investigation or trial.',
    relatedLaws: ['bnss-2023'],
  },
  {
    id: 'compensation',
    term: 'Compensation',
    definition:
      'A payment ordered by a court or authority to make up for loss, injury, or damage suffered by a person.',
    relatedLaws: ['consumer-protection-2019'],
  },
  {
    id: 'injunction',
    term: 'Injunction',
    definition:
      'A court order that requires a person to do, or to stop doing, a specific act — often used to prevent harm before a full trial is completed.',
    relatedLaws: ['indian-contract-1872'],
  },
];

const lawsData = [
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
          'Sets out the short title, extent, and commencement of the law across India.',
      },
      {
        id: 'sec-2',
        number: 'Section 2',
        title: 'Definitions',
        content:
          'Defines key terms used throughout the statute including offences, public servant, and good faith.',
      },
      {
        id: 'sec-3',
        number: 'Section 3',
        title: 'General Punishments',
        content:
          'Defines the types of punishments including death, imprisonment for life, rigorous and simple imprisonment, forfeiture of property, fine, and community service.',
      },
    ],
    officialSource: 'egazette.gov.in',
    lastVerified: 'Ministry of Law and Justice Gazette',
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
        content: 'Procedural code coverage and applicability throughout India.',
      },
      {
        id: 'sec-2',
        number: 'Section 2',
        title: 'Definitions',
        content: 'Defines procedural terms such as FIR, complaint, inquiry, cognizable and non-cognizable cases.',
      },
      {
        id: 'sec-35',
        number: 'Section 35',
        title: 'When police may arrest without warrant',
        content: 'Prescribes statutory safeguards and conditions for arrest by police officers.',
      },
    ],
    officialSource: 'egazette.gov.in',
    lastVerified: 'Ministry of Law and Justice Gazette',
    relatedLaws: ['bns-2023'],
  },
  {
    id: 'constitution-of-india',
    name: 'The Constitution of India',
    year: 1950,
    category: 'constitutional',
    description:
      "India's supreme law, which came into force on 26 January 1950. It sets up the structure and powers of the Union and State governments, defines the fundamental rights and duties of citizens, and lays out directive principles.",
    sections: [
      {
        id: 'part-1',
        number: 'Part I',
        title: 'The Union and its Territory',
        content: 'Covers Articles 1–4 establishing India as a Union of States.',
      },
      {
        id: 'part-2',
        number: 'Part II',
        title: 'Citizenship',
        content: 'Covers Articles 5–11 regarding citizenship at the commencement of the Constitution.',
      },
      {
        id: 'part-3',
        number: 'Part III',
        title: 'Fundamental Rights',
        content: 'Covers Articles 12–35 guaranteeing equality, freedoms, protections against exploitation, religious freedom, cultural & educational rights, and constitutional remedies.',
      },
      {
        id: 'part-4',
        number: 'Part IV',
        title: 'Directive Principles of State Policy',
        content: 'Covers Articles 36–51 providing guidance for social welfare and state governance.',
      },
      {
        id: 'part-4a',
        number: 'Part IVA',
        title: 'Fundamental Duties',
        content: 'Article 51A specifying the civic duties of every Indian citizen.',
      },
    ],
    officialSource: 'legislative.gov.in',
    lastVerified: 'Legislative Department, Ministry of Law and Justice',
    relatedLaws: ['bns-2023', 'consumer-protection-2019', 'indian-contract-1872'],
  },
  {
    id: 'consumer-protection-2019',
    name: 'Consumer Protection Act, 2019',
    year: 2019,
    category: 'consumer',
    description:
      'Protects consumer interests and establishes authorities to resolve consumer disputes quickly and effectively.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 2',
        title: 'Definitions',
        content: 'Defines consumer, goods, service, deficiency, misleading advertisement, and unfair trade practice.',
      },
      {
        id: 'sec-2',
        number: 'Section 35',
        title: 'Manner of filing complaint',
        content: 'Outlines the simple procedure for consumers to file complaints before District Consumer Commissions.',
      },
    ],
    officialSource: 'consumeraffairs.nic.in',
    lastVerified: 'Department of Consumer Affairs',
    relatedLaws: ['it-act-2000', 'indian-contract-1872'],
  },
  {
    id: 'it-act-2000',
    name: 'Information Technology Act, 2000',
    year: 2000,
    category: 'cyber',
    description:
      'Covers electronic governance, cybercrime, electronic records, digital signatures, and data-related offences.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 43',
        title: 'Penalty for damage to computer systems',
        content: 'Prescribes civil compensation for unauthorised access, downloading data, introduction of viruses, and denial of access.',
      },
      {
        id: 'sec-2',
        number: 'Section 66',
        title: 'Computer-related offences',
        content: 'Outlines punishments for dishonest or fraudulent digital actions, identity theft, and cheating by personation using computer devices.',
      },
    ],
    officialSource: 'meity.gov.in',
    lastVerified: 'Ministry of Electronics and Information Technology',
    relatedLaws: ['consumer-protection-2019', 'bns-2023'],
  },
  {
    id: 'hindu-marriage-1955',
    name: 'Hindu Marriage Act, 1955',
    year: 1955,
    category: 'family',
    description:
      'Governs marriage, divorce, restitution of conjugal rights, and judicial separation for Hindus, Buddhists, Jains, and Sikhs.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 5',
        title: 'Conditions for a Hindu marriage',
        content: 'Sets out valid conditions including age requirements, mental capacity, and monogamy.',
      },
      {
        id: 'sec-2',
        number: 'Section 13',
        title: 'Divorce',
        content: 'Describes statutory grounds on which divorce or dissolution of marriage may be sought by either spouse.',
      },
    ],
    officialSource: 'indiacode.nic.in',
    lastVerified: 'India Code legislative database',
    relatedLaws: [],
  },
  {
    id: 'industrial-disputes-1947',
    name: 'Industrial Disputes Act, 1947',
    year: 1947,
    category: 'labour',
    description:
      'Provides a comprehensive framework for resolving disputes between employers and workers, ensuring industrial peace.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 2',
        title: 'Definitions',
        content: 'Defines workman, industry, industrial dispute, strike, and lockout.',
      },
      {
        id: 'sec-2',
        number: 'Section 25F',
        title: 'Conditions for retrenchment',
        content: 'Outlines mandatory one-month notice and retrenchment compensation requirements for workmen.',
      },
    ],
    officialSource: 'labour.gov.in',
    lastVerified: 'Ministry of Labour and Employment',
    relatedLaws: [],
  },
  {
    id: 'transfer-of-property-1882',
    name: 'Transfer of Property Act, 1882',
    year: 1882,
    category: 'property',
    description:
      'Regulates how movable and immovable property may be transferred between living persons through sale, mortgage, lease, exchange, or gift.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 5',
        title: '"Transfer of property" defined',
        content: 'Defines the legal act by which a living person conveys property to one or more other living persons.',
      },
      {
        id: 'sec-2',
        number: 'Section 54',
        title: 'Sale defined',
        content: 'Describes the essential elements of a valid sale of immovable property and the requirement of registered instruments.',
      },
    ],
    officialSource: 'indiacode.nic.in',
    lastVerified: 'India Code legislative database',
    relatedLaws: [],
  },
  {
    id: 'indian-contract-1872',
    name: 'Indian Contract Act, 1872',
    year: 1872,
    category: 'civil',
    description:
      'Lays down the foundational principles governing agreements, obligations, agency, and contracts in India.',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 10',
        title: 'What agreements are contracts',
        content: 'Sets out the essential elements: free consent of parties, lawful consideration, lawful object, and competency.',
      },
      {
        id: 'sec-2',
        number: 'Section 73',
        title: 'Compensation for breach',
        content: 'Describes compensation available for loss or damage caused naturally by breach of contract.',
      },
    ],
    officialSource: 'indiacode.nic.in',
    lastVerified: 'India Code legislative database',
    relatedLaws: ['consumer-protection-2019', 'transfer-of-property-1882'],
  },
];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/rights/
app.get('/api/rights', (req, res) => {
  res.json(rightsData);
});
app.get('/api/rights/', (req, res) => {
  res.json(rightsData);
});

// GET /api/categories/
app.get('/api/categories', (req, res) => {
  res.json(categoriesData);
});
app.get('/api/categories/', (req, res) => {
  res.json(categoriesData);
});

// GET /api/situation-categories/
app.get('/api/situation-categories', (req, res) => {
  res.json(situationCategoriesData);
});
app.get('/api/situation-categories/', (req, res) => {
  res.json(situationCategoriesData);
});

// GET /api/legal-terms/
app.get('/api/legal-terms', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  if (!q) {
    return res.json(legalTermsData);
  }
  const filtered = legalTermsData.filter(
    (item) =>
      item.term.toLowerCase().includes(q) ||
      (item.fullForm && item.fullForm.toLowerCase().includes(q)) ||
      item.definition.toLowerCase().includes(q)
  );
  res.json(filtered);
});
app.get('/api/legal-terms/', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  if (!q) {
    return res.json(legalTermsData);
  }
  const filtered = legalTermsData.filter(
    (item) =>
      item.term.toLowerCase().includes(q) ||
      (item.fullForm && item.fullForm.toLowerCase().includes(q)) ||
      item.definition.toLowerCase().includes(q)
  );
  res.json(filtered);
});

// GET /api/legal-terms/:id
app.get('/api/legal-terms/:id', (req, res) => {
  const item = legalTermsData.find((t) => t.id === req.params.id);
  if (!item) {
    return res.status(404).json({ detail: 'Not found' });
  }
  res.json(item);
});
app.get('/api/legal-terms/:id/', (req, res) => {
  const item = legalTermsData.find((t) => t.id === req.params.id);
  if (!item) {
    return res.status(404).json({ detail: 'Not found' });
  }
  res.json(item);
});

// GET /api/laws/
app.get('/api/laws', (req, res) => {
  const category = (req.query.category as string) || '';
  const q = ((req.query.q as string) || '').toLowerCase().trim();

  let results = [...lawsData];
  if (category) {
    results = results.filter((l) => l.category === category);
  }
  if (q) {
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }
  res.json(results);
});
app.get('/api/laws/', (req, res) => {
  const category = (req.query.category as string) || '';
  const q = ((req.query.q as string) || '').toLowerCase().trim();

  let results = [...lawsData];
  if (category) {
    results = results.filter((l) => l.category === category);
  }
  if (q) {
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }
  res.json(results);
});

// GET /api/laws/:id/
app.get('/api/laws/:id', (req, res) => {
  const law = lawsData.find((l) => l.id === req.params.id);
  if (!law) {
    return res.status(404).json({ detail: 'Law not found' });
  }
  res.json(law);
});
app.get('/api/laws/:id/', (req, res) => {
  const law = lawsData.find((l) => l.id === req.params.id);
  if (!law) {
    return res.status(404).json({ detail: 'Law not found' });
  }
  res.json(law);
});

// GET /api/search/
app.get('/api/search', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  if (!q) {
    return res.json({ rights: [], laws: [], sections: [], terms: [] });
  }

  const matchedRights = rightsData.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.articles.toLowerCase().includes(q)
  );

  const matchedLaws = lawsData.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q)
  );

  const matchedSections: Array<{
    id: string;
    number: string;
    title: string;
    lawId: string;
    lawName: string;
  }> = [];

  lawsData.forEach((law) => {
    (law.sections || []).forEach((sec) => {
      if (
        sec.title.toLowerCase().includes(q) ||
        sec.number.toLowerCase().includes(q) ||
        sec.content.toLowerCase().includes(q)
      ) {
        matchedSections.push({
          id: sec.id,
          number: sec.number,
          title: sec.title,
          lawId: law.id,
          lawName: law.name,
        });
      }
    });
  });

  const matchedTerms = legalTermsData.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      (t.fullForm && t.fullForm.toLowerCase().includes(q)) ||
      t.definition.toLowerCase().includes(q)
  );

  res.json({
    rights: matchedRights,
    laws: matchedLaws,
    sections: matchedSections,
    terms: matchedTerms,
  });
});
app.get('/api/search/', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  if (!q) {
    return res.json({ rights: [], laws: [], sections: [], terms: [] });
  }

  const matchedRights = rightsData.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.articles.toLowerCase().includes(q)
  );

  const matchedLaws = lawsData.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q)
  );

  const matchedSections: Array<{
    id: string;
    number: string;
    title: string;
    lawId: string;
    lawName: string;
  }> = [];

  lawsData.forEach((law) => {
    (law.sections || []).forEach((sec) => {
      if (
        sec.title.toLowerCase().includes(q) ||
        sec.number.toLowerCase().includes(q) ||
        sec.content.toLowerCase().includes(q)
      ) {
        matchedSections.push({
          id: sec.id,
          number: sec.number,
          title: sec.title,
          lawId: law.id,
          lawName: law.name,
        });
      }
    });
  });

  const matchedTerms = legalTermsData.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      (t.fullForm && t.fullForm.toLowerCase().includes(q)) ||
      t.definition.toLowerCase().includes(q)
  );

  res.json({
    rights: matchedRights,
    laws: matchedLaws,
    sections: matchedSections,
    terms: matchedTerms,
  });
});

// POST /api/situations/analyze/
app.post('/api/situations/analyze', (req, res) => {
  const description = (req.body.description || '').trim();
  const category = req.body.category;

  if (!description) {
    return res.status(400).json({ detail: 'description is required.' });
  }

  const result = {
    legalArea: 'Consumer / Contract dispute',
    areaDescription:
      'Based on the general pattern of what you described, this may fall under consumer protection or contract-related law. This is only a starting point for your own reading — not a legal determination.',
    relevantLaws: [
      {
        lawName: 'Consumer Protection Act, 2019',
        section: 'Section 35 — Manner of filing complaint',
        explanation:
          'Describes the process for a consumer to file a complaint about defective goods or deficient services.',
      },
      {
        lawName: 'Indian Contract Act, 1872',
        section: 'Section 73 — Compensation for breach',
        explanation:
          'Describes the general principle of compensation when one party fails to honour an agreement.',
      },
    ],
    remedies: [
      {
        title: 'Consumer complaint',
        description:
          'A complaint may be filed with the relevant consumer forum describing the loss suffered.',
      },
      {
        title: 'Civil suit for breach of contract',
        description:
          'A civil suit may be an option if there was a written or verbal agreement that was not honoured.',
      },
    ],
    penalties: [
      {
        title: 'Compensation to the affected party',
        description:
          'Courts or forums may direct the responsible party to pay compensation for proven loss.',
      },
      {
        title: 'Refund or replacement',
        description:
          'In consumer matters, a refund, replacement, or repair may be ordered depending on the facts.',
      },
    ],
    receivedCategory: category,
  };

  res.json(result);
});
app.post('/api/situations/analyze/', (req, res) => {
  const description = (req.body.description || '').trim();
  const category = req.body.category;

  if (!description) {
    return res.status(400).json({ detail: 'description is required.' });
  }

  const result = {
    legalArea: 'Consumer / Contract dispute',
    areaDescription:
      'Based on the general pattern of what you described, this may fall under consumer protection or contract-related law. This is only a starting point for your own reading — not a legal determination.',
    relevantLaws: [
      {
        lawName: 'Consumer Protection Act, 2019',
        section: 'Section 35 — Manner of filing complaint',
        explanation:
          'Describes the process for a consumer to file a complaint about defective goods or deficient services.',
      },
      {
        lawName: 'Indian Contract Act, 1872',
        section: 'Section 73 — Compensation for breach',
        explanation:
          'Describes the general principle of compensation when one party fails to honour an agreement.',
      },
    ],
    remedies: [
      {
        title: 'Consumer complaint',
        description:
          'A complaint may be filed with the relevant consumer forum describing the loss suffered.',
      },
      {
        title: 'Civil suit for breach of contract',
        description:
          'A civil suit may be an option if there was a written or verbal agreement that was not honoured.',
      },
    ],
    penalties: [
      {
        title: 'Compensation to the affected party',
        description:
          'Courts or forums may direct the responsible party to pay compensation for proven loss.',
      },
      {
        title: 'Refund or replacement',
        description:
          'In consumer matters, a refund, replacement, or repair may be ordered depending on the facts.',
      },
    ],
    receivedCategory: category,
  };

  res.json(result);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nyaya server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
