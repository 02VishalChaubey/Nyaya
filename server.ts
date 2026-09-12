import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-Memory Database for Indian Legal Awareness System
import { fundamentalRights as rightsData } from './src/data/rights.js';

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

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
    return aiClient;
  }
  return null;
}

function getFallbackSituationResult(category?: string, description?: string) {
  if (category === 'cyber') {
    return {
      legalArea: 'Cyber Law & Digital Consumer Protection',
      areaDescription:
        'Online fraud, identity theft, unauthorized transactions, or cyber harassment in India fall primarily under the Information Technology Act and criminal provisions of the Bharatiya Nyaya Sanhita.',
      relevantLaws: [
        {
          lawName: 'Information Technology Act, 2000',
          section: 'Section 66C & 66D — Identity theft and cheating by personation',
          explanation:
            'Punishes identity theft, fraudulent password or credential misuse, and cheating using any computer resource.',
        },
        {
          lawName: 'Bharatiya Nyaya Sanhita, 2023',
          section: 'Section 318 — Cheating',
          explanation:
            'Covers deception causing wrongful loss or inducing delivery of property in physical or electronic contexts.',
        },
      ],
      remedies: [
        {
          title: 'Report on National Cyber Crime Reporting Portal',
          description:
            'File an incident immediately at cybercrime.gov.in or dial helpline 1930 to freeze fraudulent transactions.',
        },
        {
          title: 'Bank Fraud Alert & Chargeback',
          description:
            'Notify your bank within 72 hours for zero customer liability under RBI guidelines on unauthorized electronic banking transactions.',
        },
      ],
      penalties: [
        {
          title: 'Imprisonment and fine under IT Act',
          description:
            'Section 66D prescribes imprisonment of up to three years and a monetary fine.',
        },
        {
          title: 'Account freezing and restitution',
          description:
            'Investigating agencies can freeze destination bank accounts and recover misappropriated sums.',
        },
      ],
      receivedCategory: category,
    };
  }

  if (category === 'workplace') {
    return {
      legalArea: 'Labour & Employment Law',
      areaDescription:
        'Matters concerning wrongful termination, unpaid wages, gratuity withholding, or unsafe workplace conditions fall under Indian industrial and labour legislations.',
      relevantLaws: [
        {
          lawName: 'Payment of Wages Act, 1936',
          section: 'Section 15 — Claims arising out of deductions from wages',
          explanation:
            'Allows an employee to apply to the appointed Authority for recovery of delayed or illegally deducted wages.',
        },
        {
          lawName: 'Industrial Disputes Act, 1947',
          section: 'Section 2A & 25F — Retrenchment & Individual Dispute',
          explanation:
            'Requires prior notice or pay in lieu of notice and retrenchment compensation before terminating employment.',
        },
      ],
      remedies: [
        {
          title: 'Complaint to the Labour Commissioner',
          description:
            'Approach the local or state Labour Commissioner or conciliation officer for dispute resolution.',
        },
        {
          title: 'Legal notice for unpaid dues',
          description:
            'Issue a formal legal notice demanding payment of salary, earned leaves, and full and final settlement.',
        },
      ],
      penalties: [
        {
          title: 'Statutory interest and penalties',
          description:
            'Labour authorities can award statutory compensation and impose monetary penalties on non-compliant employers.',
        },
      ],
      receivedCategory: category,
    };
  }

  return {
    legalArea: 'Consumer & Civil Contract Remedies',
    areaDescription:
      'Based on the general pattern of what you described, this may fall under consumer protection or contract-related law. This provides an educational starting point for understanding applicable rights in India.',
    relevantLaws: [
      {
        lawName: 'Consumer Protection Act, 2019',
        section: 'Section 35 — Manner of filing complaint',
        explanation:
          'Describes the simple procedure for consumers to file a complaint regarding deficient goods or services before the District Commission.',
      },
      {
        lawName: 'Indian Contract Act, 1872',
        section: 'Section 73 — Compensation for breach',
        explanation:
          'Establishes the right to compensation for loss or damage caused naturally by a breach of contractual obligation.',
      },
    ],
    remedies: [
      {
        title: 'Consumer Forum Complaint (e-Daakhil)',
        description:
          'File an online grievance via edaakhil.nic.in or register with the National Consumer Helpline (1915).',
      },
      {
        title: 'Civil suit for breach or damages',
        description:
          'Where contractual agreements exist, parties may seek specific performance or monetary damages in civil court.',
      },
    ],
    penalties: [
      {
        title: 'Compensation to the affected party',
        description:
          'Forums or civil courts may direct payment of actual losses plus compensation for mental harassment.',
      },
      {
        title: 'Refund or replacement order',
        description:
          'Consumer commissions can direct refund of purchase price, rectification of defect, or replacement of goods.',
      },
    ],
    receivedCategory: category,
  };
}

async function analyzeSituationWithGemini(description: string, category?: string) {
  const ai = getGenAI();
  if (!ai) {
    return null;
  }

  const prompt = `You are an educational legal-information advisor specializing in Indian law (Bharatiya Nyaya Sanhita 2023, Bharatiya Nagarik Suraksha Sanhita 2023, Consumer Protection Act 2019, IT Act 2000, Indian Contract Act 1872, Constitution of India, Labour laws, etc.).
A citizen has shared this situation:
Description: "${description}"
Category context: "${category || 'General'}"

Analyze this situation and provide educational legal information in plain, straightforward English:
1. Identify the primary legalArea (short, clear title).
2. Write a 2-3 sentence plain-language areaDescription explaining the applicable legal domain.
3. List 2-3 relevantLaws (each with lawName, specific section or article, and a 1-2 sentence plain-language explanation of what it provides).
4. List 2-3 realistic remedies (title and description of what steps the citizen can explore, such as filing an FIR/e-FIR, consumer forum/e-Daakhil, sending a legal notice, national consumer helpline, cybercrime portal, etc.).
5. List 2-3 possible penalties or outcomes for the wrongdoer (title and description).

Keep the language accessible, objective, educational, and respectful.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            legalArea: { type: Type.STRING },
            areaDescription: { type: Type.STRING },
            relevantLaws: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  lawName: { type: Type.STRING },
                  section: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['lawName', 'section', 'explanation'],
              },
            },
            remedies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['title', 'description'],
              },
            },
            penalties: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['title', 'description'],
              },
            },
          },
          required: ['legalArea', 'areaDescription', 'relevantLaws', 'remedies', 'penalties'],
        },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return {
        ...parsed,
        receivedCategory: category,
      };
    }
  } catch (err) {
    console.error('Gemini situation analysis error:', err);
  }
  return null;
}

const handleSituationAnalysis = async (req: express.Request, res: express.Response) => {
  const description = (req.body.description || '').trim();
  const category = req.body.category;

  if (!description) {
    return res.status(400).json({ detail: 'description is required.' });
  }

  // First try Gemini AI
  const aiResult = await analyzeSituationWithGemini(description, category);
  if (aiResult) {
    return res.json(aiResult);
  }

  // Fallback to structured offline legal responses
  const fallback = getFallbackSituationResult(category, description);
  res.json(fallback);
};

// POST /api/situations/analyze/
app.post('/api/situations/analyze', handleSituationAnalysis);
app.post('/api/situations/analyze/', handleSituationAnalysis);


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
    console.log(`Enmachi server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
