import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// In-Memory Database for Indian Legal Awareness System
import {
  fundamentalRights as rightsData,
  landmarkCases,
  article13Principles,
  practiceQuestions,
  constitutionalOrigins,
} from './src/data/rights.js';
import {
  bnsGazetteInfo,
  bnsKeyReforms,
  bnsChapters,
  bnsCoreSections,
  ipcToBnsMatrix,
  bnsQuiz,
} from './src/data/bnsDetailedNotes.js';
import { legalTerms as legalTermsData } from './src/data/legalTerms.js';
import {
  lawComparisonsData,
  COMPARISON_PAIRS,
  COMPARISON_TOPICS,
} from './src/data/lawComparisons.js';
import { rightsCategories } from './src/data/rightsHub.js';
import { legalGuides } from './src/data/guides.js';
import { executeUnifiedSearch } from './src/utils/legalSearchEngine.js';
import { hmaSections, hmaMetadata } from './src/data/hmaDetailedNotes.js';
import { dmmaSections, dmmaMetadata } from './src/data/dmmaDetailedNotes.js';
import { itGazetteRules, itGazetteMetadata } from './src/data/itRulesDetailedNotes.js';

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

const lawsData = [
  {
    id: 'bns-2023',
    name: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    shortName: 'BNS',
    aliases: [
      'BNS',
      'IPC',
      'Indian Penal Code',
      'Bharatiya Nyaya Sanhita',
      'BNS 2023',
      'Penal Code',
      'Act 45 of 2023',
    ],
    year: 2023,
    category: 'criminal',
    description:
      "The primary penal code of India (Act No. 45 of 2023) enacted to consolidate and amend provisions relating to offences, repealing the Indian Penal Code, 1860. Features 358 sections across 20 chapters including mob lynching, snatching, organised crime, and introduces community service.",
    sections: [
      {
        id: 'sec-1',
        number: 'Section 1',
        title: 'Short Title, Extent and Application',
        content:
          'Sets out the short title, extent across India, extraterritorial application to citizens abroad, Indian ships/aircraft, and computer resources in India.',
      },
      {
        id: 'sec-2',
        number: 'Section 2',
        title: 'Definitions (39 Codified Terms)',
        content:
          'Defines key terms including child (<18 years), document (includes digital & electronic records), gender (includes transgender), public servant, and good faith.',
      },
      {
        id: 'sec-4',
        number: 'Section 4',
        title: 'Types of Punishments (Community Service)',
        content:
          'Prescribes six statutory punishments: Death, Imprisonment for life, Imprisonment (Rigorous or Simple), Forfeiture of property, Fine, and Community Service.',
      },
      {
        id: 'sec-63',
        number: 'Section 63',
        title: 'Rape & Consent Standards',
        content:
          'Defines sexual offences with strict consent standards; non-resistance does not constitute consent. Custodial and aggravated rape carry minimum 10 years to natural life.',
      },
      {
        id: 'sec-69',
        number: 'Section 69',
        title: 'Deceitful Means & False Promise to Marry',
        content:
          'Sexual intercourse by deceitful means (inducement, false job/promotion promise, suppressing identity) without intent to fulfill it: punishable up to 10 years.',
      },
      {
        id: 'sec-103',
        number: 'Section 103',
        title: 'Murder & Mob Lynching',
        content:
          'Murder punished with Death or Life Imprisonment. Section 103(2) penalises mob lynching by groups of 5+ on grounds of race, caste, sex, language, or belief with Death or Life Imprisonment.',
      },
      {
        id: 'sec-106',
        number: 'Section 106',
        title: 'Death by Negligence & Hit-and-Run',
        content:
          'Rash/negligent act: up to 5 yrs (2 yrs for doctors). Hit-and-Run without reporting to police/magistrate: up to 10 years and fine.',
      },
      {
        id: 'sec-111',
        number: 'Section 111',
        title: 'Organised Crime & Syndicates',
        content:
          'Penalises syndicated crimes (contract killing, kidnapping, extortion, cybercrime, economic offences). Death or life imprisonment if death results, plus minimum ₹10 lakh fine.',
      },
      {
        id: 'sec-152',
        number: 'Section 152',
        title: 'Act Endangering Sovereignty, Unity & Integrity of India',
        content:
          'Replaces colonial sedition. Penalises armed rebellion, secession, and subversive activities with life or up to 7 years. Protects lawful democratic criticism.',
      },
      {
        id: 'sec-171',
        number: 'Section 171',
        title: 'Bribery & Undue Influence at Elections',
        content:
          'Penalizes giving or accepting gratification to induce any person to vote, or threatening injury to affect electoral decisions: punishable up to 1 year or fine.',
      },
      {
        id: 'sec-189',
        number: 'Section 189',
        title: 'Unlawful Assembly & Public Tranquillity',
        content:
          'Assembly of 5 or more persons with common object to overawe Government, resist legal process, or enforce rights by criminal force: punishable up to 6 months or fine.',
      },
      {
        id: 'sec-191',
        number: 'Section 191',
        title: 'Rioting & Rioting with Deadly Weapons',
        content:
          'Force or violence used by unlawful assembly in prosecution of common object. Armed with deadly weapons: punishable up to 5 years imprisonment and fine.',
      },
      {
        id: 'sec-196',
        number: 'Section 196',
        title: 'Promoting Enmity Between Groups (Hate Speech)',
        content:
          'Promoting enmity or hatred between religious, racial, language, or regional groups or castes: punishable up to 3 years, or up to 5 years if in places of worship.',
      },
      {
        id: 'sec-303',
        number: 'Section 303',
        title: 'Theft & Community Service Proviso',
        content:
          'Theft punishable up to 3 years. Proviso: first-time conviction where stolen property is valued under ₹5,000, upon restoration, is punished with Community Service.',
      },
      {
        id: 'sec-304',
        number: 'Section 304',
        title: 'Snatching (New Codified Offence)',
        content:
          'Specifically defines snatching as sudden, quick, or forcible grabbing of movable property: punishable with imprisonment up to 3 years and fine.',
      },
      {
        id: 'sec-318',
        number: 'Section 318',
        title: 'Cheating & Inducing Delivery (IPC 420 Equivalent)',
        content:
          'Cheating and dishonestly inducing delivery of property or valuable security: punishable with imprisonment up to 7 years and fine.',
      },
      {
        id: 'sec-356',
        number: 'Section 356',
        title: 'Defamation (10 Exceptions & Community Service)',
        content:
          'Defamation with 10 historic exceptions protecting public interest truths and good faith opinions: punishable up to 2 years, fine, or Community Service.',
      },
      {
        id: 'sec-358',
        number: 'Section 358',
        title: 'Repeal of Indian Penal Code (45 of 1860) & Savings',
        content:
          'Repeals IPC 1860 while legally saving ongoing trials, investigations, and past liabilities under the General Clauses Act.',
      },
    ],
    officialSource: 'Gazette of India Extraordinary, No. 53 (egazette.gov.in)',
    lastVerified: 'Ministry of Law and Justice (Legislative Department) — 25 Dec 2023',
    relatedLaws: ['bnss-2023', 'constitution-of-india', 'consumer-protection-2019'],
  },
  {
    id: 'bnss-2023',
    name: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
    shortName: 'BNSS',
    aliases: ['BNSS', 'CrPC', 'Code of Criminal Procedure', 'BNSS 2023', 'Act 46 of 2023', 'Criminal Procedure Code'],
    year: 2023,
    category: 'criminal',
    description:
      'Consolidates and modernises the law of criminal procedure in India (Act 46 of 2023, replacing CrPC 1973). Enforces 533 Clauses across 39 Chapters, introducing Zero FIR, electronic FIR, mandatory forensics for 7+ year offences (Sec 176(3)), audio-video recording of search & seizure (Sec 105), fast-track trial timelines, in absentia trials for absconders (Sec 356), and undertrial bail on serving 1/3rd sentence (Sec 481).',
    sections: [
      {
        id: 'sec-1',
        number: 'Section 1',
        title: 'Short Title, Extent & Commencement',
        content:
          'Called the Bharatiya Nagarik Suraksha Sanhita, 2023 (Act 46 of 2023). Enacted on 25 December 2023 and came into full legal force across India on 1 July 2024, repealing the Code of Criminal Procedure, 1973.',
      },
      {
        id: 'sec-2',
        number: 'Section 2',
        title: 'Statutory Definitions (Electronic Communication, Audio-Video & Victim)',
        content:
          'Defines key procedural terms: "audio-video electronic means" (recording processes of identification, search and seizure, evidence, conferencing), "electronic communication" (SMS, phone, email, digital devices), "bailable/non-bailable", "cognizable", and an expanded definition of "victim" including legal heirs.',
      },
      {
        id: 'sec-35',
        number: 'Section 35',
        title: 'Arrest Without Warrant & Senior Citizen Safeguards (Old CrPC 41)',
        content:
          'Sets objective criteria for arrest without warrant for cognizable crimes. Section 35(7) establishes a crucial safeguard: No arrest shall be made without prior permission of an officer not below the rank of Deputy Superintendent of Police (DSP) for offences punishable with less than 3 years if the person is infirm or above 60 years of age.',
      },
      {
        id: 'sec-36',
        number: 'Section 36',
        title: 'Procedure of Arrest & Arrest Memorandum (Old CrPC 41B)',
        content:
          'Mandates arresting officers to display clear name identification, prepare an arrest memorandum countersigned by the arrestee and witnessed by a family member or local respectable citizen, and inform the arrested person of his legal right to notify a relative or friend.',
      },
      {
        id: 'sec-37',
        number: 'Section 37',
        title: 'Designated Police Officer & Digital Custody Dashboard (Old CrPC 41C)',
        content:
          'State Government shall establish police control rooms in every district and at State level. Designates a police officer (not below ASI) at every police station responsible for maintaining names, addresses, and charges of arrested persons, prominently displayed in digital mode.',
      },
      {
        id: 'sec-38',
        number: 'Section 38',
        title: 'Right to Meet Advocate During Interrogation (Old CrPC 41D)',
        content:
          'Guarantees the statutory right of an arrested person to meet an advocate of his choice during interrogation by the police, though not throughout the entire interrogation.',
      },
      {
        id: 'sec-43',
        number: 'Section 43',
        title: 'Arrest How Made, Handcuffs Rules & Women Arrest Ban (Old CrPC 46)',
        content:
          'Arrest is made by actual submission or confinement. Proviso: Female arrestees cannot be touched by male officers. Section 43(3) regulates handcuffs: permitted only for habitual offenders, terrorists, organised crime syndicates, murder, rape, or acid attack. Section 43(5): No woman can be arrested after sunset and before sunrise except in exceptional cases with prior written permission of Judicial Magistrate.',
      },
      {
        id: 'sec-47',
        number: 'Section 47',
        title: 'Grounds of Arrest & Right to Bail Notification (Old CrPC 50)',
        content:
          'Mandates every arresting officer to forthwith communicate full grounds of arrest. For bailable offences, the officer is legally obligated to inform the person that he is entitled to bail and may arrange sureties.',
      },
      {
        id: 'sec-48',
        number: 'Section 48',
        title: 'Obligation to Inform Relative/Friend & Magisterial Check (Old CrPC 50A)',
        content:
          'Police must forthwith inform relative/friend and district designated officer of the arrest and place of detention. The Magistrate before whom the accused is produced is statutorily mandated to verify that family intimation was duly given.',
      },
      {
        id: 'sec-53',
        number: 'Section 53',
        title: 'Mandatory Medical Examination of Arrested Person (Old CrPC 54)',
        content:
          'Every arrested person must be examined by a government medical officer or registered practitioner soon after arrest. The medical officer records marks of injuries, violence, and time. A copy of the examination report must be furnished free of cost to the accused or his nominee.',
      },
      {
        id: 'sec-58',
        number: 'Section 58',
        title: '24-Hour Maximum Police Detention Without Magistrate (Old CrPC 57)',
        content:
          'No police officer shall detain an arrested person for a period exceeding 24 hours exclusive of journey time, in the absence of a special judicial remand order under Section 187.',
      },
      {
        id: 'sec-63',
        number: 'Section 63',
        title: 'Form of Summons & Encrypted Electronic Summons (Old CrPC 61)',
        content:
          'Summons may be issued in duplicate signed by presiding officer with court seal, OR in encrypted electronic communication bearing the image of the seal of the Court (valid service via email, messaging, portal).',
      },
      {
        id: 'sec-84',
        number: 'Section 84',
        title: 'Proclamation for Absconding Person & Proclaimed Offender (Old CrPC 82)',
        content:
          'Where warrant cannot be executed due to absconding, Court publishes proclamation giving at least 30 days to appear. For crimes punishable with 10+ years, life, or death, failure to appear allows Court to declare the person a Proclaimed Offender.',
      },
      {
        id: 'sec-94',
        number: 'Section 94',
        title: 'Summons to Produce Digital Records & Electronic Devices (Old CrPC 91)',
        content:
          'Empowers Court or police station in charge to summon any document, electronic communication, or communication device likely to contain digital evidence.',
      },
      {
        id: 'sec-105',
        number: 'Section 105',
        title: 'Mandatory Audio-Video Recording of Search and Seizure',
        content:
          'Landmark procedural mandate: The entire process of conducting search of a place or seizing property, including preparation of inventory list and witness signatures, SHALL be recorded through audio-video electronic means (preferably mobile phone) and forwarded without delay to the Magistrate.',
      },
      {
        id: 'sec-107',
        number: 'Section 107',
        title: 'Attachment & Distribution of Proceeds of Crime to Victims',
        content:
          'Court may attach properties derived from criminal activity after 14-day show cause notice. If found to be proceeds of crime, the Court directs the District Magistrate to rateably distribute the proceeds of crime to the affected victims within 60 days.',
      },
      {
        id: 'sec-144',
        number: 'Section 144',
        title: 'Maintenance of Wives, Children & Parents & 60-Day Interim Relief (Old CrPC 125)',
        content:
          'Judicial Magistrate may order monthly maintenance for wife, minor child, disabled child, or dependent parents. Proviso mandates that application for interim maintenance and proceeding expenses must be disposed of within 60 days from service of notice.',
      },
      {
        id: 'sec-163',
        number: 'Section 163',
        title: 'Urgent Orders in Cases of Nuisance or Apprehended Danger (Old CrPC 144)',
        content:
          'District Magistrate, SDM, or Executive Magistrate may issue written prohibitory orders to prevent obstruction, danger to human life, riot, or affray. Valid for up to 2 months, extendable by State Government notification up to 6 months.',
      },
      {
        id: 'sec-173',
        number: 'Section 173',
        title: 'Zero FIR, Electronic FIR (e-FIR) & 14-Day Preliminary Enquiry (Old CrPC 154)',
        content:
          'Statutory Zero FIR: Every cognizable offence report must be registered irrespective of territorial jurisdiction. Information can be given electronically (e-FIR), signed within 3 days. Free copy to victim/informant immediately. For offences punishable with 3 to 7 years, preliminary enquiry may be held within 14 days with DSP approval.',
      },
      {
        id: 'sec-176',
        number: 'Section 176',
        title: 'Investigation Procedure & Mandatory Crime Scene Forensics (Old CrPC 157)',
        content:
          'Section 176(3) mandates that for all offences punishable with 7 years or more, the officer in charge SHALL cause a forensic expert to visit the crime scene to collect physical evidence and cause videography of the process on mobile phone or electronic device.',
      },
      {
        id: 'sec-179',
        number: 'Section 179',
        title: 'Attendance of Witnesses & Vulnerable Citizen Exemption (Old CrPC 160)',
        content:
          'Police may require witness attendance, BUT no male under 15, no person above 60, no woman, and no mentally/physically disabled or acutely ill person shall be required to attend any place other than their residence.',
      },
      {
        id: 'sec-183',
        number: 'Section 183',
        title: 'Confessions & Statements Before Judicial Magistrate (Old CrPC 164)',
        content:
          'Judicial Magistrate records confessions and witness statements. Accused advocate may be present. For sexual offences, statement must be recorded by a woman Judicial Magistrate. For disabled victims, statement recorded via audio-video electronic means stands in lieu of examination-in-chief.',
      },
      {
        id: 'sec-184',
        number: 'Section 184',
        title: 'Medical Examination of Rape Victim Within 24 Hours (Old CrPC 164A)',
        content:
          'Rape victim must be sent for medical examination by a registered medical practitioner within 24 hours of receiving information, with DNA profiling material collected. Doctor must forward report within 7 days.',
      },
      {
        id: 'sec-187',
        number: 'Section 187',
        title: 'Remand & Police Custody Across 40/60 Days (Old CrPC 167)',
        content:
          'Authorizes detention beyond 24 hours. Magistrate may authorize police custody for up to 15 days in whole or in parts during the initial 40 days (for 60-day cases) or 60 days (for 90-day cases). Subsequent remands can be conducted via electronic video linkage.',
      },
      {
        id: 'sec-193',
        number: 'Section 193',
        title: 'Chargesheet / Final Police Report & 90-Day Victim Update (Old CrPC 173)',
        content:
          'Investigation into rape and POCSO cases must be completed within 2 months. Police officer shall within 90 days inform the progress of investigation by any means including electronic communication to the victim/informant.',
      },
      {
        id: 'sec-230',
        number: 'Section 230',
        title: 'Mandatory Supply of Police Report to Accused & Victim in 14 Days (Old CrPC 207)',
        content:
          'Magistrate must furnish free copies of police report, FIR, witness statements, and all relied documents to the accused and the victim within 14 days from date of production or appearance. Electronic supply is considered duly served.',
      },
      {
        id: 'sec-250',
        number: 'Section 250',
        title: 'Discharge Application in Sessions Trial Within 60 Days (Old CrPC 227)',
        content:
          'The accused may prefer an application for discharge within a period of sixty days from the date of committal under Section 232.',
      },
      {
        id: 'sec-251',
        number: 'Section 251',
        title: 'Framing of Charge in Sessions Trial Within 60 Days (Old CrPC 228)',
        content:
          'Sessions Judge shall frame in writing a charge against the accused within a period of sixty days from the date of first hearing on charge. Charges can be explained physically or via electronic means.',
      },
      {
        id: 'sec-258',
        number: 'Section 258',
        title: 'Mandatory Judgment Delivery Within 30 Days (Old CrPC 235)',
        content:
          'Judge shall give judgment as soon as possible, within thirty days from completion of arguments (extendable for specific reasons up to 60 days). Copy uploaded on court portal within 7 days under Section 392(4).',
      },
      {
        id: 'sec-283',
        number: 'Section 283',
        title: 'Mandatory Summary Trials for Petty Offences (Old CrPC 260)',
        content:
          'Summary trial mandatory for theft where stolen property does not exceed ₹20,000, receiving stolen property under ₹20,000, house trespass, insult, and criminal intimidation. Offences punishable up to 3 years can be tried summarily.',
      },
      {
        id: 'sec-290',
        number: 'Section 290',
        title: 'Plea Bargaining Application Within 30 Days of Charge (Old CrPC 265B)',
        content:
          'Accused may file plea bargaining application within 30 days from framing of charge. Examined in camera to ensure voluntariness. Under Section 293, first-time offenders receive sentence reduced to 1/4th or 1/6th.',
      },
      {
        id: 'sec-356',
        number: 'Section 356',
        title: 'Trial in Absentia of Proclaimed Fugitives & Absconding Offenders',
        content:
          'Landmark reform: Absconding proclaimed offenders who evade trial can be tried and convicted in their absence after 90 days from framing of charge. Court issues two arrest warrants with 30-day interval, publishes in national newspapers, and assigns state-funded defence counsel.',
      },
      {
        id: 'sec-366',
        number: 'Section 366',
        title: 'Open Court & Mandatory In-Camera Trials for Rape Cases (Old CrPC 327)',
        content:
          'Criminal trials are open to public, but inquiry and trial of rape and POCSO offences SHALL be conducted in camera, presided over as far as practicable by a woman Judge or Magistrate.',
      },
      {
        id: 'sec-396',
        number: 'Section 396',
        title: 'Victim Compensation Scheme & Immediate Medical Care (Old CrPC 357A)',
        content:
          'State Government in coordination with Centre establishes victim compensation funds. All hospitals (public or private) under Section 397 must provide free first-aid and medical treatment immediately to sexual offence victims.',
      },
      {
        id: 'sec-398',
        number: 'Section 398',
        title: 'Mandatory State Witness Protection Scheme',
        content:
          'New statutory mandate: Every State Government shall prepare and notify a Witness Protection Scheme for the State with a view to ensure protection of witnesses in criminal proceedings.',
      },
      {
        id: 'sec-481',
        number: 'Section 481',
        title: 'Undertrial Prisoner Relief: Bail on Serving 1/3rd Sentence (Old CrPC 436A)',
        content:
          'First-time undertrial prisoners who have never been convicted in the past must be released on bail after undergoing one-third (1/3rd) of the maximum imprisonment period. The Jail Superintendent is statutorily bound to apply in writing to the Court for their release.',
      },
      {
        id: 'sec-484',
        number: 'Section 484',
        title: 'Anticipatory Bail & Exclusions (Old CrPC 438)',
        content:
          'High Court or Court of Session may grant anticipatory bail to persons apprehending arrest for non-bailable offences. Inapplicable to accusations of gang rape of minors under Section 66 or 70 of BNS 2023.',
      },
      {
        id: 'sec-530',
        number: 'Section 530',
        title: 'Inherent Powers of High Court to Secure Justice (Old CrPC 482)',
        content:
          'Reaffirms plenary inherent powers of the High Court to make orders necessary to prevent abuse of the process of any Court or otherwise to secure the ends of justice.',
      },
      {
        id: 'sec-532',
        number: 'Section 532',
        title: 'All Inquiries, Trials & Proceedings in Electronic Mode',
        content:
          'Statutory mandate: All criminal trials, inquiries, summons/warrant issuance, evidence recording, witness examination, Sessions trials, summary trials, and appellate proceedings may be held in electronic mode using electronic communications and audio-video electronic means.',
      },
      {
        id: 'sec-533',
        number: 'Section 533',
        title: 'Repeal of Code of Criminal Procedure, 1973 & Legal Savings',
        content:
          'The Code of Criminal Procedure, 1973 is hereby repealed. Saves pending appeals, applications, trials, inquiries, and previous sanctions under the Old Code.',
      },
    ],
    officialSource: 'Gazette of India Extraordinary, Act No. 46 of 2023 (egazette.gov.in)',
    lastVerified: 'Ministry of Law and Justice (Legislative Department) — 25 Dec 2023',
    relatedLaws: ['bns-2023', 'constitution-of-india'],
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
    shortName: 'IT Act',
    aliases: [
      'IT Act',
      'IT Act 2000',
      'Information Technology Act',
      'Act 21 of 2000',
      'Cyber Law',
      'IT Rules 2000',
      'Certifying Authorities Rules',
    ],
    year: 2000,
    category: 'cyber',
    jurisdiction: 'India',
    type: 'Central Act',
    description:
      'The foundational cyber law statute of India (Act No. 21 of 2000, commenced on 17 October 2000 via G.S.R. 788(E)). Lays down the legal framework for electronic governance, legal validity of digital signatures, licensing and security guidelines for Certifying Authorities (G.S.R. 789(E)), Cyber Appellate Tribunal procedures (G.S.R. 791(E)), and penalizes cybercrimes, hacking, identity theft, and digital fraud.',
    sections: [
      ...itGazetteRules.map((r) => ({
        id: r.id,
        number: r.number,
        title: r.title,
        content: r.explainedSimply,
        explainedSimply: r.explainedSimply,
        statutoryText: r.statutoryText,
        otherLawsNote: r.otherLawsNote,
      })),
      {
        id: 'sec-43',
        number: 'Section 43',
        title: 'Penalty and compensation for damage to computer system',
        statutoryText: `If any person without permission of the owner or any other person who is incharge of a computer, computer system or computer network,—
(a) accesses or secures access to such computer, computer system or computer network;
(b) downloads, copies or extracts any data, computer data base or information from such computer;
(c) introduces or causes to be introduced any computer contaminant or computer virus into any computer;
(d) damages or causes to be damaged any computer, computer system or computer network, data or database;
(e) disrupts or causes disruption of any computer system;
(f) denies or causes the denial of access to any person authorised to access any computer;
(g) provides any assistance to any person to facilitate access to a computer in contravention of the provisions of this Act;
(h) charges the services availed of by a person to the account of another person by tampering with or manipulating any computer,
he shall be liable to pay damage by way of compensation to the person so affected.`,
        content: 'Prescribes civil compensation and liability for unauthorised access, downloading data, introduction of viruses, data tampering, and denial of access.',
        explainedSimply: 'Imposes civil financial compensation on anyone who accesses, copies data from, infects with a virus, damages, or disrupts another person\'s computer or network without permission.',
        otherLawsNote: 'Adjudicated by State IT Secretaries acting as Adjudicating Officers under Section 46 of the Act.',
      },
      {
        id: 'sec-66',
        number: 'Section 66',
        title: 'Computer related offences',
        statutoryText: `If any person, dishonestly or fraudulently, does any act referred to in section 43, he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees or with both.
Explanation.—For the purposes of this section,—
(a) the word "dishonestly" shall have the meaning assigned to it in section 24 of the Indian Penal Code (now Section 2(7) of BNS 2023);
(b) the word "fraudulently" shall have the meaning assigned to it in section 25 of the Indian Penal Code (now Section 2(9) of BNS 2023).`,
        content: 'Criminalizes acts in Section 43 done dishonestly or fraudulently with imprisonment up to 3 years and/or fine up to ₹5 lakh.',
        explainedSimply: 'Makes intentional, dishonest, or fraudulent computer damage, unauthorized data copying, or system hacking a cognizable criminal offense punishable with up to 3 years in prison and ₹5 lakh fine.',
        otherLawsNote: 'Works concurrently with cheating and computer fraud under Section 318 of Bharatiya Nyaya Sanhita, 2023.',
      },
      {
        id: 'sec-66c',
        number: 'Section 66C',
        title: 'Punishment for identity theft',
        statutoryText: `Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to rupees one lakh.`,
        content: 'Penalises fraudulent use of another person\'s digital signature, password, or biometric/unique identification with up to 3 years imprisonment and ₹1 lakh fine.',
        explainedSimply: 'Protects citizens against password theft, stolen credentials, OTP theft, and unauthorized use of digital IDs or electronic signatures.',
        otherLawsNote: 'Key provision for prosecuting phishing, account takeovers, and unauthorized credential reuse.',
      },
      {
        id: 'sec-66d',
        number: 'Section 66D',
        title: 'Punishment for cheating by personation by using computer resource',
        statutoryText: `Whoever, by means of any communication device or computer resource cheats by personation, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.`,
        content: 'Punishes cheating by impersonation over computer or communication devices with up to 3 years imprisonment and ₹1 lakh fine.',
        explainedSimply: 'Specifically penalizes cyber scammers who impersonate bank officials, government departments, police officers, or acquaintances using computers, phones, or messaging apps.',
        otherLawsNote: 'Regularly invoked alongside BNS Section 318 for digital financial fraud and fake customer-care scams.',
      },
    ],
    officialSource: 'Gazette of India Extraordinary (17 Oct 2000) / MeitY (meity.gov.in)',
    officialDocumentUrl: '/docs/it-certifying-authorities-rules-2000.pdf',
    externalSourceUrl: 'https://www.meity.gov.in/content/information-technology-act-2000',
    lastVerified: 'Ministry of Electronics and Information Technology (MeitY)',
    relatedLaws: ['bns-2023', 'bnss-2023', 'consumer-protection-2019'],
  },
  {
    id: 'hindu-marriage-1955',
    name: 'Hindu Marriage Act, 1955',
    shortName: 'HMA',
    aliases: [
      'HMA',
      'Hindu Marriage Act',
      'Act 25 of 1955',
      'Hindu Marriage Act 1955',
      'HMA 1955',
      'Marriage Act',
      'Divorce Law',
    ],
    year: 1955,
    category: 'family',
    jurisdiction: 'India',
    type: 'Central Act',
    description:
      'The foundational Central Act (Act No. 25 of 1955) enacted on 18th May, 1955 to amend and codify the law relating to marriage among Hindus, Buddhists, Jains, and Sikhs in India. Regulates conditions for valid marriage, registration, restitution of conjugal rights, judicial separation, void and voidable marriages, divorce (fault grounds and mutual consent), interim and permanent maintenance, and custody of children.',
    sections: hmaSections.map((s) => ({
      id: s.id,
      number: s.number,
      title: s.title,
      content: s.explainedSimply,
      explainedSimply: s.explainedSimply,
      statutoryText: s.statutoryText,
      otherLawsNote: s.otherLawsNote,
    })),
    officialSource: 'India Code (indiacode.nic.in) / Ministry of Law and Justice',
    officialDocumentUrl: '/docs/hindu-marriage-act-1955.pdf',
    externalSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1560',
    lastVerified: 'Ministry of Law and Justice (Legislative Department)',
    relatedLaws: ['bns-2023', 'bnss-2023', 'constitution-of-india'],
  },
  {
    id: 'dissolution-of-muslim-marriages-1939',
    name: 'Dissolution of Muslim Marriages Act, 1939',
    shortName: 'DMMA',
    aliases: [
      'DMMA',
      'Dissolution of Muslim Marriages Act',
      'Act 8 of 1939',
      'Act 08 of 1939',
      'Muslim Marriage Act 1939',
      'Muslim Divorce Act',
      'DMMA 1939',
    ],
    year: 1939,
    category: 'family',
    jurisdiction: 'India',
    type: 'Central Act',
    description:
      'An Act to consolidate and clarify the provisions of Muslim law relating to suits for dissolution of marriage by women married under Muslim law (Act No. 8 of 1939, published 17 March 1939). Codifies 9 distinct statutory grounds for divorce by Muslim wives—including non-maintenance for 2 years, husband missing for 4 years, imprisonment, failure of marital obligations, cruelty, option of puberty, and preserves the absolute right to dower (Mahr).',
    sections: dmmaSections.map((s) => ({
      id: s.id,
      number: s.number,
      title: s.title,
      content: s.explainedSimply,
      explainedSimply: s.explainedSimply,
      statutoryText: s.statutoryText,
      otherLawsNote: s.otherLawsNote,
    })),
    officialSource: 'Gazette of India (17 March 1939) / India Code (indiacode.nic.in)',
    officialDocumentUrl: '/docs/dissolution-of-muslim-marriages-act-1939.pdf',
    externalSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2415',
    lastVerified: 'Ministry of Law and Justice (Legislative Department)',
    relatedLaws: ['hindu-marriage-1955', 'bnss-2023', 'constitution-of-india'],
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
      {
        id: 'sec-105',
        number: 'Section 105',
        title: 'Lease defined',
        content: 'Defines a lease of immovable property as a transfer of a right to enjoy such property for a certain time or in perpetuity in consideration of a price paid or promised (rent or premium).',
      },
      {
        id: 'sec-108',
        number: 'Section 108',
        title: 'Rights and liabilities of lessor and lessee',
        content: 'Sets out reciprocal statutory rights and duties: lessor must disclose material latent defects and ensure peaceful possession; lessee must restore property in good condition subject to fair wear and tear.',
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

// GET /api/rights-hub
app.get(['/api/rights-hub', '/api/rights-hub/'], (req, res) => {
  res.json(rightsCategories);
});

// GET /api/landmark-cases
app.get('/api/landmark-cases', (req, res) => {
  res.json(landmarkCases);
});
app.get('/api/landmark-cases/', (req, res) => {
  res.json(landmarkCases);
});

// GET /api/article-13
app.get('/api/article-13', (req, res) => {
  res.json(article13Principles);
});
app.get('/api/article-13/', (req, res) => {
  res.json(article13Principles);
});

// GET /api/rights-quiz
app.get('/api/rights-quiz', (req, res) => {
  res.json(practiceQuestions);
});
app.get('/api/rights-quiz/', (req, res) => {
  res.json(practiceQuestions);
});

// GET /api/constitutional-origins
app.get('/api/constitutional-origins', (req, res) => {
  res.json(constitutionalOrigins);
});

// GET /api/bns
app.get('/api/bns', (req, res) => {
  res.json({
    gazetteInfo: bnsGazetteInfo,
    reforms: bnsKeyReforms,
    chapters: bnsChapters,
    sections: bnsCoreSections,
    matrix: ipcToBnsMatrix,
    quiz: bnsQuiz,
  });
});
app.get('/api/bns/', (req, res) => {
  res.json({
    gazetteInfo: bnsGazetteInfo,
    reforms: bnsKeyReforms,
    chapters: bnsChapters,
    sections: bnsCoreSections,
    matrix: ipcToBnsMatrix,
    quiz: bnsQuiz,
  });
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

// Helper for searching legal terms
function searchLegalTermsApi(q: string, category: string) {
  let results = legalTermsData.map((item: any) => ({
    ...item,
    definition: item.plainLanguage || item.definition,
  }));

  if (category && category !== 'all') {
    results = results.filter(
      (item: any) => item.category && item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (q) {
    results = results.filter(
      (item: any) =>
        item.term.toLowerCase().includes(q) ||
        (item.fullForm && item.fullForm.toLowerCase().includes(q)) ||
        (item.plainLanguage && item.plainLanguage.toLowerCase().includes(q)) ||
        (item.legalMeaning && item.legalMeaning.toLowerCase().includes(q)) ||
        (item.example && item.example.toLowerCase().includes(q)) ||
        (item.relevantLaw && item.relevantLaw.toLowerCase().includes(q)) ||
        (item.source && item.source.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }

  return results;
}

// GET /api/legal-terms/
app.get('/api/legal-terms', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  const category = ((req.query.category as string) || '').trim();
  res.json(searchLegalTermsApi(q, category));
});
app.get('/api/legal-terms/', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  const category = ((req.query.category as string) || '').trim();
  res.json(searchLegalTermsApi(q, category));
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

// Helper for law comparisons
function searchLawComparisonsApi(q: string, topic: string, status: string, pair: string) {
  let results = [...lawComparisonsData];

  if (pair && pair !== 'all') {
    results = results.filter((c) => c.pairId === pair);
  }

  if (topic && topic !== 'all') {
    results = results.filter((c) => c.topicId === topic || c.topic.toLowerCase() === topic.toLowerCase());
  }

  if (status && status !== 'all') {
    results = results.filter((c) => c.mappingStatus === status);
  }

  if (q) {
    const qClean = q.toLowerCase().trim();
    results = results.filter(
      (c) =>
        c.offenceTitle.toLowerCase().includes(qClean) ||
        c.oldProvision.section.toLowerCase().includes(qClean) ||
        c.newProvision.section.toLowerCase().includes(qClean) ||
        c.topic.toLowerCase().includes(qClean) ||
        c.plainLanguageDifference.toLowerCase().includes(qClean) ||
        (c.searchKeywords && c.searchKeywords.some((k: string) => k.toLowerCase().includes(qClean))) ||
        (c.oldProvision.scopeText && c.oldProvision.scopeText.toLowerCase().includes(qClean)) ||
        (c.newProvision.scopeText && c.newProvision.scopeText.toLowerCase().includes(qClean))
    );
  }

  return results;
}

// GET /api/law-comparisons/pairs
app.get('/api/law-comparisons/pairs', (req, res) => {
  res.json(COMPARISON_PAIRS);
});
app.get('/api/law-comparisons/pairs/', (req, res) => {
  res.json(COMPARISON_PAIRS);
});

// GET /api/law-comparisons/topics
app.get('/api/law-comparisons/topics', (req, res) => {
  res.json(COMPARISON_TOPICS);
});
app.get('/api/law-comparisons/topics/', (req, res) => {
  res.json(COMPARISON_TOPICS);
});

// GET /api/law-comparisons
app.get('/api/law-comparisons', (req, res) => {
  const q = ((req.query.q as string) || '').trim();
  const topic = ((req.query.topic as string) || '').trim();
  const status = ((req.query.status as string) || '').trim();
  const pair = ((req.query.pair as string) || 'ipc-bns').trim();
  res.json(searchLawComparisonsApi(q, topic, status, pair));
});
app.get('/api/law-comparisons/', (req, res) => {
  const q = ((req.query.q as string) || '').trim();
  const topic = ((req.query.topic as string) || '').trim();
  const status = ((req.query.status as string) || '').trim();
  const pair = ((req.query.pair as string) || 'ipc-bns').trim();
  res.json(searchLawComparisonsApi(q, topic, status, pair));
});

// GET /api/law-comparisons/:id
app.get('/api/law-comparisons/:id', (req, res) => {
  const item = lawComparisonsData.find((c) => c.id === req.params.id);
  if (!item) {
    return res.status(404).json({ detail: 'Comparison entry not found' });
  }
  res.json(item);
});
app.get('/api/law-comparisons/:id/', (req, res) => {
  const item = lawComparisonsData.find((c) => c.id === req.params.id);
  if (!item) {
    return res.status(404).json({ detail: 'Comparison entry not found' });
  }
  res.json(item);
});

// Helper for laws searching
function searchLaws(category: string, q: string) {
  let results = [...lawsData];
  if (category) {
    results = results.filter((l) => l.category === category);
  }
  if (q) {
    const isBnsQuery =
      q === 'bns' ||
      q === 'bns 2023' ||
      q === 'bns section' ||
      q === 'bns sections' ||
      q.includes('bns') ||
      q.includes('nyaya sanhita') ||
      q.includes('penal code');

    results = results.filter(
      (l: any) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q) ||
        (l.shortName && l.shortName.toLowerCase().includes(q)) ||
        (l.aliases && l.aliases.some((a: string) => a.toLowerCase().includes(q))) ||
        (isBnsQuery && l.id === 'bns-2023')
    );
  }
  return results;
}

// GET /api/laws/
app.get('/api/laws', (req, res) => {
  const category = (req.query.category as string) || '';
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  res.json(searchLaws(category, q));
});
app.get('/api/laws/', (req, res) => {
  const category = (req.query.category as string) || '';
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  res.json(searchLaws(category, q));
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

// Helper for unified legal search
function executeSearch(q: string) {
  const safeQ = (q || '').trim().slice(0, 500);
  return executeUnifiedSearch(safeQ);
}

// GET /api/search/
app.get('/api/search', (req, res) => {
  const q = ((req.query.q as string) || '').trim();
  res.json(executeSearch(q));
});
app.get('/api/search/', (req, res) => {
  const q = ((req.query.q as string) || '').trim();
  res.json(executeSearch(q));
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

// Laws whose officialSource/lastVerified have actually been checked against
// an official Gazette/legislative source — kept in sync with the same
// verified set used by the frontend (src/data/laws.js + src/utils/sources.js).
// Everything else is shown to the user as unverified, even if this
// server-side copy of the data doesn't itself say "placeholder".
const VERIFIED_LAW_IDS = new Set(['bns-2023', 'bnss-2023', 'constitution-of-india', 'hindu-marriage-1955', 'dissolution-of-muslim-marriages-1939', 'it-act-2000']);

// Maps a situation category (from the "What happened?" form) to the law
// categories most likely to be relevant, to bias retrieval — this never
// invents a law, only weights which real laws in lawsData are considered first.
const SITUATION_CATEGORY_TO_LAW_CATEGORIES: Record<string, string[]> = {
  'money-fraud': ['criminal', 'civil', 'cyber'],
  property: ['property', 'civil', 'criminal'],
  cyber: ['cyber', 'criminal', 'consumer'],
  consumer: ['consumer', 'civil'],
  workplace: ['labour', 'civil', 'constitutional'],
  'personal-rights': ['constitutional', 'criminal'],
  family: ['family', 'civil'],
  other: ['constitutional', 'civil', 'criminal'],
};

interface RetrievedProvisionItem {
  lawId: string;
  lawName: string;
  section: string;
  content: string;
  officialSource?: string;
  lastVerified?: string | null;
  verified: boolean;
}

interface SituationClassification {
  legalAreas: string[];
  primaryCategory: string;
  intents: string[];
  keyTerms: string[];
  isPlausibleDomain: boolean;
}

/**
 * Step 1: Classification / Intent Extraction
 * Extracts legal categories, primary domain, user goals, and substantive key terms.
 * Uses Gemini when available for semantic extraction, with a robust rule-based fallback.
 */
async function classifyAndExtractIntent(
  description: string,
  category?: string,
  focus?: string[]
): Promise<SituationClassification> {
  const descLower = description.toLowerCase();

  // Rule-based keyword analysis as baseline
  const words = descLower.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  const detectedAreas: string[] = [];
  let detectedCategory = category || 'unknown';

  if (descLower.includes('cheat') || descLower.includes('fraud') || descLower.includes('scam') || descLower.includes('money') || descLower.includes('bribe')) {
    detectedAreas.push('Fraud & Criminal Offences');
    if (detectedCategory === 'unknown') detectedCategory = 'money-fraud';
  }
  if (descLower.includes('upi') || descLower.includes('cyber') || descLower.includes('hacked') || descLower.includes('phishing') || descLower.includes('online')) {
    detectedAreas.push('Cyber Law & Digital Transactions');
    if (detectedCategory === 'unknown') detectedCategory = 'cyber';
  }
  if (descLower.includes('refund') || descLower.includes('seller') || descLower.includes('defect') || descLower.includes('consumer') || descLower.includes('warranty') || descLower.includes('damaged')) {
    detectedAreas.push('Consumer Protection');
    if (detectedCategory === 'unknown') detectedCategory = 'consumer';
  }
  if (descLower.includes('rent') || descLower.includes('tenant') || descLower.includes('landlord') || descLower.includes('lease') || descLower.includes('evict') || descLower.includes('property')) {
    detectedAreas.push('Property & Tenancy Law');
    if (detectedCategory === 'unknown') detectedCategory = 'property';
  }
  if (descLower.includes('salary') || descLower.includes('wage') || descLower.includes('employer') || descLower.includes('resignation') || descLower.includes('fired') || descLower.includes('retrenchment')) {
    detectedAreas.push('Labour & Employment Law');
    if (detectedCategory === 'unknown') detectedCategory = 'workplace';
  }
  if (descLower.includes('police') || descLower.includes('arrest') || descLower.includes('detain') || descLower.includes('warrant') || descLower.includes('custody') || descLower.includes('liberty')) {
    detectedAreas.push('Constitutional Safeguards & Due Process');
    if (detectedCategory === 'unknown') detectedCategory = 'personal-rights';
  }
  if (descLower.includes('divorce') || descLower.includes('marriage') || descLower.includes('maintenance') || descLower.includes('custody') || descLower.includes('alimony')) {
    detectedAreas.push('Family & Matrimonial Law');
    if (detectedCategory === 'unknown') detectedCategory = 'family';
  }

  const baselineIntents: string[] = [];
  if (focus?.includes('report')) baselineIntents.push('reporting_channels');
  if (focus?.includes('next-steps')) baselineIntents.push('remedies_and_steps');
  if (focus?.includes('rights')) baselineIntents.push('statutory_and_constitutional_rights');
  if (focus?.includes('law')) baselineIntents.push('applicable_statutes');

  const baselineResult: SituationClassification = {
    legalAreas: detectedAreas.length ? detectedAreas : ['General Statutory Inquiry'],
    primaryCategory: detectedCategory,
    intents: baselineIntents.length ? baselineIntents : ['applicable_statutes', 'remedies_and_steps'],
    keyTerms: words.slice(0, 8),
    isPlausibleDomain: words.length >= 2,
  };

  // If Gemini is available, refine intent extraction and domain classification
  const ai = getGenAI();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are an Indian legal classification and intent extraction engine.
Analyze this citizen situation:
"${description}"
User selected category: "${category || 'None'}"
User focus questions: "${(focus || []).join(', ')}"

Classify into structured JSON:
- legal_areas: 1 to 3 concise domain titles (e.g. "Consumer Protection & Deficient Goods", "Cyber Fraud & Identity Deception", "Constitutional Due Process").
- primary_category: one of ["consumer", "cyber", "property", "workplace", "personal-rights", "family", "money-fraud", "other", "unknown"].
- intents: list of user aims, e.g. ["remedies", "reporting_channels", "safeguards", "documentation"].
- key_terms: 3 to 7 key factual or legal search terms in lowercase.
- is_plausible_domain: boolean (false if clearly gibberish, non-legal, or relating to foreign non-Indian jurisdiction).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              legal_areas: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              primary_category: { type: Type.STRING },
              intents: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              key_terms: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              is_plausible_domain: { type: Type.BOOLEAN },
            },
            required: ['legal_areas', 'primary_category', 'intents', 'key_terms', 'is_plausible_domain'],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          legalAreas: Array.isArray(parsed.legal_areas) && parsed.legal_areas.length ? parsed.legal_areas : baselineResult.legalAreas,
          primaryCategory: parsed.primary_category || baselineResult.primaryCategory,
          intents: Array.isArray(parsed.intents) ? parsed.intents : baselineResult.intents,
          keyTerms: Array.isArray(parsed.key_terms) ? parsed.key_terms : baselineResult.keyTerms,
          isPlausibleDomain: parsed.is_plausible_domain !== false,
        };
      }
    } catch {
      // Fallback to baseline rule-based classification
    }
  }

  return baselineResult;
}

/**
 * Step 2 & 3: Verified Legal Knowledge Retrieval & Thresholding
 * Searches strictly within verified statutory database records (lawsData & rightsData).
 * Enforces a strict confidence threshold: if a situation cannot be confidently matched,
 * returns confidentMatch: false and empty provisions rather than guessing or forcing a match.
 */
const LEGAL_STOP_WORDS = new Set([
  'about', 'above', 'after', 'again', 'against', 'all', 'also', 'and', 'any', 'are', 'because', 'been',
  'before', 'being', 'below', 'between', 'both', 'but', 'came', 'can', 'cannot', 'could', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'here', 'how', 'into', 'itself', 'just', 'more', 'most', 'myself', 'only', 'other',
  'our', 'ours', 'out', 'over', 'same', 'should', 'some', 'such', 'than', 'that', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through',
  'too', 'under', 'until', 'very', 'was', 'were', 'what', 'when', 'where', 'which', 'while', 'who',
  'whom', 'why', 'with', 'would', 'your', 'yours', 'yourself', 'yourselves', 'legal', 'sentence',
  'issue', 'matter', 'happened', 'problem', 'situation', 'landing', 'spacecraft', 'martian', 'volcano',
  'year', 'years', 'week', 'weeks', 'month', 'months', 'day', 'days', 'replace', 'replaces', 'item',
  'items', 'time', 'times', 'store', 'stores', 'working', 'work', 'stopped', 'stop', 'happened', 'need',
  'want', 'said', 'told', 'asked', 'give', 'gave', 'take', 'took', 'went', 'make', 'made'
]);

function retrieveVerifiedLegalRecords(
  classification: SituationClassification,
  description: string,
  category?: string,
  focus?: string[],
  maxProvisions = 4
): {
  confidentMatch: boolean;
  provisions: RetrievedProvisionItem[];
  sources: any[];
  matchedLaws: any[];
  confidenceScore: number;
} {
  if (!classification.isPlausibleDomain) {
    return {
      confidentMatch: false,
      provisions: [],
      sources: [],
      matchedLaws: [],
      confidenceScore: 0,
    };
  }

  const descLower = description.toLowerCase();
  const searchTerms = Array.from(
    new Set([
      ...classification.keyTerms.map((t) => t.toLowerCase()),
      ...descLower.split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !LEGAL_STOP_WORDS.has(w)),
    ])
  ).filter((w) => !LEGAL_STOP_WORDS.has(w));

  const effectiveCategory = category || classification.primaryCategory;
  const biasedCategories = SITUATION_CATEGORY_TO_LAW_CATEGORIES[effectiveCategory] || [];
  const wantsRights = focus?.includes('rights') || effectiveCategory === 'personal-rights';
  const isExplicitCrime = /\b(cheat|cheated|cheating|theft|stole|stolen|fraud|fraudulent|scam|assault|extortion|bribe|bribery|fir|arrest|police)\b/i.test(description);

  // 1. Evaluate provisions across laws
  interface ScoredProvision {
    item: RetrievedProvisionItem;
    law: any;
    score: number;
  }

  const scoredProvisions: ScoredProvision[] = [];

  // Constitutional rights checking with precise regex word boundaries
  const touchesLiberty =
    /\b(liberty|arrest|arrested|detain|detained|detention|police|warrant|custody|bail)\b/i.test(description) &&
    !/\bwarrant(y|ies)\b/i.test(description);
  const touchesEquality = /\b(equality|discrim|discrimination|caste|untouchability)\b/i.test(description);
  const touchesSpeech = /\b(speech|protest|expression|assembly|dissent)\b/i.test(description);
  const touchesPropertyRight =
    /\bproperty\b/i.test(description) && /\b(depriv|deprived|seiz|seizure|demolish|demolition)\b/i.test(description);

  if (wantsRights || touchesLiberty || touchesEquality || touchesSpeech || touchesPropertyRight) {
    for (const r of rightsData) {
      let rScore = 0;
      const haystack = `${r.title} ${r.articles} ${r.summary}`.toLowerCase();

      for (const term of searchTerms) {
        if (new RegExp(`\\b${term}\\b`, 'i').test(haystack)) rScore += 2.5;
      }

      if (touchesLiberty && (r.articles.includes('21') || r.articles.includes('22'))) rScore += 6;
      if (touchesEquality && (r.articles.includes('14') || r.articles.includes('15'))) rScore += 6;
      if (touchesSpeech && r.articles.includes('19')) rScore += 6;
      if (touchesPropertyRight && r.articles.includes('300A')) rScore += 6;

      if (rScore >= 5) {
        scoredProvisions.push({
          score: rScore,
          law: { id: 'constitution-of-india', name: 'The Constitution of India', category: 'constitutional' },
          item: {
            lawId: 'constitution-of-india',
            lawName: 'The Constitution of India',
            section: `${r.articles} — ${r.title}`,
            content: r.summary,
            officialSource: 'legislative.gov.in',
            lastVerified: 'Legislative Department, Ministry of Law and Justice',
            verified: true,
          },
        });
      }
    }
  }

  // Statutory provisions checking across lawsData
  for (const law of lawsData) {
    // Exclude criminal penal provisions if the context is purely consumer, civil, or family with no criminal allegations
    if (law.category === 'criminal' && !isExplicitCrime && (effectiveCategory === 'consumer' || effectiveCategory === 'family' || effectiveCategory === 'workplace')) {
      continue;
    }

    const sections = law.sections || [];
    for (const sec of sections) {
      let secScore = 0;
      const secHaystack = `${sec.number} ${sec.title} ${sec.content}`.toLowerCase();

      let matchedTermsCount = 0;
      for (const term of searchTerms) {
        if (new RegExp(`\\b${term}\\b`, 'i').test(secHaystack)) {
          secScore += 3;
          matchedTermsCount++;
        }
      }

      // Add category bias weight only if substantive terms matched
      if (matchedTermsCount > 0 && biasedCategories.includes(law.category)) {
        secScore += 2;
      }

      // Check specific domain matches
      if (
        law.id === 'consumer-protection-2019' &&
        /\b(defect|defective|deficiency|deficient|refund|replacement|seller|store|consumer|warranty|guarantee|mrp)\b/i.test(description)
      ) {
        secScore += 5;
        matchedTermsCount++;
      }
      if (
        law.id === 'bns-2023' &&
        /\b(cheat|cheated|cheating|theft|fraud|fraudulent|scam|assault|extortion)\b/i.test(description)
      ) {
        secScore += 5;
        matchedTermsCount++;
      }
      if (
        law.id === 'bnss-2023' &&
        /\b(fir|bail|arrest|police station|investigation|complaint)\b/i.test(description)
      ) {
        secScore += 5;
        matchedTermsCount++;
      }
      if (
        law.id === 'hindu-marriage-1955' &&
        /\b(marriage|divorce|maintenance|alimony|custody|conjugal|restitution|separation|void|voidable|annulment|bigamy|sapinda|saptapadi|dowry|husband|wife|matrimonial)\b/i.test(description)
      ) {
        secScore += 6;
        matchedTermsCount++;
      }
      if (
        law.id === 'dissolution-of-muslim-marriages-1939' &&
        /\b(muslim|mahr|dower|khula|talaq|dissolution of muslim|nikah|cruelty|renunciation|option of puberty|act 8 of 1939)\b/i.test(description)
      ) {
        secScore += 6;
        matchedTermsCount++;
      }
      if (
        law.id === 'it-act-2000' &&
        /\b(cyber|digital signature|certifying authority|pki|hash|hacking|data theft|identity theft|phishing|otp|it rules|cyber tribunal|electronic record|encryption)\b/i.test(description)
      ) {
        secScore += 6;
        matchedTermsCount++;
      }

      if (secScore >= 5 && matchedTermsCount >= 1) {
        scoredProvisions.push({
          score: secScore,
          law,
          item: {
            lawId: law.id,
            lawName: law.name,
            section: `${sec.number} — ${sec.title}`,
            content: sec.content,
            officialSource: law.officialSource,
            lastVerified: law.lastVerified,
            verified: VERIFIED_LAW_IDS.has(law.id),
          },
        });
      }
    }
  }

  // Sort by score descending
  scoredProvisions.sort((a, b) => b.score - a.score);

  const topScore = scoredProvisions.length > 0 ? scoredProvisions[0].score : 0;

  // STRICT CONFIDENCE THRESHOLD:
  // If the top score is below threshold (5), or search terms were empty, we declare no confident match.
  // We NEVER force a placeholder law.
  const CONFIDENCE_THRESHOLD = 5;
  if (scoredProvisions.length === 0 || topScore < CONFIDENCE_THRESHOLD || searchTerms.length === 0) {
    return {
      confidentMatch: false,
      provisions: [],
      sources: [],
      matchedLaws: [],
      confidenceScore: topScore,
    };
  }

  // Deduplicate provisions and pick top items
  const uniqueProvisions: RetrievedProvisionItem[] = [];
  const seenSections = new Set<string>();
  const matchedLawSet = new Map<string, any>();

  for (const item of scoredProvisions) {
    if (!seenSections.has(item.item.section)) {
      seenSections.add(item.item.section);
      uniqueProvisions.push(item.item);
      matchedLawSet.set(item.item.lawId, item.law);
    }
    if (uniqueProvisions.length >= maxProvisions) break;
  }

  // Construct sources strictly from matched law records
  const sources = Array.from(matchedLawSet.values()).map((law) => {
    const verified = VERIFIED_LAW_IDS.has(law.id);
    return {
      lawId: law.id,
      lawName: law.name,
      officialSource: law.officialSource || null,
      lastVerified: verified ? law.lastVerified || null : null,
      verified,
    };
  });

  return {
    confidentMatch: true,
    provisions: uniqueProvisions,
    sources,
    matchedLaws: Array.from(matchedLawSet.values()),
    confidenceScore: topScore,
  };
}

/**
 * Constructs the canonical response when no provision could be confidently identified.
 */
function buildNoConfidentMatchResponse(
  description: string,
  classification: SituationClassification,
  category?: string
) {
  const summary =
    'Based on the information provided, no specific statutory provision from our verified database could be confidently matched to this situation.';

  const explanation =
    'The situation described does not appear to correspond directly to the specific central statutes currently indexed in our verified Indian legal knowledge base (such as the Bharatiya Nyaya Sanhita, Consumer Protection Act, or Constitution of India), or it may involve state-specific enactments, municipal bylaws, or specialized regulatory jurisdictions. Rather than inferring, predicting, or inventing unverified section numbers or provisions, Nyaya limits its output to verified records.';

  const possibleNextSteps = [
    {
      title: 'Seek Guidance from Free Legal Aid (DLSA / NALSA)',
      description:
        'You may consider visiting your nearest District Legal Services Authority (DLSA) or Taluk Legal Services Committee. Under the Legal Services Authorities Act, 1987, qualified panel lawyers provide free, confidential advice.',
      category: 'legal-aid',
    },
    {
      title: 'Consult an Enrolled Advocate',
      description:
        'One option is to consult an enrolled advocate in your local court jurisdiction who can examine the full documentation, local state laws, or specialized forum rules.',
      category: 'remedy',
    },
    {
      title: 'Preserve All Evidence & Records',
      description:
        'Keep safe copies of all receipts, written agreements, digital messages, and timestamps related to what happened.',
      category: 'documentation',
    },
  ];

  const confidenceNote =
    'The system could not confidently identify a statutory provision in the verified knowledge base for this situation. Rather than inferring or predicting an unverified law or section, Nyaya recommends consulting a qualified advocate or your local District Legal Services Authority (DLSA).';

  const limitation = `${confidenceNote} This information is strictly educational and does not constitute a legal determination, legal opinion, or legal advice. It does not establish whether an offence has occurred or predict how any police authority, regulatory body, or court of law will evaluate your situation. Laws apply differently based on specific facts, evidence, and jurisdiction. If you need legal advice, consult a qualified advocate or your local District Legal Services Authority (DLSA).`;

  return {
    summary,
    legal_areas: classification.legalAreas.length ? classification.legalAreas : ['General Legal Inquiry'],
    relevant_provisions: [],
    explanation,
    possible_next_steps: possibleNextSteps,
    sources: [],
    confidence_note: confidenceNote,

    // Frontend backward-compatibility aliases:
    yourSituation: description,
    legalArea: classification.legalAreas[0] || 'General Legal Inquiry',
    areaDescription: summary,
    potentiallyRelevantLaws: [],
    relevantProvisions: [],
    plainLanguageExplanation: explanation,
    possibleNextSteps,
    sourcesList: [],
    importantLimitation: limitation,
    confidentMatch: false,
    receivedCategory: category,
    relevantLaws: [],
    remedies: possibleNextSteps.map((s) => ({ title: s.title, description: s.description })),
  };
}

function getFallbackSituationResult(category?: string, description?: string, focus?: string[]) {
  const citizenDesc = description || 'Situation description provided by citizen.';

  // 1. Classification
  const descLower = citizenDesc.toLowerCase();
  const words = descLower.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  const baselineClassification: SituationClassification = {
    legalAreas: category ? [category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')] : ['General Statutory Inquiry'],
    primaryCategory: category || 'unknown',
    intents: focus || ['applicable_statutes', 'remedies_and_steps'],
    keyTerms: words.slice(0, 8),
    isPlausibleDomain: words.length >= 2,
  };

  // 2. Retrieval & Thresholding
  const retrieval = retrieveVerifiedLegalRecords(baselineClassification, citizenDesc, category, focus);

  // If no confident match in verified knowledge base, return safe, unforced no-match response
  if (!retrieval.confidentMatch || !retrieval.provisions.length) {
    return buildNoConfidentMatchResponse(citizenDesc, baselineClassification, category);
  }

  const { provisions, sources } = retrieval;
  const primaryArea =
    category === "cyber"
      ? "Cyber Law & Digital Transactions"
      : category === "property"
      ? "Property & Tenancy Law"
      : category === "workplace"
      ? "Labour & Employment Law"
      : category === "personal-rights"
      ? "Constitutional Safeguards & Due Process"
      : category === "family"
      ? "Family & Matrimonial Law"
      : category === "money-fraud"
      ? "Fraud & Penal Provisions"
      : "Consumer Protection & Civil Contract Remedies";

  const legalAreas = baselineClassification.legalAreas.length > 0
    ? baselineClassification.legalAreas
    : [primaryArea];

  const summary = `Based on the information provided, this situation may relate to ${legalAreas[0]}. This provides an educational starting point grounded in verified central statutes.`;

  const finalProvisions = retrieval.provisions.map((p) => ({
    law_name: p.lawName,
    section: p.section,
    explanation: `Potentially relevant provisions include ${p.section}, which ${p.content.toLowerCase()}`,
  }));

  const explanation =
    "Based on the information provided, Indian statutory frameworks provide structured dispute resolution and remedies for circumstances of this nature. Rights and obligations depend on statutory standards, compliance with mandatory procedures, and documentation. Non-judicial and specialized statutory forums often provide direct avenues for citizen relief.";

  const defaultNextSteps = [
    {
      title: "Preserve Documentation & Transaction History",
      description: "Collect all relevant invoices, written notices, timestamps, and digital communications.",
      category: "documentation",
    },
    {
      title: "Seek Free Legal Aid via DLSA (NALSA)",
      description: "Consult a panel advocate at your local District Legal Services Authority for free confidential advice.",
      category: "legal-aid",
    },
    {
      title: "Consult an Enrolled Advocate",
      description: "Consult a licensed advocate in your court jurisdiction to review available statutory remedies and local court procedures.",
      category: "remedy",
    },
  ];

  const confidenceNote =
    "Operating in verified offline mode: This analysis is grounded exclusively in verified central enactments in our local knowledge base.";

  const limitation = `${confidenceNote} This information is strictly educational and does not constitute a legal determination, legal opinion, or legal advice. It does not establish whether an offence has occurred or predict how any police authority, regulatory body, or court of law will evaluate your situation. Laws apply differently based on specific facts, evidence, and jurisdiction. If you need legal advice, consult a qualified advocate or your local District Legal Services Authority (DLSA).`;

  const legacyProvisions = finalProvisions.map((p) => ({
    lawName: p.law_name,
    section: p.section,
    explanation: p.explanation,
  }));

  return {
    summary,
    legal_areas: legalAreas,
    relevant_provisions: finalProvisions,
    explanation,
    possible_next_steps: defaultNextSteps,
    sources: retrieval.sources,
    confidence_note: confidenceNote,

    yourSituation: citizenDesc,
    legalArea: legalAreas[0],
    areaDescription: summary,
    potentiallyRelevantLaws: Array.from(new Set(finalProvisions.map((p) => p.law_name))),
    relevantProvisions: legacyProvisions,
    plainLanguageExplanation: explanation,
    possibleNextSteps: defaultNextSteps,
    importantLimitation: limitation,
    confidentMatch: true,
    receivedCategory: category,
    relevantLaws: legacyProvisions,
    remedies: defaultNextSteps.map((s) => ({ title: s.title, description: s.description })),
  };
}

async function analyzeSituationWithGemini(
  description: string,
  category?: string,
  focus?: string[]
) {
  const ai = getGenAI();
  if (!ai) return null;

  // 1. Classification / intent extraction
  const classification = await classifyAndExtractIntent(description, category, focus);

  // 2. Verified knowledge retrieval with strict confidence thresholding
  const retrieval = retrieveVerifiedLegalRecords(classification, description, category, focus);

  // If no confident match could be established in verified database, return canonical no-match response directly
  if (!retrieval.confidentMatch || !retrieval.provisions.length) {
    return buildNoConfidentMatchResponse(description, classification, category);
  }

  // Format verified records into strict grounding block
  const verifiedProvisionsBlock = retrieval.provisions
    .map(
      (p, idx) =>
        `[Verified Record ${idx + 1}]\n- Law Name: ${p.lawName}\n- Provision: ${p.section}\n- Statutory Summary: ${p.content}\n- Official Source: ${p.officialSource || 'India Code (indiacode.nic.in)'}`
    )
    .join('\n\n');

  const focusInstruction = focus && focus.length
    ? `The citizen specifically asked to understand: ${focus.join(', ')}. Tailor your plain-language explanation and possible next steps to emphasize these topics.`
    : '';

  const prompt = `You are an educational legal-information assistant for Indian law.

CRITICAL ARCHITECTURAL CONSTRAINTS (ZERO-INVENTION POLICY):
1. The model must NOT act as an unrestricted legal database.
2. Grounding constraint: You must ONLY explain and reference the VERIFIED PROVISIONS listed below.
3. The model is STRICTLY FORBIDDEN from inventing:
   - Any section number not present in the verified records below.
   - Any article number not present in the verified records below.
   - Any court case names, citations, or judicial precedents.
   - Any specific legal penalties (fines or imprisonment lengths) unless literally stated in the verified records.
   - Any legal limitation deadlines or timeframes (do NOT invent time limits like "30 days" or "3 years").
   - Any government procedures not explicitly provided.
   - Any official URLs or web links.
4. If a detail, timeframe, or penalty is not in the verified records, do NOT guess or infer it. State that specific timeframes or penalties depend on the statutory text and rules.
5. STATUTORY FAITHFULNESS & HINDU MARRIAGE ACT SPECIFICS:
   - When questions touch Hindu marriage, divorce, maintenance, restitution of conjugal rights, judicial separation, void/voidable marriages, or related provisions, ground answers strictly in the Hindu Marriage Act, 1955.
   - Always display the Section number and section title alongside relevant answers.
   - Keep the original legal wording intact when quoting statutory provisions. Do not rewrite statutory text as if it were the original law.
   - Clearly distinguish: (1) Law / Statutory text, (2) Explained Simply (simple explanation for ordinary citizens), and (3) Source / Section.
   - If a question cannot be answered from the Hindu Marriage Act alone, clearly indicate that other laws (such as BNSS 2023 Section 144 maintenance, Protection of Women from Domestic Violence Act 2005, or Special Marriage Act 1954) or current case law may also be relevant.
6. LEGAL NON-DETERMINATION FRAMING:
   - You must NEVER claim legal certainty.
   - Strictly forbidden phrases: "You have committed...", "This is definitely...", "You will win...", "You will be liable...", "The court will decide in your favour...".
   - Mandatory hedged phrasing throughout: "Based on the information provided...", "This may relate to...", "Potentially relevant provisions include...", "Options you may consider include...".

VERIFIED PROVISIONS (Whitelist):
${verifiedProvisionsBlock}

CITIZEN SITUATION:
Description: "${description}"
Category context: "${category || classification.primaryCategory}"
${focusInstruction}

Produce structured JSON matching the target schema:
- summary: 1-2 hedged sentences summarizing the legal nature of the situation.
- legal_areas: Array of 1 to 3 relevant legal domains.
- relevant_provisions: Array of provisions selected strictly from the VERIFIED PROVISIONS above. Each must have:
    - law_name: Exact name from the verified records
    - section: Exact provision title from the verified records
    - explanation: 1-2 sentence plain-language summary starting with "Potentially relevant provisions include..."
- explanation: 2-3 calm, non-jargon paragraphs explaining how these legal concepts intersect with situations of this nature. Must be strictly grounded in the verified records.
- possible_next_steps: 2 to 4 realistic next steps (options, not commands) with:
    - title: Short clear title
    - description: 1-2 actionable sentences
    - category: One of 'reporting', 'remedy', 'documentation', or 'legal-aid'
- confidence_note: A clear note confirming that this explanation is grounded strictly in verified central statutory records and does not constitute a legal determination.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            legal_areas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            relevant_provisions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  law_name: { type: Type.STRING },
                  section: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['law_name', 'section', 'explanation'],
              },
            },
            explanation: { type: Type.STRING },
            possible_next_steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
                required: ['title', 'description', 'category'],
              },
            },
            confidence_note: { type: Type.STRING },
          },
          required: [
            'summary',
            'legal_areas',
            'relevant_provisions',
            'explanation',
            'possible_next_steps',
            'confidence_note',
          ],
        },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);

      // Server-side validation:
      // Filter out any provision that does not match the retrieved verified provisions whitelist
      const verifiedSections = retrieval.provisions.map((p) => p.section.toLowerCase());
      const filteredProvisions = (parsed.relevant_provisions || []).filter((item: any) => {
        const itemSec = (item.section || '').toLowerCase();
        return verifiedSections.some(
          (vs) => itemSec.includes(vs.split('—')[0].trim()) || vs.includes(itemSec.split('—')[0].trim())
        );
      });

      const finalProvisions = filteredProvisions.length > 0
        ? filteredProvisions
        : retrieval.provisions.map((p) => ({
            law_name: p.lawName,
            section: p.section,
            explanation: `Potentially relevant provisions include ${p.section}, which ${p.content.toLowerCase()}`,
          }));

      const legalAreas = Array.isArray(parsed.legal_areas) && parsed.legal_areas.length > 0
        ? parsed.legal_areas
        : classification.legalAreas;

      const summary = parsed.summary || `Based on the information provided, this situation may relate to ${legalAreas.join(' and ')}.`;
      const explanation = parsed.explanation || '';
      const possibleNextSteps = Array.isArray(parsed.possible_next_steps) ? parsed.possible_next_steps : [];
      const confidenceNote = parsed.confidence_note || 'This information is strictly educational and grounded in verified statutory records.';

      const limitation = `${confidenceNote} It does not constitute a legal determination, legal opinion, or legal advice. It does not establish whether an offence has occurred or predict how any police authority, regulatory body, or court of law will evaluate your situation. Laws apply differently based on specific facts, evidence, and jurisdiction. If you need legal advice, consult a qualified advocate or your local District Legal Services Authority (DLSA).`;

      // Backward compatibility fields
      const legacyProvisions = finalProvisions.map((p: any) => ({
        lawName: p.law_name,
        section: p.section,
        explanation: p.explanation,
      }));

      const legacyRemedies = possibleNextSteps.map((step: any) => ({
        title: step.title,
        description: step.description,
      }));

      return {
        // Canonical Target Architecture:
        summary,
        legal_areas: legalAreas,
        relevant_provisions: finalProvisions,
        explanation,
        possible_next_steps: possibleNextSteps,
        sources: retrieval.sources,
        confidence_note: confidenceNote,

        // Frontend compatibility aliases:
        yourSituation: description,
        legalArea: legalAreas[0] || 'Civil & Statutory Information',
        areaDescription: summary,
        potentiallyRelevantLaws: Array.from(new Set(finalProvisions.map((p: any) => p.law_name))),
        relevantProvisions: legacyProvisions,
        plainLanguageExplanation: explanation,
        possibleNextSteps,
        importantLimitation: limitation,
        confidentMatch: true,
        receivedCategory: category,
        relevantLaws: legacyProvisions,
        remedies: legacyRemedies,
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
  const focus = Array.isArray(req.body.focus) ? req.body.focus : undefined;

  if (!description) {
    return res.status(400).json({ detail: 'description is required.' });
  }

  // First try Gemini AI with grounded retrieval
  const aiResult = await analyzeSituationWithGemini(description, category, focus);
  if (aiResult) {
    return res.json(aiResult);
  }

  // Fallback to structured offline legal responses
  const fallback = getFallbackSituationResult(category, description, focus);
  res.json(fallback);
};

// POST /api/situations/analyze/
app.post('/api/situations/analyze', handleSituationAnalysis);
app.post('/api/situations/analyze/', handleSituationAnalysis);

// -----------------------------------------------------------------------------
// STEP 28: Controlled AI Legal Information Workflow
// USER QUESTION -> IDENTIFY GENERAL TOPIC -> RETRIEVE RELEVANT NYAYA CONTENT ->
// SHOW RELEVANT LAWS/TOPICS -> GENERATE SIMPLE EXPLANATION FROM RETRIEVED CONTENT ->
// SHOW SOURCES -> SHOW RELATED NYAYA PAGES
// -----------------------------------------------------------------------------

const AI_WORKFLOW_DOMAINS = [
  {
    id: 'property',
    category: 'property',
    title: 'Property & Tenancy Law',
    description: 'Residential and commercial tenancies, security deposits, lease agreements, eviction safeguards, and property possession.',
    keywords: ['landlord', 'tenant', 'deposit', 'security deposit', 'rent', 'lease', 'evict', 'eviction', 'flat', 'apartment', 'possession', 'broker', 'maintenance', 'house', 'room'],
    defaultSubtopics: ['Security Deposit Return & Deductions', 'Lease Obligations (Sec 105 & 108 Transfer of Property Act)', 'Civil Breach of Agreement (Sec 73 Contract Act)'],
    lawIds: ['transfer-of-property-1882', 'indian-contract-1872', 'bns-2023'],
    rightsTopicIds: ['security-deposit-refund', 'essential-services-protection', 'unlawful-eviction-safeguards', 'landlord-entry-notice'],
    termIds: ['security-deposit', 'compensation', 'civil-suit', 'injunction'],
    relatedPages: [
      { title: 'Transfer of Property Act, 1882', to: '/laws/transfer-of-property-1882', description: 'Statutory lease definitions and reciprocal lessor/lessee rights', badge: 'Bare Act' },
      { title: 'Tenant Rights & Security Deposits', to: '/know-your-rights', description: 'Citizen rights guide for residential tenancies in India', badge: 'Rights Hub' },
      { title: 'Complaint Preparation Guide', to: '/tools?tool=complaint', description: 'Organize move-out dates, facts, and communication records', badge: 'Legal Tool' },
      { title: 'Legal Term: Security Deposit', to: '/legal-terms#security-deposit', description: 'Plain-language glossary definition of tenancy deposits', badge: 'Glossary' },
    ],
  },
  {
    id: 'consumer',
    category: 'consumer',
    title: 'Consumer Protection Law',
    description: 'Buyer protections, defective products, deficient services, misleading representations, and e-commerce redressal.',
    keywords: ['product', 'defect', 'defective', 'refund', 'replacement', 'seller', 'store', 'consumer', 'warranty', 'guarantee', 'ecommerce', 'amazon', 'flipkart', 'order', 'damaged', 'faulty', 'purchase', 'delivery'],
    defaultSubtopics: ['Deficiency in Service & Defective Goods', 'Statutory Right to Refund or Replacement', 'Consumer Commission Grievance (e-Daakhil)'],
    lawIds: ['consumer-protection-2019', 'indian-contract-1872'],
    rightsTopicIds: ['consumer-six-guarantees', 'edaakhil-complaint-filing', 'product-liability-claims'],
    termIds: ['consumer-dispute', 'compensation', 'civil-suit'],
    relatedPages: [
      { title: 'Consumer Protection Act, 2019', to: '/laws/consumer-protection-2019', description: 'Statutory provisions for consumer rights & commission filing', badge: 'Bare Act' },
      { title: 'How to File Online Consumer Complaints', to: '/search?q=consumer', description: 'Step-by-step procedural guide for e-Daakhil', badge: 'Guide' },
      { title: 'Document Checklist: Consumer Disputes', to: '/tools?tool=checklist&topic=consumer', description: 'Invoices, warranty cards, and communication logs checklist', badge: 'Legal Tool' },
      { title: 'Legal Term: Deficiency of Service', to: '/legal-terms#consumer-dispute', description: 'Statutory definition under Section 2(11) of CPA 2019', badge: 'Glossary' },
    ],
  },
  {
    id: 'criminal',
    category: 'criminal',
    title: 'Criminal Procedure & Police Powers',
    description: 'Codified arrest safeguards, 24-hour detention limits, FIR registration, bail mechanisms, and due process.',
    keywords: ['police', 'arrest', 'detain', 'custody', 'fir', 'zero fir', 'warrant', 'handcuff', 'interrogation', 'bail', 'crime', 'investigation', 'police station', 'lockup', 'officer', 'station', 'remand'],
    defaultSubtopics: ['Cognizable vs Non-Cognizable Offence Safeguards', 'Mandatory 24-Hour Production Before Magistrate', 'Right to Inform Family & Medical Examination'],
    lawIds: ['bnss-2023', 'bns-2023', 'constitution-of-india'],
    rightsTopicIds: ['arrest-safeguards-24h', 'women-arrest-safeguards', 'zero-fir-complaint-rights', 'search-seizure-videography'],
    termIds: ['arrest', 'bail', 'fir', 'zero-fir', 'cognizable-offence', 'bailable-offence'],
    relatedPages: [
      { title: 'BNSS 2023: Sections 35–58 (Arrest Safeguards)', to: '/laws/bnss-2023', description: 'Statutory police arrest safeguards and procedure', badge: 'Bare Act' },
      { title: 'Citizen Arrest Safeguards & 24h Rule', to: '/know-your-rights', description: 'D.K. Basu guidelines and citizen protections', badge: 'Rights Hub' },
      { title: 'Article 22: Protection Against Arrest', to: '/fundamental-rights', description: 'Constitutional protections under Part III', badge: 'Constitution' },
      { title: 'Zero FIR Guide', to: '/search?q=fir', description: 'How to file an FIR at any police station across India', badge: 'Guide' },
    ],
  },
  {
    id: 'cyber',
    category: 'cyber',
    title: 'Cyber Law & Digital Fraud',
    description: 'Online financial scams, UPI fraud, unauthorized account debits, identity theft, phishing, and digital safety.',
    keywords: ['cyber', 'online', 'fraud', 'scam', 'upi', 'bank', 'debited', 'hacked', 'phishing', 'otp', 'scammer', 'impersonation', 'digital', 'telegram', 'apk', 'link', 'money debited', 'account debited'],
    defaultSubtopics: ['Citizen Financial Cyber Fraud Reporting (1930)', 'RBI Zero Liability Banking Timeline', 'Computer Related Offences (IT Act & BNS)'],
    lawIds: ['it-act-2000', 'bns-2023', 'bnss-2023'],
    rightsTopicIds: ['cyber-financial-fraud-1930', 'rbi-zero-liability-banking', 'cyber-stalking-morphing-relief'],
    termIds: ['cybercrime-report', 'compensation', 'fir'],
    relatedPages: [
      { title: 'Information Technology Act, 2000', to: '/laws/it-act-2000', description: 'Penalties for unauthorized access and identity theft', badge: 'Bare Act' },
      { title: 'Cyber Financial Fraud (Helpline 1930)', to: '/know-your-rights', description: 'Golden hour freezing protocol and reporting', badge: 'Rights Hub' },
      { title: 'Document Checklist: Cyber & Financial Fraud', to: '/tools?tool=checklist&topic=cyber', description: 'Evidence checklist: UTR, bank statements, screenshots', badge: 'Legal Tool' },
      { title: 'BNS Section 318: Cheating & Impersonation', to: '/laws/bns-2023', description: 'Penal provisions for deceptive inducement of property', badge: 'Bare Act' },
    ],
  },
  {
    id: 'workplace',
    category: 'labour',
    title: 'Labour & Workplace Rights',
    description: 'Conditions of employment, unpaid salaries, gratuity withholding, notice period compliance, and workplace harassment.',
    keywords: ['salary', 'wage', 'employer', 'company', 'resignation', 'notice period', 'gratuity', 'fired', 'terminated', 'retrenchment', 'workplace', 'posh', 'harassment', 'pf', 'provident fund', 'boss', 'unpaid salary'],
    defaultSubtopics: ['Unpaid Wages & Notice Period Settlements', 'Conditions for Retrenchment & Compensation', 'Prevention of Workplace Sexual Harassment (POSH)'],
    lawIds: ['industrial-disputes-1947', 'indian-contract-1872'],
    rightsTopicIds: ['posh-workplace-harassment', 'retrenchment-severance-notice', 'maternity-benefits-entitlement'],
    termIds: ['compensation', 'civil-suit', 'legal-aid'],
    relatedPages: [
      { title: 'Industrial Disputes Act, 1947', to: '/laws/industrial-disputes-1947', description: 'Statutory retrenchment conditions and settlement mechanisms', badge: 'Bare Act' },
      { title: 'Workplace Rights & Severance Notice', to: '/know-your-rights', description: 'Legal notice periods and employment protections', badge: 'Rights Hub' },
      { title: 'Complaint Preparation Guide', to: '/tools?tool=complaint', description: 'Document appointment letters, payslips, and resignation dates', badge: 'Legal Tool' },
      { title: 'Free Legal Aid via DLSA', to: '/search?q=legal+aid', description: 'Access free legal aid representation under Article 39A', badge: 'Legal Aid' },
    ],
  },
  {
    id: 'constitutional',
    category: 'constitutional',
    title: 'Constitutional Rights & Freedoms',
    description: 'Fundamental rights guaranteed by Part III of the Constitution of India, due process, privacy, and writ remedies.',
    keywords: ['constitution', 'fundamental rights', 'article', 'equality', 'discrimination', 'speech', 'privacy', 'religion', 'writ', 'habeas corpus', 'article 21', 'article 32', 'fundamental right', 'arbitrary'],
    defaultSubtopics: ['Article 21: Right to Life, Dignity & Personal Liberty', 'Article 14: Equality & Non-Arbitrariness', 'Article 32: Constitutional Writs & Enforcement'],
    lawIds: ['constitution-of-india'],
    rightsTopicIds: ['article-14-equality-arbitrariness', 'article-19-six-freedoms', 'article-21-life-dignity-privacy', 'article-32-writs-enforcement'],
    termIds: ['habeas-corpus', 'mandamus', 'certiorari', 'injunction'],
    relatedPages: [
      { title: 'Fundamental Rights (Part III)', to: '/fundamental-rights', description: 'Comprehensive guide to Articles 12 through 35', badge: 'Constitution' },
      { title: 'Article 21: Life, Liberty & Privacy', to: '/fundamental-rights', description: 'Puttaswamy privacy doctrine and liberty protections', badge: 'Constitution' },
      { title: 'Access to Justice & Legal Aid', to: '/know-your-rights', description: 'Article 39A free legal representation', badge: 'Rights Hub' },
      { title: 'Writ Remedies Overview', to: '/legal-terms#habeas-corpus', description: 'Habeas Corpus, Mandamus, Certiorari explained', badge: 'Glossary' },
    ],
  },
  {
    id: 'family',
    category: 'family',
    title: 'Family & Matrimonial Law',
    description: 'Marriage validity, maintenance, custody, domestic violence protection, and inheritance rights.',
    keywords: ['marriage', 'divorce', 'maintenance', 'custody', 'domestic violence', 'alimony', 'husband', 'wife', 'in-laws', 'inheritance', 'daughter', 'hindu marriage', 'muslim marriage', 'mahr', 'dower', 'khula', 'dissolution of muslim marriage', 'dowry'],
    defaultSubtopics: ['Protection of Women from Domestic Violence (PWDVA)', 'Interim Maintenance & Residence Relief', 'Equal Inheritance Rights for Daughters', 'Dissolution of Muslim Marriages & Dower (Mahr)'],
    lawIds: ['hindu-marriage-1955', 'dissolution-of-muslim-marriages-1939', 'bns-2023'],
    rightsTopicIds: ['pwdva-domestic-violence-relief', 'victim-identity-masking', 'daughters-coparcenary-inheritance'],
    termIds: ['interim-order', 'compensation', 'legal-aid'],
    relatedPages: [
      { title: 'Hindu Marriage Act, 1955', to: '/laws/hindu-marriage-1955', description: 'Statutory grounds for divorce and maintenance', badge: 'Bare Act' },
      { title: 'Dissolution of Muslim Marriages Act, 1939', to: '/laws/dissolution-of-muslim-marriages-1939', description: 'Statutory grounds for dissolution by Muslim wives & Mahr protection', badge: 'Bare Act' },
      { title: 'Domestic Violence Relief & Residence Orders', to: '/know-your-rights', description: 'Protection orders and emergency support helplines', badge: 'Rights Hub' },
      { title: 'Free Legal Aid for Women', to: '/search?q=legal+aid', description: 'Section 12 of NALSA Act provides free legal aid to women', badge: 'Legal Aid' },
    ],
  },
];

async function executeAiInformationWorkflow(questionText: string, preferredTopic?: string) {
  const qClean = questionText.toLowerCase().trim();

  // 1. Identify General Topic
  let matchedDomain = AI_WORKFLOW_DOMAINS.find((d) => d.id === preferredTopic);

  if (!matchedDomain) {
    let bestScore = 0;
    for (const domain of AI_WORKFLOW_DOMAINS) {
      let score = 0;
      for (const kw of domain.keywords) {
        if (qClean.includes(kw)) {
          score += kw.length > 5 ? 4 : 2;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        matchedDomain = domain;
      }
    }
  }

  // Fallback to property if landlord/deposit was mentioned, or default to general civil/constitutional
  if (!matchedDomain) {
    if (qClean.includes('landlord') || qClean.includes('deposit') || qClean.includes('rent')) {
      matchedDomain = AI_WORKFLOW_DOMAINS[0];
    } else {
      matchedDomain = AI_WORKFLOW_DOMAINS[0];
    }
  }

  // 2. Retrieve Relevant Nyaya Content
  // A. Statutory provisions from lawsData
  const retrievedProvisions: Array<{
    lawId: string;
    lawName: string;
    section: string;
    title: string;
    content: string;
    officialSource?: string;
    verified: boolean;
  }> = [];

  for (const lawId of matchedDomain.lawIds) {
    const law = lawsData.find((l) => l.id === lawId);
    if (!law) continue;

    // Pick top matching sections or prominent domain sections
    for (const sec of law.sections || []) {
      const secText = `${sec.number} ${sec.title} ${sec.content}`.toLowerCase();
      let matched = false;

      // Special domain matches
      if (matchedDomain.id === 'property') {
        if (sec.id === 'sec-105' || sec.id === 'sec-108' || (law.id === 'indian-contract-1872' && sec.id === 'sec-2')) {
          matched = true;
        }
      } else if (matchedDomain.id === 'consumer') {
        if (sec.id === 'sec-1' || sec.id === 'sec-2') matched = true;
      } else if (matchedDomain.id === 'criminal') {
        if (sec.id === 'sec-35' || sec.id === 'sec-47' || sec.id === 'sec-58') matched = true;
      } else if (matchedDomain.id === 'cyber') {
        if (sec.id === 'sec-1' || sec.id === 'sec-2') matched = true;
      } else if (matchedDomain.id === 'workplace') {
        if (sec.id === 'sec-2' || (law.id === 'indian-contract-1872' && sec.id === 'sec-2')) matched = true;
      } else if (matchedDomain.id === 'family') {
        if (
          sec.id === 'sec-2' ||
          sec.id === 'sec-4' ||
          sec.id === 'sec-5' ||
          sec.id === 'sec-9' ||
          sec.id === 'sec-10' ||
          sec.id === 'sec-11' ||
          sec.id === 'sec-12' ||
          sec.id === 'sec-13' ||
          sec.id === 'sec-13b' ||
          sec.id === 'sec-24' ||
          sec.id === 'sec-25' ||
          sec.id === 'sec-26'
        ) {
          matched = true;
        }
      }

      // Keyword match
      if (!matched) {
        for (const kw of matchedDomain.keywords) {
          if (qClean.includes(kw) && secText.includes(kw)) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        retrievedProvisions.push({
          lawId: law.id,
          lawName: law.name,
          section: sec.number,
          title: sec.title,
          content: sec.content,
          officialSource: law.officialSource,
          verified: VERIFIED_LAW_IDS.has(law.id),
        });
      }
      if (retrievedProvisions.length >= 4) break;
    }
  }

  // B. Rights Hub Topics from rightsCategories
  const retrievedRightsTopics: Array<{
    id: string;
    title: string;
    legalArea: string;
    relevantLaw: string;
    explanation: string;
    actionPoints: string[];
    officialSource?: any;
  }> = [];

  for (const cat of rightsCategories) {
    for (const topic of cat.topics) {
      if (matchedDomain.rightsTopicIds.includes(topic.id)) {
        retrievedRightsTopics.push({
          id: topic.id,
          title: topic.title,
          legalArea: topic.legalArea,
          relevantLaw: topic.relevantLaw,
          explanation: topic.explanation,
          actionPoints: topic.actionPoints || [],
          officialSource: topic.officialSource,
        });
      }
    }
  }

  // C. Legal Terms
  const retrievedTerms: Array<{
    id: string;
    term: string;
    plainLanguage: string;
    category: string;
  }> = [];

  for (const term of legalTermsData) {
    if (matchedDomain.termIds.includes(term.id)) {
      retrievedTerms.push({
        id: term.id,
        term: term.term,
        plainLanguage: term.plainLanguage,
        category: term.category,
      });
    }
  }

  // D. Procedural Guides
  const retrievedGuides: Array<{
    id: string;
    title: string;
    statuteReference: string;
    summary: string;
    officialPortal?: string;
  }> = [];

  for (const guide of legalGuides) {
    const guideText = `${guide.title} ${guide.summary} ${guide.keywords?.join(' ')}`.toLowerCase();
    if (matchedDomain.keywords.some((kw) => qClean.includes(kw) && guideText.includes(kw))) {
      retrievedGuides.push({
        id: guide.id,
        title: guide.title,
        statuteReference: guide.statuteReference,
        summary: guide.summary,
        officialPortal: guide.officialPortal,
      });
      if (retrievedGuides.length >= 2) break;
    }
  }

  // E. Official Sources
  const sourcesMap = new Map<string, { name: string; url: string; portal: string; verified: boolean }>();
  sourcesMap.set('indiacode', {
    name: 'India Code — National Digital Repository of Central & State Acts',
    url: 'https://indiacode.nic.in',
    portal: 'indiacode.nic.in',
    verified: true,
  });
  sourcesMap.set('legislative', {
    name: 'Legislative Department, Ministry of Law and Justice',
    url: 'https://legislative.gov.in',
    portal: 'legislative.gov.in',
    verified: true,
  });

  if (matchedDomain.id === 'property') {
    sourcesMap.set('mohua', {
      name: 'Ministry of Housing and Urban Affairs — Model Tenancy Guidelines',
      url: 'https://mohua.gov.in',
      portal: 'mohua.gov.in',
      verified: true,
    });
  } else if (matchedDomain.id === 'consumer') {
    sourcesMap.set('consumeraffairs', {
      name: 'Department of Consumer Affairs — e-Daakhil Portal',
      url: 'https://edaakhil.nic.in',
      portal: 'edaakhil.nic.in',
      verified: true,
    });
  } else if (matchedDomain.id === 'criminal' || matchedDomain.id === 'constitutional') {
    sourcesMap.set('nalsa', {
      name: 'National Legal Services Authority (NALSA) — Free Legal Aid',
      url: 'https://nalsa.gov.in',
      portal: 'nalsa.gov.in',
      verified: true,
    });
  } else if (matchedDomain.id === 'cyber') {
    sourcesMap.set('cybercrime', {
      name: 'National Cyber Crime Reporting Portal (Helpline 1930)',
      url: 'https://cybercrime.gov.in',
      portal: 'cybercrime.gov.in',
      verified: true,
    });
  }

  // 3. Generate Simple Explanation from Retrieved Content (Strict Grounding)
  let generatedExplanation = '';
  let generatedNextSteps: Array<{ title: string; description: string; type: 'documentation' | 'dialogue' | 'remedy' | 'legal-aid' }> = [];

  const verifiedProvisionsSummary = retrievedProvisions
    .map((p) => `- ${p.lawName}, ${p.section} (${p.title}): ${p.content}`)
    .join('\n');

  const rightsSummary = retrievedRightsTopics
    .map((r) => `- Topic: ${r.title} | Law: ${r.relevantLaw} | Statutory Principle: ${r.explanation}`)
    .join('\n');

  const ai = getGenAI();
  if (ai) {
    try {
      const prompt = `You are Nyaya's controlled educational legal-information synthesis engine for Indian law.

CITIZEN QUESTION:
"${questionText}"

IDENTIFIED TOPIC:
"${matchedDomain.title}" (${matchedDomain.description})

RETRIEVED VERIFIED NYAYA RECORDS:
Statutory Provisions:
${verifiedProvisionsSummary || 'General Indian statutory principles'}

Rights Hub Topics:
${rightsSummary || 'Codified citizen rights principles'}

Relevant Legal Terms:
${retrievedTerms.map((t) => `- ${t.term}: ${t.plainLanguage}`).join('\n')}

MANDATORY CONSTRAINTS (ZERO-INVENTION POLICY):
1. Grounding: You must synthesize your explanation STRICTLY from the verified provisions and rights topics listed above.
2. ZERO-INVENTION:
   - Do NOT invent or cite any Act, Law, Section, or Article not listed in the retrieved records.
   - Do NOT invent any court cases, citations, case numbers, or judicial precedents.
   - Do NOT invent specific statutory timeframes (e.g. do not guess "15 days" or "30 days" unless stated above).
   - Do NOT promise compensation amounts or outcomes.
3. NON-DETERMINATION & HEDGED FRAMING:
   - This is strictly educational legal information, NOT legal advice.
   - You must never declare liability or predict how a court or authority will decide.
   - Use hedged phrasing: "Based on Indian statutory principles...", "This situation commonly relates to...", "Potentially applicable provisions include...".
4. Produce a calm, clear, plain-language educational explanation (2-3 short paragraphs) explaining how these statutory principles intersect with this scenario, plus 2-3 realistic educational next steps.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              explanation: { type: Type.STRING },
              next_steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    type: { type: Type.STRING },
                  },
                  required: ['title', 'description', 'type'],
                },
              },
            },
            required: ['explanation', 'next_steps'],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed.explanation && parsed.explanation.trim().length > 40) {
          generatedExplanation = parsed.explanation.trim();
        }
        if (Array.isArray(parsed.next_steps) && parsed.next_steps.length > 0) {
          generatedNextSteps = parsed.next_steps.map((s: any) => ({
            title: s.title,
            description: s.description,
            type: (['documentation', 'dialogue', 'remedy', 'legal-aid'].includes(s.type) ? s.type : 'remedy') as any,
          }));
        }
      }
    } catch (err) {
      console.error('Gemini workflow explanation error:', err);
    }
  }

  // Fallback deterministic synthesis if Gemini did not run or errored
  if (!generatedExplanation) {
    if (matchedDomain.id === 'property') {
      generatedExplanation = `Under Indian property and contract law, security deposits in residential tenancies are held in trust by the landlord to guarantee performance of the lease agreement and are fundamentally refundable upon handing over peaceful vacant possession.

Under Section 105 and Section 108 of the Transfer of Property Act, 1882, the lessor and lessee have reciprocal statutory obligations. The tenant is entitled to peaceful enjoyment of the premises and is required to restore the property in good condition, subject to reasonable wear and tear arising from normal daily living. Landlords are legally precluded from making arbitrary deductions for normal wear and tear or unsubstantiated repainting fees.

Where a landlord refuses to return a security deposit without providing verifiable invoices or establishing actual structural damage, this constitutes a civil breach of agreement under Section 73 of the Indian Contract Act, 1872. Tenants may pursue formal redressal through the jurisdictional Rent Authority or Civil Court.`;

      generatedNextSteps = [
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
      ];
    } else if (matchedDomain.id === 'consumer') {
      generatedExplanation = `Under the Consumer Protection Act, 2019, consumers who purchase goods or services are protected against 'deficiency in service' and 'defective goods' under Section 2. Sellers and e-commerce platforms have an obligation to provide goods that match statutory standards and representations.

When a consumer receives a broken or non-conforming product and the merchant arbitrarily denies a refund or replacement, the consumer is entitled under the Act to seek replacement, repair, or full reimbursement of the price paid, along with compensation for loss or inconvenience under Section 73 of the Indian Contract Act, 1872.

The statutory framework provides a simplified adjudication process before the District Consumer Disputes Redressal Commission without requiring complex procedural filings.`;

      generatedNextSteps = [
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
      ];
    } else if (matchedDomain.id === 'criminal') {
      generatedExplanation = `Under the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) and Article 22 of the Constitution of India, police powers of arrest are subject to strict procedural safeguards codified to prevent arbitrary deprivation of liberty.

Under Section 35 and Section 47 of the BNSS, an officer arresting an individual must immediately inform them of the precise grounds for arrest and whether the offence is bailable or non-bailable. An Arrest Memo must be prepared and signed by a witness or family member, and under Section 48, the arrested person has the statutory right to have one relative or friend immediately informed.

Furthermore, under Section 58 of BNSS and Article 22(2) of the Constitution, police cannot detain any individual in custody for more than 24 hours without producing them before the nearest Judicial Magistrate.`;

      generatedNextSteps = [
        {
          title: 'Demand the Grounds of Arrest & Arrest Memo',
          description: 'Politely insist on knowing the section of offence, whether it is bailable, and verify that a signed Arrest Memo is prepared on the spot.',
          type: 'documentation',
        },
        {
          title: 'Ensure Family Notification & Medical Examination',
          description: 'Exercise the statutory right to have a nominated family member informed and request a medical examination by a government medical officer under BNSS Section 53.',
          type: 'remedy',
        },
        {
          title: 'Request Free Legal Aid Before the Magistrate',
          description: 'If unable to afford private legal counsel, demand a legal aid advocate from the District Legal Services Authority (DLSA) when produced before the Magistrate.',
          type: 'legal-aid',
        },
      ];
    } else {
      generatedExplanation = `Based on verified Indian statutory frameworks, this query intersects with ${matchedDomain.title}. Codified enactments establish clear statutory standards, obligations, and procedural safeguards for individuals facing situations of this nature.

Potentially applicable provisions include records from ${matchedDomain.lawIds.map((l) => lawsData.find((law) => law.id === l)?.name || l).join(' and ')}. These provisions define the legal rights of parties, conditions of liability, and avenues for formal redressal.

Nyaya limits this explanation strictly to verified central statutory records to ensure accuracy and prevent speculative legal assertions.`;

      generatedNextSteps = [
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
      ];
    }
  }

  return {
    workflowStage: 'completed',
    userQuestion: questionText,
    identifiedTopic: {
      id: matchedDomain.id,
      title: matchedDomain.title,
      category: matchedDomain.category,
      description: matchedDomain.description,
      subtopics: matchedDomain.defaultSubtopics,
      confidence: 'high',
    },
    retrievedContent: {
      provisions: retrievedProvisions,
      rightsTopics: retrievedRightsTopics,
      terms: retrievedTerms,
      guides: retrievedGuides,
    },
    explanation: generatedExplanation,
    nextSteps: generatedNextSteps,
    sources: Array.from(sourcesMap.values()),
    relatedPages: matchedDomain.relatedPages,
    disclaimer: 'This information is strictly educational legal information and does not constitute a legal determination, legal opinion, or legal advice. It does not predict how any court or administrative body will decide your case. If you require legal representation, consult a qualified advocate or your local District Legal Services Authority (DLSA).',
  };
}

const handleAiWorkflow = async (req: express.Request, res: express.Response) => {
  const question = (req.body.question || '').trim();
  const preferredTopic = req.body.preferredTopic;

  if (!question || question.length < 3) {
    return res.status(400).json({ detail: 'Please provide a valid question or situation description.' });
  }

  try {
    const result = await executeAiInformationWorkflow(question, preferredTopic);
    return res.json(result);
  } catch (err) {
    console.error('AI Workflow execution error:', err);
    return res.status(500).json({ detail: 'Error executing legal information workflow.' });
  }
};

// POST /api/ai/workflow
app.post('/api/ai/workflow', handleAiWorkflow);
app.post('/api/ai/workflow/', handleAiWorkflow);
app.post('/api/workflow', handleAiWorkflow);
app.post('/api/workflow/', handleAiWorkflow);



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
