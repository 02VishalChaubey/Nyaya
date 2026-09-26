// Comprehensive Indian Constitutional Fundamental Rights Dataset
// Covers Part III of the Constitution of India (Articles 12–35)
// Includes specific articles, explicit reasonable restrictions, legal consequences of violation, and citizen remedies.

export const constitutionalOrigins = {
  intro:
    'Fundamental Rights are the basic rights given by the Indian Constitution to protect individual freedom, equality, and dignity. These rights are called fundamental because they are essential for the overall development of a person and the proper working of democracy. They protect people from unfair actions of the State and allow them to live with freedom and respect.',
  scope:
    'Some Fundamental Rights are available only to citizens, while some are available to all persons, including foreigners. These rights are enforceable by courts, which means you can approach the Supreme Court or High Courts if your rights are violated.',
  usComparison:
    'Fundamental Rights are borrowed from the United States Constitution, but India did not copy them word-for-word. The framers studied the US Bill of Rights and then changed the idea according to India’s social, political, and legal needs. In the USA, rights have a strong individual liberty focus. In India, Fundamental Rights were designed to protect liberty while also supporting equality, social justice, public order, and national unity.',
  restrictionsExample:
    'For example, Article 19 gives important freedoms like speech, movement, and profession, but these freedoms are subject to reasonable restrictions. This means the State can limit them in the interest of sovereignty, security, public order, morality, and other constitutional grounds.',
  remedySummary:
    'India also gave citizens a direct remedy under Article 32, allowing them to approach the Supreme Court if their Fundamental Rights are violated. So, the idea came from the USA, but its Indian form was shaped by India’s needs.',
};

export const landmarkCases = [
  {
    id: 'gopalan-1950',
    caseName: 'A.K. Gopalan v. State of Madras',
    year: '1950',
    relatedArticle: 'Article 21',
    importance:
      'Gave an early narrow interpretation of personal liberty and procedure established by law.',
    keyTakeaway:
      'Held that Article 21 only protected against arbitrary executive action, not legislative action. Later decisively overruled in Maneka Gandhi.',
  },
  {
    id: 'golaknath-1967',
    caseName: 'Golaknath v. State of Punjab',
    year: '1967',
    relatedArticle: 'Fundamental Rights',
    importance:
      'Held that Parliament could not amend Fundamental Rights, later changed by constitutional developments.',
    keyTakeaway:
      'Declared that Fundamental Rights are given a transcendental position and cannot be curtailed even by constitutional amendment under Article 368.',
  },
  {
    id: 'kesavananda-1973',
    caseName: 'Kesavananda Bharati v. State of Kerala',
    year: '1973',
    relatedArticle: 'Basic Structure and Fundamental Rights',
    importance:
      'Established the Basic Structure Doctrine and limited Parliament’s power to amend the Constitution.',
    keyTakeaway:
      'The 13-judge bench ruled that Parliament can amend any part of the Constitution, including Part III, but cannot alter or destroy its Basic Structure.',
  },
  {
    id: 'maneka-1978',
    caseName: 'Maneka Gandhi v. Union of India',
    year: '1978',
    relatedArticle: 'Article 21',
    importance:
      'Expanded the meaning of life and personal liberty and made Article 21 much wider.',
    keyTakeaway:
      'Introduced the test of "just, fair, and reasonable" procedure under Article 21 and established the "Golden Triangle" interconnecting Articles 14, 19, and 21.',
  },
  {
    id: 'minerva-1980',
    caseName: 'Minerva Mills v. Union of India',
    year: '1980',
    relatedArticle: 'Fundamental Rights and DPSP',
    importance:
      'Highlighted the balance between Fundamental Rights and Directive Principles of State Policy.',
    keyTakeaway:
      'Held that the Indian Constitution is founded on the bedrock of the balance between Part III (Fundamental Rights) and Part IV (DPSP).',
  },
  {
    id: 'indra-sawhney-1992',
    caseName: 'Indra Sawhney v. Union of India',
    year: '1992',
    relatedArticle: 'Articles 14 and 16',
    importance:
      'Upheld reservation for backward classes and discussed limits on reservations in public employment.',
    keyTakeaway:
      'Approved 27% quota for OBCs while setting a 50% cap on total reservations and establishing the "creamy layer" exclusion doctrine.',
  },
  {
    id: 'vishaka-1997',
    caseName: 'Vishaka v. State of Rajasthan',
    year: '1997',
    relatedArticle: 'Articles 14, 19 and 21',
    importance:
      'Laid down guidelines against sexual harassment at the workplace.',
    keyTakeaway:
      'Formulated judicial guidelines in the absence of enacted legislation, guaranteeing gender equality and safe working environments as part of right to life and dignity.',
  },
  {
    id: 'puttaswamy-2017',
    caseName: 'Puttaswamy v. Union of India',
    year: '2017',
    relatedArticle: 'Article 21',
    importance:
      'Recognized the Right to Privacy as part of the Right to Life and Personal Liberty.',
    keyTakeaway:
      '9-judge unanimous bench ruled that privacy is an intrinsic part of dignity, autonomy, and liberty under Article 21 and Part III.',
  },
  {
    id: 'shreya-singhal-2015',
    caseName: 'Shreya Singhal v. Union of India',
    year: '2015',
    relatedArticle: 'Article 19',
    importance:
      'Protected freedom of speech online and struck down Section 66A of the IT Act.',
    keyTakeaway:
      'Held that vague restrictions on digital speech create a chilling effect and must strictly conform to the exhaustive grounds in Article 19(2).',
  },
  {
    id: 'dk-basu-1997',
    caseName: 'D.K. Basu v. State of West Bengal',
    year: '1997',
    relatedArticle: 'Articles 21 and 22',
    importance:
      'Laid down mandatory procedural safeguards against custodial violence, arbitrary arrest, and torture.',
    keyTakeaway:
      'Mandated transparent identification of arresting police officers, immediate arrest memos, notification to relatives within 8–12 hours, and regular medical checkups — codified into BNSS Sections 36–58.',
  },
  {
    id: 'anuradha-bhasin-2020',
    caseName: 'Anuradha Bhasin v. Union of India',
    year: '2020',
    relatedArticle: 'Article 19(1)(a) and 19(1)(g)',
    importance:
      'Ruled that freedom of speech and expression and the right to carry on trade/business using the internet are constitutionally protected fundamental rights.',
    keyTakeaway:
      'Held that indefinite internet shutdowns violate proportionality doctrine and freedom of speech; suspension orders must be published and are subject to judicial review.',
  },
  {
    id: 'navtej-johar-2018',
    caseName: 'Navtej Singh Johar v. Union of India',
    year: '2018',
    relatedArticle: 'Articles 14, 15, 19 and 21',
    importance:
      'Decriminalised consensual same-sex relations by reading down Section 377 of the Indian Penal Code.',
    keyTakeaway:
      'Unanimous 5-judge bench held that constitutional morality triumphs over public majoritarian views; sexual orientation is an intrinsic element of personal liberty and privacy.',
  },
];

export const article13Principles = [
  {
    situation: 'Judicial Review',
    actionConsequence:
      'The High Courts and Supreme Court examine the validity of the law.',
    explanation:
      'Article 13 explicitly arms constitutional courts with the power to inspect any statute, ordinance, rule, bye-law, or notification passed by Parliament or State legislatures against Part III rights.',
  },
  {
    situation: 'Doctrine of Severability',
    actionConsequence:
      'If only a part of the law is unconstitutional, the court strikes down just that specific section, leaving the rest of the law alive.',
    explanation:
      'Courts separate the unconstitutional clauses (the "bad" part) from the constitutional provisions (the "good" part). If the remainder can stand independently, only the offending clause is severed.',
  },
  {
    situation: 'Declared Void',
    actionConsequence:
      'If the unconstitutional part cannot be separated from the rest of the law, the entire law is declared null and void, meaning it ceases to exist legally.',
    explanation:
      'Under Article 13(2), any law made in contravention of fundamental rights is void ab initio (void from its inception) to the extent of the contravention.',
  },
];

export const practiceQuestions = [
  {
    id: 1,
    question:
      'Which Articles of the Indian Constitution cannot be suspended even during a Proclamation of National Emergency?',
    options: [
      'Articles 14 and 19',
      'Articles 20 and 21',
      'Articles 21 and 22',
      'Articles 19 and 20',
    ],
    correctAnswer: 1,
    explanation:
      'By the 44th Constitutional Amendment Act (1978), Articles 20 (protection against ex-post facto laws & double jeopardy) and 21 (right to life and personal liberty) can NEVER be suspended during a National Emergency.',
  },
  {
    id: 2,
    question:
      'Which landmark Supreme Court judgment formulated the Basic Structure Doctrine?',
    options: [
      'Golaknath v. State of Punjab',
      'Maneka Gandhi v. Union of India',
      'Kesavananda Bharati v. State of Kerala',
      'Minerva Mills v. Union of India',
    ],
    correctAnswer: 2,
    explanation:
      'In Kesavananda Bharati (1973), a 13-judge constitutional bench ruled that Parliament can amend the Constitution under Article 368, but cannot alter its "Basic Structure".',
  },
  {
    id: 3,
    question:
      'Which Prerogative Writ is issued by a constitutional court to command a public official or authority to perform a mandatory statutory duty?',
    options: ['Habeas Corpus', 'Mandamus', 'Certiorari', 'Quo-Warranto'],
    correctAnswer: 1,
    explanation:
      'Mandamus ("We Command") is issued to compel a public authority, official, or tribunal to perform an act which falls under its mandatory official or statutory duties.',
  },
  {
    id: 4,
    question:
      'What did Dr. B.R. Ambedkar describe as the "Heart and Soul" of the Indian Constitution?',
    options: [
      'Right to Equality (Article 14)',
      'Right to Freedom of Speech (Article 19)',
      'Right to Constitutional Remedies (Article 32)',
      'Preamble to the Constitution',
    ],
    correctAnswer: 2,
    explanation:
      'Dr. B.R. Ambedkar termed Article 32 the "Heart and Soul" because without judicial remedies, declaration of fundamental rights would remain dead letters on paper.',
  },
  {
    id: 5,
    question:
      'In which landmark case was the Right to Privacy declared a Fundamental Right under Article 21?',
    options: [
      'A.K. Gopalan v. State of Madras',
      'Puttaswamy v. Union of India',
      'Shreya Singhal v. Union of India',
      'Vishaka v. State of Rajasthan',
    ],
    correctAnswer: 1,
    explanation:
      'In K.S. Puttaswamy v. Union of India (2017), a unanimous 9-judge bench recognized the Right to Privacy as an intrinsic component of the Right to Life and Liberty under Article 21.',
  },
];

export const fundamentalRights = [
  {
    id: 'equality',
    icon: 'Scale',
    title: 'Right to Equality',
    hindi: 'समानता का अधिकार',
    articles: 'Articles 14–18',
    summary:
      'Guarantees that every person is equal before the law and prohibits discrimination on grounds such as religion, race, caste, sex, or place of birth.',
    example:
      'Example: a government office cannot refuse to process your application because of your caste or religion.',
    nature: 'Universal Guarantee (Both Citizens and Non-Citizens for Art. 14)',
    enforceability: 'Primarily against the State (Art. 12); Art. 17 applies to private individuals as well.',
    statutoryActs: [
      'Protection of Civil Rights Act, 1955',
      'SC/ST (Prevention of Atrocities) Act, 1989',
      'Equal Remuneration Act, 1976',
    ],
    theRights: [
      'Article 14: Equality before law and equal protection of the laws.',
      'Article 15: Prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth.',
      'Article 16: Equality of opportunity in public employment.',
      'Article 17: Abolition of untouchability.',
      'Article 18: Abolition of titles.',
    ],
    properRestrictionsSummary: [
      'Reasonable Classification: Article 14 allows the state to make special laws for different groups if there is a logical reason (e.g., separate laws for minors).',
      'Special Provisions: Under Articles 15 and 16, the State can make special provisions, quotas, or reservations for women, children, socially and educationally backward classes (OBCs), SCs, and STs.',
    ],
    violationConsequencesSummary: [
      'Discriminatory laws or government actions can be challenged in court and declared void (invalid).',
      'Practicing untouchability (Article 17) is a punishable criminal offense under the Protection of Civil Rights Act, 1955.',
    ],
    articlesList: [
      {
        number: 'Article 14',
        title: 'Equality before Law & Equal Protection of the Laws',
        description:
          'No person shall be denied equality before the law or equal protection of the laws within India.',
      },
      {
        number: 'Article 15',
        title: 'Prohibition of Discrimination',
        description:
          'Prohibits discrimination on grounds only of religion, race, caste, sex, place of birth in access to public spaces.',
      },
      {
        number: 'Article 16',
        title: 'Equality of Opportunity in Public Employment',
        description:
          'Guarantees equal opportunity for all citizens in state appointments and offices.',
      },
      {
        number: 'Article 17',
        title: 'Abolition of Untouchability',
        description:
          'Untouchability is abolished and its practice in any form is forbidden and punishable by law.',
      },
      {
        number: 'Article 18',
        title: 'Abolition of Titles',
        description:
          'Prohibits the State from conferring titles other than military or academic distinctions.',
      },
    ],
    restrictions: [
      {
        ground: 'Reasonable Classification',
        description:
          'Article 14 allows the state to make special laws for different groups if there is a logical reason (e.g., separate laws for minors).',
      },
      {
        ground: 'Special Provisions & Affirmative Action',
        description:
          'Under Articles 15 and 16, the State can make special provisions, quotas, or reservations for women, children, socially and educationally backward classes (OBCs), SCs, and STs.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Judicial Quashing under Article 13',
        severity: 'Critical',
        details:
          'Discriminatory laws or government actions can be challenged in court and declared void (invalid).',
      },
      {
        consequence: 'Criminal Prosecution for Untouchability',
        severity: 'Severe',
        details:
          'Practicing untouchability (Article 17) is a punishable criminal offense under the Protection of Civil Rights Act, 1955.',
      },
      {
        consequence: 'Prerogative Writ of Mandamus / Certiorari',
        severity: 'High',
        details:
          'Courts direct authorities to cancel discriminatory notifications, re-conduct selections, or provide equal benefits.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Mandamus or Certiorari (High Court / Supreme Court)',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep:
        'Issue formal legal notice to the department, then file a Writ Petition or petition the State/National Commission (NCSC, NCST, NCW, NCM).',
    },
    chartMetrics: {
      articleCount: 5,
      restrictionIndex: 5,
      judicialScrutiny: 8,
      violationSeverityScore: 9,
      primaryWrits: ['Mandamus', 'Certiorari', 'Prohibition'],
    },
  },
  {
    id: 'freedom',
    icon: 'Wind',
    title: 'Right to Freedom',
    hindi: 'स्वतंत्रता का अधिकार',
    articles: 'Articles 19–22',
    summary:
      'Covers freedom of speech, assembly, movement, and the right to practise any profession, along with protections around arrest and detention.',
    example:
      'Example: you generally have the right to express an opinion publicly, within reasonable restrictions defined by law.',
    nature:
      'Citizen-Only for Art. 19; All Persons (including Foreigners) for Arts. 20, 21, 22',
    enforceability: 'Against the State, police authorities, and administrative bodies.',
    statutoryActs: [
      'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
      'Bharatiya Nyaya Sanhita (BNS), 2023',
      'Right to Information Act, 2005',
    ],
    theRights: [
      '(a) Freedom of speech and expression.',
      '(b) Freedom to assemble peacefully without arms.',
      '(c) Freedom to form associations, unions, or co-operative societies.',
      '(d) Freedom to move freely throughout India.',
      '(e) Freedom to reside and settle in any part of India.',
      '(g) Freedom to practice any profession, trade, or business.',
    ],
    properRestrictionsSummary: [
      'For Speech & Assembly: Sovereignty and integrity of India, security of the State, friendly relations with foreign States, public order, decency, morality, contempt of court, or defamation.',
      'For Movement & Residence: Protecting the interests of the general public or safeguarding the culture and lands of Scheduled Tribes (e.g., Inner Line Permits).',
      'For Trade/Profession: Professional or technical qualifications can be mandated, or the State can create a monopoly on certain businesses.',
      'Articles 20 & 21: Protection in respect of conviction for offenses, and the Right to Life and Personal Liberty. Article 21 cannot be suspended even during a National Emergency.',
    ],
    violationConsequencesSummary: [
      'If the State arrests someone illegally, a Habeas Corpus petition can be filed to force the police to produce the person.',
      'If speech crosses into defamation or threatens national security, the individual can face criminal prosecution.',
    ],
    articlesList: [
      {
        number: 'Article 19(1)(a)-(g)',
        title: 'Six Fundamental Freedoms',
        description:
          'Speech & expression, peaceful assembly without arms, forming associations/unions, movement throughout India, residing anywhere, and practising any profession.',
      },
      {
        number: 'Article 20',
        title: 'Protection in Respect of Conviction for Offences',
        description:
          'Guarantees against ex-post facto penal laws, double jeopardy, and self-incrimination.',
      },
      {
        number: 'Article 21',
        title: 'Protection of Life & Personal Liberty',
        description:
          'No person shall be deprived of life or personal liberty except according to fair, just, and reasonable procedure established by law.',
      },
      {
        number: 'Article 21A',
        title: 'Right to Free & Compulsory Education',
        description:
          'Free and compulsory education for all children aged 6 to 14 years.',
      },
      {
        number: 'Article 22',
        title: 'Protection against Arbitrary Arrest & Detention',
        description:
          'Right to know grounds of arrest, consult legal counsel, and mandatory magistrate production within 24 hours.',
      },
    ],
    restrictions: [
      {
        ground: 'Speech & Assembly Restraints (Art. 19(2)-(3))',
        description:
          'Sovereignty and integrity of India, security of the State, friendly relations with foreign States, public order, decency, morality, contempt of court, or defamation.',
      },
      {
        ground: 'Movement & Residence Safeguards (Art. 19(5))',
        description:
          'Protecting the interests of the general public or safeguarding the culture and lands of Scheduled Tribes (e.g., Inner Line Permits).',
      },
      {
        ground: 'Trade/Profession Mandates (Art. 19(6))',
        description:
          'Professional or technical qualifications can be mandated, or the State can create a monopoly on certain businesses.',
      },
      {
        ground: 'Non-Suspendable Rights (Arts. 20 & 21)',
        description:
          'Article 21 cannot be suspended even during a National Emergency declared under Article 352.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Writ of Habeas Corpus for Illegal Arrest',
        severity: 'Immediate',
        details:
          'If the State arrests someone illegally, a Habeas Corpus petition can be filed to force the police to produce the person.',
      },
      {
        consequence: 'Criminal Prosecution for Defamation / Security Breaches',
        severity: 'Severe',
        details:
          'If speech crosses into defamation or threatens national security, the individual can face criminal prosecution.',
      },
      {
        consequence: 'State Compensation for Wrongful Detainment',
        severity: 'High',
        details:
          'Courts order the State to pay compensation for illegal custody under Rudul Sah and Nilabati Behera doctrines.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Habeas Corpus / Mandamus / Certiorari',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep:
        'In illegal custody, an urgent Habeas Corpus petition can be moved before the High Court roster bench even on holidays.',
    },
    chartMetrics: {
      articleCount: 5,
      restrictionIndex: 7,
      judicialScrutiny: 10,
      violationSeverityScore: 10,
      primaryWrits: ['Habeas Corpus', 'Certiorari', 'Mandamus'],
    },
  },
  {
    id: 'exploitation',
    icon: 'ShieldOff',
    title: 'Right against Exploitation',
    hindi: 'शोषण के विरुद्ध अधिकार',
    articles: 'Articles 23–24',
    summary:
      'Prohibits human trafficking, forced labour, and the employment of children below fourteen years in hazardous work.',
    example:
      'Example: an employer cannot force someone to work without fair wages or consent.',
    nature: 'Universal Guarantee (Protects both Citizens and Non-Citizens)',
    enforceability:
      'Enforceable against both the State and private employers, contractors, and individuals.',
    statutoryActs: [
      'Bonded Labour System (Abolition) Act, 1976',
      'Child Labour (Prohibition and Regulation) Act, 1986',
      'Bharatiya Nyaya Sanhita (BNS), 2023',
    ],
    theRights: [
      'Article 23: Prohibition of human trafficking and forced labor (begar).',
      'Article 24: Prohibition of employment of children (under 14 years) in hazardous factories, mines, etc.',
    ],
    properRestrictionsSummary: [
      'The State can impose compulsory public service (like military conscription or disaster relief) for public purposes, without discriminating on race, religion, or caste.',
    ],
    violationConsequencesSummary: [
      'These rights apply against both the State and private individuals.',
      'Violations are treated as serious crimes under laws like the Bonded Labour System (Abolition) Act and the Child Labour (Prohibition and Regulation) Act, leading to imprisonment and heavy fines for offenders.',
    ],
    articlesList: [
      {
        number: 'Article 23',
        title: 'Prohibition of Traffic in Human Beings & Forced Labour (Begar)',
        description:
          'Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention is an offence punishable by law.',
      },
      {
        number: 'Article 24',
        title: 'Prohibition of Child Labour in Hazardous Settings',
        description:
          'No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment.',
      },
    ],
    restrictions: [
      {
        ground: 'Compulsory Public Service (Art. 23(2))',
        description:
          'The State can impose compulsory public service (like military conscription or disaster relief) for public purposes, without discriminating on race, religion, or caste.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Direct Action against State & Private Individuals',
        severity: 'Immediate',
        details: 'These rights apply against both the State and private individuals.',
      },
      {
        consequence: 'Criminal Imprisonment & Heavy Statutory Fines',
        severity: 'Severe',
        details:
          'Violations are treated as serious crimes under laws like the Bonded Labour System (Abolition) Act and Child Labour (Prohibition and Regulation) Act, leading to imprisonment and heavy fines.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Habeas Corpus / Writ of Mandamus',
      courtAuthority: 'District Magistrate / Labour Court / High Court under Art. 226',
      immediateStep:
        'Dial National Emergency Helpline 112 or Childline 1098. Lodge formal complaint with District Magistrate or Labour Commissioner.',
    },
    chartMetrics: {
      articleCount: 2,
      restrictionIndex: 2,
      judicialScrutiny: 9,
      violationSeverityScore: 10,
      primaryWrits: ['Habeas Corpus', 'Mandamus'],
    },
  },
  {
    id: 'religion',
    icon: 'Landmark',
    title: 'Right to Freedom of Religion',
    hindi: 'धर्म की स्वतंत्रता का अधिकार',
    articles: 'Articles 25–28',
    summary:
      'Protects the freedom of conscience and the right to freely profess, practise, and propagate any religion.',
    example:
      'Example: a person cannot be compelled to follow a religious practice against their will.',
    nature: 'Universal Guarantee (Applicable to All Individuals and Denominations)',
    enforceability: 'Primarily against the State; sets secular neutrality guidelines.',
    statutoryActs: [
      'Places of Worship (Special Provisions) Act, 1991',
      'Religious Endowments Act',
    ],
    theRights: [
      'Freedom of conscience and the right to freely profess, practice, and propagate religion.',
      'Freedom to manage religious affairs and exemption from paying taxes for the promotion of any particular religion.',
    ],
    properRestrictionsSummary: [
      'Subject to public order, morality, and health.',
      'The State can regulate financial, political, or secular activities associated with religious practices.',
      'Social welfare and reform programs (like opening Hindu temples to all classes) override religious claims.',
      'No forced conversions: Propagation does not include the right to convert another person by force or fraud.',
    ],
    violationConsequencesSummary: [
      'If a religious practice disrupts public peace or harms health (e.g., using loudspeakers at illegal hours), authorities can stop it.',
      'Forced conversions attract state-level anti-conversion criminal penalties.',
    ],
    articlesList: [
      {
        number: 'Article 25',
        title: 'Freedom of Conscience & Profession, Practice & Propagation',
        description:
          'All persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.',
      },
      {
        number: 'Article 26',
        title: 'Freedom to Manage Religious Affairs',
        description:
          'Every religious denomination has the right to establish and maintain institutions for religious and charitable purposes.',
      },
      {
        number: 'Article 27',
        title: 'Freedom from Taxes for Promotion of Religion',
        description:
          'No person shall be compelled to pay taxes appropriated to promote or maintain any particular religion.',
      },
      {
        number: 'Article 28',
        title: 'Freedom from Religious Instruction in State-Funded Schools',
        description:
          'No religious instruction shall be provided in any educational institution wholly maintained out of State funds.',
      },
    ],
    restrictions: [
      {
        ground: 'Public Order, Morality & Health',
        description:
          'Subject to public order, morality, and health.',
      },
      {
        ground: 'Regulation of Secular Activities',
        description:
          'The State can regulate financial, political, or secular activities associated with religious practices.',
      },
      {
        ground: 'Social Welfare & Temple Reforms',
        description:
          'Social welfare and reform programs (like opening Hindu temples to all classes) override religious claims.',
      },
      {
        ground: 'No Forced Conversions',
        description:
          'Propagation does not include the right to convert another person by force or fraud.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Authority Stoppage for Public Order / Health Violations',
        severity: 'Moderate',
        details:
          'If a religious practice disrupts public peace or harms health (e.g., using loudspeakers at illegal hours), authorities can stop it.',
      },
      {
        consequence: 'Penal Prosecution for Coercive Conversions',
        severity: 'Severe',
        details:
          'Forced conversions attract state-level anti-conversion criminal penalties.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Mandamus or Certiorari',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep:
        'Seek an emergency injunction or writ from the High Court against arbitrary interference with religious conscience or illegal noise pollution.',
    },
    chartMetrics: {
      articleCount: 4,
      restrictionIndex: 6,
      judicialScrutiny: 8,
      violationSeverityScore: 8,
      primaryWrits: ['Mandamus', 'Certiorari'],
    },
  },
  {
    id: 'cultural-educational',
    icon: 'BookOpen',
    title: 'Cultural & Educational Rights',
    hindi: 'संस्कृति और शिक्षा संबंधी अधिकार',
    articles: 'Articles 29–30',
    summary:
      'Protects the right of any community to conserve its language, script, and culture, and to establish educational institutions.',
    example:
      'Example: a linguistic minority can run its own school to teach in its native language.',
    nature:
      'Art. 29 protects any section of citizens; Art. 30 exclusively protects Religious and Linguistic Minorities.',
    enforceability:
      'Against State education departments, universities, and regulatory authorities.',
    statutoryActs: [
      'National Commission for Minority Educational Institutions Act, 2004',
      'Right of Children to Free and Compulsory Education Act, 2009',
    ],
    theRights: [
      'Protection of the distinct language, script, or culture of minorities.',
      'Right of minorities (linguistic or religious) to establish and administer educational institutions of their choice.',
    ],
    properRestrictionsSummary: [
      'State-aided institutions cannot deny admission to anyone based solely on religion, race, caste, or language.',
      'The government can regulate administrative standards, academic qualifications, and financial transparency in minority institutions to ensure educational excellence.',
    ],
    violationConsequencesSummary: [
      'If the government tries to take over a minority school arbitrarily or strip its minority status without cause, the management can sue the government to reverse the order.',
    ],
    articlesList: [
      {
        number: 'Article 29(1)-(2)',
        title: 'Protection of Interests of Minorities',
        description:
          'Protection of language, script, or culture; no citizen denied admission to state-aided institution on grounds only of religion, race, caste, language.',
      },
      {
        number: 'Article 30(1)-(2)',
        title: 'Right of Minorities to Establish & Administer Educational Institutions',
        description:
          'All minorities, religious or linguistic, have the right to establish and administer educational institutions of their choice without discriminatory state aid denials.',
      },
    ],
    restrictions: [
      {
        ground: 'Non-Discrimination in Admissions (Art. 29(2))',
        description:
          'State-aided institutions cannot deny admission to anyone based solely on religion, race, caste, or language.',
      },
      {
        ground: 'Academic Excellence & Transparency Regulations',
        description:
          'The government can regulate administrative standards, academic qualifications, and financial transparency in minority institutions to ensure educational excellence.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Judicial Reversal of Arbitrary Takeovers',
        severity: 'High',
        details:
          'If the government tries to take over a minority school arbitrarily or strip its minority status without cause, the management can sue the government to reverse the order.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Mandamus / Writ of Certiorari',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep:
        'Approach National Commission for Minority Educational Institutions (NCMEI) or file a Writ Petition in the High Court.',
    },
    chartMetrics: {
      articleCount: 2,
      restrictionIndex: 4,
      judicialScrutiny: 9,
      violationSeverityScore: 7,
      primaryWrits: ['Mandamus', 'Certiorari'],
    },
  },
  {
    id: 'constitutional-remedies',
    icon: 'Gavel',
    title: 'Right to Constitutional Remedies',
    hindi: 'संवैधानिक उपचारों का अधिकार',
    articles: 'Article 32',
    summary:
      'Allows individuals to directly approach the courts if any of their fundamental rights are violated — often described as the provision that gives the other rights their force.',
    example:
      'Example: if a fundamental right is violated, a person may petition the courts for enforcement.',
    nature:
      'Guaranteed Fundamental Right itself (Dr. B.R. Ambedkar called Article 32 the "Heart and Soul" of the Constitution).',
    enforceability:
      'Supreme Court cannot refuse to hear an Article 32 petition when a Fundamental Right is prima facie violated.',
    statutoryActs: [
      'Contempt of Courts Act, 1971',
      'Supreme Court Rules, 2013',
      'High Court Writ Rules',
    ],
    theRights: [
      'The right to move the Supreme Court directly for the enforcement of any Fundamental Right. Dr. B.R. Ambedkar called Article 32 the "Heart and Soul" of the Constitution.',
    ],
    properRestrictionsSummary: [
      'This right cannot be suspended except as provided by the Constitution itself—specifically during a National Emergency declared under Article 352 (where the President may suspend the right to move courts for certain rights).',
    ],
    violationConsequencesSummary: [
      "If a citizen's fundamental right is breached, the Supreme Court (under Article 32) or High Courts (under Article 226) can issue Prerogative Writs to undo the violation immediately: 1. Habeas Corpus: To release a person from illegal detention. 2. Mandamus: To command a public official to do their duty. 3. Prohibition: To stop a lower court from exceeding its power. 4. Certiorari: To quash an illegal order passed by a lower court/authority. 5. Quo-Warranto: To challenge a person's legal right to hold a public office.",
    ],
    articlesList: [
      {
        number: 'Article 32',
        title: 'Remedies for Enforcement of Rights Conferred by Part III',
        description:
          'Guarantees the right to move the Supreme Court directly. The Supreme Court has the power to issue directions, orders, or writs.',
      },
      {
        number: 'Article 226',
        title: 'Power of High Courts to Issue Certain Writs',
        description:
          'Enables High Courts to issue writs for the enforcement of Fundamental Rights and for any other purpose.',
      },
    ],
    restrictions: [
      {
        ground: 'National Emergency Provisions (Art. 352 / 359)',
        description:
          'This right cannot be suspended except as provided by the Constitution itself—specifically during a National Emergency declared under Article 352 (where the President may suspend the right to move courts for certain rights).',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Issuance of 5 Prerogative Writs to Undo Violation',
        severity: 'Catastrophic',
        details:
          'Supreme Court (under Art. 32) or High Courts (under Art. 226) issue Habeas Corpus, Mandamus, Prohibition, Certiorari, or Quo-Warranto to immediately nullify violations.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'All 5 Prerogative Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto)',
      courtAuthority: 'Supreme Court (Art. 32) / High Court (Art. 226)',
      immediateStep:
        'Directly petition the Supreme Court of India under Article 32 or the State High Court under Article 226.',
    },
    chartMetrics: {
      articleCount: 2,
      restrictionIndex: 1,
      judicialScrutiny: 10,
      violationSeverityScore: 10,
      primaryWrits: [
        'Habeas Corpus',
        'Mandamus',
        'Quo Warranto',
        'Prohibition',
        'Certiorari',
      ],
    },
  },
];
