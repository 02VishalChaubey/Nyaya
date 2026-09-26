// Practical legal procedural guides and standard operating procedures (SOPs)
// Grounded in official Indian statutes, BNSS 2023, BNS 2023, and Constitution of India

export const legalGuides = [
  {
    id: 'guide-zero-fir',
    title: 'How to File a Zero FIR & Electronic FIR (e-FIR)',
    type: 'Guide',
    category: 'Criminal Procedure',
    statuteReference: 'BNSS 2023 Section 173 (replaces CrPC 154)',
    summary:
      'A Zero FIR can be filed at any police station across India irrespective of territorial jurisdiction. It is given a serial number "0" and later transferred to the jurisdictional police station within 15 days.',
    steps: [
      'Approach the nearest police station or use the state police online portal for e-FIR.',
      'Provide full details of the cognizable offence (place, time, accused details, witnesses).',
      'If filed electronically, sign the physical copy within 3 days at the police station.',
      'Obtain a free, signed copy of the FIR immediately (mandatory under Section 173(2)).',
      'If the police officer refuses, send the complaint in writing by registered post or email to the Superintendent of Police (SP/DCP) under Section 173(4).',
    ],
    officialPortal: 'cybercrime.gov.in / State Police Portals',
    whyUseful:
      'Prevents police refusal on grounds of jurisdiction during emergencies such as accidents, assaults, or crimes during transit.',
    keywords: ['zero fir', 'fir', 'efir', 'file fir', 'police complaint', 'section 173', 'refusal to file fir', 'crpc 154'],
  },
  {
    id: 'guide-arrest-rights',
    title: 'Citizen Arrest Safeguards, 24-Hour Rule & D.K. Basu Guidelines',
    type: 'Guide',
    category: 'Constitutional & Criminal Rights',
    statuteReference: 'BNSS 2023 Sections 35–58 & Constitution Article 22',
    summary:
      'Statutory checklist of citizen rights upon arrest by police officers, codifying the Supreme Court D.K. Basu guidelines into statutory law.',
    steps: [
      'Right to Know Grounds of Arrest: Officer must state exact grounds and whether offence is bailable (Sec 47).',
      'Arrest Memorandum: Must be prepared on the spot with time, date, signed by arrestee and one family/local witness (Sec 36).',
      'Right to Intimate Family: Police must inform one designated relative or friend immediately and record it in the diary (Sec 48).',
      'Right to Consult Advocate: Right to meet an advocate of choice during interrogation (Sec 38).',
      'Mandatory Medical Examination: Must be examined by a registered medical practitioner soon after arrest (Sec 53).',
      '24-Hour Production: Must be produced before the nearest Judicial Magistrate within 24 hours, excluding journey time (Sec 58 & Art 22(2)).',
      'Women Arrest Protection: No woman can be arrested after sunset and before sunrise except in exceptional cases with prior written Magisterial sanction (Sec 43(5)).',
    ],
    officialPortal: 'nalsa.gov.in (National Legal Services Authority)',
    whyUseful:
      'Guarantees constitutional protection against unlawful detention, third-degree abuse, and custodial irregularities.',
    keywords: ['arrest rights', 'police arrest', 'handcuff', '24 hour rule', 'dk basu', 'custody', 'women arrest', 'section 35', 'section 43'],
  },
  {
    id: 'guide-bail-undertrial',
    title: 'Bail, Anticipatory Bail & 1/3rd Undertrial Prisoner Relief',
    type: 'Guide',
    category: 'Bail Law',
    statuteReference: 'BNSS 2023 Sections 481, 484 (replaces CrPC 436A, 438)',
    summary:
      'Step-by-step roadmap for securing regular bail, anticipatory bail against apprehended arrest, and the new undertrial prisoner release formula.',
    steps: [
      'Bailable Offence: Bail is a matter of absolute legal right before the police station or Magistrate upon furnishing surety or personal bond (Sec 478).',
      'Anticipatory Bail: If anticipating arrest for a non-bailable accusation, file before Sessions Court or High Court under Section 484.',
      'Undertrial Release on 1/3rd Sentence: First-time offenders who have served 1/3rd of the maximum punishment must be released on bail (Sec 481).',
      'Jail Superintendent Duty: The Jail Superintendent must formally apply to the Court on behalf of eligible undertrials.',
      'Indigent Person Bail: If an accused is unable to furnish surety within a week, court must deem them indigent and release on personal bond without financial surety (Sec 479).',
    ],
    officialPortal: 'e-Courts Services (ecourts.gov.in)',
    whyUseful:
      'Critical for undertrials, families, and defence advocates seeking expeditious release without extortionate bail bond demands.',
    keywords: ['bail', 'anticipatory bail', 'what is bail', 'undertrial', 'section 481', 'section 484', 'crpc 438', 'crpc 436a', 'bailable'],
  },
  {
    id: 'guide-ipc-to-bns',
    title: 'IPC (1860) to BNS (2023) Master Conversion Guide',
    type: 'Guide',
    category: 'Criminal Law Transition',
    statuteReference: 'BNS 2023 Section 358 & IPC 1860 Repeal',
    summary:
      'Direct cross-reference mapping the most frequently cited Indian Penal Code sections to their corresponding Bharatiya Nyaya Sanhita numbers.',
    steps: [
      'Murder (Old IPC 302) → Succeeded by BNS Section 103 (includes Section 103(2) for mob lynching).',
      'Cheating / 420 (Old IPC 420) → Succeeded by BNS Section 318.',
      'Theft (Old IPC 379) → Succeeded by BNS Section 303 (with community service for first-timers under ₹5,000).',
      'Snatching → New separate offence under BNS Section 304 (up to 3 years imprisonment).',
      'Sedition (Old IPC 124A) → Replaced by BNS Section 152 (Acts Endangering Sovereignty, Unity and Integrity of India).',
      'Rape (Old IPC 375/376) → Succeeded by BNS Section 63 and 64.',
      'False Promise of Marriage → Codified distinctly under BNS Section 69.',
      'Defamation (Old IPC 499/500) → Succeeded by BNS Section 356 with community service option.',
    ],
    officialPortal: 'mha.gov.in / legislative.gov.in',
    whyUseful:
      'Essential for FIR drafting, legal research, bail petitions, and understanding active charges post 1 July 2024.',
    keywords: ['ipc to bns', 'ipc bns conversion', 'section 302', 'section 420', 'section 124a', 'bns matrix', 'old ipc new bns'],
  },
  {
    id: 'guide-crpc-to-bnss',
    title: 'CrPC (1973) to BNSS (2023) Procedural Reforms Guide',
    type: 'Guide',
    category: 'Criminal Procedure Transition',
    statuteReference: 'BNSS 2023 Section 533 & CrPC 1973 Repeal',
    summary:
      'Comprehensive overview of criminal procedural changes effective from 1 July 2024, focusing on forensics, electronic summons, and trial timelines.',
    steps: [
      'Mandatory Forensics: Forensic experts must visit crime scenes for offences punishable with 7+ years (Sec 176(3)).',
      'Audio-Video Recording: All searches and seizures must be videographed on mobile/camera and sent to Magistrate (Sec 105).',
      'Electronic Summons: Encrypted electronic summons via email/messaging carry full legal validity (Sec 63, 64).',
      'Trial in Absentia: Proclaimed absconding fugitives can be tried and convicted in absentia after 90 days (Sec 356).',
      'Fast-Track Judgments: Sessions judgment must be delivered within 30 days of argument completion (Sec 258).',
      'Chargesheet Copies: Free supply of chargesheet and documents to accused and victim within 14 days (Sec 230).',
    ],
    officialPortal: 'egazette.gov.in',
    whyUseful:
      'Enables litigants and advocates to enforce procedural timelines against investigating agencies and trial courts.',
    keywords: ['crpc to bnss', 'bnss reforms', 'forensic videography', 'electronic summons', 'in absentia trial', 'crpc conversion'],
  },
  {
    id: 'guide-consumer-complaint',
    title: 'How to File an Online Consumer Complaint (e-Daakhil)',
    type: 'Guide',
    category: 'Consumer Protection',
    statuteReference: 'Consumer Protection Act, 2019 Section 35',
    summary:
      'Step-by-step process for filing complaints against defective goods, deficiency of service, misleading advertisements, or e-commerce delivery fraud.',
    steps: [
      'Issue a formal written notice or email to the seller/company giving 15 days to refund or rectify.',
      'Gather invoice, payment receipts, warranty card, photos/videos of defect, and communication logs.',
      'Register on the official National Consumer Dispute Redressal Commission portal: edaakhil.nic.in.',
      'Select jurisdictional District Commission based on consumer place of residence or seller location.',
      'File without advocate requirement (parties can appear in person or via video conference).',
      'No court fee for claims up to ₹5 lakh.',
    ],
    officialPortal: 'edaakhil.nic.in / consumerhelpline.gov.in (National Consumer Helpline 1915)',
    whyUseful:
      'Empowers everyday consumers to recover money from fraudulent e-commerce portals, airlines, banks, and manufacturers.',
    keywords: ['consumer complaint', 'edaakhil', 'defective product', 'online shopping fraud', 'consumer forum', 'refund', 'section 35'],
  },
  {
    id: 'guide-cyber-crime',
    title: 'Immediate Action Plan for Cyber Financial Fraud & Helpline 1930',
    type: 'Guide',
    category: 'Cyber Law & Emergency SOP',
    statuteReference: 'Information Technology Act, 2000 & MHA Cyber Crime SOP',
    summary:
      'Golden hour protocol to stop fraudulent bank transfers, freeze stolen money, and lodge an official cybercrime complaint.',
    steps: [
      'Golden Hour Call: Dial 1930 immediately (National Cyber Crime Helpline) within 2 hours of the unauthorized transaction.',
      'Provide transaction UTR/reference number, debit account details, wallet/UPI handle, and recipient bank account.',
      'The helpline initiates automated Citizen Financial Cyber Fraud Reporting (CFCFRMS) to freeze funds in the recipient bank.',
      'File detailed incident report with screenshots and SMS alerts at cybercrime.gov.in.',
      'Obtain acknowledgement token and submit to your bank branch within 24 hours to claim zero-liability under RBI guidelines.',
    ],
    officialPortal: 'cybercrime.gov.in (Helpline: 1930)',
    whyUseful:
      'Time-critical protocol for recovering money stolen through OTP fraud, phishing, lottery scams, or fake investment apps.',
    keywords: ['cyber fraud', '1930 helpline', 'online fraud', 'upi fraud', 'freeze money', 'cybercrime complaint', 'it act'],
  },
  {
    id: 'guide-free-legal-aid',
    title: 'How to Access Free Legal Aid via DLSA & Article 39A',
    type: 'Guide',
    category: 'Constitutional Remedies',
    statuteReference: 'Legal Services Authorities Act, 1987 & Article 39A',
    summary:
      'Guarantees free legal services from court-appointed advocates for citizens who cannot afford private litigation fees.',
    steps: [
      'Eligible Beneficiaries: Women, children, SC/ST members, persons with disabilities, victims of trafficking, undertrials in custody, and individuals with annual income below prescribed state limit (usually ₹3 lakh).',
      'Approach the District Legal Services Authority (DLSA) office located inside every District Court complex.',
      'Submit simple application with identity proof, income certificate or affidavit.',
      'A panel advocate is assigned free of cost for pre-litigation counselling, drafting, and court representation.',
      'Tele-law service available via Common Service Centres (CSCs) or nalsa.gov.in.',
    ],
    officialPortal: 'nalsa.gov.in / tele-law.in',
    whyUseful:
      'Ensures economic disability does not prevent any citizen from securing justice in civil, criminal, or family court proceedings.',
    keywords: ['free legal aid', 'dlsa', 'nalsa', 'article 39a', 'free advocate', 'legal assistance', 'government lawyer'],
  },
  {
    id: 'guide-posh-workplace',
    title: 'Filing Workplace Harassment Complaints under POSH Act',
    type: 'Guide',
    category: 'Women Protection & Labor',
    statuteReference: 'Sexual Harassment of Women at Workplace Act, 2013 & Vishaka Doctrine',
    summary:
      'Procedure for reporting sexual harassment at any organized workplace through the mandatory Internal Complaints Committee (ICC).',
    steps: [
      'Submit written complaint to the Internal Committee (IC) within 3 months of the incident.',
      'Every workplace with 10+ employees is statutorily required to have an IC presided over by a senior woman employee.',
      'For workplaces with fewer than 10 employees or if complaint is against employer, submit to Local Committee (LC) at District Magistrate office.',
      'Complainant may request conciliation or formal inquiry.',
      'Inquiry must be completed within 90 days and report submitted to employer within 10 days.',
      'Strict confidentiality mandated under Section 16; identity of complainant cannot be publicized.',
    ],
    officialPortal: 'shebox.wcd.gov.in (SHe-Box Ministry of WCD)',
    whyUseful:
      'Gives women employees a confidential, statutory grievance redressal mechanism against harassment, intimidation, or retaliation.',
    keywords: ['posh', 'workplace harassment', 'vishaka', 'internal committee', 'icc', 'shebox', 'sexual harassment'],
  },
]
