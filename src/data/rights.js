// Comprehensive Indian Constitutional Fundamental Rights Dataset
// Covers Part III of the Constitution of India (Articles 12–35)
// Includes specific articles, explicit reasonable restrictions, legal consequences of violation, and citizen remedies.

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
      'Example: a government office or public institution cannot reject your application or deny entry because of your caste, sex, or religion.',
    nature: 'Universal Guarantee (Both Citizens and Non-Citizens for Art. 14)',
    enforceability: 'Primarily against the State (Art. 12); Art. 17 applies to private individuals as well.',
    statutoryActs: ['Protection of Civil Rights Act, 1955', 'SC/ST (Prevention of Atrocities) Act, 1989', 'Equal Remuneration Act, 1976'],
    articlesList: [
      {
        number: 'Article 14',
        title: 'Equality before Law & Equal Protection of the Laws',
        description: 'No person shall be denied equality before the law or equal protection of the laws within India.',
      },
      {
        number: 'Article 15',
        title: 'Prohibition of Discrimination',
        description: 'Prohibits discrimination on grounds only of religion, race, caste, sex, place of birth in access to public spaces.',
      },
      {
        number: 'Article 16',
        title: 'Equality of Opportunity in Public Employment',
        description: 'Guarantees equal opportunity for all citizens in state appointments and offices.',
      },
      {
        number: 'Article 17',
        title: 'Abolition of Untouchability',
        description: 'Untouchability is abolished and its practice in any form is forbidden and punishable by law.',
      },
      {
        number: 'Article 18',
        title: 'Abolition of Titles',
        description: 'Prohibits the State from conferring titles other than military or academic distinctions.',
      },
    ],
    restrictions: [
      {
        ground: 'Reasonable Classification Doctrine',
        description: 'Article 14 permits differential treatment if based on an intelligible differentia that bears a rational nexus to the statutory objective (e.g. progressive taxation, special economic regulations).',
      },
      {
        ground: 'Affirmative Action for Women & Children',
        description: 'Under Article 15(3), the State can make special provisions, schemes, or reservations exclusively for women and children.',
      },
      {
        ground: 'Advancement of Backward Classes & EWS',
        description: 'Articles 15(4), 15(5), 15(6) and 16(4) permit reservations in educational institutions and government employment for SC, ST, OBC, and Economically Weaker Sections.',
      },
      {
        ground: 'Domicile & Residence Requirements',
        description: 'Under Article 16(3), Parliament may prescribe residence qualifications for certain government posts in specific states or union territories.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Judicial Quashing under Article 13(2)',
        severity: 'Critical',
        details: 'Any statute, executive order, recruitment rule, or policy violating equality is declared unconstitutional and void ab initio by the High Court or Supreme Court.',
      },
      {
        consequence: 'Prerogative Writ of Mandamus / Certiorari',
        severity: 'High',
        details: 'Courts direct the authorities to cancel discriminatory notifications, re-conduct selections, or provide equal benefits retroactively.',
      },
      {
        consequence: 'Penal Prosecution under SC/ST PoA Act & BNS',
        severity: 'Severe',
        details: 'Enforcing untouchability or caste discrimination triggers non-bailable criminal charges under the SC/ST (Prevention of Atrocities) Act and BNS Sections.',
      },
      {
        consequence: 'Disciplinary Action & Official Contempt',
        severity: 'Moderate',
        details: 'Erring public officials face departmental inquiry, suspension, adverse service records, and contempt proceedings if defying judicial non-discrimination mandates.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Mandamus or Certiorari (High Court / Supreme Court)',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep: 'Issue formal legal notice to the department, then file a Writ Petition or petition the State/National Commission (NCSC, NCST, NCW, NCM).',
    },
    chartMetrics: {
      articleCount: 5,
      restrictionIndex: 5, // 1 = rigid/minimal restrictions, 10 = broad exceptions
      judicialScrutiny: 8, // 1-10 strictness of scrutiny
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
      'Covers six fundamental freedoms (speech, assembly, association, movement, residence, profession) and protections against arbitrary arrest, detention, and deprivation of life or personal liberty.',
    example:
      'Example: you have the right to express peaceful political criticism, assemble without arms, or move across state borders without arbitrary police stoppage.',
    nature: 'Citizen-Only for Art. 19; All Persons (including Foreigners) for Arts. 20, 21, 22',
    enforceability: 'Against the State, police authorities, and administrative bodies.',
    statutoryActs: ['Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023', 'Bharatiya Nyaya Sanhita (BNS), 2023', 'Right to Information Act, 2005'],
    articlesList: [
      {
        number: 'Article 19(1)(a)-(g)',
        title: 'Six Democratic Freedoms',
        description: 'Speech & expression, peaceful assembly without arms, forming associations/unions, movement across India, residing anywhere in India, and practising any profession.',
      },
      {
        number: 'Article 20',
        title: 'Protection in Respect of Conviction for Offences',
        description: 'Guarantees against ex-post facto penal laws, double jeopardy (no person prosecuted twice for the same offence), and self-incrimination.',
      },
      {
        number: 'Article 21',
        title: 'Protection of Life & Personal Liberty',
        description: 'No person shall be deprived of life or personal liberty except according to fair, just, and reasonable procedure established by law. Includes right to privacy, health, speedy trial, and clean environment.',
      },
      {
        number: 'Article 21A',
        title: 'Right to Free & Compulsory Education',
        description: 'Free and compulsory education for all children aged 6 to 14 years.',
      },
      {
        number: 'Article 22',
        title: 'Protection against Arbitrary Arrest & Detention',
        description: 'Right to be informed of grounds of arrest, right to consult a legal practitioner of choice, and mandatory production before nearest Magistrate within 24 hours.',
      },
    ],
    restrictions: [
      {
        ground: 'Art. 19(2): Sovereignty, Security & Public Order',
        description: 'Speech can be restricted only on 8 grounds: Sovereignty & Integrity of India, Security of State, Friendly relations with foreign states, Public order, Decency/morality, Contempt of court, Defamation, or Incitement to an offence.',
      },
      {
        ground: 'Art. 19(3)-(4): Assembly & Association Restraints',
        description: 'Assembly must be peaceable and without arms. State can impose reasonable restrictions for sovereignty, integrity of India, or maintenance of public order.',
      },
      {
        ground: 'Art. 19(5)-(6): Professional Qualifications & Public Interest',
        description: 'State can prescribe technical qualifications for professions or create state monopolies in trade; movement can be restricted in tribal areas or contagious disease quarantine.',
      },
      {
        ground: 'Art. 22: Preventive Detention Statutes',
        description: 'Permissible only under strict preventive detention laws (e.g. National Security Act) subject to Advisory Board review within 3 months and constitutional safeguards.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Writ of Habeas Corpus (Immediate Physical Release)',
        severity: 'Immediate',
        details: 'If police detain someone beyond 24 hours without magistrate order or without statutory grounds, High Court / Supreme Court orders immediate unconditional production and release.',
      },
      {
        consequence: 'Criminal Liability against Erring Police Officers',
        severity: 'Severe',
        details: 'Illegal arrest or custodial torture triggers BNS Section 127 (wrongful confinement), Section 198/199 (public servant disobeying law), and departmental suspension.',
      },
      {
        consequence: 'Monetary Compensation for Constitutional Tort',
        severity: 'High',
        details: 'Under the landmark Rudul Sah and Nilabati Behera doctrines, constitutional courts order the State exchequer to pay heavy financial compensation to the victim.',
      },
      {
        consequence: 'Striking Down of Censorship / Gag Orders',
        severity: 'Critical',
        details: 'Arbitrary speech bans, unreasoned internet shutdowns, or warrantless surveillance are quashed as unconstitutional under the Proportionality Test (Puttaswamy / Anuradha Bhasin).',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Habeas Corpus (for illegal detention) / Writ of Mandamus / Certiorari',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep: 'In illegal custody, an urgent Habeas Corpus petition can be moved before the High Court roster bench even on holidays. For illegal gag orders, file under Art. 226.',
    },
    chartMetrics: {
      articleCount: 5,
      restrictionIndex: 7, // Highly specified in 19(2)-(6)
      judicialScrutiny: 10, // Strict Proportionality Test applied
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
      'Prohibits human trafficking, forced labour (begar), and the employment of children below fourteen years in hazardous work.',
    example:
      'Example: a factory owner or contractor cannot withhold wages to force someone to work, nor employ a child under 14 in manufacturing, mines, or hazardous processes.',
    nature: 'Universal Guarantee (Protects both Citizens and Non-Citizens)',
    enforceability: 'Enforceable against both the State and private employers, contractors, and individuals.',
    statutoryActs: ['Bonded Labour System (Abolition) Act, 1976', 'Child and Adolescent Labour (Prohibition and Regulation) Act, 1986', 'BNS Sections on Trafficking'],
    articlesList: [
      {
        number: 'Article 23',
        title: 'Prohibition of Traffic in Human Beings & Begar (Forced Labour)',
        description: 'Traffic in human beings, begar, and other similar forms of forced labour are strictly prohibited. Any contravention is an offence punishable by law.',
      },
      {
        number: 'Article 24',
        title: 'Prohibition of Employment of Children in Hazardous Work',
        description: 'No child below the age of fourteen years shall be employed to work in any factory, mine, or engaged in any other hazardous employment.',
      },
    ],
    restrictions: [
      {
        ground: 'Compulsory Public Service (Art. 23(2))',
        description: 'The State may impose compulsory service for public purposes (such as national defense conscription, flood or disaster relief), provided it makes no discrimination on religion, race, caste, or class.',
      },
      {
        ground: 'Regulated Family Non-Hazardous Assistance',
        description: 'Under statutory child labour regulations, adolescents can assist family enterprises after school hours, provided work is strictly non-hazardous and doesn’t compromise education.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Cognizable & Non-Bailable Arrest under BNS & Child Labour Act',
        severity: 'Severe',
        details: 'Employers or traffickers face mandatory FIR, arrest without warrant, imprisonment up to 10 years or life for human trafficking, and minimum 6 months to 2 years for child labour.',
      },
      {
        consequence: 'Instant Factory Sealing & Heavy Statutory Fines',
        severity: 'High',
        details: 'District Magistrates and labour commissioners are empowered to seal non-compliant industrial premises and levy heavy recovery penalties into the Child Rehabilitation Fund.',
      },
      {
        consequence: 'Cancellation of Commercial Licenses & GST Registrations',
        severity: 'High',
        details: 'Commercial units found guilty of employing bonded or child labour forfeit municipal operating licenses, state incentives, and business registrations.',
      },
      {
        consequence: 'Direct High Court Intervention via PIL / Mandamus',
        severity: 'Critical',
        details: 'Constitutional courts issue spot commissions to rescue bonded labourers, direct immediate transit release certificates, and order state rehabilitation grants.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Habeas Corpus (for bonded workers held hostage) / Writ of Mandamus',
      courtAuthority: 'District Magistrate / Labour Court / High Court under Art. 226',
      immediateStep: 'Dial National Emergency Helpline 112 or Childline 1098. Lodge formal complaint with District Vigilance Committee for Bonded Labour.',
    },
    chartMetrics: {
      articleCount: 2,
      restrictionIndex: 2, // Near absolute protection with minimal exceptions
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
      'Protects the freedom of conscience and the right to freely profess, practise, and propagate any religion, manage religious affairs, and safeguards against state-mandated religious taxes.',
    example:
      'Example: a citizen can observe their religious rituals, build places of worship, or choose not to follow any religion; no government tax can be levied exclusively to promote a specific religion.',
    nature: 'Universal Guarantee (Applicable to All Individuals and Denominations)',
    enforceability: 'Primarily against the State; sets secular neutrality guidelines for state institutions.',
    statutoryActs: ['Places of Worship (Special Provisions) Act, 1991', 'Religious Endowments Act', 'Indian Penal / BNS secular protections'],
    articlesList: [
      {
        number: 'Article 25',
        title: 'Freedom of Conscience & Free Profession, Practice & Propagation',
        description: 'All persons are equally entitled to freedom of conscience and the right to freely profess, practise, and propagate religion.',
      },
      {
        number: 'Article 26',
        title: 'Freedom to Manage Religious Affairs',
        description: 'Every religious denomination has the right to establish and maintain institutions for religious/charitable purposes and manage its own affairs in matters of religion.',
      },
      {
        number: 'Article 27',
        title: 'Freedom from Taxes for Promotion of any Religion',
        description: 'No person shall be compelled to pay any taxes the proceeds of which are specifically appropriated to promote or maintain any particular religion.',
      },
      {
        number: 'Article 28',
        title: 'Freedom from Religious Instruction in State-Funded Schools',
        description: 'No religious instruction shall be provided in any educational institution wholly maintained out of State funds.',
      },
    ],
    restrictions: [
      {
        ground: 'Public Order, Morality & Health (Art. 25(1))',
        description: 'Religious practices cannot violate public hygiene, epidemic control (e.g. gathering bans during pandemics), human dignity, or public tranquility.',
      },
      {
        ground: 'Regulation of Secular Activities (Art. 25(2)(a))',
        description: 'The State retains sovereign power to regulate or restrict economic, financial, political, or secular activities associated with religious practices.',
      },
      {
        ground: 'Social Welfare & Temple Entry Reforms (Art. 25(2)(b))',
        description: 'The State can enact laws for social welfare, social reform, or throwing open public Hindu religious institutions to all classes and sections (e.g. Sabarimala, untethered temple entry).',
      },
      {
        ground: 'Essential Religious Practices Test',
        description: 'Courts protect only practices fundamentally integral to the religion; superstitious, harmful, or exclusionary practices lack constitutional immunity.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Judicial Invalidation of Coercive State Orders',
        severity: 'High',
        details: 'Any administrative order forcing citizens to attend religious prayers in government schools or paying state funds for religious favoritism is quashed.',
      },
      {
        consequence: 'Criminal Charges for Creating Communal Enmity',
        severity: 'Severe',
        details: 'Forced conversions through coercion or deceit, or defiling sacred spaces, triggers penal prosecution under BNS religious harmony provisions.',
      },
      {
        consequence: 'Writ of Quo Warranto / Certiorari against Discriminatory Management',
        severity: 'Moderate',
        details: 'Courts intervene to ensure statutory religious boards (Wakf, Devaswom, Trusts) comply with financial accountability and non-discrimination mandates.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Mandamus or Certiorari',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep: 'Seek an emergency stay from the High Court against discriminatory governmental regulations or religious exactions.',
    },
    chartMetrics: {
      articleCount: 4,
      restrictionIndex: 6, // Subject to health, public order, and social reform
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
      'Protects the right of distinct linguistic or religious communities to conserve their language, script, and culture, and to establish and administer educational institutions.',
    example:
      'Example: a linguistic or religious minority group has the right to set up and administer colleges or schools without having their aid cut by the state solely on minority grounds.',
    nature: 'Art. 29 protects any section of citizens; Art. 30 exclusively protects Religious and Linguistic Minorities.',
    enforceability: 'Against State education boards, universities, and administrative regulators.',
    statutoryActs: ['National Commission for Minority Educational Institutions Act, 2004', 'Right of Children to Free and Compulsory Education Act, 2009'],
    articlesList: [
      {
        number: 'Article 29(1)',
        title: 'Protection of Language, Script & Culture',
        description: 'Any section of citizens residing in India having a distinct language, script, or culture has the absolute right to conserve the same.',
      },
      {
        number: 'Article 29(2)',
        title: 'Non-Discrimination in Educational Admissions',
        description: 'No citizen shall be denied admission into any educational institution maintained by the State or receiving aid out of State funds on grounds only of religion, race, caste, language.',
      },
      {
        number: 'Article 30(1)',
        title: 'Right of Minorities to Establish & Administer Institutions',
        description: 'All minorities, whether based on religion or language, have the fundamental right to establish and administer educational institutions of their choice.',
      },
      {
        number: 'Article 30(2)',
        title: 'Non-Discrimination in State Educational Aid',
        description: 'The State shall not, in granting aid to educational institutions, discriminate against any institution on the ground that it is under minority management.',
      },
    ],
    restrictions: [
      {
        ground: 'Regulatory Academic & Academic Standards',
        description: 'The State can prescribe uniform syllabi, minimum teacher qualifications, anti-malpractice rules, and health standards to ensure educational excellence (T.M.A. Pai / Inamdar doctrines).',
      },
      {
        ground: 'National Security & Prevention of Maladministration',
        description: 'Minority status cannot be weaponized to shield financial embezzlement, anti-national activities, or exploitation of staff and students.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Striking Down of Unreasonable University Affiliation Caps',
        severity: 'High',
        details: 'High Courts strike down state executive circulars that attempt to take over faculty appointment or seat quota powers in minority institutions.',
      },
      {
        consequence: 'Restoration of State Financial Grants',
        severity: 'High',
        details: 'Courts issue Writs of Mandamus ordering state education departments to disburse blocked scholarships or recurring institutional maintenance funds.',
      },
      {
        consequence: 'Contempt against University Registrars',
        severity: 'Moderate',
        details: 'State university officials defying court orders guaranteeing minority autonomy face civil contempt and fines.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Writ of Mandamus (to release funds/approvals) / Writ of Certiorari (to quash illegal takeover)',
      courtAuthority: 'High Court under Article 226 / Supreme Court under Article 32',
      immediateStep: 'Approach National Commission for Minority Educational Institutions (NCMEI) or file a Writ Petition in the High Court.',
    },
    chartMetrics: {
      articleCount: 2,
      restrictionIndex: 4, // Relatively narrow; state can only regulate standards
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
    articles: 'Article 32 & Article 226',
    summary:
      'The cornerstone of the Constitution allowing citizens to approach the Supreme Court (Art. 32) and High Courts (Art. 226) directly to enforce Fundamental Rights via five prerogative writs.',
    example:
      'Example: if you are unlawfully locked up by police without charges, a family member can directly file a Habeas Corpus petition in the High Court or Supreme Court demanding your immediate release.',
    nature: 'Guaranteed Fundamental Right itself (Dr. B.R. Ambedkar called Article 32 the "Heart and Soul of the Constitution").',
    enforceability: 'Supreme Court cannot refuse to hear an Article 32 petition when a Fundamental Right is prima facie violated.',
    statutoryActs: ['Contempt of Courts Act, 1971', 'Supreme Court Rules, 2013', 'High Court Writ Rules'],
    articlesList: [
      {
        number: 'Article 32(1)',
        title: 'Right to Move Supreme Court directly',
        description: 'Guarantees the right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred in Part III.',
      },
      {
        number: 'Article 32(2)',
        title: 'Power of Supreme Court to Issue Writs',
        description: 'Supreme Court has power to issue directions, orders, or writs including Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.',
      },
      {
        number: 'Article 226',
        title: 'High Court Writ Jurisdiction (Broader than Art. 32)',
        description: 'Every High Court can issue writs not only for Fundamental Rights but also for "any other legal right" or statutory violation.',
      },
    ],
    restrictions: [
      {
        ground: 'National Emergency Proclamation (Article 359)',
        description: 'The President may by order declare the suspension of the right to move any court for enforcement of rights during an emergency. However, by the 44th Amendment (1978), Articles 20 and 21 can NEVER be suspended even during martial law or emergency.',
      },
      {
        ground: 'Doctrine of Alternative Statutory Remedies',
        description: 'For ordinary statutory grievances, courts usually require exhaustion of statutory appellate tribunals before entertaining a writ petition, unless fundamental rights or natural justice are breached.',
      },
    ],
    violationConsequences: [
      {
        consequence: 'Constitutional Crisis & Automatic Reversal',
        severity: 'Catastrophic',
        details: 'If an executive organ refuses to comply with a Supreme Court or High Court Writ, the court invokes Article 142 and Article 144 (All authorities, civil and judicial, must act in aid of the Supreme Court).',
      },
      {
        consequence: 'Immediate Contempt of Court (Imprisonment & Fine)',
        severity: 'Severe',
        details: 'Defiant bureaucrats, Chief Secretaries, or Police Commissioners face criminal and civil contempt under the Contempt of Courts Act, leading to imprisonment and unpardonable dismissal from service.',
      },
      {
        consequence: 'Direct Compensation from Personal Salary of Erring Officer',
        severity: 'High',
        details: 'Courts order damages to be deducted directly from the erring official’s pension or salary, rather than the public exchequer.',
      },
    ],
    citizenRemedy: {
      primaryWrit: 'Direct application for Habeas Corpus, Mandamus, Prohibition, Quo Warranto, or Certiorari',
      courtAuthority: 'Supreme Court (Art. 32) / High Court (Art. 226)',
      immediateStep: 'Engage counsel or request an amicus curiae / Legal Aid advocate through Supreme Court Legal Services Committee (SCLSC) or State DLSA.',
    },
    chartMetrics: {
      articleCount: 2,
      restrictionIndex: 1, // Almost non-restrictable (Articles 20 & 21 never suspendable)
      judicialScrutiny: 10,
      violationSeverityScore: 10,
      primaryWrits: ['Habeas Corpus', 'Mandamus', 'Quo Warranto', 'Prohibition', 'Certiorari'],
    },
  },
]

