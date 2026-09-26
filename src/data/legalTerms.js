// Professional Codified Legal Glossary for Nyaya Legal Awareness System
// Formatted in editorial reference-book style with verified statutory sources,
// plain-language definitions, legal frameworks, real-world examples, and cross-references.

export const legalTerms = [
  {
    id: 'bail',
    term: 'Bail',
    fullForm: 'Judicial release on recognizance or surety',
    category: 'Criminal Procedure',
    plainLanguage:
      'Temporary release of an accused person from custody while their case is pending, usually subject to conditions and a financial or personal guarantee to return to court.',
    legalMeaning:
      'Governed by Chapter XXXV (Sections 478–498) of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS). For bailable offences (Section 478), bail is an absolute statutory right upon furnishing surety. For non-bailable offences (Section 480), bail is discretionary, evaluated on the gravity of the offence, risk of flight, and likelihood of tampering with witnesses. Under Section 481 (undertrial prisoner relief), first-time offenders who have undergone one-third (1/3rd) of their maximum sentence must be released on bail.',
    example:
      'After being arrested in connection with a business dispute, Priya applies for bail before the Magistrate. The court grants bail on condition that she deposits a ₹25,000 personal bond, surrenders her passport, and attends all upcoming hearing dates.',
    relevantLaw: 'Sections 478, 480, and 481, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) (formerly Sections 436, 437, 436A of CrPC)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['arrest', 'remand', 'bail-bond', 'anticipatory-bail', 'bailable-offence'],
    source: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (Act No. 46 of 2023); Supreme Court in Satender Kumar Antil v. CBI (2022)',
  },
  {
    id: 'anticipatory-bail',
    term: 'Anticipatory Bail',
    fullForm: 'Pre-arrest judicial direction under Section 484 BNSS',
    category: 'Criminal Procedure',
    plainLanguage:
      'A pre-arrest bail granted by a Sessions Court or High Court protecting a person from being jailed if they have reasonable grounds to believe someone is about to get them falsely arrested for a non-bailable offence.',
    legalMeaning:
      'Codified under Section 484 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Section 438 of CrPC). Jurisdiction is exclusively vested in the High Court or Court of Session. If police subsequently arrest the individual, they must release them immediately upon furnishing the prescribed bail bond. Anticipatory bail cannot be granted for allegations of aggravated gang rape of minors under Section 66 or 70 of the BNS 2023.',
    example:
      'Rohan discovers an aggrieved business rival has threatened to register a fabricated cheating complaint against him. Before the police summon or arrest him, Rohan files an anticipatory bail application before the Sessions Judge to ensure he is protected from arbitrary detention.',
    relevantLaw: 'Section 484, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS); Sections 66 & 70, Bharatiya Nyaya Sanhita, 2023 (BNS)',
    relatedLaws: ['bnss-2023', 'bns-2023'],
    relatedTerms: ['bail', 'arrest', 'bail-bond', 'non-bailable-offence', 'fir'],
    source: 'Section 484, BNSS 2023; Supreme Court Constitution Bench in Sushila Aggarwal v. State (NCT of Delhi) (2020)',
  },
  {
    id: 'bail-bond',
    term: 'Bail Bond & Surety',
    fullForm: 'Recognizance and financial undertaking for court appearance',
    category: 'Criminal Procedure',
    plainLanguage:
      'A formal written pledge signed by the accused (and often backed by a guarantor called a surety) promising an agreed sum of money to the court to guarantee that the accused will appear at every hearing.',
    legalMeaning:
      'Regulated by Sections 486–496 of BNSS 2023 (formerly Sections 441–446 CrPC). A bond may be executed as a personal bond (solely signed by the accused) or accompanied by one or more solvent sureties who furnish proof of residence and assets. If the accused fails to appear without lawful excuse, the bond is forfeited and the court can recover the penalty as a fine. Under Section 481 BNSS, indigent first-time undertrials unable to furnish financial sureties are entitled to release on personal bond without monetary deposit.',
    example:
      'When granting bail, the Magistrate fixes a bond of ₹20,000 with one local surety. Sunita’s brother presents his identity card, proof of local residence, and executes the surety bond, undertaking to pay ₹20,000 if Sunita fails to appear for trial.',
    relevantLaw: 'Sections 486–496, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['bail', 'anticipatory-bail', 'remand', 'summons', 'warrant'],
    source: 'BNSS 2023, Sections 486–496; Law Commission of India 268th Report on Bail Reforms',
  },
  {
    id: 'arrest',
    term: 'Arrest',
    fullForm: 'Deprivation of personal liberty by lawful authority',
    category: 'Criminal Procedure',
    plainLanguage:
      'The physical taking of a person into custody by a police officer or magistrate to answer an accusation of a crime.',
    legalMeaning:
      'Codified under Chapter V (Sections 35–58) of the Bharatiya Nagarik Suraksha Sanhita, 2023. For offences punishable by 3 years or less, Section 35(1) BNSS requires prior written sanction of an officer not below Deputy Superintendent of Police (DSP) before arresting elderly persons (aged 60+) or infirm persons. Section 36 mandates designated police officers in every district and station to maintain physical and digital arrest notice boards. Under Article 22(2) of the Constitution and Section 57 BNSS, every arrested person must be produced before the nearest judicial magistrate within 24 hours.',
    example:
      'Police apprehend a burglary suspect at the scene. They prepare a formal arrest memo containing the time and date, notify his family immediately, conduct a medical examination, and produce him before the Magistrate within 24 hours.',
    relevantLaw: 'Sections 35–58, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS); Article 22, Constitution of India',
    relatedLaws: ['bnss-2023', 'constitution-of-india'],
    relatedTerms: ['remand', 'bail', 'fir', 'cognizable-offence', 'habeas-corpus'],
    source: 'BNSS 2023, Sections 35–58; Supreme Court in D.K. Basu v. State of West Bengal (1997) & Arnesh Kumar v. State of Bihar (2014)',
  },
  {
    id: 'remand',
    term: 'Remand (Custody)',
    fullForm: 'Judicial order authorizing continued detention',
    category: 'Criminal Procedure',
    plainLanguage:
      'An order by a judicial magistrate sending an arrested person into continued detention—either with the police for interrogation or to judicial prison—when an investigation cannot be completed in 24 hours.',
    legalMeaning:
      'Regulated by Section 187 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Section 167 CrPC). When investigation cannot be finished within 24 hours, the magistrate may authorize detention up to 15 days in the whole or in parts across the first 40 or 60 days of the total 60- or 90-day investigation window. Detention beyond 15 days must strictly be in Judicial Custody (jail), not police custody. If the police fail to file a chargesheet within 60 or 90 days, the accused obtains an absolute statutory right to default bail under Section 187(3).',
    example:
      'After arresting a suspect in a cyber fraud ring, police request 4 days of Police Custody Remand to recover digital storage drives. The Magistrate reviews the case diary, grants 3 days of police remand, and mandates medical checkups every 24 hours.',
    relevantLaw: 'Section 187, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['arrest', 'bail', 'charge-sheet', 'cognizable-offence'],
    source: 'Section 187, BNSS 2023; Supreme Court in CBI v. Anupam J. Kulkarni (1992) & V. Senthil Balaji v. State (2023)',
  },
  {
    id: 'fir',
    term: 'FIR',
    fullForm: 'First Information Report',
    category: 'Criminal Procedure',
    plainLanguage:
      'The official written document prepared by police when they receive initial information about a serious (cognizable) crime, which officially sets a criminal investigation into motion.',
    legalMeaning:
      'Mandated under Section 173 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Section 154 CrPC). Police are legally bound to register an FIR whenever information discloses a cognizable offence (Lalita Kumari doctrine). Under BNSS Section 173(1), information can be given orally, in writing, or electronically (e-FIR), provided electronic info is signed within 3 days. A free copy of the FIR must be provided immediately to the informant or victim.',
    example:
      'After his motorcycle is stolen outside an office building, Kabir visits the local police station. The duty officer records his statement, generates an FIR number, gives him an official stamped copy free of charge, and marks it to an investigating officer.',
    relevantLaw: 'Section 173, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['zero-fir', 'cognizable-offence', 'criminal-complaint', 'charge-sheet'],
    source: 'Section 173, BNSS 2023; Supreme Court Constitution Bench in Lalita Kumari v. Govt of UP (2014)',
  },
  {
    id: 'zero-fir',
    term: 'Zero FIR',
    fullForm: 'Jurisdiction-free First Information Report',
    category: 'Criminal Procedure',
    plainLanguage:
      'An FIR that can be registered at any police station across India, regardless of where the crime took place, ensuring police take immediate action without rejecting victims over territorial jurisdiction.',
    legalMeaning:
      'Codified statutorily into Indian procedural law under Section 173(1) of the Bharatiya Nagarik Suraksha Sanhita, 2023. Previously governed only by Ministry of Home Affairs executive advisories, Section 173 BNSS makes it an enforceable legal duty for any police station to register a Zero FIR without assigning a station serial number, initiate urgent medical care or crime scene preservation, and transfer the case to the jurisdictional police station within 15 days.',
    example:
      'Meera is assaulted during an interstate bus journey in a remote highway district. Upon arriving in Delhi, she enters the nearest police station. Officers cannot turn her away; they register a Zero FIR, arrange medical examination, and transmit the case records to the highway district police.',
    relevantLaw: 'Section 173, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023', 'bns-2023'],
    relatedTerms: ['fir', 'cognizable-offence', 'arrest', 'bns'],
    source: 'Section 173, BNSS 2023; Ministry of Home Affairs Advisory No. 15011/35/2013-SC/ST-W',
  },
  {
    id: 'cognizable-offence',
    term: 'Cognizable Offence',
    fullForm: 'Offence where police can arrest without warrant',
    category: 'Criminal Procedure',
    plainLanguage:
      'A serious crime (like murder, theft, or assault) where police have the legal authority to arrest the suspect without a warrant from a magistrate and start an immediate investigation.',
    legalMeaning:
      'Defined under Section 2(1)(g) of the Bharatiya Nagarik Suraksha Sanhita, 2023. For cognizable offences, the police officer may, in accordance with the First Schedule of BNSS or under any other law in force, arrest without warrant. Police are legally bound under Section 173 to register an FIR and cannot demand prior court permission before commencing an investigation.',
    example:
      'A shopkeeper catches a burglar breaking a storefront window with a crowbar. Arriving police officers can arrest the suspect on the spot and initiate an investigation without seeking a prior judicial warrant.',
    relevantLaw: 'Section 2(1)(g) & Section 173, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['non-cognizable-offence', 'fir', 'arrest', 'warrant', 'bns'],
    source: 'First Schedule & Section 2(1)(g), BNSS 2023',
  },
  {
    id: 'non-cognizable-offence',
    term: 'Non-Cognizable Offence',
    fullForm: 'Offence requiring warrant and court sanction',
    category: 'Criminal Procedure',
    plainLanguage:
      'A less serious offence (such as minor insult or simple trespass) where police cannot arrest someone without a warrant from a judge, nor can they investigate without magistrate approval.',
    legalMeaning:
      'Defined under Section 2(1)(o) of the Bharatiya Nagarik Suraksha Sanhita, 2023. Police have no authority to arrest without a warrant. Under Section 174 BNSS (formerly Section 155 CrPC), the police officer must enter the information into the station Non-Cognizable Register (NCR) and refer the informant to the Magistrate. Police cannot investigate a non-cognizable case without an express order of a Magistrate having jurisdiction.',
    example:
      'Two neighbors get into a heated verbal argument involving mild verbal insult without physical harm. The police record an NCR entry and inform the complainant that under law, they cannot arrest the neighbor or investigate without a magistrate’s order.',
    relevantLaw: 'Section 2(1)(o) & Section 174, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['cognizable-offence', 'warrant', 'criminal-complaint', 'summons'],
    source: 'Section 2(1)(o) & Section 174, BNSS 2023',
  },
  {
    id: 'bailable-offence',
    term: 'Bailable Offence',
    fullForm: 'Offence with mandatory right to bail',
    category: 'Criminal Procedure',
    plainLanguage:
      'An offence where getting bail is an absolute legal right; police or the magistrate must release the accused as soon as they provide the required surety or bond.',
    legalMeaning:
      'Defined in Section 2(1)(a) of BNSS 2023 as an offence shown as bailable in the First Schedule, or made bailable by any other law. Under Section 478 BNSS, when any person accused of a bailable offence is arrested without warrant and is prepared to give bail, the police officer or court has no discretion to refuse; release on bail is mandatory.',
    example:
      'An individual is accused of causing simple hurt during a scuffle (a bailable offence). Upon being brought to the police station, his lawyer tenders the bail bond; the officer is legally obligated to release him immediately without sending him to jail.',
    relevantLaw: 'Section 2(1)(a) & Section 478, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['non-bailable-offence', 'bail', 'bail-bond', 'arrest'],
    source: 'First Schedule & Section 478, BNSS 2023; Supreme Court in Rasiklal v. Kishore Khanchand Wadhwani (2009)',
  },
  {
    id: 'non-bailable-offence',
    term: 'Non-Bailable Offence',
    fullForm: 'Offence where bail is at judicial discretion',
    category: 'Criminal Procedure',
    plainLanguage:
      'A crime where bail is not automatic; only a judge has the discretion to decide whether to release the accused based on the facts and seriousness of the case.',
    legalMeaning:
      'Defined in Section 2(1)(a) of BNSS 2023 as any offence other than a bailable offence. In non-bailable cases, bail is not a matter of right. Under Section 480 BNSS, a court or magistrate evaluates whether there are reasonable grounds for believing the accused is guilty of an offence punishable with death or life imprisonment, alongside risk of tampering with witnesses or fleeing justice.',
    example:
      'A person is arrested on charges of armed robbery. Because armed robbery is non-bailable, the police cannot grant station bail. The accused must appear before the Sessions Judge, who examines the case facts before deciding whether to grant bail.',
    relevantLaw: 'Section 2(1)(a) & Section 480, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['bailable-offence', 'bail', 'anticipatory-bail', 'remand'],
    source: 'Section 480, BNSS 2023; Supreme Court in P. Chidambaram v. Directorate of Enforcement (2019)',
  },
  {
    id: 'charge-sheet',
    term: 'Charge-Sheet (Police Report)',
    fullForm: 'Final investigation report under Section 193 BNSS',
    category: 'Criminal Procedure',
    plainLanguage:
      'The final investigative report submitted by the police to the magistrate detailing the evidence, witness statements, and charges against the accused.',
    legalMeaning:
      'Governed by Section 193 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Section 173(2) CrPC). Upon completion of an investigation, the officer in charge of the police station must forward a report to the Magistrate stating the names of parties, nature of information, offences that appear committed, and whether the accused is in custody or released on bond. If investigation finds no evidence, a "closure report" or "final report" is submitted instead. Under BNSS Section 193(3), police must inform the informant or victim of the progress of investigation within 90 days.',
    example:
      'Following an investigation into a bank ATM skimming incident, the police finish analyzing CCTV footage, forensic phone logs, and witness statements, and submit a 120-page charge-sheet before the Chief Judicial Magistrate naming three suspects.',
    relevantLaw: 'Section 193, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['fir', 'remand', 'cognizable-offence', 'plea-bargaining'],
    source: 'Section 193, BNSS 2023; Supreme Court in K. Veeraswami v. Union of India (1991)',
  },
  {
    id: 'summons',
    term: 'Summons',
    fullForm: 'Authoritative judicial call to appear before court',
    category: 'General & Judicial Process',
    plainLanguage:
      'An official written document from a court commanding a person to appear before the judge on a specified date and time.',
    legalMeaning:
      'Governed by Chapter VI, Part A (Sections 63–71) of BNSS 2023 for criminal cases and Order V of the Code of Civil Procedure, 1908 (CPC) for civil disputes. In criminal law, a summons must be in writing, in duplicate, signed by the presiding officer or designated court officer. Under Section 64 BNSS, summons may be served electronically by email, messaging applications, or court portals, which carries full legal validity. If a summoned witness fails to appear, the court may issue a bailable or non-bailable warrant.',
    example:
      'Amit receives a formal court summons delivered by the process server requiring him to appear on the 14th of next month as a prosecution witness in an accident case he witnessed.',
    relevantLaw: 'Sections 63–71, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS); Order V, Code of Civil Procedure, 1908',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['warrant', 'sub-judice', 'adjournment', 'remand'],
    source: 'BNSS 2023, Sections 63–71; CPC 1908, Order V',
  },
  {
    id: 'warrant',
    term: 'Warrant',
    fullForm: 'Judicial order authorizing arrest, search, or seizure',
    category: 'Criminal Procedure',
    plainLanguage:
      'A formal written order issued by a judge commanding the police to arrest someone, search a property, or seize evidence.',
    legalMeaning:
      'Governed by Chapter VI, Part B (Sections 72–83) of BNSS 2023. A warrant of arrest remains in force until executed or cancelled by the court that issued it. Warrants can be Bailable Warrants (directing the executing officer that if the person furnishes specified sureties, they shall be released) or Non-Bailable Warrants (NBW), commanding immediate physical arrest and production before the court. Search warrants (Section 96 BNSS) authorize police to search specified premises for documents or stolen articles.',
    example:
      'A defendant in a cheque bounce case skips three consecutive court hearings without excuse. The magistrate cancels his bail and issues a Non-Bailable Warrant directing the police to produce him under custody.',
    relevantLaw: 'Sections 72–83 & Section 96, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['summons', 'arrest', 'bail', 'remand'],
    source: 'BNSS 2023, Sections 72–83; Supreme Court in Inder Mohan Goswami v. State of Uttaranchal (2007)',
  },
  {
    id: 'habeas-corpus',
    term: 'Habeas Corpus',
    fullForm: 'Latin: "You shall have the body" — Prerogative Writ of Liberty',
    category: 'Constitutional Law',
    plainLanguage:
      'A constitutional emergency petition filed in the Supreme Court or High Court demanding that an illegally detained or missing person be immediately produced in court and set free.',
    legalMeaning:
      'Guaranteed as a Fundamental Right under Article 32 (Supreme Court) and Article 226 (High Courts) of the Constitution of India. It can be issued against both state authorities (police, jailers, government officials) and private individuals (e.g. in illegal confinement of an adult child or spouse). The court issues an urgent show-cause order demanding the state prove the legal authority under which the person is detained; if custody is unlawful or procedurally defective, release is ordered instantly.',
    example:
      'After an activist is whisked away by plainclothes personnel without an arrest memo and kept in an undisclosed location for over 30 hours, his family’s lawyer files an urgent Habeas Corpus petition before the High Court. The High Court orders the police chief to produce the detainee by 2:00 PM that afternoon.',
    relevantLaw: 'Article 32 & Article 226, Constitution of India; Section 57, BNSS 2023',
    relatedLaws: ['constitution-of-india', 'bnss-2023'],
    relatedTerms: ['mandamus', 'certiorari', 'quo-warranto', 'arrest', 'remand'],
    source: 'Constitution of India, Articles 32 & 226; Supreme Court in Sunil Batra v. Delhi Administration (1980)',
  },
  {
    id: 'mandamus',
    term: 'Mandamus',
    fullForm: 'Latin: "We Command" — Prerogative Writ of Public Duty',
    category: 'Constitutional Law',
    plainLanguage:
      'A court order commanding a government body or public official to carry out a mandatory legal duty that they have refused or failed to perform.',
    legalMeaning:
      'Issued under Articles 32 and 226 of the Constitution of India. Mandamus lies against public officials, statutory corporations, municipal bodies, universities, and lower tribunals where the petitioner has a legal right to performance of a public duty and has made a prior demand that was unjustly refused. It cannot be issued against a private individual, or to compel the exercise of purely discretionary powers in a specific manner.',
    example:
      'A municipal corporation refuses to issue a death certificate to a widow despite receiving all verified hospital records and statutory fees. The widow approaches the High Court, which issues a Writ of Mandamus ordering the Municipal Health Officer to issue the certificate within 7 working days.',
    relevantLaw: 'Article 32 & Article 226, Constitution of India',
    relatedLaws: ['constitution-of-india'],
    relatedTerms: ['habeas-corpus', 'certiorari', 'quo-warranto', 'prohibition-writ'],
    source: 'Constitution of India, Articles 32 & 226; Supreme Court in Comptroller and Auditor General v. K.S. Jagannathan (1987)',
  },
  {
    id: 'certiorari',
    term: 'Certiorari',
    fullForm: 'Latin: "To be informed" — Supervisory Writ to Quash Illegal Orders',
    category: 'Constitutional Law',
    plainLanguage:
      'A writ by which a higher court reviews and cancels an unlawful decision or verdict passed by a lower court, tribunal, or government authority.',
    legalMeaning:
      'Issued by the Supreme Court (Art. 32) or High Courts (Art. 226) to correct judicial or quasi-judicial errors. Certiorari lies when an inferior court or tribunal acts without jurisdiction, in excess of statutory jurisdiction, or in gross violation of principles of natural justice (audi alteram partem), or where there is an error of law apparent on the face of the record. The higher court quashes the illegal order.',
    example:
      'A state administrative tribunal dismisses a government employee without letting him inspect the charges or present his defense. The employee files a writ of Certiorari before the High Court, which quashes the tribunal’s order for violating natural justice and orders a fresh hearing.',
    relevantLaw: 'Article 32 & Article 226, Constitution of India',
    relatedLaws: ['constitution-of-india'],
    relatedTerms: ['mandamus', 'habeas-corpus', 'prohibition-writ', 'quo-warranto'],
    source: 'Constitution of India, Articles 32 & 226; Supreme Court in Syed Yakoob v. K.S. Radhakrishnan (1964)',
  },
  {
    id: 'quo-warranto',
    term: 'Quo-Warranto',
    fullForm: 'Latin: "By what warrant?" — Writ Challenging Usurpation of Public Office',
    category: 'Constitutional Law',
    plainLanguage:
      'A writ asking an official "By what authority do you hold this public office?", preventing unqualified persons from occupying public posts.',
    legalMeaning:
      'Issued under Articles 32 and 226 of the Constitution. It is a judicial remedy invoked against an individual who usurps an independent substantive public office created by the Constitution or statute. The court inquires into the legality of the holder’s appointment and, if the person lacks the statutory qualifications, ousts them from the office. Any citizen has standing (locus standi) to file it as an act of civic vigilance.',
    example:
      'A political appointee is appointed as Vice-Chancellor of a State University despite not fulfilling the mandatory 10 years of professorship prescribed by UGC regulations. A citizens’ group files a Writ of Quo-Warranto, leading the High Court to declare the appointment void.',
    relevantLaw: 'Article 32 & Article 226, Constitution of India',
    relatedLaws: ['constitution-of-india'],
    relatedTerms: ['mandamus', 'certiorari', 'locus-standi', 'habeas-corpus'],
    source: 'Constitution of India, Articles 32 & 226; Supreme Court in Central Electricity Supply Utility v. Dhobei Sahoo (2014)',
  },
  {
    id: 'prohibition-writ',
    term: 'Prohibition (Writ)',
    fullForm: 'Preventive writ restraining inferior tribunals from exceeding jurisdiction',
    category: 'Constitutional Law',
    plainLanguage:
      'A court order issued by a higher court stopping a lower court or tribunal from proceeding with a case that is outside its legal power.',
    legalMeaning:
      'An extraordinary constitutional writ under Articles 32 and 226 of the Constitution. Unlike Certiorari (which quashes a completed order), Prohibition is preventive, issued while proceedings are pending to prevent a lower judicial or quasi-judicial body from usurping jurisdiction it does not possess or exceeding its legal authority.',
    example:
      'A District Consumer Forum attempts to conduct a criminal trial for fraud against a builder. The builder moves the High Court for a Writ of Prohibition; the High Court halts the proceedings because consumer forums have no criminal trial jurisdiction.',
    relevantLaw: 'Article 32 & Article 226, Constitution of India; Consumer Protection Act, 2019',
    relatedLaws: ['constitution-of-india', 'consumer-protection-2019'],
    relatedTerms: ['certiorari', 'mandamus', 'habeas-corpus', 'quo-warranto'],
    source: 'Constitution of India, Articles 32 & 226; Supreme Court in East India Commercial Co. v. Collector of Customs (1962)',
  },
  {
    id: 'mens-rea',
    term: 'Mens Rea (Guilty Mind)',
    fullForm: 'Latin: "Actus non facit reum nisi mens sit rea"',
    category: 'Criminal Penal (BNS)',
    plainLanguage:
      'The mental intention, recklessness, or knowledge of doing something wrong that the prosecution must prove to convict someone of most crimes.',
    legalMeaning:
      'From the fundamental legal maxim "An act does not make a person guilty unless the mind is also guilty." In Indian criminal jurisprudence under the Bharatiya Nyaya Sanhita, 2023, crimes require both a wrongful physical act (Actus Reus) and a blameworthy state of mind (intention, knowledge, recklessness, or criminal negligence). General exceptions codified in Chapter III of BNS 2023 (e.g. accident without criminal intent, mistake of fact in good faith, legal insanity, involuntary intoxication) negate mens rea and exempt the accused from liability.',
    example:
      'A driver swerves suddenly to avoid hitting a child running into the road and damages a street vendor’s cart. Because there was no intention or criminal malice to cause harm, there is no mens rea for criminal mischief under BNS Section 324.',
    relevantLaw: 'Chapter III (General Exceptions, Sections 14–44), Bharatiya Nyaya Sanhita, 2023 (BNS)',
    relatedLaws: ['bns-2023'],
    relatedTerms: ['bns', 'cognizable-offence', 'criminal-complaint'],
    source: 'Bharatiya Nyaya Sanhita, 2023, Chapter III; Supreme Court in State of Maharashtra v. M.H. George (1965)',
  },
  {
    id: 'community-service',
    term: 'Community Service',
    fullForm: 'Non-custodial reformative sanction under Section 4(f) BNS',
    category: 'Criminal Penal (BNS)',
    plainLanguage:
      'A new form of court-ordered unpaid work for public benefit (like helping at a shelter or public library) given as an alternative to prison for minor crimes.',
    legalMeaning:
      'Introduced for the first time in Indian penal statutory history under Section 4(f) of the Bharatiya Nyaya Sanhita, 2023 as an independent punishment. Section 23 of BNSS 2023 defines its procedural execution. It is statutorily authorized for six specific petty offences: petty theft under ₹5,000 where property is returned (BNS Sec 303(2)), defamation (BNS Sec 356), public servant unlawfully engaging in trade (BNS Sec 202), public intoxication creating nuisance (BNS Sec 355), failure to appear in response to summons (BNS Sec 209), and attempted suicide to restrain a public servant (BNS Sec 226).',
    example:
      'A first-time offender shoplifts goods worth ₹1,200 from a grocery store and immediately returns them. Rather than incarcerating him with hardened criminals, the Magistrate sentences him under BNS Section 303(2) to complete 30 hours of community service at a municipal community center.',
    relevantLaw: 'Section 4(f) & Sections 202, 209, 226, 303(2), 355, 356 of Bharatiya Nyaya Sanhita, 2023 (BNS); Section 23, BNSS 2023',
    relatedLaws: ['bns-2023', 'bnss-2023'],
    relatedTerms: ['bns', 'plea-bargaining', 'compensation'],
    source: 'Bharatiya Nyaya Sanhita, 2023, Section 4(f); Gazette of India Extraordinary, Act 45 of 2023',
  },
  {
    id: 'plea-bargaining',
    term: 'Plea Bargaining',
    fullForm: 'Pre-trial negotiated settlement under Chapter XXIII BNSS',
    category: 'Criminal Procedure',
    plainLanguage:
      'A legal process where an accused person voluntarily admits guilt before trial in exchange for a lighter sentence or probation, speeding up resolution.',
    legalMeaning:
      'Governed by Chapter XXIII (Sections 289–300) of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Chapter XXIA CrPC). The accused must apply within 30 days of charges being framed. The Magistrate examines the accused in-camera without police presence to confirm voluntariness. The court facilitates a "Mutually Satisfactory Disposition" between accused and victim, which includes victim compensation. Under Section 293 BNSS, first-time offenders who have no prior convictions receive sentences reduced to one-fourth (1/4th) or one-sixth (1/6th) of the statutory term. It is statutorily barred for offences carrying death or life imprisonment, offences affecting the socio-economic conditions of the country, or crimes against women or children below 14.',
    example:
      'An individual charged with receiving stolen property valued at ₹15,000 applies for plea bargaining. He compensates the owner for the inconvenience and admits guilt; the court awards him a reduced sentence of two months and release on probation.',
    relevantLaw: 'Sections 289–300, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['charge-sheet', 'community-service', 'remand', 'trial-in-absentia'],
    source: 'BNSS 2023, Sections 289–300; Law Commission of India 142nd Report on Concessional Treatment for Offenders',
  },
  {
    id: 'trial-in-absentia',
    term: 'Trial in Absentia',
    fullForm: 'Criminal proceedings conducted against proclaimed absconders',
    category: 'Criminal Procedure',
    plainLanguage:
      'A court proceeding where an absconding criminal or proclaimed fugitive who is deliberately hiding is tried, convicted, and sentenced even though they refuse to show up in court.',
    legalMeaning:
      'A groundbreaking reform introduced in Indian procedural law under Section 356 of the Bharatiya Nagarik Suraksha Sanhita, 2023. Previously, criminal trials could not proceed without the physical presence of the accused. Under BNSS Section 356, when a proclaimed offender has absconded to evade trial and there is no immediate prospect of arrest, the court issues two successive arrest warrants at 30-day intervals, publishes notices in national and local newspapers, and grants a 90-day grace period. If they still do not appear, the court appoints a state-funded legal aid advocate to represent them and proceeds to record evidence, deliver judgment, and issue sentence in their absence.',
    example:
      'A fugitive accused of orchestrating a major banking fraud flees abroad and ignores extradition summons. Under BNSS Section 356, the Sessions Court appoints legal counsel for the defense, completes the trial, and sentences the absconder in absentia, enabling immediate confiscation of his domestic assets.',
    relevantLaw: 'Section 356, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['warrant', 'summons', 'charge-sheet', 'bns'],
    source: 'Section 356, BNSS 2023; Ministry of Home Affairs Legislative Commentary (Dec 2023)',
  },
  {
    id: 'civil-suit',
    term: 'Civil Suit',
    fullForm: 'Formal civil lawsuit under Code of Civil Procedure, 1908',
    category: 'Civil & Contract Law',
    plainLanguage:
      'A court case filed by one private party against another to settle non-criminal disputes such as property ownership, unpaid debts, contract violations, or divorces.',
    legalMeaning:
      'Governed by the Code of Civil Procedure, 1908 (CPC) and the Specific Relief Act, 1963. Instituted by the presentation of a "plaint" under Section 26 of CPC. The standard of proof is based on "preponderance of probabilities" rather than the criminal standard of "beyond reasonable doubt." Remedies include monetary damages, specific performance of contract, partition, declaration of title, or permanent injunctions.',
    example:
      'An author files a civil suit against a publisher who stopped paying agreed book royalties, requesting the court to order payment of ₹4,00,000 in arrears and declare the copyright reverted to the author.',
    relevantLaw: 'Code of Civil Procedure, 1908 (CPC); Indian Contract Act, 1872; Specific Relief Act, 1963',
    relatedLaws: ['indian-contract-1872'],
    relatedTerms: ['injunction', 'compensation', 'res-judicata', 'vakalatnama'],
    source: 'Code of Civil Procedure, 1908, Sections 9 & 26',
  },
  {
    id: 'criminal-complaint',
    term: 'Criminal Complaint',
    fullForm: 'Private complaint before a Magistrate under Section 223 BNSS',
    category: 'Criminal Procedure',
    plainLanguage:
      'A formal written or oral statement made directly to a judicial magistrate stating that a known or unknown person has committed an offence, asking the magistrate to take legal action.',
    legalMeaning:
      'Defined under Section 2(1)(h) of BNSS 2023. It differs from an FIR because it is filed directly before a Judicial Magistrate rather than the police. Under Section 223 of BNSS (formerly Section 200 CrPC), the Magistrate examines the complainant and witnesses upon oath. If a prima facie case exists, the Magistrate can either issue process (summons/warrant) or direct a preliminary inquiry under Section 225. Crucially, Section 223 BNSS requires the Magistrate to give the accused an opportunity of being heard before taking cognizance upon a private complaint.',
    example:
      'After police refuse to register an FIR regarding cheating by an influential landlord, the tenant’s lawyer files a criminal complaint directly before the Metropolitan Magistrate under Section 223 of BNSS.',
    relevantLaw: 'Section 2(1)(h) & Sections 223–227, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['fir', 'cognizable-offence', 'summons', 'warrant'],
    source: 'BNSS 2023, Sections 2(1)(h) & 223–227',
  },
  {
    id: 'injunction',
    term: 'Injunction',
    fullForm: 'Restraining or mandatory judicial order under Specific Relief Act',
    category: 'Civil & Contract Law',
    plainLanguage:
      'A court order that commands someone to stop doing a harmful action (like demolishing a wall) or orders them to carry out a specific act until a final trial decides the matter.',
    legalMeaning:
      'Governed by the Specific Relief Act, 1963 (Sections 36–42) and Order XXXIX of the Code of Civil Procedure, 1908 (CPC). Injunctions can be Temporary (interlocutory orders preserving the status quo during litigation) or Permanent/Perpetual (granted in the final decree). To obtain a temporary injunction, the applicant must establish three mandatory criteria: (1) a prima facie case, (2) balance of convenience in their favor, and (3) irreparable injury that cannot be compensated in money.',
    example:
      'A neighbor starts constructing a commercial garage that encroaches two feet onto Sunita’s registered residential driveway. Sunita files a civil suit and secures an urgent temporary injunction restraining the neighbor from continuing construction until boundary demarcation is complete.',
    relevantLaw: 'Order XXXIX Rules 1 & 2, Code of Civil Procedure, 1908; Sections 36–42, Specific Relief Act, 1963',
    relatedLaws: ['indian-contract-1872'],
    relatedTerms: ['civil-suit', 'interim-order', 'compensation'],
    source: 'CPC 1908, Order XXXIX; Supreme Court in Dalpat Kumar v. Prahlad Singh (1992)',
  },
  {
    id: 'compensation',
    term: 'Compensation',
    fullForm: 'Recompense for loss, injury, or breach of statutory duty',
    category: 'Civil & Contract Law',
    plainLanguage:
      'Money ordered by a court or consumer commission to be paid to a victim to make up for financial loss, bodily injury, mental agony, or property damage.',
    legalMeaning:
      'Provided across civil, consumer, and criminal frameworks. In consumer disputes under Section 39 of the Consumer Protection Act, 2019, commissions can award damages for defective goods, deficiency of service, and mental harassment. In criminal law under Section 395 and 396 of BNSS 2023 (formerly Section 357 & 357A CrPC), criminal courts can order fines to be paid as compensation to victims, and State Victim Compensation Schemes provide immediate monetary compensation to victims of rape, acid attacks, or serious crimes regardless of whether the accused is convicted or caught.',
    example:
      'A consumer purchases a laptop that fails within two weeks. The service center ignores five repair requests. The District Consumer Commission orders the brand to refund the full price of ₹55,000 plus ₹10,000 as compensation for harassment and legal costs.',
    relevantLaw: 'Section 39, Consumer Protection Act, 2019; Sections 395 & 396, BNSS 2023; Section 73, Indian Contract Act, 1872',
    relatedLaws: ['consumer-protection-2019', 'bnss-2023', 'indian-contract-1872'],
    relatedTerms: ['consumer-dispute', 'civil-suit', 'injunction', 'community-service'],
    source: 'Consumer Protection Act, 2019; BNSS 2023, Sections 395–396',
  },
  {
    id: 'vakalatnama',
    term: 'Vakalatnama',
    fullForm: 'Authorisation of legal representation under Advocates Act, 1961',
    category: 'General & Judicial Process',
    plainLanguage:
      'A formal written legal document signed by a client authorizing a specific advocate to represent them, argue, and sign court papers on their behalf.',
    legalMeaning:
      'Derived from Urdu/Persian legal traditions, codified under Order III Rule 4 of the Code of Civil Procedure, 1908, and Section 30 of the Advocates Act, 1961. A Vakalatnama is a special power of attorney empowering the advocate to appear, plead, compromise, deposit or withdraw money, and file appeals on behalf of the litigant in that specific court. It requires statutory court fee stamps and an advocate welfare fund stamp.',
    example:
      'Before an advocate can file an answer or argue in court for Rajesh in a property partition dispute, Rajesh signs a Vakalatnama authorizing the advocate and his legal associates to represent him in the High Court.',
    relevantLaw: 'Order III Rule 4, Code of Civil Procedure, 1908; Section 30, Advocates Act, 1961',
    relatedLaws: ['indian-contract-1872'],
    relatedTerms: ['civil-suit', 'affidavit', 'legal-aid'],
    source: 'CPC 1908, Order III; Bar Council of India Rules',
  },
  {
    id: 'affidavit',
    term: 'Affidavit',
    fullForm: 'Sworn written declaration on oath under penalty of perjury',
    category: 'General & Judicial Process',
    plainLanguage:
      'A written statement of facts voluntarily made and sworn or affirmed to be true under oath before an authorized officer (such as an Oath Commissioner or Notary Public).',
    legalMeaning:
      'Governed by Order XIX of the Code of Civil Procedure, 1908 and Section 336 of the Bharatiya Nagarik Suraksha Sanhita, 2023. An affidavit must state only facts that the declarant can prove of their own knowledge, except on interlocutory applications where statements of belief may be admitted if grounds are disclosed. Deliberately swearing a false affidavit constitutes criminal perjury and false evidence punishable under Section 227 and 229 of BNS 2023.',
    example:
      'When filing an application for correction of name in land records, Ramesh submits a sworn affidavit stating that "Ramesh Kumar" and "Ramesh K." refer to one and the same individual, signed before a Notary Public.',
    relevantLaw: 'Order XIX, Code of Civil Procedure, 1908; Section 336, BNSS 2023; Sections 227–229, BNS 2023',
    relatedLaws: ['bnss-2023', 'bns-2023'],
    relatedTerms: ['civil-suit', 'vakalatnama', 'sub-judice'],
    source: 'Code of Civil Procedure, 1908, Order XIX; Notaries Act, 1952',
  },
  {
    id: 'locus-standi',
    term: 'Locus Standi',
    fullForm: 'Latin: "Place of standing" — Right to bring legal action',
    category: 'Constitutional Law',
    plainLanguage:
      'The legal right of a person or group to appear before a court and file a case, usually requiring that they personally suffered harm or have a direct stake in the dispute.',
    legalMeaning:
      'In traditional civil litigation, a party has locus standi only if their personal civil or legal right has been violated. However, in constitutional law, the Supreme Court of India pioneered Public Interest Litigation (PIL) under Article 32 and 226, relaxing strict locus standi so any public-spirited citizen or NGO can approach the court on behalf of disadvantaged citizens whose fundamental rights are violated.',
    example:
      'An environmental NGO files a petition in the Supreme Court to stop toxic industrial effluent dumping into a public river. Even though the NGO owners were not personally poisoned, the court recognizes their public interest locus standi to protect public health under Article 21.',
    relevantLaw: 'Article 32 & Article 226, Constitution of India',
    relatedLaws: ['constitution-of-india'],
    relatedTerms: ['quo-warranto', 'habeas-corpus', 'mandamus'],
    source: 'Supreme Court in S.P. Gupta v. Union of India (1981) (Judges’ Transfer Case)',
  },
  {
    id: 'suo-motu',
    term: 'Suo Motu',
    fullForm: 'Latin: "On its own motion" — Court-initiated judicial action',
    category: 'Constitutional Law',
    plainLanguage:
      'An action taken by a court or legal authority on its own initiative without waiting for an official complaint or petition from any party.',
    legalMeaning:
      'Constitutional courts (Supreme Court and High Courts under Articles 32, 226, and 142) and statutory commissions (like the National Human Rights Commission) possess inherent authority to initiate suo motu proceedings based on newspaper reports, letters, or public disasters involving serious violations of fundamental rights or abuse of public trust.',
    example:
      'Following news reports that a municipal bridge collapsed killing commuters due to severe negligence, the High Court takes suo motu cognizance of the disaster, directing the State Government to file a status report on safety audits.',
    relevantLaw: 'Articles 32, 142 & 226, Constitution of India; Section 12, Protection of Human Rights Act, 1993',
    relatedLaws: ['constitution-of-india'],
    relatedTerms: ['locus-standi', 'habeas-corpus', 'interim-order'],
    source: 'Constitution of India, Articles 142 & 226; Supreme Court in In Re: Distribution of Essential Supplies during Pandemic (2021)',
  },
  {
    id: 'res-judicata',
    term: 'Res Judicata',
    fullForm: 'Latin: "A matter judged" — Finality of judicial determinations',
    category: 'Civil & Contract Law',
    plainLanguage:
      'A core legal rule that once a court has heard and definitively decided a dispute between parties, neither party can file a fresh lawsuit on the same issue.',
    legalMeaning:
      'Codified under Section 11 of the Code of Civil Procedure, 1908. It is founded on the public policy maxims "It is in the interest of the State that there should be an end to litigation" and "No one should be vexed twice for the same cause." If a matter directly and substantially in issue was heard and finally decided by a competent court, subsequent suits between the same parties are barred.',
    example:
      'A landlord sues a tenant claiming the tenancy expired; the civil court rules in favor of the tenant, confirming a valid 5-year lease. Two months later, the landlord files a new suit in another court on the exact same claim. The court dismisses the new suit immediately on grounds of Res Judicata.',
    relevantLaw: 'Section 11, Code of Civil Procedure, 1908 (CPC)',
    relatedLaws: ['indian-contract-1872'],
    relatedTerms: ['civil-suit', 'interim-order', 'sub-judice'],
    source: 'Code of Civil Procedure, 1908, Section 11; Supreme Court in Satyadhyan Ghosal v. Deorajin Debi (1960)',
  },
  {
    id: 'sub-judice',
    term: 'Sub Judice',
    fullForm: 'Latin: "Under judicial consideration" — Pending court matter',
    category: 'General & Judicial Process',
    plainLanguage:
      'A Latin phrase meaning "Under judicial consideration," referring to a matter that is currently being tried or argued in court and on which public officials and media should avoid making prejudicial statements.',
    legalMeaning:
      'Signifies that a matter is actively pending determination in a court of law. Under Indian contempt jurisprudence (Contempt of Courts Act, 1971), comments or media publications that prejudice or interfere with the due course of judicial proceedings while a matter is sub judice can amount to criminal contempt of court.',
    example:
      'During an active criminal murder trial, a television channel seeks an on-camera interview with the key eyewitness before she testifies in court. The judge warns the media that the case is sub judice and that broadcasting speculative reenactments violates contempt law.',
    relevantLaw: 'Contempt of Courts Act, 1971; Article 129 & Article 215, Constitution of India',
    relatedLaws: ['constitution-of-india'],
    relatedTerms: ['sub-judice', 'adjournment', 'interim-order'],
    source: 'Contempt of Courts Act, 1971; Supreme Court in Sahara India Real Estate Corp v. SEBI (2012)',
  },
  {
    id: 'interim-order',
    term: 'Interim Order',
    fullForm: 'Interlocutory provisional direction pending final verdict',
    category: 'General & Judicial Process',
    plainLanguage:
      'A temporary decision or protective instruction passed by a court while the main lawsuit is ongoing, to keep things stable until the final judgment is delivered.',
    legalMeaning:
      'An interlocutory order passed to preserve the subject-matter in dispute, maintain status quo, or provide urgent temporary relief. Governed by CPC Order XXXIX in civil matters and inherent powers of constitutional courts. An interim order does not determine the final rights of parties; it remains in effect until modified, vacated, or superseded by the final judgment.',
    example:
      'During a dispute over employee termination, the High Court issues an interim order directing the company to continue paying 50% subsistence allowance while the writ petition is heard.',
    relevantLaw: 'Order XXXIX, Code of Civil Procedure, 1908; Article 226, Constitution of India',
    relatedLaws: ['constitution-of-india', 'indian-contract-1872'],
    relatedTerms: ['injunction', 'adjournment', 'civil-suit'],
    source: 'Code of Civil Procedure, 1908; Supreme Court in State of Orissa v. Madan Gopal Rungta (1952)',
  },
  {
    id: 'legal-aid',
    term: 'Legal Aid',
    fullForm: 'State-funded free legal representation under Article 39A',
    category: 'General & Judicial Process',
    plainLanguage:
      'Free legal advice, court assistance, and lawyer representation provided by the government to poor, disadvantaged, or incarcerated citizens who cannot afford private advocates.',
    legalMeaning:
      'Grounded in Article 39A of the Constitution of India (Equal Justice and Free Legal Aid) as a Directive Principle and recognized as an essential component of Article 21 (Right to Life & Personal Liberty). Codified under the Legal Services Authorities Act, 1987. Free legal aid is available to women, children, members of Scheduled Castes/Scheduled Tribes, persons with disability, victims of human trafficking or disaster, undertrial prisoners, and individuals whose annual income is below statutory state limits (typically ₹3,00,000 to ₹5,00,000 depending on the state). Under Section 341 of BNSS 2023, where an accused has not sufficient means to engage a pleader in a trial before the Sessions Court, the court must assign a defense counsel at state expense.',
    example:
      'An impoverished laborer is arrested on suspicion of property damage. He cannot afford private counsel. The Magistrate notifies the District Legal Services Authority (DLSA), which immediately assigns an empaneled defense advocate to file his bail application at zero cost to him.',
    relevantLaw: 'Legal Services Authorities Act, 1987; Article 39A & Article 21, Constitution of India; Section 341, BNSS 2023',
    relatedLaws: ['constitution-of-india', 'bnss-2023'],
    relatedTerms: ['bail', 'remand', 'arrest', 'vakalatnama'],
    source: 'Legal Services Authorities Act, 1987; Supreme Court in Hussainara Khatoon v. Home Secretary, State of Bihar (1979) & Khatri (II) v. State of Bihar (1981)',
  },
  {
    id: 'adjournment',
    term: 'Adjournment',
    fullForm: 'Postponement of scheduled court hearing',
    category: 'General & Judicial Process',
    plainLanguage:
      'The postponement or rescheduling of a court hearing to a later date, granted by the judge on request or due to administrative necessity.',
    legalMeaning:
      'Regulated under Order XVII of the Code of Civil Procedure, 1908 (CPC) for civil cases, and Section 346 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Section 309 CrPC) for criminal proceedings. To curb judicial delays, CPC Order XVII Rule 1 restricts adjournments to a maximum of three times during the hearing of a suit. Under BNSS Section 346(1), criminal proceedings must continue day-to-day once witness examination begins until all witnesses in attendance have been examined, unless the court finds an adjournment necessary for special reasons recorded in writing.',
    example:
      'An expert medical witness is unable to attend court due to emergency surgery. The defense advocate requests an adjournment; the magistrate records the reason and reschedules witness cross-examination to the following Monday.',
    relevantLaw: 'Section 346, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS); Order XVII, Code of Civil Procedure, 1908',
    relatedLaws: ['bnss-2023'],
    relatedTerms: ['summons', 'sub-judice', 'interim-order'],
    source: 'BNSS 2023, Section 346; CPC 1908, Order XVII Rule 1',
  },
  {
    id: 'consumer-dispute',
    term: 'Consumer Dispute & Deficiency of Service',
    fullForm: 'Grievance against defective goods or inadequate commercial services',
    category: 'Consumer Law',
    plainLanguage:
      'A disagreement where a customer complains against a business or service provider for selling defective goods, charging unfairly, or failing to deliver promised services properly.',
    legalMeaning:
      'Defined under Section 2(8) and 2(11) of the Consumer Protection Act, 2019. "Deficiency" means any fault, imperfection, shortcoming, or inadequacy in the quality, nature, and manner of performance which is required to be maintained by law or contract. Consumers can file complaints before the District Consumer Commission (up to ₹50 Lakhs), State Commission (₹50 Lakhs to ₹2 Crores), or National Commission (above ₹2 Crores) through physical filing or online via the e-Daakhil portal without needing an advocate.',
    example:
      'A family books airline tickets. The airline cancels the flight without notice and refuses a refund for four months. The customer files an e-Daakhil complaint citing deficiency of service; the District Commission orders full refund plus 9% interest and compensation for travel inconvenience.',
    relevantLaw: 'Sections 2(8), 2(11), 34, 35 & 39, Consumer Protection Act, 2019',
    relatedLaws: ['consumer-protection-2019'],
    relatedTerms: ['compensation', 'civil-suit', 'injunction'],
    source: 'Consumer Protection Act, 2019 (Act 35 of 2019); Department of Consumer Affairs guidelines',
  },
  {
    id: 'bns',
    term: 'BNS (Bharatiya Nyaya Sanhita, 2023)',
    fullForm: 'Act No. 45 of 2023 — Modern National Penal Code',
    category: 'Criminal Penal (BNS)',
    plainLanguage:
      'India’s new national criminal penal law that lists all crimes and their punishments, replacing the colonial-era Indian Penal Code (IPC) from 1 July 2024.',
    legalMeaning:
      'Act No. 45 of 2023 enacted by Parliament, coming into full force on 1 July 2024. It repeals the Indian Penal Code, 1860. Comprises 358 sections organized into 20 chapters. It modernizes criminal offenses by introducing punishments for mob lynching (Section 103(2)), organized crime (Section 111), terrorist acts (Section 113), snatching (Section 304), community service as a penal sanction (Section 4(f)), and removes the sedition provision (formerly IPC 124A), replacing it with Section 152 penalizing acts endangering sovereignty, unity, and integrity of India.',
    example:
      'In an assault occurring in August 2024, the police register charges under BNS Section 115 (voluntarily causing hurt) rather than the old IPC Section 323, following the new statutory framework.',
    relevantLaw: 'Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023)',
    relatedLaws: ['bns-2023', 'bnss-2023'],
    relatedTerms: ['ipc', 'community-service', 'mens-rea', 'fir'],
    source: 'Gazette of India Extraordinary, Ministry of Law and Justice (25 Dec 2023)',
  },
  {
    id: 'ipc',
    term: 'IPC (Indian Penal Code, 1860)',
    fullForm: 'Act No. 45 of 1860 — Historical Colonial Penal Code',
    category: 'Criminal Penal (BNS)',
    plainLanguage:
      'The historical criminal penal code drafted during British rule in 1860 that defined crimes and punishments in India for over 160 years until replaced by the BNS in 2024.',
    legalMeaning:
      'Originally drafted by the First Law Commission chaired by Thomas Babington Macaulay, coming into effect on 1 January 1862. It was the principal criminal code of India until repealed by Section 358 of Bharatiya Nyaya Sanhita, 2023 on 1 July 2024. For any offences committed on or before 30 June 2024, proceedings continue to be governed by the IPC under statutory saving clauses.',
    example:
      'An ongoing trial regarding an alleged property theft committed in December 2023 is tried under IPC Section 379, whereas a theft occurring in July 2024 is tried under BNS Section 303.',
    relevantLaw: 'Indian Penal Code, 1860 (repealed by Act 45 of 2023, saved for past offences)',
    relatedLaws: ['bns-2023'],
    relatedTerms: ['bns', 'cognizable-offence', 'fir', 'mens-rea'],
    source: 'Indian Penal Code, 1860; BNS 2023 Section 358 savings clause',
  },
  {
    id: 'cybercrime-report',
    term: 'Cybercrime Reporting (Helpline 1930)',
    fullForm: 'National Cyber Crime Reporting Portal & CFCFRMS System',
    category: 'Consumer Law',
    plainLanguage:
      'The immediate reporting process through the National Cyber Crime Portal (Helpline 1930) within the first 1 to 2 hours of digital fraud to stop stolen money before criminals withdraw it.',
    legalMeaning:
      'Governed by standard operating procedures under the Information Technology Act, 2000 (Sections 43, 66, 66C, 66D) and operated by the Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs. The Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) integrates banks, payment gateways, and police. When a victim reports fraud via 1930 during the "Golden Hour," an automatic alert is dispatched to beneficiary banks to freeze the suspect accounts and wallet transactions before cash out.',
    example:
      'Sunil accidentally enters an OTP on a phishing site and loses ₹50,000 from his bank account. Within 20 minutes, he dials 1930 and provides the transaction UTR number. The I4C portal automatically alerts the destination bank to freeze the recipient account, successfully recovering ₹48,500.',
    relevantLaw: 'Information Technology Act, 2000 (Sections 43, 66C, 66D); BNSS Section 173 (e-FIR)',
    relatedLaws: ['it-act-2000', 'bnss-2023'],
    relatedTerms: ['compensation', 'fir', 'zero-fir', 'consumer-dispute'],
    source: 'Ministry of Home Affairs, I4C National Cyber Crime Reporting Portal (cybercrime.gov.in)',
  },
  {
    id: 'security-deposit',
    term: 'Security Deposit (Tenancy)',
    fullForm: 'Refundable performance guarantee under tenancy agreement',
    category: 'Property Law',
    plainLanguage:
      'A refundable lump-sum sum given by a tenant to a landlord at the start of a lease to cover unpaid rent or actual physical damages to the premises.',
    legalMeaning:
      'Under the Model Tenancy Act, 2021 (Section 11) and the Indian Contract Act, 1872 (Section 73), a security deposit is held in trust by the landlord. It cannot be forfeited arbitrarily. Upon vacation of the premises and handing over of keys, the landlord must refund the deposit after deducting only substantiated rental dues or actual repair costs. Normal wear-and-tear from customary habitation cannot be deducted.',
    example:
      'Upon completing his 11-month lease and restoring vacant possession, Vikram requests the return of his ₹60,000 security deposit. The landlord inspects the flat, notes ₹3,000 for a broken window latch, and refunds ₹57,000 within the agreed period.',
    relevantLaw: 'Model Tenancy Act, 2021 Section 11; Transfer of Property Act, 1882 Section 108; Indian Contract Act, 1872 Section 73',
    relatedLaws: ['transfer-of-property-1882', 'indian-contract-1872'],
    relatedTerms: ['compensation', 'civil-suit', 'injunction'],
    source: 'Model Tenancy Act, 2021; Transfer of Property Act, 1882 (indiacode.nic.in)',
  },
]
