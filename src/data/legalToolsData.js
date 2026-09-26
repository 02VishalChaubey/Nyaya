// Educational Legal Tools Dataset
// Strictly educational information grounded in Indian statutes and standard administrative procedures.
// This data does NOT constitute legal advice or guarantee procedural validity.

export const documentChecklists = [
  {
    id: 'consumer-dispute',
    title: 'Consumer Complaint & Product/Service Dispute',
    category: 'Consumer Protection',
    description:
      'Information and documentation commonly required when submitting a grievance to the National Consumer Helpline (1915), the seller/company, or the District Consumer Disputes Redressal Commission.',
    officialPortal: 'e-Daakhil (edaakhil.nic.in) / consumerhelpline.gov.in',
    governingStatute: 'Consumer Protection Act, 2019 (Section 35)',
    sections: [
      {
        sectionTitle: 'Primary Transaction Proof',
        items: [
          {
            id: 'cd-invoice',
            name: 'Original Purchase Tax Invoice or Cash Memo',
            detail: 'Must show seller GSTIN, date of purchase, item description, and total amount paid.',
            required: true,
          },
          {
            id: 'cd-payment',
            name: 'Payment Receipt / Bank Account Statement / UPI Transaction UTR',
            detail: 'Shows electronic fund transfer, debit transaction ID, credit card charge, or receipt.',
            required: true,
          },
          {
            id: 'cd-warranty',
            name: 'Warranty Card / Guarantee Terms Document',
            detail: 'Specifies warranty period, coverage terms, authorized service centers, and limitations.',
            required: false,
          },
        ],
      },
      {
        sectionTitle: 'Defect & Service Inadequacy Evidence',
        items: [
          {
            id: 'cd-photos',
            name: 'Photographs / Video Recordings of Damaged or Defective Good',
            detail: 'High-resolution images showing packaging, damage, serial numbers, or operational defect.',
            required: true,
          },
          {
            id: 'cd-job-sheet',
            name: 'Service Center Job Sheet / Inspection Report',
            detail: 'Document issued by technician or authorized repair center detailing diagnosed faults.',
            required: false,
          },
          {
            id: 'cd-delivery',
            name: 'Delivery Challan / Courier Tracking Proof',
            detail: 'Shows date and condition of receipt or delayed delivery timeline.',
            required: false,
          },
        ],
      },
      {
        sectionTitle: 'Prior Communication Records',
        items: [
          {
            id: 'cd-notice',
            name: 'Copy of Written Notice or Email Sent to Seller / Manufacturer',
            detail: 'Email thread or letter demanding repair, replacement, or refund before legal steps.',
            required: true,
          },
          {
            id: 'cd-reply',
            name: 'Seller / Company Reply or Record of Refusal / Non-Response',
            detail: 'Automated ticket numbers, customer support chat transcripts, or formal denial emails.',
            required: true,
          },
          {
            id: 'cd-id-proof',
            name: 'Complainant Identity & Address Proof (Aadhaar / Voter ID / Passport)',
            detail: 'Required for e-Daakhil filing to confirm territorial jurisdiction of residency.',
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 'cyber-fraud',
    title: 'Cyber Financial Fraud & Unauthorized Transaction',
    category: 'Cybercrime & Banking',
    description:
      'Information necessary for immediate reporting to National Cyber Crime Helpline (1930), cybercrime.gov.in, and your home bank branch within the golden-hour window.',
    officialPortal: 'cybercrime.gov.in (National Cyber Crime Reporting Portal)',
    governingStatute: 'Information Technology Act, 2000 & RBI Circular on Customer Liability',
    sections: [
      {
        sectionTitle: 'Financial Transaction Details',
        items: [
          {
            id: 'cf-utr',
            name: 'Transaction UTR Number / Bank Reference Number',
            detail: 'Unique 12-digit transaction number provided by bank SMS or UPI app for each debited amount.',
            required: true,
          },
          {
            id: 'cf-bank-statement',
            name: 'Bank Account Statement Highlighted with Unauthorized Debits',
            detail: 'Official statement from bank branch or net banking showing account balance and debit timestamps.',
            required: true,
          },
          {
            id: 'cf-beneficiary',
            name: 'Beneficiary Account / UPI VPA / Wallet Details (if visible)',
            detail: 'The recipient UPI handle, mobile number, or account details where stolen funds were routed.',
            required: false,
          },
        ],
      },
      {
        sectionTitle: 'Electronic Communication & Scam Evidence',
        items: [
          {
            id: 'cf-sms',
            name: 'Screenshots of SMS Alerts & Phishing Messages',
            detail: 'Keep messages showing fake debit links, lottery messages, impersonation texts, or APK prompts.',
            required: true,
          },
          {
            id: 'cf-call-logs',
            name: 'Call Logs & WhatsApp / Telegram Chat History',
            detail: 'Screenshots showing phone numbers used by fraudsters, conversation timestamps, and fake IDs.',
            required: true,
          },
          {
            id: 'cf-fake-app',
            name: 'Name / URL / APK of Malicious App or Phishing Webpage',
            detail: 'Details of remote-access tools (e.g. AnyDesk, TeamViewer) or bogus investment APKs downloaded.',
            required: false,
          },
        ],
      },
      {
        sectionTitle: 'Official Reporting Receipts',
        items: [
          {
            id: 'cf-token',
            name: 'National Cybercrime Portal (1930) Acknowledgement Token',
            detail: 'The automated reference number generated by dialing 1930 or submitting on cybercrime.gov.in.',
            required: true,
          },
          {
            id: 'cf-bank-intimation',
            name: 'Written Written Notice to Bank Branch within 3 Days',
            detail: 'Written letter with branch stamp claiming zero liability under RBI unauthorized transaction rules.',
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 'tenant-dispute',
    title: 'Tenant-Landlord Dispute & Security Deposit Recovery',
    category: 'Tenancy & Property',
    description:
      'Checklist of documents helpful for documenting lease terms, rent payment consistency, and security deposit refund requests.',
    officialPortal: 'State Rent Authority / District Legal Services Authority (DLSA)',
    governingStatute: 'Transfer of Property Act, 1882 & Model Tenancy Act / State Rent Control Acts',
    sections: [
      {
        sectionTitle: 'Contractual Documents',
        items: [
          {
            id: 'td-lease',
            name: 'Signed Lease / Rent Agreement (Registered or Notarized)',
            detail: 'Must show lease term, monthly rent, deposit amount, notice period, and maintenance clauses.',
            required: true,
          },
          {
            id: 'td-deposit-receipt',
            name: 'Security Deposit Payment Proof / Receipt',
            detail: 'Bank transfer entry, cheque counterfoil, or written acknowledgement of deposit received.',
            required: true,
          },
        ],
      },
      {
        sectionTitle: 'Occupancy & Payment Track Record',
        items: [
          {
            id: 'td-rent-receipts',
            name: 'Monthly Rent Payment Receipts or Bank Statement Records',
            detail: 'Consolidated record demonstrating consistent on-time rent payment during occupancy.',
            required: true,
          },
          {
            id: 'td-utility-bills',
            name: 'Paid Utility Bills (Electricity, Water, Society Maintenance)',
            detail: 'Receipts showing all dues were settled up to date of vacation.',
            required: false,
          },
          {
            id: 'td-condition-photos',
            name: 'Photographs of Flat / Premises at Move-In & Move-Out',
            detail: 'Date-stamped visual proof proving no major damage beyond reasonable wear and tear.',
            required: true,
          },
        ],
      },
      {
        sectionTitle: 'Notices & Communications',
        items: [
          {
            id: 'td-moveout-notice',
            name: 'Copy of Move-Out Notice (WhatsApp / Email / Letter)',
            detail: 'Shows compliance with required 30-day or contractual notice period.',
            required: true,
          },
          {
            id: 'td-handover',
            name: 'Key Handover Acknowledgement or Inspection Sign-Off',
            detail: 'Written confirmation of keys returned and vacant possession delivered.',
            required: false,
          },
          {
            id: 'td-demand-letter',
            name: 'Formal Written Demand for Deposit Refund',
            detail: 'Written communication setting a reasonable deadline (e.g. 15 days) before legal escalation.',
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 'workplace-grievance',
    title: 'Workplace Rights, POSH & Unpaid Wage Grievance',
    category: 'Labor & Workplace',
    description:
      'Essential employment documentation when preparing a workplace complaint for Internal Committee (POSH), Labour Commissioner, or legal counsel.',
    officialPortal: 'shebox.wcd.gov.in (SHe-Box) / State Labour Commissionerate',
    governingStatute: 'POSH Act, 2013 & Industrial Disputes Act, 1947 & Payment of Wages Act',
    sections: [
      {
        sectionTitle: 'Proof of Employment Relationship',
        items: [
          {
            id: 'wg-offer',
            name: 'Employment Offer Letter / Appointment Order / Contract',
            detail: 'Specifies job role, compensation structure, designation, and reporting hierarchy.',
            required: true,
          },
          {
            id: 'wg-salary-slips',
            name: 'Past 3–6 Months Salary Slips & Bank Statements',
            detail: 'Demonstrates salary amount, professional tax, PF deductions, and regular credit pattern.',
            required: true,
          },
          {
            id: 'wg-id-card',
            name: 'Company ID Card / Work Email Access Proof',
            detail: 'Proof of current or recent active employment with respondent organization.',
            required: false,
          },
        ],
      },
      {
        sectionTitle: 'Evidence of Grievance / Non-Payment / Harassment',
        items: [
          {
            id: 'wg-comms',
            name: 'Email Threads / WhatsApp Chats / Slack Messages',
            detail: 'Direct records showing harassment, wrongful directives, unpaid overtime, or arbitrary actions.',
            required: true,
          },
          {
            id: 'wg-timesheets',
            name: 'Attendance Records / Biometric Logs / Project Submissions',
            detail: 'Establishes work performed during the disputed unpaid salary period.',
            required: false,
          },
          {
            id: 'wg-witnesses',
            name: 'Statements or Contact Details of Co-Workers / Witnesses',
            detail: 'Colleagues who witnessed the incident, unfair treatment, or termination conversation.',
            required: false,
          },
        ],
      },
      {
        sectionTitle: 'Internal Escalation Records',
        items: [
          {
            id: 'wg-hr-complaint',
            name: 'Written Complaint to HR / Internal Committee (IC) / Reporting Manager',
            detail: 'Must be filed within statutory timelines (e.g. within 3 months under Section 9 of POSH Act).',
            required: true,
          },
          {
            id: 'wg-hr-response',
            name: 'Company Formal Response / Termination Notice / Failure to Act',
            detail: 'Records showing failure of internal redressal before approaching Labour Court or SHe-Box.',
            required: false,
          },
        ],
      },
    ],
  },
  {
    id: 'police-fir-intake',
    title: 'Police Complaint & FIR Filing Preparation',
    category: 'Criminal Procedure',
    description:
      'Information necessary for submitting a written complaint at a police station or requesting a Zero FIR under BNSS Section 173.',
    officialPortal: 'State Police Online Citizen Portals / CCTNS',
    governingStatute: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (Section 173)',
    sections: [
      {
        sectionTitle: 'Complainant & Informant Details',
        items: [
          {
            id: 'pf-id',
            name: 'Government Photo ID Proof (Aadhaar, Voter ID, PAN, Driving Licence)',
            detail: 'Required for verifying the informant’s identity and contact address.',
            required: true,
          },
          {
            id: 'pf-contact',
            name: 'Active Phone Number and Permanent & Current Address',
            detail: 'Police station needs verified contact details for providing FIR copy and summons.',
            required: true,
          },
        ],
      },
      {
        sectionTitle: 'Factual Event Particulars',
        items: [
          {
            id: 'pf-chronology',
            name: 'Chronological Written Account of Incident (Date, Time, Location)',
            detail: 'Clear, factual narrative answering: What occurred? When? Where exactly? In what order?',
            required: true,
          },
          {
            id: 'pf-accused',
            name: 'Names & Descriptions of Accused Persons (Known or Unknown)',
            detail: 'Names, physical descriptions, vehicle registration numbers, or phone numbers if available.',
            required: true,
          },
          {
            id: 'pf-witnesses',
            name: 'Names & Phone Numbers of Eyewitnesses',
            detail: 'Persons present at scene who can corroborate the incident to the investigating officer.',
            required: false,
          },
        ],
      },
      {
        sectionTitle: 'Supporting Physical / Medical Proof',
        items: [
          {
            id: 'pf-medical',
            name: 'Medical Examination Memo / MLC (Medico-Legal Certificate) if Injured',
            detail: 'Emergency medical report from government or private hospital detailing physical trauma.',
            required: false,
          },
          {
            id: 'pf-property-proof',
            name: 'Ownership Proof of Stolen Property / Vehicle / Stolen Device (IMEI)',
            detail: 'Bill of purchase, device box with IMEI, or RC book for stolen vehicle.',
            required: false,
          },
          {
            id: 'pf-cctv',
            name: 'CCTV Footage / Audio-Video Evidence / Phone Recording',
            detail: 'Preserve original files without editing to ensure admissibility under Section 61 of BSA 2023.',
            required: false,
          },
        ],
      },
    ],
  },
]

export const topicNavigatorSituations = [
  {
    id: 'sit-arrest-police',
    title: 'Police stopped, detained, or arrested me or someone I know',
    category: 'Criminal Procedure & Personal Liberty',
    icon: 'Shield',
    scenarioDescription:
      'Situations involving police encounters, station summons, formal arrest, detention beyond 24 hours, or refusal to grant bail for bailable matters.',
    natureOfLaw: 'Criminal Procedural Law & Constitutional Fundamental Rights',
    keyStatutes: [
      {
        name: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
        sections: 'Sections 35, 36, 47, 48, 58, 481, 484',
        url: '/bnss',
        role: 'Codifies statutory arrest checklists, mandatory memo, and 24-hour production before Magistrate.',
      },
      {
        name: 'Constitution of India',
        sections: 'Article 22(1) & Article 22(2)',
        url: '/fundamental-rights#article-22',
        role: 'Guarantees fundamental right to know grounds of arrest, consult advocate, and 24-hour judicial production.',
      },
      {
        name: 'Bharatiya Nyaya Sanhita, 2023 (BNS)',
        sections: 'Sections on offences and bailable categorization',
        url: '/bns',
        role: 'Substantive penal code defining offences and corresponding punishment limits.',
      },
    ],
    relevantGuides: [
      {
        title: 'Citizen Arrest Safeguards, 24-Hour Rule & D.K. Basu Guidelines',
        summary: 'Statutory rights upon arrest: right to silence, right to inform family, mandatory medical exam, and memo.',
        url: '/search?q=arrest+rights',
      },
      {
        title: 'Bail, Anticipatory Bail & 1/3rd Undertrial Relief',
        summary: 'Roadmap for regular bail, anticipatory bail, and relief for indigent accused.',
        url: '/search?q=bail',
      },
      {
        title: 'Zero FIR Filing under BNSS Section 173',
        summary: 'Filing complaints without police refusal on territorial jurisdiction grounds.',
        url: '/search?q=zero+fir',
      },
    ],
    relevantTerms: [
      { term: 'Bailable Offence', id: 'bailable-offence' },
      { term: 'Cognizable Offence', id: 'cognizable-offence' },
      { term: 'Anticipatory Bail', id: 'anticipatory-bail' },
      { term: 'Habeas Corpus', id: 'habeas-corpus' },
      { term: 'Remand', id: 'remand' },
    ],
    immediatePracticalSteps: [
      'Demand to know the specific grounds of arrest and whether the offence is bailable under Section 47 BNSS.',
      'Ensure the police officer prepares an Arrest Memorandum on the spot with date and counter-signature of a family or local witness.',
      'Exercise the right to inform one designated relative or friend immediately under Section 48 BNSS.',
      'Do not sign blank papers; insist on legal representation before custodial questioning.',
      'Insist on production before the nearest Judicial Magistrate within 24 hours under Article 22(2).',
    ],
  },
  {
    id: 'sit-consumer-fraud',
    title: 'Defective product, fraudulent merchant, or service refusal',
    category: 'Consumer Rights & Commerce',
    icon: 'ShoppingBag',
    scenarioDescription:
      'Situations involving defective electronics, misleading advertisements, expired goods, refusal of refund, airline ticket denial, or unfair contract terms.',
    natureOfLaw: 'Civil Consumer Redressal & Statutory Commercial Law',
    keyStatutes: [
      {
        name: 'Consumer Protection Act, 2019',
        sections: 'Sections 2(11) [Deficiency], 2(47) [Unfair Practice], Section 35 [Complaint]',
        url: '/laws/consumer-protection-2019',
        role: 'Provides 3-tier quasi-judicial redressal mechanism (District, State, National Commissions) without mandatory advocate requirement.',
      },
      {
        name: 'Indian Contract Act, 1872',
        sections: 'Sections 73 & 74 [Breach of Contract & Liquidated Damages]',
        url: '/laws/indian-contract-1872',
        role: 'Governs binding agreements, failure of consideration, and compensation for natural breach of contract.',
      },
    ],
    relevantGuides: [
      {
        title: 'How to File an Online Consumer Complaint (e-Daakhil)',
        summary: 'Filing without lawyer fees before District Commission via official portal.',
        url: '/know-your-rights?category=consumer-rights',
      },
    ],
    relevantTerms: [
      { term: 'Deficiency in Service', id: 'deficiency-in-service' },
      { term: 'Unfair Trade Practice', id: 'unfair-trade-practice' },
      { term: 'Breach of Contract', id: 'breach-of-contract' },
      { term: 'Caveat Emptor', id: 'caveat-emptor' },
    ],
    immediatePracticalSteps: [
      'Preserve tax invoice, payment receipts, order confirmation, and photos/videos of defect.',
      'Issue a formal written notice or email to the seller giving 15 days to repair, replace, or refund.',
      'Call National Consumer Helpline (NCH) toll-free at 1915 or register grievance on consumerhelpline.gov.in.',
      'If unresolved, file online complaint on e-Daakhil (edaakhil.nic.in) before the jurisdictional District Commission.',
    ],
  },
  {
    id: 'sit-cyber-fraud',
    title: 'Unauthorized bank debit, online investment scam, or UPI fraud',
    category: 'Cybercrime & Electronic Evidence',
    icon: 'Wifi',
    scenarioDescription:
      'Loss of funds via OTP phishing, fake customer care numbers, fraudulent investment apps, impersonation calls, or unauthorized card charges.',
    natureOfLaw: 'Special Cyber Statutes, Penal Law & Banking Regulatory Guidelines',
    keyStatutes: [
      {
        name: 'Information Technology Act, 2000',
        sections: 'Section 43 [Penalty for Damage], Section 66D [Cheating by Impersonation]',
        url: '/laws/it-act-2000',
        role: 'Defines electronic fraud, identity theft, and liability for unauthorized system penetration.',
      },
      {
        name: 'Bharatiya Nyaya Sanhita, 2023 (BNS)',
        sections: 'Section 318 [Cheating], Section 319 [Cheating by Personation]',
        url: '/bns',
        role: 'Criminal penal charges for deceitful inducement and fraudulent misappropriation of property.',
      },
    ],
    relevantGuides: [
      {
        title: 'Immediate Action Plan for Cyber Financial Fraud (Helpline 1930)',
        summary: 'Golden hour protocol for freezing fraudulent transfers in recipient bank accounts.',
        url: '/search?q=cyber+fraud',
      },
    ],
    relevantTerms: [
      { term: 'Cheating', id: 'cheating' },
      { term: 'Cyber Offence', id: 'cyber-offence' },
      { term: 'Electronic Evidence', id: 'electronic-evidence' },
    ],
    immediatePracticalSteps: [
      'Golden Hour: Dial National Cybercrime Helpline 1930 immediately within 2 hours of the fraudulent debit.',
      'Provide transaction UTR number, bank account details, and recipient UPI/account info.',
      'File detailed incident report with screenshots at cybercrime.gov.in and save the acknowledgement token.',
      'Submit written intimation letter with branch stamp to your home bank within 3 working days to claim RBI zero-liability.',
    ],
  },
  {
    id: 'sit-workplace-posh',
    title: 'Workplace harassment, unpaid salary, or sudden unlawful termination',
    category: 'Labor Law & Workplace Protections',
    icon: 'Briefcase',
    scenarioDescription:
      'Sexual harassment at work, refusal of maternity leave, non-payment of agreed salary, illegal termination without notice, or lack of internal committee.',
    natureOfLaw: 'Labor Protective Welfare Statutes & Gender Equity Constitutional Laws',
    keyStatutes: [
      {
        name: 'Sexual Harassment of Women at Workplace (POSH) Act, 2013',
        sections: 'Section 4 [Internal Committee], Section 9 [Complaint Procedure]',
        url: '/know-your-rights?category=workplace-rights',
        role: 'Mandates confidential Internal Committee in all organizations with 10+ employees to inquire into grievances.',
      },
      {
        name: 'Industrial Disputes Act, 1947',
        sections: 'Section 25F [Conditions Precedent to Retrenchment]',
        url: '/laws/industrial-disputes-1947',
        role: 'Protects workmen from sudden termination without 1-month notice and retrenchment compensation.',
      },
      {
        name: 'Constitution of India',
        sections: 'Article 14 [Equality], Article 19(1)(g) [Occupation], Article 39A [Free Legal Aid]',
        url: '/fundamental-rights',
        role: 'Constitutional basis for equal treatment, dignity of labor, and institutional grievance redressal.',
      },
    ],
    relevantGuides: [
      {
        title: 'Filing Workplace Harassment Complaints under POSH Act',
        summary: 'Procedural steps, time limit (3 months), and SHe-Box portal filing.',
        url: '/search?q=posh',
      },
      {
        title: 'How to Access Free Legal Aid via DLSA & Article 39A',
        summary: 'Court-appointed advocates for workers earning under prescribed state limits.',
        url: '/search?q=free+legal+aid',
      },
    ],
    relevantTerms: [
      { term: 'Retrenchment', id: 'retrenchment' },
      { term: 'Natural Justice', id: 'natural-justice' },
      { term: 'Legal Aid', id: 'legal-aid' },
    ],
    immediatePracticalSteps: [
      'Preserve all employment records: appointment contract, salary slips, performance emails, and written directives.',
      'If harassment occurs, submit written complaint to Internal Committee (IC) within 3 months under Section 9 POSH.',
      'If organization lacks IC or has fewer than 10 staff, lodge complaint with Local Committee at District Magistrate office or SHe-Box (shebox.wcd.gov.in).',
      'For unpaid wages, issue formal demand notice giving 15 days before escalating to Regional Labour Commissioner.',
    ],
  },
  {
    id: 'sit-tenancy-landlord',
    title: 'Landlord withholding security deposit, illegal lock-out, or eviction',
    category: 'Tenancy & Housing Rights',
    icon: 'Home',
    scenarioDescription:
      'Landlord refuses to return security deposit after moving out, disconnects water/electricity, locks premises without court decree, or hikes rent arbitrarily.',
    natureOfLaw: 'Civil Property Law & State Tenancy Regulations',
    keyStatutes: [
      {
        name: 'Transfer of Property Act, 1882',
        sections: 'Section 106 [Notice to Quit], Section 108 [Rights & Liabilities of Lessor & Lessee]',
        url: '/laws/transfer-of-property-1882',
        role: 'Establishes statutory notice requirements and prohibits extra-judicial dispossession without due process.',
      },
      {
        name: 'Indian Contract Act, 1872',
        sections: 'Sections on reciprocal promises and return of security deposits',
        url: '/laws/indian-contract-1872',
        role: 'Governs recovery of deposit held in trust when tenancy covenants have been fulfilled.',
      },
    ],
    relevantGuides: [
      {
        title: 'Tenant-Landlord Dispute & Security Deposit Checklist',
        summary: 'Essential documents for proving vacation of premises in sound condition.',
        url: '/tools?tool=checklist&topic=tenant-dispute',
      },
    ],
    relevantTerms: [
      { term: 'Lease Agreement', id: 'lease-agreement' },
      { term: 'Mesne Profits', id: 'mesne-profits' },
      { term: 'Specific Performance', id: 'specific-performance' },
    ],
    immediatePracticalSteps: [
      'Review your written rent agreement for move-out notice period and deposit refund clauses.',
      'Take dated photographs and video walkthrough of the premises when handing over keys.',
      'Obtain written key handover acknowledgement or send email confirming possession returned.',
      'Send formal written demand for security deposit refund within 15 days before initiating mediation or legal notice.',
      'Remember: A landlord cannot physically lock out a tenant or disconnect essential services without formal judicial orders.',
    ],
  },
  {
    id: 'sit-constitutional-rights',
    title: 'Public authority or state official violated my fundamental rights',
    category: 'Constitutional Law & Citizen Safeguards',
    icon: 'Landmark',
    scenarioDescription:
      'Unlawful censorship, discriminatory exclusion by government authority, custodial mistreatment, infringement of privacy, or denial of basic government services.',
    natureOfLaw: 'Constitutional Law & Public Law Writs',
    keyStatutes: [
      {
        name: 'Constitution of India (Part III)',
        sections: 'Articles 14, 19, 21, 21A, 22, 32',
        url: '/fundamental-rights',
        role: 'Supreme charter guaranteeing fundamental rights enforceable directly against State authorities.',
      },
      {
        name: 'Constitution of India (Part V & VI)',
        sections: 'Article 32 (Supreme Court) & Article 226 (High Court)',
        url: '/fundamental-rights#article-32',
        role: 'Empowers citizens to petition Constitutional Courts for Prerogative Writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto).',
      },
    ],
    relevantGuides: [
      {
        title: 'Constitutional Writs & Citizen Redress Pathways',
        summary: 'How Article 32 and 226 operate to nullify arbitrary state orders.',
        url: '/fundamental-rights',
      },
      {
        title: 'Free Legal Representation via DLSA & Article 39A',
        summary: 'Accessing court-appointed legal aid if unable to afford constitutional advocates.',
        url: '/search?q=legal+aid',
      },
    ],
    relevantTerms: [
      { term: 'Writ', id: 'writ' },
      { term: 'Habeas Corpus', id: 'habeas-corpus' },
      { term: 'Mandamus', id: 'mandamus' },
      { term: 'Judicial Review', id: 'judicial-review' },
      { term: 'Article 141 Precedent', id: 'article-141' },
    ],
    immediatePracticalSteps: [
      'Document all official orders, rejection notices, or arbitrary directives in writing.',
      'File an RTI (Right to Information) application if reason for rejection or administrative records are concealed.',
      'Consult the District Legal Services Authority (DLSA) in your district court complex for free legal consultation if eligible.',
      'Where fundamental rights are infringed by state authorities, an advocate can file a Writ Petition under Article 226 before the jurisdictional High Court.',
    ],
  },
]
