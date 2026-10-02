// Canonical Indian statutory reference dataset for Nyaya legal awareness platform.
// Verified against official Union Gazettes and primary bare act texts.
import { hmaSections } from './hmaDetailedNotes.js'
import { dmmaSections } from './dmmaDetailedNotes.js'
import { itGazetteRules } from './itRulesDetailedNotes.js'

export const laws = [
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
      "The primary penal code of India (Act No. 45 of 2023) enacted to consolidate and amend provisions relating to offences, repealing the Indian Penal Code, 1860. Features 358 sections across 20 chapters including new offences such as mob lynching, snatching, organised crime, and introduces community service.",
    sections: [
      {
        id: 'sec-1',
        number: 'Section 1',
        title: 'Short Title, Extent and Application',
        content:
          'Applies throughout India, extraterritorially to Indian citizens abroad, persons on registered Indian vessels or aircraft, and any person targeting computer resources located in India.',
      },
      {
        id: 'sec-2',
        number: 'Section 2',
        title: 'Definitions (39 Codified Terms)',
        content:
          'Defines child (<18 years), document (includes digital & electronic records), gender (he includes male, female, transgender), public servant, good faith, injury, voluntarily, and valuable security.',
      },
      {
        id: 'sec-4',
        number: 'Section 4',
        title: 'Punishments (Introduces Community Service)',
        content:
          'Prescribes six statutory punishments: Death, Imprisonment for life, Imprisonment (Rigorous or Simple), Forfeiture of property, Fine, and Community Service.',
      },
      {
        id: 'sec-63',
        number: 'Section 63',
        title: 'Rape & Strict Consent Standard',
        content:
          'Defines sexual offences with strict standards; non-resistance does not constitute consent. Aggravated and custodial rape carry minimum 10 years to natural life.',
      },
      {
        id: 'sec-69',
        number: 'Section 69',
        title: 'Deceitful Means & False Promise to Marry',
        content:
          'Sexual intercourse by deceitful means (inducement, false promise of employment/promotion, or suppressing identity) without intention of fulfilling it: punishable up to 10 years.',
      },
      {
        id: 'sec-103',
        number: 'Section 103',
        title: 'Murder & Mob Lynching',
        content:
          'Punishes murder with Death or Life Imprisonment. Section 103(2) penalises mob lynching by groups of 5+ on grounds of race, caste, sex, language, or belief with Death or Life Imprisonment.',
      },
      {
        id: 'sec-106',
        number: 'Section 106',
        title: 'Death by Negligence & Hit-and-Run',
        content:
          'Rash/negligent act causing death: up to 5 yrs (2 yrs for registered doctors). Hit-and-Run without reporting to police/magistrate: up to 10 years and fine.',
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
        title: 'Snatching (New Distinct Offence)',
        content:
          'Specifically defines snatching as sudden or forcible grabbing of movable property from a person: punishable with imprisonment up to 3 years and fine.',
      },
      {
        id: 'sec-318',
        number: 'Section 318',
        title: 'Cheating & Inducing Delivery (Old IPC 420 Equivalent)',
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
      "India's supreme law, establishing the sovereign structure, fundamental citizen rights, directive principles, and the separation of judicial, executive, and legislative powers.",
    sections: [
      {
        id: 'part-3',
        number: 'Part III',
        title: 'Fundamental Rights (Articles 12–35)',
        content:
          'Enforceable constitutional rights guaranteeing equality before law, freedoms of speech and movement, protection against arbitrary arrest, freedom of conscience, and constitutional writ remedies.',
      },
      {
        id: 'part-4',
        number: 'Part IV',
        title: 'Directive Principles of State Policy',
        content:
          'Guiding constitutional principles for social, economic, and educational welfare of citizens.',
      },
      {
        id: 'part-4a',
        number: 'Part IVA',
        title: 'Fundamental Duties',
        content:
          'Article 51A setting forth the fundamental civic duties of every citizen of India.',
      },
    ],
    officialSource: 'legislative.gov.in',
    lastVerified: 'Legislative Department, Ministry of Law and Justice',
    relatedLaws: ['bns-2023', 'bnss-2023', 'consumer-protection-2019'],
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
        content: 'Statutory definitions defining "consumer", "goods", "service", "deficiency", "defect", and "unfair trade practice" under the 2019 Act.',
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
]
