// Comprehensive data notes extracted directly from the official Gazette of India:
// The Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023)
// Assented to on 25th December, 2023; Published in Gazette of India Extraordinary No. 53.
// Replaces the Indian Penal Code (Act 45 of 1860).

export const bnsGazetteInfo = {
  actName: 'The Bharatiya Nyaya Sanhita, 2023',
  actNo: 'Act No. 45 of 2023',
  enactmentDate: '25th December, 2023',
  gazetteRef: 'Gazette of India Extraordinary, Part II — Section 1, No. 53 (CG-DL-E-25122023-250883)',
  authority: 'Ministry of Law and Justice (Legislative Department)',
  legislativeCounsel: 'Diwakar Singh, Joint Secretary & Legislative Counsel',
  totalChapters: 20,
  totalSections: 358,
  repealedAct: 'The Indian Penal Code, 1860 (45 of 1860) repealed under Section 358',
  applicability: 'Applies throughout India, and extraterritorially to Indian citizens abroad, ships/aircraft registered in India, and computer resources located in India (Section 1).',
}

export const bnsKeyReforms = [
  {
    title: 'Community Service as Formal Punishment',
    section: 'Section 4(f)',
    badge: 'New Penal Concept',
    description:
      'Introduces community service for the first time in Indian statutory penal law as a restorative alternative for minor, non-violent offences (e.g. first-time theft under ₹5,000, defamation, public intoxication, and failure to appear on proclamation).',
  },
  {
    title: 'Mob Lynching & Concerted Murder',
    section: 'Section 103(2)',
    badge: 'Specific Provision',
    description:
      'When a group of 5 or more persons acting in concert commits murder on grounds of race, caste, community, sex, place of birth, language, or personal belief, each member is punished with death or life imprisonment.',
  },
  {
    title: 'Hit-and-Run Aggravated Penalties',
    section: 'Section 106(2)',
    badge: 'Public Safety',
    description:
      'Causing death by rash and negligent driving and escaping without reporting to a police officer or Magistrate soon after the incident carries up to 10 years imprisonment and fine.',
  },
  {
    title: 'Organised Crime & Petty Organised Crime',
    section: 'Sections 111 & 112',
    badge: 'Syndicate Law',
    description:
      'Codifies continuing unlawful activities by syndicates (contract killing, kidnapping, land grabbing, trafficking, economic offences, cyber-crimes) and petty organised crimes (snatching, card skimming, paper leaks, betting).',
  },
  {
    title: 'Terrorist Acts Defined in General Penal Code',
    section: 'Section 113',
    badge: 'National Security',
    description:
      'Explicitly penalises acts threatening sovereignty, unity, integrity, or economic security of India (including counterfeit currency and hazardous agents) with death or life imprisonment.',
  },
  {
    title: 'Snatching as a Separate Distinct Offence',
    section: 'Section 304',
    badge: 'New Offence',
    description:
      'Specifically defines snatching (sudden, quick, or forcible grabbing of movable property from a person) with imprisonment up to 3 years and fine, resolving ambiguity under simple theft.',
  },
  {
    title: 'Sexual Intercourse on Deceitful Promise to Marry',
    section: 'Section 69',
    badge: 'Women Protection',
    description:
      'Penalises having sexual intercourse by deceitful means (inducement, false promise of employment/promotion, or marrying by suppressing identity) without intention of fulfilling it, with imprisonment up to 10 years.',
  },
  {
    title: 'Sedition Replaced by Endangering Sovereignty',
    section: 'Section 152',
    badge: 'Modern Reform',
    description:
      'Colonial sedition (IPC 124A) is repealed. Replaced by Section 152 targeting armed rebellion, subversive activities, and separatist threats, with an explicit explanation protecting lawful criticism and democratic dissent.',
  },
  {
    title: 'Digital Obfuscation & Encryption Concealment',
    section: 'Sections 58 & 59',
    badge: 'Cyber Awareness',
    description:
      'Penalises voluntarily concealing designs to commit offences through the use of encryption or information hiding tools, modernising abetment and conspiracy for the digital age.',
  },
]

export const bnsChapters = [
  {
    number: 'Chapter I',
    name: 'Preliminary',
    sections: 'Sections 1 – 3',
    summary: 'Short title, commencement, extraterritorial jurisdiction, 39 statutory definitions, and general explanations of criminal liability.',
    keyPoints: ['Extraterritorial reach (citizens abroad, Indian ships/planes, computers in India)', '39 detailed definitions (child <18, document including electronic records, gender including transgender)', 'Joint criminal acts done with common intention'],
  },
  {
    number: 'Chapter II',
    name: 'Of Punishments',
    sections: 'Sections 4 – 13',
    summary: 'Six recognised punishments including community service, calculation of life terms (20 years for fractions), fines, solitary confinement, and enhanced repeat offender penalties.',
    keyPoints: ['Introduction of Community Service as punishment (Sec 4(f))', 'Default imprisonment scale for fines (Sec 8)', 'Solitary confinement limits (Sec 11-12: max 14 days at a time, max 3 months total)'],
  },
  {
    number: 'Chapter III',
    name: 'General Exceptions & Private Defence',
    sections: 'Sections 14 – 44',
    summary: 'Complete legal defences: mistake of fact, judicial acts, accident, necessity, childhood (<7 doli incapax, 7-12 immature), insanity, involuntary intoxication, consent, and comprehensive right of private defence of body and property.',
    keyPoints: ['Absolute immunity for children under 7 (Sec 20)', 'Doctrine of Necessity (Sec 19)', 'Involuntary intoxication defence (Sec 23)', 'When private defence extends to causing death (Sec 38 for body, Sec 41 for property)'],
  },
  {
    number: 'Chapter IV',
    name: 'Of Abetment, Criminal Conspiracy and Attempt',
    sections: 'Sections 45 – 62',
    summary: 'Principles of abetment, extraterritorial abetment, concealing offence designs using digital encryption or hiding tools, criminal conspiracy, and attempt to commit offences.',
    keyPoints: ['Concealing design using encryption or information hiding tools (Sec 58, 59)', 'Abetment outside India of offences in India and vice-versa (Sec 47-48)', 'Criminal conspiracy (Sec 61) and general attempts (Sec 62)'],
  },
  {
    number: 'Chapter V',
    name: 'Of Offences Against Woman and Child',
    sections: 'Sections 63 – 99',
    summary: 'Prioritised upfront: Rape, custodial & aggravated rape, minor rape (death penalty), deceitful promise of marriage (Sec 69), gang rape, modesty violations, stalking, voyeurism, dowry death, child abandonment, begging, and child trafficking.',
    keyPoints: ['Strict consent definition (Sec 63: non-resistance is not consent)', 'Deceitful promise to marry / false identity (Sec 69: up to 10 yrs)', 'Death penalty for rape of girl under 12 or gang rape of minor (Sec 65(2), 70(2))', 'Child begging and hiring children for crime (Sec 95, 139)'],
  },
  {
    number: 'Chapter VI',
    name: 'Of Offences Affecting the Human Body',
    sections: 'Sections 100 – 146',
    summary: 'Homicide, murder, mob lynching (Sec 103(2)), hit-and-run (Sec 106(2)), organised crime (Sec 111), petty organised crime (Sec 112), terrorist acts (Sec 113), hurt, grievous hurt, acid attacks (Sec 124), kidnapping, abduction, and human trafficking (Sec 143).',
    keyPoints: ['Mob lynching by 5+ persons on caste/religion/language (Sec 103(2))', 'Hit-and-Run without reporting: up to 10 yrs (Sec 106(2))', 'Organised crime syndicates (Sec 111) & Terrorist acts (Sec 113)', 'Human trafficking penalties up to natural life (Sec 143)'],
  },
  {
    number: 'Chapter VII',
    name: 'Of Offences Against the State',
    sections: 'Sections 147 – 158',
    summary: 'Waging war against the Government of India, conspiracy, collecting arms, and Section 152 penalising acts endangering sovereignty, unity, and integrity of India with protections for democratic critique.',
    keyPoints: ['Waging war against India (Sec 147: death or life imprisonment)', 'Section 152 replaces colonial Sedition (IPC 124A)', 'Explicit safe harbor for lawful criticism of Government measures'],
  },
  {
    number: 'Chapter VIII',
    name: 'Offences Relating to the Army, Navy and Air Force',
    sections: 'Sections 159 – 168',
    summary: 'Abetment of mutiny, seduction of defence personnel, desertion, wearing uniform or carrying tokens of armed forces fraudulently.',
    keyPoints: ['Mutiny abetment punishable with death or life (Sec 160)', 'Protection of special military statutes (Army, Navy, Air Force Acts: Sec 167)'],
  },
  {
    number: 'Chapter IX',
    name: 'Of Offences Relating to Elections',
    sections: 'Sections 169 – 177',
    summary: 'Bribery, undue influence, personation at elections, false statements about candidates, illegal election expenses, and failure to keep accounts.',
    keyPoints: ['Bribery at elections (Sec 170, 173)', 'Undue influence and spiritual censure threats (Sec 171)', 'Treating (food/drink bribery) punishable with fine only'],
  },
  {
    number: 'Chapter X',
    name: 'Offences Relating to Coin, Currency-Notes and Stamps',
    sections: 'Sections 178 – 188',
    summary: 'Counterfeiting coin, currency-notes, bank-notes, and revenue stamps, possession of counterfeits, and making tools for forging.',
    keyPoints: ['Counterfeiting currency or stamps (Sec 178: life imprisonment or 10 yrs)', 'Making documents resembling currency notes (Sec 182)'],
  },
  {
    number: 'Chapter XI',
    name: 'Of Offences Against Public Tranquillity',
    sections: 'Sections 189 – 197',
    summary: 'Unlawful assembly (5+ persons), constructive liability of members, rioting, affray, promoting enmity between religious/linguistic groups (Sec 196), and assertions prejudicial to national integration (Sec 197).',
    keyPoints: ['Unlawful assembly defined (Sec 189)', 'Constructive liability under common object (Sec 190)', 'Rioting with deadly weapons (Sec 191(3): 5 yrs)', 'Promoting communal enmity in places of worship (Sec 196(2): 5 yrs)'],
  },
  {
    number: 'Chapter XII',
    name: 'Of Offences by or Relating to Public Servants',
    sections: 'Sections 198 – 205',
    summary: 'Public servants disobeying law to cause injury, failure to record FIR for sexual offences (Sec 199), hospitals refusing victim treatment (Sec 200), unlawful trading, and personation of public servants.',
    keyPoints: ['Mandatory FIR duty for crimes against women; failure is criminalised (Sec 199)', 'Hospital non-treatment of victims penalised (Sec 200)', 'Impersonating public servants (Sec 204)'],
  },
  {
    number: 'Chapter XIII',
    name: 'Of Contempts of Lawful Authority of Public Servants',
    sections: 'Sections 206 – 226',
    summary: 'Absconding to avoid summons, preventing service, omission to produce documents, furnishing false info, disobedience to orders promulgated by public servants (Sec 223), and attempting suicide to coerce public servants (Sec 226).',
    keyPoints: ['Non-appearance to proclamation under BNSS Sec 84 (Sec 209: up to 7 yrs)', 'Disobedience to public orders (Sec 223 - replaces IPC 188)', 'Coercive suicide attempts against public officials penalised (Sec 226)'],
  },
  {
    number: 'Chapter XIV',
    name: 'Of False Evidence and Offences Against Public Justice',
    sections: 'Sections 227 – 269',
    summary: 'Perjury, fabricating false evidence, giving false evidence to procure capital punishment, threatening witnesses (Sec 232), destroying evidence (Sec 238), false criminal charges (Sec 248), and harbouring offenders.',
    keyPoints: ['Perjury and fabrication in judicial proceedings (Sec 227-229: up to 7 yrs)', 'Capital perjury causing innocent execution: death penalty (Sec 230(2))', 'Threatening witnesses (Sec 232)', 'Screening offenders and destroying evidence (Sec 238)'],
  },
  {
    number: 'Chapter XV',
    name: 'Offences Affecting Public Health, Safety, Convenience & Decency',
    sections: 'Sections 270 – 297',
    summary: 'Public nuisance, spreading infectious diseases, food & drug adulteration, water fouling, rash driving on public roads (Sec 281), navigation negligence, and sale of obscene literature (including digital forms).',
    keyPoints: ['Public nuisance (Sec 270)', 'Food & drug adulteration (Sec 274-278)', 'Rash driving on public way (Sec 281 - replaces IPC 279)', 'Obscenity definition expanded to electronic and digital formats (Sec 294)'],
  },
  {
    number: 'Chapter XVI',
    name: 'Of Offences Relating to Religion',
    sections: 'Sections 298 – 302',
    summary: 'Defiling places of worship, deliberate acts outraging religious feelings, disturbing religious assemblies, trespassing on burial places, and uttering words to wound religious feelings.',
    keyPoints: ['Defiling places of worship (Sec 298: 2 yrs)', 'Deliberate insults to religious beliefs (Sec 299: 3 yrs)', 'Disturbing religious worship (Sec 300)'],
  },
  {
    number: 'Chapter XVII',
    name: 'Of Offences Against Property',
    sections: 'Sections 303 – 334',
    summary: 'Theft (with community service for first-time < ₹5,000), Snatching (Sec 304), extortion, robbery, dacoity, criminal misappropriation, criminal breach of trust (EPF/ESI defaults), stolen property, cheating, mischief, and house-breaking.',
    keyPoints: ['Theft defined with 16 illustrations and Community Service proviso (Sec 303)', 'New offence of Snatching (Sec 304: up to 3 yrs)', 'Dacoity with murder punishable with death or life (Sec 310(3))', 'Graduated penalties for Mischief based on damage value (Sec 324)'],
  },
  {
    number: 'Chapter XVIII',
    name: 'Of Offences Relating to Documents and Property Marks',
    sections: 'Sections 335 – 350',
    summary: 'Making false electronic records and documents, electronic signature forgery, forging court records, Aadhaar, voter ID (Sec 337), wills/valuable securities, falsification of accounts, and false property marks.',
    keyPoints: ['Forgery explicitly covers electronic records & signatures (Sec 335)', 'Forging Aadhaar, Voter ID, court registers (Sec 337: up to 7 yrs)', 'Falsification of accounts by employees (Sec 344)'],
  },
  {
    number: 'Chapter XIX',
    name: 'Criminal Intimidation, Insult, Annoyance, Defamation',
    sections: 'Sections 351 – 356',
    summary: 'Criminal intimidation, intentional insult, spreading false information / rumours electronically (Sec 353), public intoxication (Sec 355: community service), and Defamation with 10 statutory exceptions and community service option (Sec 356).',
    keyPoints: ['Circulating false information / fake news electronically (Sec 353)', 'Public drunkenness punishable with 24 hours, fine, or Community Service (Sec 355)', 'Defamation (Sec 356) retains 10 historic exceptions and adds Community Service alternative'],
  },
  {
    number: 'Chapter XX',
    name: 'Repeal and Savings',
    sections: 'Sections 357 – 358',
    summary: 'Breach of contract to attend helpless person, statutory repeal of the Indian Penal Code (45 of 1860), saving previous proceedings, investigations, rights, liabilities, and applying General Clauses Act principles.',
    keyPoints: ['The Indian Penal Code (1860) is expressly repealed (Sec 358(1))', 'Pending cases, investigations, and past liabilities continue under saved proceedings'],
  },
]

export const bnsCoreSections = [
  {
    section: 'Section 1',
    chapter: 'Chapter I: Preliminary',
    title: 'Short Title, Extent and Application',
    ipcEquivalent: 'Sections 1, 2, 3, 4 IPC',
    description:
      'Establishes the code as the Bharatiya Nyaya Sanhita, 2023. Extends criminal liability within India, to Indian citizens committing offences abroad, persons on registered Indian ships/aircraft, and any person worldwide targeting computer resources located in India.',
    punishment: 'Jurisdictional baseline for all penal enforcement across India and extraterritorially.',
    keyIllustration:
      'A, an Indian citizen, commits murder in country X. A can be arrested, tried, and convicted of murder in any place in India where he may be found.',
    tags: ['Jurisdiction', 'Cybercrime', 'Extraterritorial'],
  },
  {
    section: 'Section 2',
    chapter: 'Chapter I: Preliminary',
    title: 'Definitions (39 Codified Terms)',
    ipcEquivalent: 'Sections 6 to 52A IPC',
    description:
      'Consolidates all primary criminal definitions into 39 alphabetical clauses. Key updates: Child is strictly defined as under 18 years (cl. 3); Document explicitly includes electronic and digital records (cl. 8); Gender specifies pronoun "he" applies to male, female, or transgender (cl. 10); Public servant includes government company and local authority personnel (cl. 28).',
    punishment: 'Interpretative foundation governing every operative penal clause.',
    keyIllustration:
      'Bank cheques, power-of-attorney, maps, electronic emails, digital server logs, and smart contracts all qualify as "documents" under Section 2(8).',
    tags: ['Definitions', 'Child', 'Gender', 'Digital Records'],
  },
  {
    section: 'Section 4',
    chapter: 'Chapter II: Of Punishments',
    title: 'The Six Types of Punishments',
    ipcEquivalent: 'Section 53 IPC',
    description:
      'Prescribes the six statutory punishments: (a) Death; (b) Imprisonment for life; (c) Imprisonment (Rigorous or Simple); (d) Forfeiture of property; (e) Fine; and (f) Community Service. Community Service represents a landmark rehabilitative shift.',
    punishment: 'Death, Life Imprisonment, Imprisonment (up to life/terms), Property Forfeiture, Fine, or Community Service.',
    keyIllustration:
      'For small-scale property theft under ₹5,000, public drunkenness, or minor defamation, judges can mandate court-supervised community service instead of prison overcrowding.',
    tags: ['Punishments', 'Community Service', 'Life Sentence'],
  },
  {
    section: 'Section 14',
    chapter: 'Chapter III: General Exceptions',
    title: 'Act Done by Person Bound, or by Mistake of Fact in Good Faith',
    ipcEquivalent: 'Section 76 IPC',
    description:
      'Nothing is an offence done by a person who is, or by reason of a mistake of fact and not a mistake of law in good faith believes himself to be, bound by law to do it.',
    punishment: 'Complete exemption from criminal liability (General Exception).',
    keyIllustration:
      'A, a soldier, fires on an unlawful violent mob under the legal order of his superior officer. A has committed no offence.',
    tags: ['General Exception', 'Mistake of Fact', 'Good Faith'],
  },
  {
    section: 'Section 18',
    chapter: 'Chapter III: General Exceptions',
    title: 'Accident in Doing a Lawful Act',
    ipcEquivalent: 'Section 80 IPC',
    description:
      'Exempts acts done by accident or misfortune, without criminal intention or knowledge, in the doing of a lawful act in a lawful manner by lawful means and with proper care and caution.',
    punishment: 'Complete exemption from criminal liability.',
    keyIllustration:
      'A is working with a hatchet with proper care; the head suddenly flies off and kills a passerby. The act is excusable accident and not an offence.',
    tags: ['Accident', 'Lack of Mens Rea', 'Lawful Act'],
  },
  {
    section: 'Section 19',
    chapter: 'Chapter III: General Exceptions',
    title: 'Doctrine of Necessity (Preventing Greater Harm)',
    ipcEquivalent: 'Section 81 IPC',
    description:
      'An act done with knowledge that it is likely to cause harm, but done without criminal intention to cause harm, and in good faith to prevent or avoid imminent greater harm to person or property.',
    punishment: 'Complete exemption from criminal liability.',
    keyIllustration:
      'A, during a ferocious city fire, pulls down neighboring houses in good faith to stop the conflagration from engulfing the entire settlement. A is not guilty of an offence.',
    tags: ['Necessity', 'Good Faith', 'Emergency'],
  },
  {
    section: 'Section 20 & 21',
    chapter: 'Chapter III: General Exceptions',
    title: 'Acts of Children (Doli Incapax & Immature Understanding)',
    ipcEquivalent: 'Sections 82 & 83 IPC',
    description:
      'Section 20 grants absolute immunity: nothing is an offence done by a child under 7 years of age. Section 21 provides qualified immunity for a child between 7 and 12 years who has not attained sufficient maturity of understanding.',
    punishment: 'Complete defence / juvenile justice jurisdiction.',
    keyIllustration:
      'A 6-year-old child picks up a loaded firearm and discharges it. The child cannot be charged with a criminal offence.',
    tags: ['Children', 'Doli Incapax', 'Juvenile Defence'],
  },
  {
    section: 'Section 22',
    chapter: 'Chapter III: General Exceptions',
    title: 'Act of Person of Unsound Mind (Insanity Defence)',
    ipcEquivalent: 'Section 84 IPC',
    description:
      'Nothing is an offence done by a person who, at the time of doing it, by reason of unsoundness of mind, is incapable of knowing the nature of the act, or that he is doing what is either wrong or contrary to law.',
    punishment: 'Complete defence against criminal conviction.',
    keyIllustration:
      'Codifies the established cognitive insanity test: the mental unsoundness must completely deprive the accused of understanding the moral or legal wrongness of the act.',
    tags: ['Insanity', 'Mental Health', 'Legal Incapacity'],
  },
  {
    section: 'Section 23',
    chapter: 'Chapter III: General Exceptions',
    title: 'Involuntary Intoxication',
    ipcEquivalent: 'Section 85 IPC',
    description:
      'Protects a person who commits an act while incapable of knowing its nature or wrongfulness due to intoxication, provided the intoxicating substance was administered without their knowledge or against their will.',
    punishment: 'Complete defence (involuntary administration only).',
    keyIllustration:
      'If a person is spiked at a social gathering without their knowledge and subsequently behaves erratically, Section 23 applies; voluntary drinking does not qualify.',
    tags: ['Involuntary Intoxication', 'Spiking', 'Defence'],
  },
  {
    section: 'Section 30',
    chapter: 'Chapter III: General Exceptions',
    title: 'Medical / Good Faith Acts Without Consent in Emergency',
    ipcEquivalent: 'Section 92 IPC',
    description:
      'Protects surgeons and emergency responders who cause harm or risk death in good faith for a person’s benefit when it is impossible to obtain consent in time and no lawful guardian is reachable.',
    punishment: 'Complete legal protection for emergency medical treatment.',
    keyIllustration:
      'Z is thrown from his horse and is insensible. Surgeon A performs an emergency trepan operation before Z regains consciousness to save his life. A commits no offence.',
    tags: ['Medical Protection', 'Emergency Care', 'Surgeon Defence'],
  },
  {
    section: 'Section 34 – 44',
    chapter: 'Chapter III: General Exceptions',
    title: 'Right of Private Defence (Self & Property)',
    ipcEquivalent: 'Sections 96 to 106 IPC',
    description:
      'Every person has a right to defend their own body and another’s body against offences affecting the human body, and property against theft, robbery, mischief, or criminal trespass. Section 38 lists 7 situations where defence of body extends to causing death (apprehension of death, grievous hurt, rape, unnatural lust, kidnapping/abduction, wrongful confinement, or acid attacks). Section 41 lists 4 situations for property (robbery, housebreaking by night, arson to dwelling/vessel, and theft/mischief causing death/grievous hurt fear).',
    punishment: 'Acts done in lawful exercise of private defence are not offences.',
    keyIllustration:
      'Section 38(g) explicitly adds throwing or administering acid (or attempts) as a justification for exercising private defence up to causing death of the assailant.',
    tags: ['Private Defence', 'Self Defence', 'Acid Attack Defence', 'Property Defence'],
  },
  {
    section: 'Section 58 & 59',
    chapter: 'Chapter IV: Abetment & Conspiracy',
    title: 'Concealing Design to Commit Offence Using Encryption',
    ipcEquivalent: 'Modern BNS Addition (Expanding IPC 118-119)',
    description:
      'Whoever voluntarily conceals the existence of a design to commit an offence through any act, omission, or by the use of encryption or any other information hiding tool, or makes false representations, is punished with imprisonment up to 7 years (3 years if offence not committed) and fine.',
    punishment: 'Up to 7 years imprisonment (if committed) or 3 years + fine. Public servants face up to 10 years.',
    keyIllustration:
      'Using encrypted channels or steganography to conceal blueprints for an impending terrorist strike or bank heist directly attracts liability under Section 58.',
    tags: ['Encryption', 'Cybercrime', 'Concealment', 'Digital Evidence'],
  },
  {
    section: 'Section 63 & 64',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Rape: Definition, Strict Consent, and Aggravated Penalties',
    ipcEquivalent: 'Sections 375 & 376 IPC',
    description:
      'Comprehensive definition of rape covering penile and non-penile penetration, oral sex, and manipulation without consent. Explanation 2 codifies that consent requires unequivocal voluntary agreement; physical non-resistance does not imply consent. Aggravated rape (by police, public servants, armed personnel, hospital staff, teachers, guardians, or during communal violence) carries minimum 10 years up to natural life imprisonment.',
    punishment: 'Rigorous imprisonment: minimum 10 years up to life imprisonment. Custodial/Aggravated: min 10 years to natural life + fine.',
    keyIllustration:
      'Any abuse of position of dominance, custodial authority, or hospital trust results in mandatory natural life sentencing under Section 64(2).',
    tags: ['Rape', 'Women Safety', 'Consent Standard', 'Aggravated Offence'],
  },
  {
    section: 'Section 65',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Punishment for Rape of Minor Girls (Under 16 & Under 12)',
    ipcEquivalent: 'Sections 376DA, 376DB IPC',
    description:
      'Rape of a female under 16 years: minimum 20 years up to natural life imprisonment and fine. Rape of a female under 12 years: minimum 20 years up to imprisonment for remainder of natural life, or death penalty. Fines are statutorily earmarked for victim medical expenses and rehabilitation.',
    punishment: 'Under 16: Min 20 yrs to natural life. Under 12: Min 20 yrs to natural life OR Death + mandatory victim restitution fine.',
    keyIllustration:
      'All fines imposed under Section 65 are legally mandated to be paid directly to the victim for medical care and rehabilitation.',
    tags: ['POCSO Alignment', 'Child Rape', 'Capital Punishment', 'Victim Compensation'],
  },
  {
    section: 'Section 66',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Rape Causing Death or Persistent Vegetative State',
    ipcEquivalent: 'Section 376A IPC',
    description:
      'Committing rape and in the course inflicting injury causing the victim’s death or causing the victim to be in a persistent vegetative state.',
    punishment: 'Rigorous imprisonment: minimum 20 years up to remainder of natural life, or Death.',
    keyIllustration:
      'Enacted to address extreme brutality cases where victims suffer brain death or irreversible vegetative conditions.',
    tags: ['Vegetative State', 'Capital Punishment', 'Cruelty'],
  },
  {
    section: 'Section 69',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Sexual Intercourse by Deceitful Means / False Promise to Marry',
    ipcEquivalent: 'New Distinct Provision (previously prosecuted under IPC 417/375)',
    description:
      'Whoever, by deceitful means or by making promise to marry a woman without any intention of fulfilling it, has sexual intercourse with her not amounting to rape. Deceitful means explicitly includes inducement for employment, promotion, or marrying by suppressing identity.',
    punishment: 'Imprisonment up to 10 years and fine.',
    keyIllustration:
      'A man creates a fake profile hiding his real religious identity or marital status, induces a woman into sexual cohabitation with a false promise of marriage, and subsequently abandons her.',
    tags: ['False Promise to Marry', 'Deceitful Means', 'Identity Suppression'],
  },
  {
    section: 'Section 70',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Gang Rape',
    ipcEquivalent: 'Section 376D, 376DA, 376DB IPC',
    description:
      'Where a woman is raped by one or more persons constituting a group or acting in furtherance of common intention, each person is punished with minimum 20 years up to natural life imprisonment. If the victim is under 18 years, punishment is imprisonment for natural life or death.',
    punishment: 'Adult victim: Min 20 years to natural life. Minor victim (<18): Remainder of natural life or Death + fine.',
    keyIllustration:
      'Every member of the group acting together is held liable as a principal perpetrator regardless of their individual physical role.',
    tags: ['Gang Rape', 'Minor Gang Rape', 'Strict Liability'],
  },
  {
    section: 'Section 78',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Stalking (Physical and Cyber Stalking)',
    ipcEquivalent: 'Section 354D IPC',
    description:
      'Following a woman and attempting repeated contact despite clear disinterest, or monitoring a woman’s internet, email, or electronic communication.',
    punishment: 'First conviction: up to 3 years + fine. Second/subsequent conviction: up to 5 years + fine.',
    keyIllustration:
      'Installing spyware on a phone, repeatedly sending unsolicited messages across social media, or tracking location after being told to stop.',
    tags: ['Cyber Stalking', 'Digital Harassment', 'Women Safety'],
  },
  {
    section: 'Section 80',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Dowry Death',
    ipcEquivalent: 'Section 304B IPC',
    description:
      'Where a woman’s death is caused by burns, bodily injury, or occurs abnormally within 7 years of marriage, and it is shown that soon before death she was subjected to cruelty or harassment by her husband or in-laws in connection with dowry.',
    punishment: 'Imprisonment for not less than 7 years, extending up to imprisonment for life.',
    keyIllustration:
      'The husband and relatives are deemed by statutory presumption to have caused her death.',
    tags: ['Dowry Death', 'Marriage Law', 'Statutory Presumption'],
  },
  {
    section: 'Section 85 & 86',
    chapter: 'Chapter V: Offences Against Woman and Child',
    title: 'Cruelty by Husband or Relatives & Definition of Cruelty',
    ipcEquivalent: 'Section 498A IPC',
    description:
      'Section 85 penalises subjecting a married woman to cruelty. Section 86 defines cruelty into two limbs: (a) wilful conduct likely to drive the woman to suicide or cause grave mental/physical injury; (b) unlawful property/dowry harassment.',
    punishment: 'Imprisonment up to 3 years and fine.',
    keyIllustration:
      'Covers both persistent mental harassment and coercive property demands.',
    tags: ['Domestic Violence', 'Cruelty', 'Marriage Safeguards'],
  },
  {
    section: 'Section 103(1) & 103(2)',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Punishment for Murder & Mob Lynching',
    ipcEquivalent: 'Section 302 IPC (Expanded with 103(2))',
    description:
      'Sub-section (1): Whoever commits murder shall be punished with death or imprisonment for life and fine. Sub-section (2): When a group of 5 or more persons acting in concert commits murder on grounds of race, caste, community, sex, place of birth, language, personal belief or similar grounds, each member is punished with death or imprisonment for life.',
    punishment: 'Death or Life Imprisonment + fine.',
    keyIllustration:
      'A vigilante crowd of five individuals attacks and beats an individual to death over rumours concerning religious beliefs or community identity. Each participant faces death or life imprisonment under 103(2).',
    tags: ['Murder', 'Mob Lynching', 'Hate Crimes', 'Capital Punishment'],
  },
  {
    section: 'Section 106',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Death by Negligence & Hit-and-Run Offences',
    ipcEquivalent: 'Section 304A IPC (Heavily Reformed)',
    description:
      'Sub-section (1): Rash or negligent act causing death: up to 5 years + fine. If committed by a registered medical practitioner during medical procedures: up to 2 years + fine. Sub-section (2): Rash and negligent driving causing death, where the driver escapes without reporting to police or a Magistrate soon after: up to 10 years imprisonment and fine.',
    punishment: 'General negligence: up to 5 yrs. Doctors: up to 2 yrs. Hit-and-Run without reporting: up to 10 years + fine.',
    keyIllustration:
      'A motorist hits a pedestrian at high speed and speeds away to avoid detection without notifying authorities. This attracts Section 106(2) carrying up to a decade in prison.',
    tags: ['Hit and Run', 'Medical Negligence', 'Road Safety'],
  },
  {
    section: 'Section 111',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Organised Crime (Syndicates & Gangs)',
    ipcEquivalent: 'New Statutory Provision (previously under state laws like MCOCA)',
    description:
      'Penalises continuing unlawful activities (kidnapping, contract killing, extortion, land grabbing, cybercrime, trafficking, economic offences) by syndicates of 2 or more persons. If death results: death or life imprisonment + minimum ₹10 lakh fine. Other cases: min 5 years to life + min ₹5 lakh fine. Harbouring syndicate members or possessing syndicate property carries 3 years to life.',
    punishment: 'If death occurs: Death or Life Imprisonment + min ₹10,00,000 fine. Others: Min 5 yrs to life + min ₹5,00,000 fine.',
    keyIllustration:
      'An extortion syndicate operating interstate running contract killings, land grabs, and hawala money laundering is prosecuted under Section 111 with asset forfeiture.',
    tags: ['Organised Crime', 'Syndicates', 'Extortion', 'Land Grabbing'],
  },
  {
    section: 'Section 112',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Petty Organised Crime (Snatching, Paper Leaks, Betting)',
    ipcEquivalent: 'New Provision',
    description:
      'Whoever, as a member of a gang, commits acts of theft, snatching, cheating, unauthorised selling of tickets, gambling/betting, selling public examination question papers, card skimming, or ATM theft.',
    punishment: 'Imprisonment: minimum 1 year up to 7 years, and fine.',
    keyIllustration:
      'Gang networks orchestrating government competitive exam paper leaks or metro ticket scalping face minimum 1 to 7 years under Section 112.',
    tags: ['Petty Organised Crime', 'Paper Leaks', 'Card Skimming'],
  },
  {
    section: 'Section 113',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Terrorist Act (Codified in General Penal Law)',
    ipcEquivalent: 'New Provision (Aligned with UAPA 1967)',
    description:
      'Doing any act intending to threaten unity, integrity, sovereignty, or economic security of India, or striking terror using explosives, nuclear/biological materials, poisonous gases, or damaging monetary stability via counterfeit currency. Decided by an officer not below the rank of Superintendent of Police whether to register under BNS or UAPA.',
    punishment: 'If death results: Death or Life Imprisonment + fine. Other cases: Min 5 years to life imprisonment + fine.',
    keyIllustration:
      'Smuggling high-grade counterfeit currency to destabilise national financial stability or deploying hazardous chemicals in public transit is a Terrorist Act under Section 113.',
    tags: ['Terrorism', 'National Security', 'Counterfeit Currency', 'UAPA Interface'],
  },
  {
    section: 'Section 116 & 117',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Grievous Hurt: 8 Categories & Voluntarily Causing It',
    ipcEquivalent: 'Sections 320 & 325 IPC',
    description:
      'Section 116 restricts grievous hurt to 8 specific kinds: (a) Emasculation; (b) Permanent eye privation; (c) Permanent ear hearing loss; (d) Privation of member/joint; (e) Impairing powers of member/joint; (f) Permanent head/face disfiguration; (g) Fracture/dislocation of bone or tooth; (h) Hurt endangering life or causing 15 days severe bodily pain or inability to follow ordinary pursuits. (Section 117(3) adds: causing permanent disability or vegetative state: min 10 yrs to life).',
    punishment: 'General grievous hurt: up to 7 years + fine. Permanent disability/vegetative: min 10 years to natural life.',
    keyIllustration:
      'Section 117(4): When a group of 5 or more persons causes grievous hurt based on caste, race, sex, or language, each member is punished up to 7 years + fine.',
    tags: ['Grievous Hurt', 'Bodily Injury', 'Mob Assault'],
  },
  {
    section: 'Section 124',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Acid Attacks & Attempted Acid Attacks',
    ipcEquivalent: 'Sections 326A & 326B IPC',
    description:
      'Voluntarily causing grievous hurt, permanent damage, burns, or vegetative state by throwing or administering acid. Carries minimum 10 years up to life imprisonment, with fine designated to meet medical expenses. Attempting to throw acid carries 5 to 7 years imprisonment.',
    punishment: 'Acid attack: Min 10 years to life imprisonment + fine for victim medical treatment. Attempt: 5 to 7 years.',
    keyIllustration:
      'Explanation 2 clarifies that permanent damage or deformity is not required to be irreversible for conviction.',
    tags: ['Acid Attack', 'Victim Treatment', 'Permanent Deformity'],
  },
  {
    section: 'Section 143',
    chapter: 'Chapter VI: Human Body & Life',
    title: 'Trafficking of Persons (Child & Multi-Victim Penalties)',
    ipcEquivalent: 'Section 370 IPC',
    description:
      'Recruiting, transporting, harbouring, transferring, or receiving persons for exploitation using force, fraud, abduction, or abuse of power. Multi-victim trafficking: 10 years to life. Child trafficking: 10 years to life. Multiple children: 14 years to life. Public servant or police involvement: imprisonment for remainder of natural life.',
    punishment: 'Base: 7-10 yrs. Child: 10 yrs to life. Public servant involvement: Remainder of natural life + fine.',
    keyIllustration:
      'Explanation 2 explicitly confirms that the consent of the trafficked victim is completely immaterial to the commission of the offence.',
    tags: ['Human Trafficking', 'Child Protection', 'Public Servant Liability'],
  },
  {
    section: 'Section 152',
    chapter: 'Chapter VII: Offences Against State',
    title: 'Act Endangering Sovereignty, Unity and Integrity of India',
    ipcEquivalent: 'Replaces Colonial Sedition (Section 124A IPC)',
    description:
      'Purposely or knowingly exciting or attempting to excite secession, armed rebellion, or subversive activities, or encouraging separatist feelings endangering the sovereignty or unity of India through spoken/written words, electronic communication, or financial means. Explanation: Comments expressing disapprobation of government measures or actions to seek alterations by lawful means do NOT constitute an offence.',
    punishment: 'Imprisonment for life or imprisonment up to 7 years, and fine.',
    keyIllustration:
      'Financing or organising armed separatist insurrections is punishable under Section 152. Robust public criticism of state policy is protected by the explicit explanation.',
    tags: ['Sovereignty', 'Free Speech Protection', 'Anti-Secession'],
  },
  {
    section: 'Section 171',
    chapter: 'Chapter VIII: Offences Relating to Elections',
    title: 'Bribery & Undue Influence at Elections',
    ipcEquivalent: 'Sections 171B, 171C, 171E IPC',
    description:
      'Giving or accepting gratification for inducing any person to exercise any electoral right, or threatening injury to induce an elector to vote or refrain from voting.',
    punishment: 'Imprisonment up to 1 year, or fine, or both (bribery by treating punishable with fine only).',
    keyIllustration:
      'Distributing cash or goods to voter colonies to influence ballot casting is prosecuted under Section 171.',
    tags: ['Elections', 'Anti-Corruption', 'Democratic Rights'],
  },
  {
    section: 'Section 189',
    chapter: 'Chapter XI: Public Tranquillity',
    title: 'Unlawful Assembly & Rioting Prevention',
    ipcEquivalent: 'Sections 141 & 143 IPC',
    description:
      'An assembly of 5 or more persons with common object to overawe by criminal force the Central or State Government, resist execution of any law, commit mischief or criminal trespass, or enforce any right by criminal force.',
    punishment: 'Imprisonment up to 6 months, or fine, or both.',
    keyIllustration:
      'A mob armed with sticks blocking a highway and forcibly stopping emergency vehicles constitutes an unlawful assembly under Section 189.',
    tags: ['Unlawful Assembly', 'Public Order', 'Mob Prevention'],
  },
  {
    section: 'Section 191',
    chapter: 'Chapter XI: Public Tranquillity',
    title: 'Rioting with Deadly Weapons',
    ipcEquivalent: 'Sections 146, 147, 148 IPC',
    description:
      'Whenever force or violence is used by an unlawful assembly or any member in prosecution of common object, every member is guilty of rioting. Enhanced punishment when armed with deadly weapon or anything likely to cause death.',
    punishment: 'Base rioting: up to 2 years + fine. Armed with deadly weapons: up to 5 years + fine.',
    keyIllustration:
      'Members of an unlawful assembly who pelt stones and smash public transport vehicles are jointly liable for rioting under Section 191.',
    tags: ['Rioting', 'Deadly Weapons', 'Joint Liability'],
  },
  {
    section: 'Section 194',
    chapter: 'Chapter XI: Public Tranquillity',
    title: 'Affray in a Public Place',
    ipcEquivalent: 'Sections 159 & 160 IPC',
    description:
      'When two or more persons, by fighting in a public place, disturb the public peace, they are said to commit an affray.',
    punishment: 'Imprisonment up to 1 month, or fine up to ₹1,000, or both.',
    keyIllustration:
      'A brawl erupting between rival groups on a crowded public roadway disrupting traffic and terrifying pedestrians is booked as an affray under Section 194.',
    tags: ['Affray', 'Public Peace', 'Street Brawl'],
  },
  {
    section: 'Section 196',
    chapter: 'Chapter XI: Public Tranquillity',
    title: 'Promoting Enmity Between Different Groups (Hate Speech)',
    ipcEquivalent: 'Section 153A IPC',
    description:
      'Promoting or attempting to promote disharmony, feelings of enmity, hatred or ill-will between different religious, racial, language or regional groups, or castes/communities by words, signs, visible representations, or electronic communications.',
    punishment: 'Imprisonment up to 3 years or fine, or both. In places of worship: up to 5 years + fine.',
    keyIllustration:
      'Circulating inflammatory video clips or speeches online calling for boycotting or attacking a community is penalized under Section 196.',
    tags: ['Hate Speech', 'Communal Harmony', 'Digital Propagation'],
  },
  {
    section: 'Section 199',
    chapter: 'Chapter XII: Public Servants',
    title: 'Public Servant Disobeying Law (Refusal to Register Rape FIR)',
    ipcEquivalent: 'Section 166A IPC',
    description:
      'Punishes public servants who disobey directions of law or fail to record information under Section 173(1) of BNSS relating to cognizable sexual offences (Sections 64, 65, 70, 74, 76, 77, 79, 124, 143).',
    punishment: 'Rigorous imprisonment: minimum 6 months up to 2 years, and fine.',
    keyIllustration:
      'A police station house officer who turns away a sexual assault or stalking victim without registering an FIR faces mandatory prosecution under Section 199.',
    tags: ['Police Accountability', 'Mandatory FIR', 'Zero Tolerance'],
  },
  {
    section: 'Section 223',
    chapter: 'Chapter XIII: Contempts of Public Servants',
    title: 'Disobedience to Order Promulgated by Public Servant',
    ipcEquivalent: 'Section 188 IPC',
    description:
      'Disobeying lawful orders promulgated by authorized public officials (e.g. curfew or prohibitory assembly orders). If causing obstruction/annoyance: up to 6 months. If causing danger to human life or riot: up to 1 year + fine.',
    punishment: 'Simple imprisonment up to 6 months (or 1 year if danger of riot/life) + fine.',
    keyIllustration:
      'Violating Section 163 BNSS (old Sec 144 CrPC) prohibitory assembly orders is booked under Section 223 BNS.',
    tags: ['Public Orders', 'Curfew Violation', 'Administrative Orders'],
  },
  {
    section: 'Section 227 – 229',
    chapter: 'Chapter XIV: False Evidence',
    title: 'Giving & Fabricating False Evidence (Perjury)',
    ipcEquivalent: 'Sections 191, 192, 193 IPC',
    description:
      'Giving false statements under oath or fabricating false entries in records/electronic logs intended to mislead judicial proceedings. Section 230(2): If false evidence results in an innocent person being convicted and executed, the perjurer faces the Death Penalty.',
    punishment: 'In judicial proceedings: up to 7 years + fine. Capital perjury with execution: Death penalty.',
    keyIllustration:
      'Planting fabricated digital evidence or forging physical signatures in a court deposition is punishable under Section 229.',
    tags: ['Perjury', 'Judicial Integrity', 'Capital Perjury'],
  },
  {
    section: 'Section 281',
    chapter: 'Chapter XV: Public Safety',
    title: 'Rash Driving or Riding on a Public Way',
    ipcEquivalent: 'Section 279 IPC',
    description:
      'Driving any vehicle, or riding, on any public way in a manner so rash or negligent as to endanger human life, or to be likely to cause hurt or injury to any person.',
    punishment: 'Imprisonment up to 6 months, or fine up to ₹1,000, or both.',
    keyIllustration:
      'Reckless speeding or stunt driving through crowded pedestrian thoroughfares is charged under Section 281.',
    tags: ['Traffic Offence', 'Rash Driving', 'Road Safety'],
  },
  {
    section: 'Section 303',
    chapter: 'Chapter XVII: Offences Against Property',
    title: 'Theft & Community Service Proviso',
    ipcEquivalent: 'Sections 378 & 379 IPC',
    description:
      'Dishonestly taking any movable property out of the possession of any person without consent. Accompanied by 16 official illustrations. Section 303(2) Proviso: When stolen property value is less than ₹5,000 and the person is a first-time convict, upon returning or restoring the property, they shall be punished with Community Service.',
    punishment: 'Imprisonment up to 3 years or fine or both. Repeat offenders: min 1 to 5 yrs. First-time theft < ₹5,000: Community Service.',
    keyIllustration:
      'A first-time offender who steals groceries worth ₹1,200 and returns them can be sentenced by the magistrate to clean a public park or volunteer at a municipal shelter instead of jail.',
    tags: ['Theft', 'Community Service', 'Restorative Justice', 'Property'],
  },
  {
    section: 'Section 304',
    chapter: 'Chapter XVII: Offences Against Property',
    title: 'Snatching (New Codified Offence)',
    ipcEquivalent: 'New Offence (previously booked under IPC 379/392)',
    description:
      'Theft is snatching if, in order to commit theft, the offender suddenly, quickly, or forcibly seizes, secures, grabs, or takes away from any person or from their possession any movable property.',
    punishment: 'Imprisonment of either description up to 3 years, and fine.',
    keyIllustration:
      'Two bike riders speeding past a pedestrian on a sidewalk and violently grabbing her gold chain or mobile phone are prosecuted specifically under Section 304.',
    tags: ['Snatching', 'Street Crime', 'Chain Snatching'],
  },
  {
    section: 'Section 308',
    chapter: 'Chapter XVII: Offences Against Property',
    title: 'Extortion (Including Electronic Threats)',
    ipcEquivalent: 'Sections 383 & 384 IPC',
    description:
      'Intentionally putting any person in fear of injury to induce delivery of property or valuable security. Illustration (e) explicitly covers sending digital extortion messages via electronic devices.',
    punishment: 'Imprisonment up to 7 years, or fine, or both.',
    keyIllustration:
      'Sending an encrypted SMS or email threatening to harm a child unless a ransom is wired into an account constitutes extortion under Section 308.',
    tags: ['Extortion', 'Blackmail', 'Cyber Threats'],
  },
  {
    section: 'Section 309 & 310',
    chapter: 'Chapter XVII: Offences Against Property',
    title: 'Robbery & Dacoity',
    ipcEquivalent: 'Sections 390, 391, 395, 396 IPC',
    description:
      'Robbery is theft or extortion accompanied by causing or threatening instant death, hurt, or wrongful restraint. Dacoity is when 5 or more persons conjointly commit or attempt robbery. If any dacoit commits murder during the dacoity (Sec 310(3)), all members face death or life imprisonment.',
    punishment: 'Robbery: up to 10 years (14 yrs on highway at night). Dacoity: Life imprisonment or 10 yrs. Dacoity with murder: Death or Life.',
    keyIllustration:
      'Section 311 mandates a minimum of 7 years if a deadly weapon is used or grievous hurt is caused during robbery or dacoity.',
    tags: ['Robbery', 'Dacoity', 'Highway Robbery', 'Deadly Weapons'],
  },
  {
    section: 'Section 316',
    chapter: 'Chapter XVII: Offences Against Property',
    title: 'Criminal Breach of Trust (Includes EPF & ESI Defaults)',
    ipcEquivalent: 'Sections 405 & 406 IPC',
    description:
      'Dishonest misappropriation of entrusted property or violation of trust contracts. Explanations 1 & 2 explicitly state that employers who deduct EPF or ESI contributions from employee wages and fail to deposit them with the statutory fund are guilty of criminal breach of trust.',
    punishment: 'General: up to 5 years + fine. Public servant, banker, or merchant: Life imprisonment or up to 10 years + fine.',
    keyIllustration:
      'A factory owner deducts pension and medical fund amounts from 200 workers’ salaries but diverts the capital into personal accounts.',
    tags: ['Breach of Trust', 'Employee Rights', 'EPF / ESI', 'Corporate Crime'],
  },
  {
    section: 'Section 318',
    chapter: 'Chapter XVII: Offences Against Property',
    title: 'Cheating & Inducing Delivery of Property',
    ipcEquivalent: 'Sections 415 & 420 IPC',
    description:
      'Deceiving any person fraudulently or dishonestly to deliver property or consent to retention of property. Section 318(4) corresponds to old Section 420 IPC (cheating and dishonestly inducing delivery of valuable security).',
    punishment: 'Simple cheating: up to 3 years. Cheating with delivery of property (420 equivalent): up to 7 years + fine.',
    keyIllustration:
      'Selling fake investment schemes, counterfeit luxury goods with forged maker marks, or taking loan advances on non-existent collateral.',
    tags: ['Cheating', 'Section 420 Equivalent', 'Fraud'],
  },
  {
    section: 'Section 324',
    chapter: 'Chapter XVII: Offences Against Property',
    title: 'Mischief (Graduated Penalties by Monetary Loss)',
    ipcEquivalent: 'Sections 425 to 427 IPC',
    description:
      'Causing destruction of property or diminishing its value with intent to cause wrongful loss. Features graduated penalties based on monetary valuation: sub-sec (4): damage between ₹20,000 and ₹1,00,000 carries up to 2 years; sub-sec (5): damage of ₹1,00,000 or upwards carries up to 5 years.',
    punishment: 'General: up to 6 months. Public property: up to 1 yr. ₹20k–₹1 lakh: up to 2 yrs. Above ₹1 lakh: up to 5 yrs.',
    keyIllustration:
      'Vandalising a public monument or setting fire to commercial inventory worth over ₹1 lakh brings elevated 5-year imprisonment under 324(5).',
    tags: ['Mischief', 'Property Damage', 'Monetary Brackets'],
  },
  {
    section: 'Section 335 & 336',
    chapter: 'Chapter XVIII: Documents & Forgery',
    title: 'Making False Electronic Records & Forgery',
    ipcEquivalent: 'Sections 463, 464, 465 IPC',
    description:
      'Comprehensively integrates the Information Technology Act, 2000. Covers unauthorized generation, transmission, or affixing of electronic signatures on digital records with intent to defraud.',
    punishment: 'Forgery: up to 2 years. Forgery for cheating: up to 7 years + fine.',
    keyIllustration:
      'Altering a digital PDF agreement or forging an electronic signature to claim inheritance of property.',
    tags: ['Forgery', 'Electronic Records', 'Digital Signatures'],
  },
  {
    section: 'Section 337',
    chapter: 'Chapter XVIII: Documents & Forgery',
    title: 'Forging Court Records, Aadhaar Cards & Public Registers',
    ipcEquivalent: 'Section 466 IPC (Modernized)',
    description:
      'Forging any document or electronic record purporting to be a court proceeding, birth/death/marriage register, or government identity document including Voter ID or Aadhaar Card.',
    punishment: 'Imprisonment of either description up to 7 years, and fine.',
    keyIllustration:
      'Creating or circulating counterfeit Aadhaar cards or forged digital electoral identity cards is directly penalised under Section 337.',
    tags: ['Aadhaar Forgery', 'Voter ID', 'Public Records'],
  },
  {
    section: 'Section 353',
    chapter: 'Chapter XIX: Criminal Intimidation & Defamation',
    title: 'Statements Conducing to Public Mischief & Fake News',
    ipcEquivalent: 'Section 505 IPC',
    description:
      'Publishing or circulating any statement, false information, rumour, or alarming report (including through electronic means) with intent to cause mutiny, public terror, or incite communal hatred between classes. In places of worship: up to 5 years.',
    punishment: 'General: up to 3 years + fine. In places of worship: up to 5 years + fine.',
    keyIllustration:
      'Broadcasting viral fabricated deepfakes or false communally charged rumours on messaging platforms to provoke street clashes.',
    tags: ['Fake News', 'Public Mischief', 'Cyber Rumours', 'Hate Speech'],
  },
  {
    section: 'Section 355',
    chapter: 'Chapter XIX: Criminal Intimidation & Defamation',
    title: 'Misconduct in Public by a Drunken Person',
    ipcEquivalent: 'Section 510 IPC',
    description:
      'Appearing in an intoxicated state in a public place or during trespass and causing annoyance to any person.',
    punishment: 'Simple imprisonment up to 24 hours, or fine up to ₹1,000, or both, OR Community Service.',
    keyIllustration:
      'Provides the magistrate discretion to sentence a disorderly public drunk to community service instead of jail.',
    tags: ['Public Drunkenness', 'Community Service', 'Minor Offence'],
  },
  {
    section: 'Section 356',
    chapter: 'Chapter XIX: Criminal Intimidation & Defamation',
    title: 'Defamation (10 Exceptions & Community Service Option)',
    ipcEquivalent: 'Sections 499 & 500 IPC',
    description:
      'Making or publishing imputations intending to harm the reputation of a person. Retains all 10 historic statutory exceptions (truth for public good, public servant conduct, court reporting, literary critique, good faith censure, accusations to authority, character protection, and cautionary warnings). Sub-section (2) introduces Community Service as an alternative punishment.',
    punishment: 'Simple imprisonment up to 2 years, or fine, or both, OR Community Service.',
    keyIllustration:
      'Publishing a verified investigative report for the public good is protected under Exception 1. Malicious libel can now be punished with restorative community service.',
    tags: ['Defamation', '10 Exceptions', 'Free Speech Balance', 'Community Service'],
  },
  {
    section: 'Section 358',
    chapter: 'Chapter XX: Repeal and Savings',
    title: 'Repeal of the Indian Penal Code (45 of 1860) & Savings',
    ipcEquivalent: 'Repeal Clause',
    description:
      'The Indian Penal Code (45 of 1860) is hereby repealed. Sub-section (2) ensures that previous operations, accrued rights, liabilities, and ongoing criminal investigations or trials are not disrupted, continuing as if the code had not been repealed under Section 6 of the General Clauses Act, 1897.',
    punishment: 'Statutory transitional saving mechanism.',
    keyIllustration:
      'Offences committed prior to the commencement of BNS continue to be investigated, charged, and tried under the Indian Penal Code, 1860.',
    tags: ['IPC Repeal', 'Savings Clause', 'Legal Transition'],
  },
]

export const ipcToBnsMatrix = [
  {
    offence: 'Murder',
    oldIpc: 'Section 302 IPC',
    newBns: 'Section 103(1) BNS',
    punishment: 'Death or Life Imprisonment + fine',
    changeNote: 'Section 103(2) now also specifically penalises Mob Lynching by groups of 5+ on grounds of caste, race, community, or language.',
  },
  {
    offence: 'Attempt to Murder',
    oldIpc: 'Section 307 IPC',
    newBns: 'Section 109 BNS',
    punishment: 'Up to 10 years + fine (Life imprisonment if hurt caused)',
    changeNote: 'Maintains core principle; streamlined into Chapter VI.',
  },
  {
    offence: 'Culpable Homicide Not Amounting to Murder',
    oldIpc: 'Section 304 IPC',
    newBns: 'Section 105 BNS',
    punishment: '5 to 10 years or Life Imprisonment + fine',
    changeNote: 'Refined intentional vs. knowledge limbs into single unified Section 105.',
  },
  {
    offence: 'Death by Rash/Negligent Act & Hit-and-Run',
    oldIpc: 'Section 304A IPC',
    newBns: 'Section 106(1) & 106(2) BNS',
    punishment: 'General: up to 5 yrs. Doctors: up to 2 yrs. Hit-and-Run without reporting: up to 10 yrs + fine',
    changeNote: 'Massive overhaul. Introduced 10-year aggravated punishment for hit-and-run drivers who flee without reporting.',
  },
  {
    offence: 'Rape',
    oldIpc: 'Sections 375 & 376 IPC',
    newBns: 'Sections 63 & 64 BNS',
    punishment: 'Min 10 years up to Life Imprisonment',
    changeNote: 'Placed upfront in Chapter V (Women & Child). Explicit statutory definition of non-resistance not constituting consent.',
  },
  {
    offence: 'Gang Rape',
    oldIpc: 'Section 376D IPC',
    newBns: 'Section 70 BNS',
    punishment: 'Adult victim: Min 20 yrs to natural life. Minor victim: Remainder of natural life or Death',
    changeNote: 'Mandatory victim restitution fine for medical rehabilitation.',
  },
  {
    offence: 'Sexual Intercourse on False Promise of Marriage',
    oldIpc: 'Prosecuted under IPC 417/375',
    newBns: 'Section 69 BNS',
    punishment: 'Imprisonment up to 10 years + fine',
    changeNote: 'Brand new distinct statutory offence for deceitful means, false promotion/job promises, or suppressing identity.',
  },
  {
    offence: 'Outraging Modesty of Woman',
    oldIpc: 'Section 354 IPC',
    newBns: 'Section 74 BNS',
    punishment: '1 to 5 years + fine',
    changeNote: 'Now Part of Chapter V with sexual harassment (75), disrobing (76), voyeurism (77), and stalking (78).',
  },
  {
    offence: 'Theft',
    oldIpc: 'Sections 378 & 379 IPC',
    newBns: 'Section 303 BNS',
    punishment: 'Up to 3 years + fine (Community Service for first-time < ₹5,000)',
    changeNote: 'Added innovative Community Service alternative upon return of property for petty theft under ₹5,000.',
  },
  {
    offence: 'Snatching (Chain, Mobile, Bags)',
    oldIpc: 'Charged under IPC 379 / 392',
    newBns: 'Section 304 BNS',
    punishment: 'Up to 3 years + fine',
    changeNote: 'First-time distinct statutory definition of snatching in Indian criminal jurisprudence.',
  },
  {
    offence: 'Cheating & Dishonestly Inducing Delivery',
    oldIpc: 'Section 420 IPC',
    newBns: 'Section 318(4) BNS',
    punishment: 'Up to 7 years + fine',
    changeNote: 'The historic "Chaar Sau Bees (420)" is now Section 318(4).',
  },
  {
    offence: 'Sedition vs. Endangering Sovereignty',
    oldIpc: 'Section 124A IPC (Sedition)',
    newBns: 'Section 152 BNS (Sovereignty & Integrity)',
    punishment: 'Life imprisonment or up to 7 years + fine',
    changeNote: 'Colonial sedition repealed. New section targets armed rebellion and secession, with safe harbor for democratic criticism.',
  },
  {
    offence: 'Defamation',
    oldIpc: 'Sections 499 & 500 IPC',
    newBns: 'Section 356 BNS',
    punishment: 'Simple imprisonment up to 2 yrs, or fine, or Community Service',
    changeNote: 'Retains all 10 statutory exceptions while introducing community service as an alternative to prison.',
  },
  {
    offence: 'Unlawful Assembly',
    oldIpc: 'Section 141 & 143 IPC',
    newBns: 'Section 189 BNS',
    punishment: 'Up to 6 months or fine or both',
    changeNote: 'Moved to Chapter XI (Public Tranquillity).',
  },
  {
    offence: 'Disobedience to Public Order',
    oldIpc: 'Section 188 IPC',
    newBns: 'Section 223 BNS',
    punishment: 'Up to 6 months to 1 year + fine',
    changeNote: 'Commonly invoked during curfews or administrative prohibitory orders.',
  },
  {
    offence: 'Rash Driving on Public Way',
    oldIpc: 'Section 279 IPC',
    newBns: 'Section 281 BNS',
    punishment: 'Up to 6 months or fine up to ₹1,000 or both',
    changeNote: 'Now Section 281 in Chapter XV (Public Health & Safety).',
  },
]

export const bnsQuiz = [
  {
    id: 'bns-q1',
    question: 'Under Section 4(f) of the Bharatiya Nyaya Sanhita, 2023, which new form of punishment has been introduced for minor offences?',
    options: [
      'Solitary confinement for all first-time offenders',
      'Community Service',
      'Exile from the judicial district',
      'Mandatory corporate restitution',
    ],
    correctAnswer: 1,
    explanation:
      'Section 4(f) introduced Community Service as one of the six statutory punishments in BNS, used as a restorative alternative for petty theft (< ₹5,000), defamation, and public drunkenness.',
  },
  {
    id: 'bns-q2',
    question: 'Under Section 103(2) of BNS, what is the punishment when a group of 5 or more persons acting in concert commits murder on the grounds of race, caste, sex, or language (mob lynching)?',
    options: [
      'Simple imprisonment for 3 to 7 years',
      'Fine only',
      'Death or imprisonment for life, and liability to fine',
      'Community service for 1 year',
    ],
    correctAnswer: 2,
    explanation:
      'Section 103(2) specifically codifies mob lynching and concerted hate murder, mandating punishment with Death or Life Imprisonment for every member of the group.',
  },
  {
    id: 'bns-q3',
    question: 'What is the minimum age of absolute criminal immunity (doli incapax) under Section 20 of BNS 2023?',
    options: [
      'Under 7 years of age',
      'Under 10 years of age',
      'Under 12 years of age',
      'Under 18 years of age',
    ],
    correctAnswer: 0,
    explanation:
      'Section 20 provides that nothing is an offence done by a child under seven years of age. Section 21 covers children between 7 and 12 of immature understanding.',
  },
  {
    id: 'bns-q4',
    question: 'Under Section 304 of BNS 2023, what new distinct offence has been separated from simple theft?',
    options: [
      'Pickpocketing in transit only',
      'Snatching (sudden or forcible grabbing of movable property)',
      'Digital cryptocurrency skimming',
      'Trespass during daylight hours',
    ],
    correctAnswer: 1,
    explanation:
      'Section 304 specifically defines Snatching as an independent criminal offence carrying imprisonment up to 3 years and fine.',
  },
  {
    id: 'bns-q5',
    question: 'What happens to the old Indian Penal Code, 1860 under Section 358 of BNS 2023?',
    options: [
      'It remains valid concurrently with BNS',
      'It is repealed, but previous proceedings, rights, and accrued liabilities are legally saved',
      'It is suspended for 5 years only',
      'It is applied only to non-citizens',
    ],
    correctAnswer: 1,
    explanation:
      'Section 358(1) expressly repeals the Indian Penal Code, while Section 358(2) saves past operations, accrued liabilities, and pending investigations under the General Clauses Act.',
  },
]
