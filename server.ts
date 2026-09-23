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
import {
  bnssMeta,
  bnssChapters,
  bnssCoreSections,
  crpcToBnssMatrix,
  bnssScheduleForms,
  bnssInnovations,
  bnssQuiz,
} from './src/data/bnssDetailedNotes.js';

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
  {
    id: 'bns',
    term: 'BNS (Bharatiya Nyaya Sanhita, 2023)',
    fullForm: 'Bharatiya Nyaya Sanhita, 2023 (Act 45 of 2023)',
    definition:
      "India's modernized criminal penal code which repealed and replaced the colonial Indian Penal Code, 1860 on 1 July 2024. Organised into 20 chapters and 358 sections.",
    relatedLaws: ['bns-2023', 'bnss-2023'],
  },
  {
    id: 'ipc',
    term: 'IPC (Indian Penal Code, 1860)',
    fullForm: 'Indian Penal Code, 1860',
    definition:
      'The previous criminal code of India drafted by Thomas Macaulay in 1860. Replaced by the Bharatiya Nyaya Sanhita, 2023 (BNS) for all offences committed on or after 1 July 2024.',
    relatedLaws: ['bns-2023'],
  },
  {
    id: 'zero-fir',
    term: 'Zero FIR',
    definition:
      'An FIR that can be registered at any police station across India irrespective of jurisdiction, statutorily mandated under Section 173 of BNSS 2023, and transferred to the jurisdictional police station within 15 days.',
    relatedLaws: ['bnss-2023', 'bns-2023'],
  },
  {
    id: 'community-service',
    term: 'Community Service',
    definition:
      'A non-custodial punishment introduced under Section 4(f) of BNS 2023 for minor offences (e.g. petty theft under ₹5,000 upon restoration, defamation, public intoxication) requiring court-directed unpaid community work.',
    relatedLaws: ['bns-2023'],
  },
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

// GET /api/bnss
app.get('/api/bnss', (req, res) => {
  res.json({
    meta: bnssMeta,
    chapters: bnssChapters,
    sections: bnssCoreSections,
    matrix: crpcToBnssMatrix,
    forms: bnssScheduleForms,
    innovations: bnssInnovations,
    quiz: bnssQuiz,
  });
});
app.get('/api/bnss/', (req, res) => {
  res.json({
    meta: bnssMeta,
    chapters: bnssChapters,
    sections: bnssCoreSections,
    matrix: crpcToBnssMatrix,
    forms: bnssScheduleForms,
    innovations: bnssInnovations,
    quiz: bnssQuiz,
  });
});

// Enriches law objects so frontend gets both camelCase and snake_case properties plus resolved related_laws
function enrichLaw(l: any) {
  if (!l) return l;
  const rel = (l.relatedLaws || []).map((id: string) => {
    const target = lawsData.find((x) => x.id === id);
    return {
      id,
      name: target?.name || id,
      shortName: target?.shortName || target?.name || id,
    };
  });
  return {
    ...l,
    official_source: l.officialSource,
    last_verified: l.lastVerified,
    related_laws: rel,
    relatedLaws: l.relatedLaws || [],
  };
}

// Enriches term objects so related_laws includes { id, name, shortName } and full_form
function enrichTerm(t: any) {
  if (!t) return t;
  const rel = (t.relatedLaws || []).map((id: string) => {
    const target = lawsData.find((x) => x.id === id);
    return {
      id,
      name: target?.name || id,
      shortName: target?.shortName || target?.name || id,
    };
  });
  return {
    ...t,
    full_form: t.fullForm,
    related_laws: rel,
    relatedLaws: t.relatedLaws || [],
  };
}

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
    return res.json(legalTermsData.map(enrichTerm));
  }
  const filtered = legalTermsData.filter(
    (item) =>
      item.term.toLowerCase().includes(q) ||
      (item.fullForm && item.fullForm.toLowerCase().includes(q)) ||
      item.definition.toLowerCase().includes(q)
  );
  res.json(filtered.map(enrichTerm));
});
app.get('/api/legal-terms/', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  if (!q) {
    return res.json(legalTermsData.map(enrichTerm));
  }
  const filtered = legalTermsData.filter(
    (item) =>
      item.term.toLowerCase().includes(q) ||
      (item.fullForm && item.fullForm.toLowerCase().includes(q)) ||
      item.definition.toLowerCase().includes(q)
  );
  res.json(filtered.map(enrichTerm));
});

// GET /api/legal-terms/:id
app.get('/api/legal-terms/:id', (req, res) => {
  const item = legalTermsData.find((t) => t.id === req.params.id);
  if (!item) {
    return res.status(404).json({ detail: 'Not found' });
  }
  res.json(enrichTerm(item));
});
app.get('/api/legal-terms/:id/', (req, res) => {
  const item = legalTermsData.find((t) => t.id === req.params.id);
  if (!item) {
    return res.status(404).json({ detail: 'Not found' });
  }
  res.json(enrichTerm(item));
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
  return results.map(enrichLaw);
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
  res.json(enrichLaw(law));
});
app.get('/api/laws/:id/', (req, res) => {
  const law = lawsData.find((l) => l.id === req.params.id);
  if (!law) {
    return res.status(404).json({ detail: 'Law not found' });
  }
  res.json(enrichLaw(law));
});

// Helper for unified search
function executeSearch(q: string) {
  if (!q) {
    return { rights: [], laws: [], sections: [], terms: [] };
  }

  const isBnsQuery =
    q === 'bns' ||
    q === 'bns 2023' ||
    q === 'bns section' ||
    q === 'bns sections' ||
    q.includes('bns') ||
    q.includes('nyaya sanhita') ||
    q.includes('penal code');

  const strippedSecQ = q
    .replace(/\b(bns|bnss|section|sec|act|2023)\b/gi, '')
    .trim();

  const matchedRights = rightsData.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.articles.toLowerCase().includes(q)
  );

  const matchedLaws = lawsData.filter(
    (l: any) =>
      l.name.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q) ||
      (l.shortName && l.shortName.toLowerCase().includes(q)) ||
      (l.aliases && l.aliases.some((a: string) => a.toLowerCase().includes(q))) ||
      (isBnsQuery && l.id === 'bns-2023')
  );

  const matchedSections: Array<{
    id: string;
    number: string;
    title: string;
    lawId: string;
    lawName: string;
  }> = [];

  lawsData.forEach((law: any) => {
    (law.sections || []).forEach((sec: any) => {
      const isLawMatch = (isBnsQuery && law.id === 'bns-2023') || law.id.toLowerCase().includes(q);
      const matchesSec =
        sec.title.toLowerCase().includes(q) ||
        sec.number.toLowerCase().includes(q) ||
        (strippedSecQ && sec.number.toLowerCase().includes(strippedSecQ)) ||
        (strippedSecQ && sec.title.toLowerCase().includes(strippedSecQ)) ||
        sec.content.toLowerCase().includes(q) ||
        (strippedSecQ && sec.content.toLowerCase().includes(strippedSecQ));

      if (isLawMatch || matchesSec) {
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

  return {
    rights: matchedRights,
    laws: matchedLaws.map(enrichLaw),
    sections: matchedSections,
    terms: matchedTerms.map(enrichTerm),
  };
}

// GET /api/search/
app.get('/api/search', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  res.json(executeSearch(q));
});
app.get('/api/search/', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase().trim();
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
