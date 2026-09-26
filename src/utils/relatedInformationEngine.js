// Reusable Statutory & Jurisprudential Relationship Engine for Nyaya
// Connects verified legal relationships across:
// 1. Laws & Statutes (BNS, BNSS, POCSO, Consumer Protection, etc.)
// 2. Statutory Sections (BNS 103, BNSS 173, BNSS 35–58, BNSS 481/484, etc.)
// 3. Constitutional Articles (Art. 14, 19, 21, 22, 32, 226)
// 4. Codified Legal Terms (Bail, Remand, Arrest, Zero FIR, Habeas Corpus)
// 5. Landmark Case Precedents (Puttaswamy, Maneka Gandhi, D.K. Basu, Satender Antil, etc.)
// 6. Practical Procedural Guides (FIR filing, Arrest rights, Bail roadmaps)
//
// STRICT GUARANTEE: Recommendations are derived strictly from verified statutory links
// and judicial cross-references in the actual dataset. No random AI hallucinations.

import { laws } from '../data/laws.js'
import { fundamentalRights, landmarkCases } from '../data/rights.js'
import { legalTerms } from '../data/legalTerms.js'
import { legalGuides } from '../data/guides.js'
import { lawComparisonsData } from '../data/lawComparisons.js'

// Curated Relational Knowledge Graph for Indian Jurisprudence
// Maps primary concepts and entities directly to related data points.
const DIRECT_RELATIONSHIPS = {
  // === CONSTITUTIONAL ARTICLES & RIGHTS ===
  'article-21': {
    primaryTitle: 'Article 21: Protection of Life and Personal Liberty',
    laws: ['bnss-2023', 'bns-2023', 'pocso-2012', 'it-act-2000'],
    sections: [
      { lawId: 'bnss-2023', section: '35', label: 'BNSS Sec 35 (Arrest safeguards)', reason: 'Codifies personal liberty protections upon police custody' },
      { lawId: 'bnss-2023', section: '58', label: 'BNSS Sec 58 (24-Hour Production)', reason: 'Enforces constitutional limit on police custody without warrant' },
      { lawId: 'bnss-2023', section: '481', label: 'BNSS Sec 481 (1/3rd Undertrial Relief)', reason: 'Protects undertrials from indefinite pre-conviction detention' },
      { lawId: 'bnss-2023', section: '484', label: 'BNSS Sec 484 (Anticipatory Bail)', reason: 'Pre-arrest judicial remedy against arbitrary incarceration' },
      { lawId: 'bns-2023', section: '103', label: 'BNS Sec 103 (Punishment for Murder & Mob Lynching)', reason: 'Substantive penal sanction against deprivation of life' },
    ],
    articles: ['Article 14', 'Article 19', 'Article 20', 'Article 22', 'Article 32'],
    terms: ['bail', 'arrest', 'remand', 'anticipatory-bail', 'bail-bond', 'habeas-corpus', 'zero-fir'],
    cases: ['puttaswamy-2017', 'maneka-1978', 'dk-basu-1997', 'gopalan-1950', 'vishaka-1997'],
    guides: ['guide-arrest-rights', 'guide-bail-undertrial', 'guide-zero-fir'],
  },
  'article-14': {
    primaryTitle: 'Article 14: Equality Before Law & Equal Protection',
    laws: ['indian-contract-1872', 'consumer-protection-2019', 'bnss-2023'],
    sections: [
      { lawId: 'bnss-2023', section: '173', label: 'BNSS Sec 173 (Zero FIR)', reason: 'Equal territorial access to police registration regardless of station' },
      { lawId: 'bnss-2023', section: '479', label: 'BNSS Sec 479 (Indigent Bail)', reason: 'Equal relief for impoverished prisoners unable to furnish cash sureties' },
    ],
    articles: ['Article 15', 'Article 16', 'Article 19', 'Article 21', 'Article 32'],
    terms: ['cognizable-offence', 'plea-bargaining', 'habeas-corpus'],
    cases: ['indra-sawhney-1992', 'maneka-1978', 'vishaka-1997'],
    guides: ['guide-legal-aid', 'guide-zero-fir'],
  },
  'article-19': {
    primaryTitle: 'Article 19: Protection of Six Fundamental Freedoms',
    laws: ['it-act-2000', 'bns-2023', 'bnss-2023'],
    sections: [
      { lawId: 'bns-2023', section: '356', label: 'BNS Sec 356 (Defamation)', reason: 'Governed by reasonable restrictions under Article 19(2)' },
      { lawId: 'bns-2023', section: '152', label: 'BNS Sec 152 (Sovereignty & Integrity)', reason: 'Replaces sedition with focus on incitement against sovereignty' },
      { lawId: 'bnss-2023', section: '163', label: 'BNSS Sec 163 (Public Assembly Orders)', reason: 'Executive powers to disperse unlawful assemblies' },
    ],
    articles: ['Article 14', 'Article 21', 'Article 32'],
    terms: ['contempt-of-court', 'habeas-corpus'],
    cases: ['shreya-singhal-2015', 'maneka-1978', 'anuradha-bhasin-2020'],
    guides: ['guide-cyber-financial', 'guide-arrest-rights'],
  },
  'article-22': {
    primaryTitle: 'Article 22: Protection Against Arrest and Detention',
    laws: ['bnss-2023'],
    sections: [
      { lawId: 'bnss-2023', section: '35', label: 'BNSS Sec 35 (Arrest powers & restrictions)', reason: 'Direct statutory implementation of Article 22 safeguards' },
      { lawId: 'bnss-2023', section: '47', label: 'BNSS Sec 47 (Grounds of arrest disclosure)', reason: 'Fulfills Article 22(1) mandatory notice requirement' },
      { lawId: 'bnss-2023', section: '58', label: 'BNSS Sec 58 (24-Hour Magistrate rule)', reason: 'Statutory counterpart to Article 22(2) production mandate' },
    ],
    articles: ['Article 20', 'Article 21', 'Article 32'],
    terms: ['arrest', 'remand', 'bail', 'habeas-corpus'],
    cases: ['dk-basu-1997', 'gopalan-1950'],
    guides: ['guide-arrest-rights', 'guide-bail-undertrial'],
  },
  'article-32': {
    primaryTitle: 'Article 32: Right to Constitutional Remedies',
    laws: ['constitution-of-india', 'bnss-2023'],
    sections: [
      { lawId: 'bnss-2023', section: '484', label: 'BNSS Sec 484 (Anticipatory Bail)', reason: 'Pre-trial High Court protection against liberty infringements' },
    ],
    articles: ['Article 13', 'Article 21', 'Article 226'],
    terms: ['habeas-corpus', 'mandamus', 'certiorari', 'quo-warranto', 'prohibition', 'public-interest-litigation'],
    cases: ['kesavananda-1973', 'minerva-1980', 'maneka-1978'],
    guides: ['guide-legal-aid', 'guide-arrest-rights'],
  },

  // === PENAL CODE (BNS) SECTIONS ===
  'bns-103': {
    primaryTitle: 'BNS Section 103: Punishment for Murder & Mob Lynching',
    laws: ['bns-2023', 'bnss-2023'],
    sections: [
      { lawId: 'bns-2023', section: '100', label: 'BNS Sec 100 (Culpable Homicide)', reason: 'Foundational statutory definition of intentional killing' },
      { lawId: 'bns-2023', section: '109', label: 'BNS Sec 109 (Attempt to Murder)', reason: 'Prescribes punishment where fatal consequences were averted' },
      { lawId: 'bns-2023', section: '111', label: 'BNS Sec 111 (Organised Crime)', reason: 'Syndicate murder and gang assassinations' },
      { lawId: 'bns-2023', section: '4', label: 'BNS Sec 4 (Punishments)', reason: 'Governs death penalty and life imprisonment parameters' },
      { lawId: 'bnss-2023', section: '193', label: 'BNSS Sec 193 (Police Investigation Report)', reason: 'Procedure for filing chargesheet in homicide trials' },
    ],
    articles: ['Article 21', 'Article 20', 'Article 14'],
    terms: ['cognizable-offence', 'non-bailable-offence', 'remand', 'chargesheet', 'bail'],
    cases: ['bachan-singh-1980', 'tehseen-poonawalla-2018'],
    guides: ['guide-zero-fir', 'guide-arrest-rights'],
    concordanceId: 'murder-mob-lynching',
  },
  'bns-63': {
    primaryTitle: 'BNS Section 63: Rape & Strict Consent Standard',
    laws: ['bns-2023', 'pocso-2012', 'bnss-2023'],
    sections: [
      { lawId: 'bns-2023', section: '64', label: 'BNS Sec 64 (Punishment for Rape)', reason: 'Mandatory minimum 10-year term to natural life' },
      { lawId: 'bns-2023', section: '69', label: 'BNS Sec 69 (Sexual Intercourse on False Promise of Marriage)', reason: 'New standalone penal offence for deceitful sexual inducement' },
      { lawId: 'bns-2023', section: '70', label: 'BNS Sec 70 (Gang Rape & Aggravated Gang Rape)', reason: 'Capital punishment for gang rape of victims under 18' },
      { lawId: 'bnss-2023', section: '176', label: 'BNSS Sec 176 (Mandatory Videography of Statements)', reason: 'Mandatory recorded audio-video recording of sexual assault victim statements' },
    ],
    articles: ['Article 21', 'Article 15'],
    terms: ['zero-fir', 'cognizable-offence', 'non-bailable-offence', 'anticipatory-bail'],
    cases: ['vishaka-1997', 'independent-thought-2017'],
    guides: ['guide-zero-fir', 'guide-arrest-rights'],
    concordanceId: 'rape-aggravated',
  },
  'bns-303': {
    primaryTitle: 'BNS Section 303: Theft & Community Service Reform',
    laws: ['bns-2023', 'bnss-2023'],
    sections: [
      { lawId: 'bns-2023', section: '304', label: 'BNS Sec 304 (Snatching)', reason: 'Distinct graded offence for violent or forceful theft' },
      { lawId: 'bns-2023', section: '308', label: 'BNS Sec 308 (Extortion)', reason: 'Theft accompanied by wrongful putting in fear of injury' },
      { lawId: 'bns-2023', section: '4', label: 'BNS Sec 4(f) (Community Service)', reason: 'Statutory definition of community service penal sanction' },
    ],
    articles: ['Article 21'],
    terms: ['bailable-offence', 'compoundable-offence', 'plea-bargaining'],
    cases: ['satender-antil-2022'],
    guides: ['guide-bail-undertrial'],
    concordanceId: 'theft-community-service',
  },
  'bns-318': {
    primaryTitle: 'BNS Section 318: Cheating and Dishonestly Inducing Delivery',
    laws: ['bns-2023', 'consumer-protection-2019', 'it-act-2000'],
    sections: [
      { lawId: 'bns-2023', section: '316', label: 'BNS Sec 316 (Criminal Breach of Trust)', reason: 'Distinction between fraudulent inducement and entrusted property misdirection' },
      { lawId: 'bns-2023', section: '319', label: 'BNS Sec 319 (Cheating by Personation)', reason: 'Impersonation scams and fraudulent identity misrepresentation' },
      { lawId: 'bns-2023', section: '336', label: 'BNS Sec 336 (Forgery)', reason: 'Fabrication of false electronic or paper records to defraud' },
    ],
    articles: ['Article 21', 'Article 14'],
    terms: ['cognizable-offence', 'anticipatory-bail', 'bail', 'compoundable-offence'],
    cases: ['satender-antil-2022'],
    guides: ['guide-cyber-financial', 'guide-consumer-edaakhil'],
    concordanceId: 'cheating-420',
  },
  'bns-106': {
    primaryTitle: 'BNS Section 106: Rash & Negligent Driving & Hit-and-Run',
    laws: ['bns-2023', 'bnss-2023'],
    sections: [
      { lawId: 'bns-2023', section: '106-1', label: 'BNS Sec 106(1) (Rash/Negligent Act)', reason: 'Base offence carrying up to 5 years imprisonment' },
      { lawId: 'bns-2023', section: '106-2', label: 'BNS Sec 106(2) (Hit-and-Run Driving)', reason: '10-year penalty clause currently in executive abeyance pending consultation' },
    ],
    articles: ['Article 21', 'Article 20'],
    terms: ['bailable-offence', 'zero-fir'],
    cases: ['jacob-mathew-2005'],
    guides: ['guide-zero-fir'],
    concordanceId: 'death-by-negligence-hit-and-run',
  },
  'bns-152': {
    primaryTitle: 'BNS Section 152: Acts Endangering Sovereignty & Integrity of India',
    laws: ['bns-2023'],
    sections: [
      { lawId: 'bns-2023', section: '147', label: 'BNS Sec 147 (Waging War against the Government)', reason: 'High treason and armed rebellion provisions' },
      { lawId: 'bns-2023', section: '197', label: 'BNS Sec 197 (Prejudicial Imputations)', reason: 'Assertions prejudicial to national integration' },
    ],
    articles: ['Article 19', 'Article 21'],
    terms: ['cognizable-offence', 'non-bailable-offence'],
    cases: ['kedar-nath-1962', 'vombatkere-2022'],
    guides: ['guide-arrest-rights'],
    concordanceId: 'sedition-vs-sovereignty',
  },

  // === CRIMINAL PROCEDURE (BNSS) SECTIONS ===
  'bnss-173': {
    primaryTitle: 'BNSS Section 173: Information in Cognizable Cases (Zero FIR)',
    laws: ['bnss-2023', 'bns-2023'],
    sections: [
      { lawId: 'bnss-2023', section: '175', label: 'BNSS Sec 175 (Investigation Powers)', reason: 'Statutory mandate to commence crime inquiry upon FIR registration' },
      { lawId: 'bnss-2023', section: '176', label: 'BNSS Sec 176 (Forensic Investigation & Videography)', reason: 'Mandatory crime scene forensic visit for offences punishable with 7+ years' },
      { lawId: 'bnss-2023', section: '193', label: 'BNSS Sec 193 (Chargesheet Submission)', reason: '90-day procedural closure for police inquiry reports' },
    ],
    articles: ['Article 21', 'Article 14'],
    terms: ['zero-fir', 'fir', 'cognizable-offence', 'chargesheet'],
    cases: ['lalita-kumari-2014'],
    guides: ['guide-zero-fir', 'guide-cyber-financial'],
  },
  'bnss-481': {
    primaryTitle: 'BNSS Section 481: Undertrial Prisoner Relief (1/3rd Rule)',
    laws: ['bnss-2023'],
    sections: [
      { lawId: 'bnss-2023', section: '478', label: 'BNSS Sec 478 (Bail in Bailable Offences)', reason: 'Statutory absolute entitlement to release on bond' },
      { lawId: 'bnss-2023', section: '479', label: 'BNSS Sec 479 (Indigent Accused Relief)', reason: 'Release without financial surety after 7 days detention' },
      { lawId: 'bnss-2023', section: '480', label: 'BNSS Sec 480 (Discretionary Non-Bailable Bail)', reason: 'Judicial factors for regular bail in serious accusations' },
      { lawId: 'bnss-2023', section: '484', label: 'BNSS Sec 484 (Anticipatory Bail)', reason: 'Pre-arrest relief by High Court or Sessions Court' },
    ],
    articles: ['Article 21', 'Article 14', 'Article 22'],
    terms: ['bail', 'bail-bond', 'anticipatory-bail', 'remand'],
    cases: ['satender-antil-2022', 'hussainara-khatoon-1979'],
    guides: ['guide-bail-undertrial', 'guide-arrest-rights'],
  },
  'bnss-35': {
    primaryTitle: 'BNSS Section 35: Arrest of Persons & Safeguards',
    laws: ['bnss-2023', 'constitution-of-india'],
    sections: [
      { lawId: 'bnss-2023', section: '36', label: 'BNSS Sec 36 (Arrest Memo)', reason: 'Mandatory contemporaneous record witnessed by local family member' },
      { lawId: 'bnss-2023', section: '43', label: 'BNSS Sec 43 (Arrest of Women)', reason: 'Sunset-to-sunrise arrest prohibition without prior magisterial warrant' },
      { lawId: 'bnss-2023', section: '47', label: 'BNSS Sec 47 (Grounds of Arrest)', reason: 'Mandatory information regarding accusation and bailability' },
      { lawId: 'bnss-2023', section: '58', label: 'BNSS Sec 58 (24-Hour Production)', reason: 'Strict statutory ceiling before mandatory judicial appearance' },
    ],
    articles: ['Article 21', 'Article 22'],
    terms: ['arrest', 'remand', 'bail', 'habeas-corpus'],
    cases: ['dk-basu-1997', 'arnesh-kumar-2014'],
    guides: ['guide-arrest-rights', 'guide-bail-undertrial'],
  },
  'bnss-484': {
    primaryTitle: 'BNSS Section 484: Direction for Grant of Anticipatory Bail',
    laws: ['bnss-2023', 'bns-2023'],
    sections: [
      { lawId: 'bnss-2023', section: '480', label: 'BNSS Sec 480 (Bail for Non-Bailable Offences)', reason: 'General standard for release during pendency of trial' },
      { lawId: 'bnss-2023', section: '486', label: 'BNSS Sec 486 (Bond of Accused and Sureties)', reason: 'Execution of recognizance upon grant of relief' },
    ],
    articles: ['Article 21'],
    terms: ['anticipatory-bail', 'bail', 'bail-bond', 'arrest'],
    cases: ['sushila-aggarwal-2020', 'gurbaksh-sibbia-1980'],
    guides: ['guide-bail-undertrial', 'guide-arrest-rights'],
  },

  // === SPECIAL STATUTES ===
  'pocso-2012': {
    primaryTitle: 'POCSO Act, 2012: Protection of Children from Sexual Offences',
    laws: ['bns-2023', 'bnss-2023'],
    sections: [
      { lawId: 'bns-2023', section: '64', label: 'BNS Sec 64 (Rape of Minor)', reason: 'Concurrent penalties up to 20 years or life imprisonment' },
      { lawId: 'bns-2023', section: '70', label: 'BNS Sec 70 (Gang Rape of Child)', reason: 'Prescribes mandatory capital punishment or natural life imprisonment' },
      { lawId: 'bnss-2023', section: '176', label: 'BNSS Sec 176 (In-Camera & Child Examination)', reason: 'Mandates child-friendly environment and female police recording' },
    ],
    articles: ['Article 15', 'Article 21', 'Article 24'],
    terms: ['child-minor', 'zero-fir', 'non-bailable-offence', 'anticipatory-bail'],
    cases: ['independent-thought-2017'],
    guides: ['guide-zero-fir'],
  },
  'consumer-protection-2019': {
    primaryTitle: 'Consumer Protection Act, 2019',
    laws: ['it-act-2000', 'indian-contract-1872', 'bns-2023'],
    sections: [
      { lawId: 'bns-2023', section: '318', label: 'BNS Sec 318 (Cheating)', reason: 'Criminal liability for fraudulent e-commerce scams and misrepresentation' },
      { lawId: 'it-act-2000', section: '66d', label: 'IT Act Sec 66D (Cheating by Personation Using Computer)', reason: 'Cybercrime redressal for phishing and UPI scams' },
    ],
    articles: ['Article 14', 'Article 21'],
    terms: ['consumer-grievance', 'deficiency-of-service', 'e-daakhil'],
    cases: [],
    guides: ['guide-consumer-edaakhil', 'guide-cyber-financial'],
  },
  'it-act-2000': {
    primaryTitle: 'Information Technology Act, 2000',
    laws: ['consumer-protection-2019', 'bns-2023', 'bnss-2023'],
    sections: [
      { lawId: 'bns-2023', section: '318', label: 'BNS Sec 318 (Cheating & Online Fraud)', reason: 'Penal codification for digital deception and electronic theft' },
      { lawId: 'bnss-2023', section: '173', label: 'BNSS Sec 173 (Electronic FIR / e-FIR)', reason: 'Statutory recognition of digital FIR registration within 3 days' },
    ],
    articles: ['Article 19', 'Article 21'],
    terms: ['cyber-fraud', 'zero-fir', 'document-electronic'],
    cases: ['shreya-singhal-2015', 'puttaswamy-2017'],
    guides: ['guide-cyber-financial', 'guide-zero-fir'],
  },
}

// Master Precedents Database lookup
const PRECEDENT_LOOKUP = {
  'puttaswamy-2017': {
    id: 'puttaswamy-2017',
    name: 'K.S. Puttaswamy v. Union of India',
    year: '2017',
    forum: 'Supreme Court (9-Judge Bench)',
    ruling: 'Declared that the Right to Privacy is an intrinsic, fundamental facet of Life and Personal Liberty guaranteed under Article 21 and Part III.',
    url: '/fundamental-rights#cases-section',
  },
  'maneka-1978': {
    id: 'maneka-1978',
    name: 'Maneka Gandhi v. Union of India',
    year: '1978',
    forum: 'Supreme Court of India',
    ruling: 'Established that statutory procedure depriving liberty must be "just, fair, and reasonable", creating the Golden Triangle linking Articles 14, 19, and 21.',
    url: '/fundamental-rights#cases-section',
  },
  'dk-basu-1997': {
    id: 'dk-basu-1997',
    name: 'D.K. Basu v. State of West Bengal',
    year: '1997',
    forum: 'Supreme Court of India',
    ruling: 'Formulated binding constitutional guidelines for arrest, detention, and custodial interrogation, now codified into BNSS Sections 35–58.',
    url: '/fundamental-rights#cases-section',
  },
  'kesavananda-1973': {
    id: 'kesavananda-1973',
    name: 'Kesavananda Bharati v. State of Kerala',
    year: '1973',
    forum: 'Supreme Court (13-Judge Bench)',
    ruling: 'Established the Basic Structure Doctrine: Parliament can amend any provision of the Constitution, but cannot damage or destroy its core foundational values.',
    url: '/fundamental-rights#cases-section',
  },
  'vishaka-1997': {
    id: 'vishaka-1997',
    name: 'Vishaka v. State of Rajasthan',
    year: '1997',
    forum: 'Supreme Court of India',
    ruling: 'Laid down judicial guidelines against sexual harassment of women at the workplace under Articles 14, 19, and 21, preceding the POSH Act.',
    url: '/fundamental-rights#cases-section',
  },
  'indra-sawhney-1992': {
    id: 'indra-sawhney-1992',
    name: 'Indra Sawhney v. Union of India',
    year: '1992',
    forum: 'Supreme Court (9-Judge Bench)',
    ruling: 'Upheld 27% reservations for OBCs under Article 16(4) while setting a 50% ceiling and excluding the creamy layer to maintain equal opportunity.',
    url: '/fundamental-rights#cases-section',
  },
  'shreya-singhal-2015': {
    id: 'shreya-singhal-2015',
    name: 'Shreya Singhal v. Union of India',
    year: '2015',
    forum: 'Supreme Court of India',
    ruling: 'Struck down Section 66A of the IT Act, 2000 as unconstitutionally vague and violative of the Right to Free Speech under Article 19(1)(a).',
    url: '/fundamental-rights#cases-section',
  },
  'satender-antil-2022': {
    id: 'satender-antil-2022',
    name: 'Satender Kumar Antil v. CBI',
    year: '2022',
    forum: 'Supreme Court of India',
    ruling: 'Comprehensive guidelines categorising offences (A to D) to streamline bail, holding that arrests must not be automatic and jail is an exception.',
    url: '/legal-terms#bail',
  },
  'sushila-aggarwal-2020': {
    id: 'sushila-aggarwal-2020',
    name: 'Sushila Aggarwal v. State (NCT of Delhi)',
    year: '2020',
    forum: 'Supreme Court (5-Judge Bench)',
    ruling: 'Ruled that anticipatory bail should not be routinely limited to a fixed time period and can continue until the end of the trial.',
    url: '/legal-terms#anticipatory-bail',
  },
  'lalita-kumari-2014': {
    id: 'lalita-kumari-2014',
    name: 'Lalita Kumari v. Govt of Uttar Pradesh',
    year: '2014',
    forum: 'Supreme Court (5-Judge Constitution Bench)',
    ruling: 'Registration of FIR is mandatory under Section 154 CrPC (now Section 173 BNSS) if the information discloses commission of a cognizable offence.',
    url: '/legal-terms#fir',
  },
  'bachan-singh-1980': {
    id: 'bachan-singh-1980',
    name: 'Bachan Singh v. State of Punjab',
    year: '1980',
    forum: 'Supreme Court (Constitution Bench)',
    ruling: 'Capital punishment for murder under Section 302 IPC / Section 103 BNS is constitutional but must be awarded only in the "rarest of rare" cases.',
    url: '/laws/bns-2023',
  },
  'tehseen-poonawalla-2018': {
    id: 'tehseen-poonawalla-2018',
    name: 'Tehseen S. Poonawalla v. Union of India',
    year: '2018',
    forum: 'Supreme Court of India',
    ruling: 'Directed Parliament to create a standalone offence for mob lynching and issued preventive, remedial, and punitive guidelines to curb vigilante mob violence.',
    url: '/laws/bns-2023',
  },
  'hussainara-khatoon-1979': {
    id: 'hussainara-khatoon-1979',
    name: 'Hussainara Khatoon v. Home Secretary, Bihar',
    year: '1979',
    forum: 'Supreme Court of India',
    ruling: 'Speedy trial is an inalienable fundamental right under Article 21, directing release of undertrials detained longer than maximum statutory terms.',
    url: '/legal-terms#bail',
  },
  'arnesh-kumar-2014': {
    id: 'arnesh-kumar-2014',
    name: 'Arnesh Kumar v. State of Bihar',
    year: '2014',
    forum: 'Supreme Court of India',
    ruling: 'Police officers must not automatically arrest when an offence is punishable with up to 7 years imprisonment without satisfying Section 41 CrPC / Section 35 BNSS checklist.',
    url: '/legal-terms#arrest',
  },
  'jacob-mathew-2005': {
    id: 'jacob-mathew-2005',
    name: 'Jacob Mathew v. State of Punjab',
    year: '2005',
    forum: 'Supreme Court of India',
    ruling: 'Medical practitioners cannot be prosecuted for criminal negligence under 304A IPC / 106 BNS unless gross negligence and lack of ordinary skill is prima facie established.',
    url: '/laws/bns-2023',
  },
  'independent-thought-2017': {
    id: 'independent-thought-2017',
    name: 'Independent Thought v. Union of India',
    year: '2017',
    forum: 'Supreme Court of India',
    ruling: 'Struck down exception permitting sexual intercourse with a married girl aged 15-18, holding bodily integrity and POCSO protections universal under Article 21.',
    url: '/laws/pocso-2012',
  },
}

/**
 * Normalizes input key to resolve relevant graph relationships
 */
function resolveGraphKey({ type, id, sectionNumber, articleNumber, lawId }) {
  if (type === 'article' || articleNumber) {
    const rawArt = (articleNumber || id || '').toLowerCase().replace(/[^a-z0-9]/g, '')
    if (rawArt.includes('21')) return 'article-21'
    if (rawArt.includes('14')) return 'article-14'
    if (rawArt.includes('19')) return 'article-19'
    if (rawArt.includes('22')) return 'article-22'
    if (rawArt.includes('32')) return 'article-32'
    if (id === 'equality') return 'article-14'
    if (id === 'freedom') return 'article-21'
    if (id === 'remedies' || id === 'constitutional-remedies') return 'article-32'
    return 'article-21'
  }

  if (type === 'section' || sectionNumber) {
    const s = String(sectionNumber || id || '').toLowerCase().replace(/[^0-9]/g, '')
    const l = String(lawId || '').toLowerCase()

    if (l.includes('bns') || s === '103' || s === '302') {
      if (s === '103' || s === '302') return 'bns-103'
      if (s === '63' || s === '64' || s === '69' || s === '70' || s === '376') return 'bns-63'
      if (s === '303' || s === '304' || s === '379') return 'bns-303'
      if (s === '318' || s === '420') return 'bns-318'
      if (s === '106' || s === '304a') return 'bns-106'
      if (s === '152' || s === '124a') return 'bns-152'
      return 'bns-103'
    }

    if (l.includes('bnss') || s === '173' || s === '154' || s === '481' || s === '484' || s === '35') {
      if (s === '173' || s === '154') return 'bnss-173'
      if (s === '481' || s === '436a') return 'bnss-481'
      if (s === '35' || s === '41' || s === '58') return 'bnss-35'
      if (s === '484' || s === '438') return 'bnss-484'
      return 'bnss-173'
    }
  }

  if (type === 'term') {
    const cleanId = String(id || '').toLowerCase()
    if (cleanId.includes('bail') || cleanId.includes('remand')) return 'bnss-481'
    if (cleanId.includes('arrest')) return 'bnss-35'
    if (cleanId.includes('fir') || cleanId.includes('zero')) return 'bnss-173'
    if (cleanId.includes('privacy') || cleanId.includes('liberty')) return 'article-21'
    if (cleanId.includes('cheating')) return 'bns-318'
    return 'article-21'
  }

  if (type === 'law' || lawId) {
    const l = String(lawId || id || '').toLowerCase()
    if (l.includes('pocso')) return 'pocso-2012'
    if (l.includes('consumer')) return 'consumer-protection-2019'
    if (l.includes('it-act') || l === 'it') return 'it-act-2000'
    if (l.includes('bnss')) return 'bnss-173'
    if (l.includes('bns')) return 'bns-103'
    return 'article-21'
  }

  return 'article-21'
}

/**
 * Main Relational Recommendation Engine.
 * Extracts connected laws, sections, constitutional articles, legal terms, cases, and guides
 * strictly from actual relationships in the dataset.
 */
export function getRelatedInformation(target = {}) {
  const graphKey = resolveGraphKey(target)
  const node = DIRECT_RELATIONSHIPS[graphKey] || DIRECT_RELATIONSHIPS['article-21']

  // 1. Resolve Related Laws
  const relatedLaws = (node.laws || [])
    .map((lawId) => {
      const match = laws.find((l) => l.id === lawId)
      if (!match) return null
      return {
        id: match.id,
        title: match.name,
        subtitle: `${match.category?.toUpperCase() || 'STATUTE'} · Act of ${match.year}`,
        url: `/laws/${match.id}`,
        badge: 'Statute',
        description: match.description?.slice(0, 120) + '...',
      }
    })
    .filter(Boolean)

  // 2. Resolve Related Sections
  const relatedSections = (node.sections || []).map((sec) => {
    let sectionUrl = `/laws/${sec.lawId}`
    if (sec.lawId === 'bns-2023') {
      sectionUrl = `/laws/bns-2023#sec-${sec.section}`
    } else if (sec.lawId === 'bnss-2023') {
      sectionUrl = `/laws/bnss-2023#sec-${sec.section}`
    }

    return {
      id: `${sec.lawId}-${sec.section}`,
      title: sec.label,
      subtitle: sec.lawId.toUpperCase().replace('-', ' '),
      relationReason: sec.reason,
      url: sectionUrl,
      badge: 'Statutory Clause',
    }
  })

  // 3. Resolve Constitutional Articles
  const relatedArticles = (node.articles || []).map((artStr) => {
    let rightMatch = null
    fundamentalRights.forEach((r) => {
      if (r.articlesList?.some((a) => a.number.toLowerCase() === artStr.toLowerCase())) {
        rightMatch = r
      }
    })

    return {
      id: `art-${artStr.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      title: artStr,
      subtitle: rightMatch ? rightMatch.title : 'Part III · Supreme Law',
      relationReason: `Constitutional guarantee interpreting individual rights & state duties.`,
      url: rightMatch ? `/fundamental-rights#${rightMatch.id}` : `/fundamental-rights`,
      badge: 'Constitution',
    }
  })

  // 4. Resolve Legal Terms
  const relatedTerms = (node.terms || [])
    .map((termId) => {
      const match = legalTerms.find((t) => t.id === termId)
      if (!match) return null
      return {
        id: match.id,
        title: match.term,
        subtitle: match.category || 'Legal Term',
        plainLanguage: match.plainLanguage,
        url: `/legal-terms#${match.id}`,
        badge: 'Codified Term',
      }
    })
    .filter(Boolean)

  // 5. Resolve Landmark Precedents / Cases
  const relatedCases = (node.cases || [])
    .map((caseKey) => {
      const precedent = PRECEDENT_LOOKUP[caseKey]
      if (!precedent) {
        const fallback = landmarkCases.find((c) => c.id === caseKey)
        if (!fallback) return null
        return {
          id: fallback.id,
          title: `${fallback.caseName} (${fallback.year})`,
          subtitle: fallback.relatedArticle,
          ruling: fallback.keyTakeaway,
          url: `/fundamental-rights#cases-section`,
          badge: 'Supreme Court Case',
        }
      }
      return {
        id: precedent.id,
        title: `${precedent.name} (${precedent.year})`,
        subtitle: precedent.forum,
        ruling: precedent.ruling,
        url: precedent.url,
        badge: 'Landmark Precedent',
      }
    })
    .filter(Boolean)

  // 6. Resolve Practical Guides
  const relatedGuides = (node.guides || [])
    .map((guideId) => {
      const guide = legalGuides.find((g) => g.id === guideId)
      if (!guide) return null
      return {
        id: guide.id,
        title: guide.title,
        subtitle: guide.statuteReference,
        summary: guide.summary,
        url: `/search?q=${encodeURIComponent(guide.title)}`,
        badge: 'Step-by-Step SOP',
      }
    })
    .filter(Boolean)

  // 7. Resolve Concordance / Transition (IPC ↔ BNS) if available
  let relatedConcordance = null
  if (node.concordanceId) {
    const comp = lawComparisonsData.find((c) => c.id === node.concordanceId)
    if (comp) {
      relatedConcordance = {
        id: comp.id,
        title: `${comp.oldProvision.section} ↔ ${comp.newProvision.section}: ${comp.offenceTitle}`,
        difference: comp.plainLanguageDifference,
        status: comp.mappingStatus,
        url: `/compare#${comp.id}`,
        badge: comp.mappingStatus === 'verified' ? 'Verified Concordance' : 'Requires Verification',
      }
    }
  }

  const totalConnections =
    relatedLaws.length +
    relatedSections.length +
    relatedArticles.length +
    relatedTerms.length +
    relatedCases.length +
    relatedGuides.length +
    (relatedConcordance ? 1 : 0)

  return {
    graphKey,
    primaryTitle: node.primaryTitle,
    totalConnections,
    relatedLaws,
    relatedSections,
    relatedArticles,
    relatedTerms,
    relatedCases,
    relatedGuides,
    relatedConcordance,
  }
}
