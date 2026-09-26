/**
 * Nyaya Law Concordance & Comparison Database
 * Primary Focus: Indian Penal Code, 1860 (IPC) ↔ Bharatiya Nyaya Sanhita, 2023 (BNS)
 *
 * CRITICAL METHODOLOGICAL DIRECTIVE:
 * - Do NOT automatically claim that two sections are legally equivalent unless the mapping is verified.
 * - Where mapping is substantive, newly structured, split, or disputed, label as 'requires-verification'.
 * - Where a provision is brand new with no direct IPC predecessor, label as 'new-provision'.
 * - Where an IPC provision was omitted without BNS reenactment, label as 'repealed-unreplaced'.
 * - All citations reference official gazettes (Acts 45 of 1860 and 45 of 2023), Parliamentary Standing
 *   Committee Report No. 246, and Ministry of Home Affairs Concordance Tables.
 */

export const COMPARISON_PAIRS = [
  {
    id: 'ipc-bns',
    title: 'Indian Penal Code, 1860 ↔ Bharatiya Nyaya Sanhita, 2023',
    shortTitle: 'IPC 1860 ↔ BNS 2023',
    oldLaw: {
      name: 'Indian Penal Code, 1860 (Act No. 45 of 1860)',
      shortName: 'IPC 1860',
      enactmentYear: 1860,
      repealDate: '1 July 2024',
      status: 'Repealed',
      statusNote: 'Repealed by Section 358(1) BNS. Applies retrospectively only to offences committed on or before 30 June 2024 (Art. 20(1) Constitution & Sec 6 General Clauses Act).',
      totalSections: 511,
      totalChapters: 23,
    },
    newLaw: {
      name: 'Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023)',
      shortName: 'BNS 2023',
      enactmentYear: 2023,
      commencementDate: '1 July 2024',
      status: 'In Force',
      statusNote: 'Operational across India from 1 July 2024 for all offences committed on or after this date.',
      totalSections: 358,
      totalChapters: 20,
    },
    statutoryRuleOfTransition:
      'Article 20(1) of the Constitution of India prohibits ex post facto criminal laws. Therefore, crimes committed prior to 1 July 2024 are charged and tried under IPC 1860, while crimes committed on or after 1 July 2024 must be charged exclusively under BNS 2023.',
  },
]

export const COMPARISON_TOPICS = [
  { id: 'all', label: 'All Topics', count: 20 },
  { id: 'human-body', label: 'Offences Against Human Body & Life', count: 6 },
  { id: 'property', label: 'Offences Against Property', count: 5 },
  { id: 'women-children', label: 'Offences Against Women & Children', count: 3 },
  { id: 'state-public-order', label: 'State & Public Tranquillity', count: 3 },
  { id: 'organised-crime', label: 'Organised Crime & Modern Offences', count: 2 },
  { id: 'reputation-institutions', label: 'Defamation & Public Conduct', count: 1 },
]

export const VERIFICATION_STATUSES = {
  verified: {
    id: 'verified',
    label: 'Verified Statutory Mapping',
    badgeClass: 'bg-forest/10 text-forest border-forest/30',
    description: 'Officially mapped and confirmed in Parliamentary Committee reports and MHA concordance tables as substantively equivalent or directly corresponding.',
  },
  'requires-verification': {
    id: 'requires-verification',
    label: 'Requires Verification',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800',
    description: 'The provision was substantially altered, reworded, or subjected to executive stay or non-linear legal restructuring. Legal equivalence cannot be presumed.',
  },
  'new-provision': {
    id: 'new-provision',
    label: 'New Provision in BNS',
    badgeClass: 'bg-navy/10 text-navy border-navy/30',
    description: 'Autonomous statutory offence or procedural mechanism introduced in BNS 2023 with no direct equivalent in the colonial Indian Penal Code, 1860.',
  },
  'repealed-unreplaced': {
    id: 'repealed-unreplaced',
    label: 'Repealed / Not Re-enacted',
    badgeClass: 'bg-stone-200 text-ink/70 border-stone-300',
    description: 'Colonial provision deleted or declared unconstitutional and deliberately omitted from the modern code without statutory replacement.',
  },
}

export const lawComparisonsData = [
  {
    id: 'murder-mob-lynching',
    pairId: 'ipc-bns',
    topicId: 'human-body',
    topic: 'Offences Against Human Body & Life',
    offenceTitle: 'Murder & Concerted Murder (Mob Lynching)',
    mappingStatus: 'verified',
    legalEquivalenceSummary: 'Substantively equivalent for base murder; Section 103(2) is a newly codified aggravated sub-offence.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 302 IPC',
      title: 'Punishment for murder',
      status: 'Repealed (applies to offences before 1 July 2024)',
      scopeText:
        'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
      punishment: 'Death or Imprisonment for Life, and liability to fine.',
      keyCharacteristics:
        'Governed murder sentencing. Group killings had to be prosecuted via common intention (Sec 34 IPC) or common object of unlawful assembly (Sec 149 IPC).',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 103(1) & 103(2) BNS',
      title: 'Punishment for murder & Mob lynching',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Section 103(1): Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.\nSection 103(2): When a group of five or more persons acting in concert commits murder on the ground of race, caste or community, sex, place of birth, language, personal belief or any other similar ground, each member shall be punished with death or life imprisonment and fine.',
      punishment:
        'Sub-section (1): Death or Life Imprisonment + fine. Sub-section (2): Death or Life Imprisonment + fine for every member.',
      keyCharacteristics:
        'Section 103(1) retains classical murder. Section 103(2) creates an autonomous statutory offence for mob lynching and hate killings by groups of 5 or more.',
    },
    plainLanguageDifference:
      'The punishment for ordinary murder remains identical (death or life imprisonment + fine). The crucial change is Section 103(2), which explicitly codifies mob lynching as an independent statutory crime. If five or more persons act together to murder someone based on caste, religion, race, or language, each person in the mob faces capital punishment or life imprisonment without needing separate proof of who struck the fatal blow.',
    source:
      'The Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023), Gazette of India; Parliamentary Standing Committee on Home Affairs, Report No. 246 (Nov 2023).',
    searchKeywords: ['302', '103', 'murder', 'mob lynching', 'capital punishment', 'caste murder', 'hate crime'],
  },
  {
    id: 'culpable-homicide',
    pairId: 'ipc-bns',
    topicId: 'human-body',
    topic: 'Offences Against Human Body & Life',
    offenceTitle: 'Culpable Homicide Not Amounting to Murder',
    mappingStatus: 'verified',
    legalEquivalenceSummary: 'Direct statutory replacement; structure unified into a single section.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 304 IPC',
      title: 'Punishment for culpable homicide not amounting to murder',
      status: 'Repealed (past offences only)',
      scopeText:
        'Bifurcated into Part I (act done with intention of causing death or bodily injury likely to cause death) and Part II (act done with knowledge that it is likely to cause death, but without intention).',
      punishment:
        'Part I: Imprisonment for life or up to 10 years + fine. Part II: Imprisonment up to 10 years, or fine, or both.',
      keyCharacteristics: 'Two distinct statutory paragraphs with differing mental-state thresholds.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 105 BNS',
      title: 'Culpable homicide not amounting to murder',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Whoever commits culpable homicide not amounting to murder shall be punished: (a) with imprisonment for life, or imprisonment of either description for a term which shall not be less than five years but which may extend to ten years, and fine, if the act is done with intention; or (b) with imprisonment of either description for a term which may extend to ten years, and fine, if done with knowledge.',
      punishment:
        'Intentional limb: Life imprisonment, or 5 to 10 years + fine. Knowledge limb: Up to 10 years + fine.',
      keyCharacteristics:
        'Introduced a statutory mandatory minimum of 5 years for the intentional limb (previously discretionary under IPC).',
    },
    plainLanguageDifference:
      'Under IPC Section 304 Part I, a judge could theoretically award a nominal sentence below 5 years. Under Section 105 of BNS, if culpable homicide is committed with intent, the law now imposes a mandatory minimum of 5 years imprisonment up to life imprisonment.',
    source:
      'BNS Section 105; Ministry of Home Affairs Comparative Matrix; Parliamentary Standing Committee Report No. 246.',
    searchKeywords: ['304', '105', 'culpable homicide', 'manslaughter', 'intention', 'knowledge'],
  },
  {
    id: 'death-by-negligence-hit-and-run',
    pairId: 'ipc-bns',
    topicId: 'human-body',
    topic: 'Offences Against Human Body & Life',
    offenceTitle: 'Rash or Negligent Act Causing Death & Hit-and-Run',
    mappingStatus: 'requires-verification',
    legalEquivalenceSummary:
      'Section 106(1) is in force with higher penalties; Section 106(2) on Hit-and-Run has been held in abeyance by executive notification.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 304A IPC',
      title: 'Causing death by negligence',
      status: 'Repealed (past offences only)',
      scopeText:
        'Whoever causes the death of any person by doing any rash or negligent act not amounting to culpable homicide, shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.',
      punishment: 'Imprisonment up to 2 years, or fine, or both.',
      keyCharacteristics: 'Uniform 2-year ceiling regardless of vehicle type, profession, or post-collision conduct.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 106(1) & Section 106(2) BNS',
      title: 'Causing death by negligence & Failure to report escape (Hit-and-Run)',
      status: 'Section 106(1) In Force; Section 106(2) In Abeyance',
      scopeText:
        'Section 106(1): General rash/negligent death punished with imprisonment up to 5 years and fine. For registered medical practitioners (doctors) doing medical procedure: imprisonment up to 2 years and fine.\nSection 106(2): Whoever causes death of any person by rash and negligent driving not amounting to culpable homicide, and escapes without reporting it to a police officer or a Magistrate soon after the incident, shall be punished with imprisonment up to 10 years and fine.',
      punishment:
        'General: Up to 5 years + fine. Doctors: Up to 2 years + fine. Hit-and-Run (106(2)): Up to 10 years + fine (Pending notification).',
      keyCharacteristics:
        'Bifurcated scheme. Elevated punishment for general road crashes from 2 to 5 years. Special carve-out for doctors. 10-year penalty for fleeing the scene.',
    },
    plainLanguageDifference:
      'Under IPC 304A, all negligent deaths carried a maximum of 2 years in prison. Under BNS 106(1), the general penalty for causing death by reckless driving has jumped from 2 years to 5 years. Registered doctors have a specific protection capping negligence to 2 years. Crucially, Section 106(2) introduced a strict 10-year prison sentence for drivers who flee without reporting to police, but following national transport strikes, the Central Government announced Section 106(2) would not be enforced until further consultation.',
    source:
      'Act 45 of 2023, Section 106; Ministry of Home Affairs Press Communiqué (January 2024); Notification S.O. 850(E).',
    searchKeywords: ['304a', '106', 'hit and run', 'negligent driving', 'rash driving', 'doctor negligence', 'road accident'],
  },
  {
    id: 'cheating-420',
    pairId: 'ipc-bns',
    topicId: 'property',
    topic: 'Offences Against Property',
    offenceTitle: 'Cheating & Dishonestly Inducing Delivery of Property',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Substantively identical legal equivalent to former Section 420 IPC; re-indexed to Section 318(4) BNS.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 420 IPC',
      title: 'Cheating and dishonestly inducing delivery of property',
      status: 'Repealed (past offences only)',
      scopeText:
        'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
      punishment: 'Imprisonment up to 7 years, and liability to fine.',
      keyCharacteristics:
        'The primary statutory section in Indian jurisprudence for fraud, white-collar deceit, financial scams, and fraudulent contract breaches.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 318(4) BNS',
      title: 'Cheating and dishonestly inducing delivery of property',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
      punishment: 'Imprisonment of either description up to 7 years, and liability to fine.',
      keyCharacteristics:
        'Direct textual adoption from Section 420 IPC into Chapter XVII of BNS as sub-section (4) of Section 318.',
    },
    plainLanguageDifference:
      'The famous "Section 420" (Chaar Sau Bees) has been re-codified as Section 318(4) BNS. The legal ingredients and maximum punishment of 7 years plus fine remain exactly the same. All new fraud complaints for acts committed after 1 July 2024 must cite Section 318(4) instead of Section 420.',
    source:
      'Bharatiya Nyaya Sanhita, 2023, Section 318(4); Ministry of Home Affairs Concordance Table.',
    searchKeywords: ['420', '318', 'cheating', 'fraud', 'chaar sau bees', 'financial scam', 'valuable security'],
  },
  {
    id: 'theft-community-service',
    pairId: 'ipc-bns',
    topicId: 'property',
    topic: 'Offences Against Property',
    offenceTitle: 'Theft & Restorative Community Service for Petty Theft',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Substantively equivalent for general theft; adds a restorative community service proviso for minor first-time theft.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 378 & 379 IPC',
      title: 'Theft & Punishment for theft',
      status: 'Repealed (past offences only)',
      scopeText:
        'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
      punishment: 'Imprisonment up to 3 years, or fine, or both.',
      keyCharacteristics: 'Uniform custodial penalty regardless of stolen amount. No non-custodial statutory alternative.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 303(1) & 303(2) BNS',
      title: 'Theft & Proviso for community service',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Section 303(1) defines theft. Section 303(2): Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both:\nProvided that where the value of the stolen property is less than five thousand rupees, and the person is convicted for the first time and upon return of the stolen property or restored value, the person shall be punished with community service.',
      punishment:
        'General theft: Imprisonment up to 3 years, or fine, or both. Petty theft (< ₹5,000, 1st time, restored): Community Service.',
      keyCharacteristics:
        'First time in Indian penal history that Community Service is statutorily mandated as a diversion from imprisonment.',
    },
    plainLanguageDifference:
      'Under the IPC, stealing an object worth ₹50 could technically send a first-time offender to jail for up to 3 years. Under Section 303(2) of BNS, if the stolen property is worth less than ₹5,000, it is the offender’s first conviction, and the property is returned, the court is authorized to sentence them to restorative Community Service instead of prison.',
    source:
      'BNS Section 303(2) Proviso; Parliamentary Committee Report No. 246; BNS Section 4(f).',
    searchKeywords: ['379', '378', '303', 'theft', 'petty theft', 'community service', 'stolen property', 'five thousand'],
  },
  {
    id: 'snatching-new-offence',
    pairId: 'ipc-bns',
    topicId: 'property',
    topic: 'Offences Against Property',
    offenceTitle: 'Snatching (Autonomous Offence)',
    mappingStatus: 'new-provision',
    legalEquivalenceSummary:
      'Brand new distinct statutory offence in BNS; previously charged under general theft or robbery in IPC.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'No Autonomous Provision (Charged under IPC 379 or 392)',
      title: 'Absence of statutory definition for snatching',
      status: 'No direct IPC provision',
      scopeText:
        'The IPC did not recognize "snatching" as a distinct crime. Police had to register cases under Section 379 (simple theft) or invoke Section 390/392 (robbery) if force or threat of hurt was proven. Several states (Haryana, Punjab) passed local amendments to IPC.',
      punishment: 'Varied: 3 years (theft) to 10 years (robbery).',
      keyCharacteristics: 'Absence of unified all-India statutory criteria for chain or mobile snatching.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 304 BNS',
      title: 'Snatching',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        '(1) Theft is snatching if, in order to commit theft, the offender suddenly or quickly or forcibly seizes, secures, grabs or takes away from any person or from his possession any movable property.\n(2) Whoever commits snatching shall be punished with imprisonment of either description for a term which may extend to three years, and shall also be liable to fine.',
      punishment: 'Imprisonment of either description up to 3 years, and liability to fine.',
      keyCharacteristics:
        'Statutorily defines snatching as a specific hybrid of suddenness, quickness, or force, removing judicial ambiguity.',
    },
    plainLanguageDifference:
      'Previously, snatching a gold chain or smartphone on the road was treated either as ordinary pickpocketing/theft or required proving severe violence for robbery. Section 304 BNS specifically defines snatching as an independent crime wherever property is grabbed suddenly, quickly, or forcibly.',
    source:
      'BNS Section 304; Parliamentary Standing Committee on Home Affairs, Report No. 246.',
    searchKeywords: ['304', 'snatching', 'chain snatching', 'mobile snatching', 'quick seizure', 'street crime'],
  },
  {
    id: 'sedition-vs-sovereignty',
    pairId: 'ipc-bns',
    topicId: 'state-public-order',
    topic: 'Offences Against the State & Public Tranquillity',
    offenceTitle: 'Sedition vs. Acts Endangering Sovereignty, Unity & Integrity of India',
    mappingStatus: 'requires-verification',
    legalEquivalenceSummary:
      'Colonial sedition repealed; replaced by Section 152 targeting armed rebellion and secession with explicit free-speech safe harbor.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 124A IPC',
      title: 'Sedition',
      status: 'Repealed (and kept in abeyance by Supreme Court in S.G. Vombatkere, May 2022)',
      scopeText:
        'Whoever by words, either spoken or written, or by signs, or by visible representation, or otherwise, brings or attempts to bring into hatred or contempt, or excites or attempts to excite disaffection towards the Government established by law in India, shall be punished with imprisonment for life, or up to 3 years + fine.',
      punishment: 'Imprisonment for life to which fine may be added, or up to 3 years + fine.',
      keyCharacteristics:
        'Targeted "disaffection" against the government. Widely criticized as a colonial instrument to suppress political dissent.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 152 BNS',
      title: 'Act endangering sovereignty, unity and integrity of India',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Whoever, purposely or knowingly, by words, spoken or written, signs, electronic communication or financial means, excites or attempts to excite secession or armed rebellion or subversive activities, or encourages feelings of separatist activities or endangers sovereignty or unity and integrity of India, shall be punished with imprisonment for life or with imprisonment which may extend to seven years, and fine.\nExplanation: Comments expressing disapprobation of the measures, or administrative or other actions of the Government with a view to obtain their alteration by lawful means without exciting the activities aforesaid, do not constitute an offence.',
      punishment: 'Imprisonment for life or imprisonment up to 7 years, and liability to fine.',
      keyCharacteristics:
        'Omits the word "sedition" and "disaffection towards Government". Focuses on armed rebellion, secession, and financial/electronic facilitation. Elevates minimum term from 3 to 7 years.',
    },
    plainLanguageDifference:
      'Colonial Section 124A punished "exciting disaffection towards the Government." Section 152 BNS removes this phrase entirely and refocuses the law on acts inciting armed rebellion, secession, or separatist subversion. Furthermore, an explicit statutory explanation protects citizens criticizing government policies or seeking lawful change.',
    source:
      'BNS Section 152; S.G. Vombatkere v. Union of India (2022) 7 SCC 633; Parliamentary Committee Report No. 246.',
    searchKeywords: ['124a', '152', 'sedition', 'sovereignty', 'integrity', 'rebellion', 'secession', 'free speech', 'disaffection'],
  },
  {
    id: 'rape-women-protection',
    pairId: 'ipc-bns',
    topicId: 'women-children',
    topic: 'Offences Against Women & Children',
    offenceTitle: 'Rape & Sexual Offences Scheme',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Substantively equivalent definitions; prioritized by moving to Chapter V upfront with enhanced victim compensation provisions.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Sections 375 & 376 IPC',
      title: 'Rape and Punishment for rape',
      status: 'Repealed (past offences only)',
      scopeText:
        'Defined rape with statutory amendments from 2013 and 2018. Prescribed a minimum of 10 years up to life imprisonment for base rape, with specialized provisions for gang rape (376D) and child victims (376AB, 376DA, 376DB).',
      punishment: 'Base rape: Rigorous imprisonment not less than 10 years, up to life imprisonment + fine.',
      keyCharacteristics: 'Located at the end of the penal code (Chapter XVI, body offences).',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Sections 63 & 64 BNS',
      title: 'Rape and Punishment for rape',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Preserves all post-2013/2018 statutory definitions of non-consent, physical acts, and age thresholds. Sub-section 64(1) mandates minimum 10 years to natural life. Section 70 mandates minimum 20 years to natural life for gang rape, and death penalty/natural life for gang rape of a minor girl.',
      punishment:
        'Base rape: Min 10 years up to Life Imprisonment + fine. Fine must be paid directly to victim to meet medical expenses.',
      keyCharacteristics:
        'Elevated to Chapter V as the first substantive topic after general exceptions, affirming statutory priority.',
    },
    plainLanguageDifference:
      'The core definition and rigorous 10-year minimum penalty remain intact. The structural reform places women and child offences right at the forefront of the penal code (Chapter V), with an explicit rule that any fine imposed on the perpetrator must be paid to the victim for medical and rehabilitation expenses.',
    source:
      'BNS Chapter V, Sections 63–70; Ministry of Home Affairs Concordance Table.',
    searchKeywords: ['375', '376', '63', '64', '70', 'rape', 'gang rape', 'consent', 'women safety'],
  },
  {
    id: 'deceitful-marriage-promise',
    pairId: 'ipc-bns',
    topicId: 'women-children',
    topic: 'Offences Against Women & Children',
    offenceTitle: 'Sexual Intercourse on False Promise of Marriage',
    mappingStatus: 'new-provision',
    legalEquivalenceSummary:
      'Autonomous new statutory offence; resolved decades of conflicting Supreme Court jurisprudence on IPC Section 375 vs 417.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'No Specific Provision (Charged as IPC 375 Rape or IPC 417 Cheating)',
      title: 'Judicial friction on "misconception of fact" under Section 90 IPC',
      status: 'No autonomous IPC section',
      scopeText:
        'In IPC, cases where a man had sexual relations on a promise to marry and later reneged were prosecuted as rape under Section 375 by arguing consent was obtained under a "misconception of fact" (Section 90 IPC), or as simple cheating (Section 417 IPC). The Supreme Court frequently wrestled with distinguishing breach of promise from deceit from the inception.',
      punishment: 'Varied from 1 year (cheating) to 10 years/life (rape).',
      keyCharacteristics: 'Vast judicial ambiguity between genuine relationship breakdowns and intentional deceit.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 69 BNS',
      title: 'Sexual intercourse by employing deceitful means, etc.',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Whoever, by deceitful means or by making promise to marry without any intention of fulfilling the same, has sexual intercourse with women not amounting to the offence of rape, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.\nExplanation: "Deceitful means" includes inducement for, or false promise of, employment or promotion, or marrying after suppressing identity.',
      punishment: 'Imprisonment of either description up to 10 years, and liability to fine.',
      keyCharacteristics:
        'Distinct offence separate from rape, specifically defining deceitful means (suppressing identity, job promises, false marriage vows).',
    },
    plainLanguageDifference:
      'BNS Section 69 creates a separate crime for obtaining sexual relations through deceit—such as concealing one’s true religion or marital status, or promising marriage or job promotion with no intention of fulfilling it—carrying up to 10 years in prison, separate from the crime of rape.',
    source:
      'BNS Section 69; Parliamentary Standing Committee Report No. 246; Supreme Court precedents in Pramod Suryabhan Pawar (2019).',
    searchKeywords: ['69', '417', 'false promise of marriage', 'deceitful means', 'suppression of identity', 'marriage promise'],
  },
  {
    id: 'defamation-community-service',
    pairId: 'ipc-bns',
    topicId: 'reputation-institutions',
    topic: 'Defamation & Public Conduct',
    offenceTitle: 'Defamation & Restorative Community Service',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Substantively identical definitions and exceptions; adds restorative Community Service as an alternative punishment.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Sections 499 & 500 IPC',
      title: 'Defamation & Punishment for defamation',
      status: 'Repealed (past offences only)',
      scopeText:
        'Defined defamation with 10 statutory exceptions. Punished with simple imprisonment for a term which may extend to two years, or with fine, or with both.',
      punishment: 'Simple imprisonment up to 2 years, or fine, or both.',
      keyCharacteristics: 'Custodial sentence or monetary fine only. Upheld as constitutional in Subramanian Swamy (2016).',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 356(1) & 356(2) BNS',
      title: 'Defamation & Community service option',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Section 356(1) defines defamation, maintaining all 10 statutory exceptions verbatim (truth for public good, public conduct of public servants, fair report of court proceedings, etc.).\nSection 356(2): Whoever defames another shall be punished with simple imprisonment for a term which may extend to two years, or with fine, or with both, or with community service.',
      punishment: 'Simple imprisonment up to 2 years, or fine, or both, OR Community Service.',
      keyCharacteristics:
        'Empowers magistrates to award unpaid restorative public service instead of prison for reputational harms.',
    },
    plainLanguageDifference:
      'All 10 legal defenses for defamation (such as speaking the truth for the public benefit, or fair reporting of judicial trials) remain identical. The new element is Section 356(2), which gives the judge discretion to sentence a convicted defamer to community service instead of prison or a fine.',
    source:
      'BNS Section 356; Subramanian Swamy v. Union of India (2016) 7 SCC 221; MHA Concordance Table.',
    searchKeywords: ['499', '500', '356', 'defamation', 'reputation', 'community service', '10 exceptions', 'free speech'],
  },
  {
    id: 'organised-crime-syndicates',
    pairId: 'ipc-bns',
    topicId: 'organised-crime',
    topic: 'Organised Crime & Modern Offences',
    offenceTitle: 'Organised Crime & Crime Syndicates',
    mappingStatus: 'new-provision',
    legalEquivalenceSummary:
      'New national statutory provision in BNS; previously only governed under regional state laws like MCOCA (Maharashtra) or GUJCTOC (Gujarat).',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'No General Codified Provision in IPC',
      title: 'Absence of national organised crime penal framework',
      status: 'No IPC provision',
      scopeText:
        'The IPC contained no definition of "organised crime syndicate". Prosecutions relied on state-level special enactments (e.g. MCOCA 1999) or piecemeal conspiracy charges under Section 120B IPC.',
      punishment: 'N/A under general federal penal code.',
      keyCharacteristics: 'Fragmented state legislation without pan-India penal jurisdiction.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 111 BNS',
      title: 'Organised Crime',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Defines organised crime as continuing unlawful activity including kidnapping, robbery, extortion, land grabbing, contract killing, economic offences, cyber-crimes having severe consequences, or trafficking in drugs or illicit goods, committed by a syndicate of two or more persons.\n(2) If death of any person results: Death or life imprisonment and min ₹10 lakh fine. Other cases: Min 5 years to life imprisonment and min ₹5 lakh fine.',
      punishment:
        'If death results: Death or Life Imprisonment + min ₹10 lakh fine. Other offences: Min 5 years to Life + min ₹5 lakh fine.',
      keyCharacteristics:
        'Mandatory asset attachment under sub-section (5) and severe minimum sentencing across all Indian states.',
    },
    plainLanguageDifference:
      'Before BNS, organised crime syndicates running extortion, contract killings, or multi-state land grabs could only be tackled under special state laws like Maharashtra’s MCOCA. Section 111 now brings a unified, stringent anti-syndicate law to the entire country, with mandatory property attachment and fines of at least ₹5 to ₹10 lakh.',
    source:
      'BNS Section 111; Parliamentary Standing Committee on Home Affairs Report No. 246.',
    searchKeywords: ['111', 'organised crime', 'syndicate', 'extortion', 'land grabbing', 'contract killing', 'mcoca'],
  },
  {
    id: 'petty-organised-crime',
    pairId: 'ipc-bns',
    topicId: 'organised-crime',
    topic: 'Organised Crime & Modern Offences',
    offenceTitle: 'Petty Organised Crime (Paper Leaks, Card Skimming, Mass Snatching)',
    mappingStatus: 'new-provision',
    legalEquivalenceSummary:
      'Autonomous offence targeting organized gangs running paper leaks, ticket scalping, and cyber-thefts.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'No Integrated Provision in IPC',
      title: 'Fragmented prosecution under simple cheating or theft',
      status: 'No integrated IPC provision',
      scopeText:
        'Gang-operated exam leaks, ticket scalping, and ATM card skimming were charged under generic cheating (420) or theft (379), failing to address the organized gang nature of the operations.',
      punishment: 'Varied: 3 years (theft) to 7 years (cheating).',
      keyCharacteristics: 'No recognition of gang enterprise for street or digital fraud.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 112 BNS',
      title: 'Petty Organised Crime',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Whoever, as a member of a group or gang, or for it, commits theft, snatching, cheating, unauthorized selling of tickets, betting or gambling, selling of public examination question papers, card skimming or ATM skimming, shall be guilty of petty organised crime.',
      punishment: 'Imprisonment of either description for a term not less than 1 year up to 7 years, and liability to fine.',
      keyCharacteristics:
        'Imposes a mandatory statutory minimum of 1 year imprisonment for gang-based street or digital operations.',
    },
    plainLanguageDifference:
      'Section 112 specifically targets groups and gangs that operate competitive exam paper leaks, illegal ticket scalping, ATM skimming, and coordinated street snatching, setting a strict minimum sentence of 1 to 7 years imprisonment.',
    source:
      'BNS Section 112; Parliamentary Standing Committee Report No. 246.',
    searchKeywords: ['112', 'petty organised crime', 'paper leak', 'ticket scalping', 'card skimming', 'atm fraud', 'exam fraud'],
  },
  {
    id: 'attempt-to-commit-suicide',
    pairId: 'ipc-bns',
    topicId: 'human-body',
    topic: 'Offences Against Human Body & Life',
    offenceTitle: 'Attempt to Commit Suicide (Decriminalization vs. Public Coercion)',
    mappingStatus: 'requires-verification',
    legalEquivalenceSummary:
      'General suicide attempt decriminalized in harmony with Mental Healthcare Act 2017; Section 226 BNS penalizes only coercive public suicide attempts.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 309 IPC',
      title: 'Attempt to commit suicide',
      status: 'Repealed (and rendered largely inoperative by Sec 115 Mental Healthcare Act 2017)',
      scopeText:
        'Whoever attempts to commit suicide and does any act towards the commission of such offence, shall be punished with simple imprisonment for a term which may extend to one year, or with fine, or with both.',
      punishment: 'Simple imprisonment up to 1 year, or fine, or both.',
      keyCharacteristics: 'Criminalized all suicide attempts regardless of psychiatric trauma or mental distress.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 226 BNS',
      title: 'Attempt to commit suicide to compel or restrain exercise of lawful power',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Whoever attempts to commit suicide with the intent to compel or restrain any public servant from discharging his official duty, shall be punished with simple imprisonment for a term which may extend to one year, or with fine, or with both, or with community service.',
      punishment: 'Simple imprisonment up to 1 year, or fine, or both, OR Community Service.',
      keyCharacteristics:
        'Narrowly restricted to coercive suicide attempts (e.g. self-immolation threats to blackmail public authorities or prevent legal demolition/arrest).',
    },
    plainLanguageDifference:
      'Under IPC 309, any person attempting suicide could theoretically be arrested. Under BNS, attempting suicide due to mental distress or depression is completely decriminalized. Section 226 only punishes suicide attempts when used intentionally as a weapon of blackmail or coercion to stop a government official from performing their legal duties.',
    source:
      'BNS Section 226; Section 115 of Mental Healthcare Act, 2017; Law Commission Report No. 210.',
    searchKeywords: ['309', '226', 'suicide', 'attempted suicide', 'mental health', 'public servant coercion', 'hunger strike'],
  },
  {
    id: 'adultery-repeal',
    pairId: 'ipc-bns',
    topicId: 'women-children',
    topic: 'Offences Against Women & Children',
    offenceTitle: 'Adultery (Decriminalization Conformity)',
    mappingStatus: 'repealed-unreplaced',
    legalEquivalenceSummary:
      'Section 497 IPC declared unconstitutional in 2018; deliberately excluded from BNS 2023 without any replacement.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 497 IPC',
      title: 'Adultery',
      status: 'Struck down by Supreme Court in Joseph Shine (2018); Repealed',
      scopeText:
        'Whoever has sexual intercourse with a person who is and whom he knows or has reason to believe to be the wife of another man, without the consent or connivance of that man, such sexual intercourse not amounting to the offence of rape, is guilty of the offence of adultery.',
      punishment: 'Imprisonment up to 5 years, or fine, or both.',
      keyCharacteristics:
        'Penalized only men, treated the wife as property of the husband, and excluded wives from prosecuting adulterous husbands.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'No Equivalent Provision in BNS',
      title: 'Deliberate statutory omission conforming to constitutional ruling',
      status: 'Omitted from BNS 2023',
      scopeText:
        'Adultery is completely omitted from the Bharatiya Nyaya Sanhita, 2023. It remains solely a civil ground for divorce and judicial separation under personal marriage statutes (e.g. Section 13(1)(i) of the Hindu Marriage Act, 1955).',
      punishment: 'No criminal liability. Civil remedy for divorce only.',
      keyCharacteristics:
        'Parliament conformed to the Supreme Court judgment in Joseph Shine, permanently removing adultery from the penal laws.',
    },
    plainLanguageDifference:
      'Adultery is no longer a crime in India. The colonial law that allowed husbands to jail their wives’ paramours was struck down by the Supreme Court in 2018 as sexist and unconstitutional. The BNS completely omits adultery; it remains strictly a civil ground for divorce.',
    source:
      'Joseph Shine v. Union of India (2019) 3 SCC 39; Parliamentary Standing Committee on Home Affairs Report No. 246.',
    searchKeywords: ['497', 'adultery', 'joseph shine', 'unconstitutional', 'matrimonial offence', 'divorce ground'],
  },
  {
    id: 'unnatural-offences-377',
    pairId: 'ipc-bns',
    topicId: 'human-body',
    topic: 'Offences Against Human Body & Life',
    offenceTitle: 'Unnatural Offences (Section 377 IPC vs BNS Framework)',
    mappingStatus: 'requires-verification',
    legalEquivalenceSummary:
      'Section 377 omitted in BNS; consensual adult acts remain legal, but lack of non-consensual male rape provision requires judicial clarification.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 377 IPC',
      title: 'Unnatural offences',
      status: 'Partially read down in Navtej Johar (2018); Repealed',
      scopeText:
        'Whoever voluntarily has carnal intercourse against the order of nature with any man, woman or animal, shall be punished with imprisonment for life, or with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.',
      punishment: 'Imprisonment for life or up to 10 years + fine.',
      keyCharacteristics:
        'Historically used against LGBTQ+ persons until read down by the Supreme Court in 2018 to exclude consenting adults.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'No Equivalent Section in BNS',
      title: 'Omission of carnal intercourse provision',
      status: 'Omitted from BNS 2023',
      scopeText:
        'The BNS has no counterpart to Section 377. Consensual adult homosexual relationships remain protected under Article 21. However, non-consensual carnal acts against adult males and bestiality were left without a dedicated section, though child sexual abuse is covered under POCSO and animals under the Prevention of Cruelty to Animals Act.',
      punishment: 'No direct Section 377 equivalent.',
      keyCharacteristics:
        'Parliamentary Committee Report No. 246 recommended retaining a non-consensual gender-neutral provision, but the final Act omitted it.',
    },
    plainLanguageDifference:
      'Consensual adult LGBTQ+ intimacy remains fully legal under constitutional law. However, because Section 377 was omitted entirely without introducing a gender-neutral non-consensual sexual assault section, legal scholars have highlighted an ongoing gap for non-consensual sexual assaults against adult men and bestiality.',
    source:
      'Navtej Singh Johar v. Union of India (2018) 10 SCC 1; Parliamentary Standing Committee Report No. 246.',
    searchKeywords: ['377', 'unnatural offence', 'navtej johar', 'lgbtq', 'male rape', 'bestiality', 'consent'],
  },
  {
    id: 'unlawful-assembly-rioting',
    pairId: 'ipc-bns',
    topicId: 'state-public-order',
    topic: 'Offences Against the State & Public Tranquillity',
    offenceTitle: 'Unlawful Assembly & Rioting',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Direct statutory correspondence; re-indexed to Chapter XI (Sections 189 & 191 BNS).',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Sections 141, 143, 146, 147 IPC',
      title: 'Unlawful assembly & Rioting',
      status: 'Repealed (past offences only)',
      scopeText:
        'An assembly of five or more persons with common object to overawe government by criminal force, resist law, or commit mischief. Force or violence used by any member renders all members guilty of rioting.',
      punishment: 'Unlawful assembly: Up to 6 months or fine. Rioting: Up to 2 years + fine (Armed with weapons: up to 5 yrs).',
      keyCharacteristics: 'Joint constructive liability under Sections 146 & 149 IPC.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Sections 189 & 191 BNS',
      title: 'Unlawful assembly & Rioting',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Section 189 defines unlawful assembly verbatim (5+ persons with common illegal object). Section 191 defines rioting with identical penalty brackets (base rioting up to 2 years; deadly weapons up to 5 years).',
      punishment: 'Base unlawful assembly: Up to 6 months or fine. Rioting: Up to 2 years + fine (Armed: up to 5 yrs).',
      keyCharacteristics:
        'Text and sentencing thresholds preserved in Chapter XI (Public Tranquillity).',
    },
    plainLanguageDifference:
      'The definitions of an unlawful assembly (5 or more people gathering with an illegal common objective) and rioting remain legally identical. Section 143 IPC is now Section 189 BNS, and Section 147 IPC is now Section 191 BNS.',
    source:
      'BNS Chapter XI, Sections 189 & 191; MHA Concordance Table.',
    searchKeywords: ['141', '143', '147', '149', '189', '191', 'unlawful assembly', 'rioting', 'public order', 'mob violence'],
  },
  {
    id: 'disobedience-public-servant-order',
    pairId: 'ipc-bns',
    topicId: 'state-public-order',
    topic: 'Offences Against the State & Public Tranquillity',
    offenceTitle: 'Disobedience to Order Promulgated by Public Servant (Section 144 Orders)',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Direct statutory correspondence with Section 188 IPC; re-indexed to Section 223 BNS.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 188 IPC',
      title: 'Disobedience to order duly promulgated by public servant',
      status: 'Repealed (past offences only)',
      scopeText:
        'Punished knowing disobedience to lawful orders issued by public servants (e.g. curfew or lockdown orders under Section 144 CrPC). If causing danger to life or safety: imprisonment up to 6 months + fine.',
      punishment: 'Simple disobedience: Up to 1 month or ₹200 fine. Danger to life/riot: Up to 6 months or ₹1,000 fine.',
      keyCharacteristics: 'Widely invoked during the COVID-19 pandemic and public protest curfews.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 223 BNS',
      title: 'Disobedience to order duly promulgated by public servant',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Knowingly disobeying a lawful order promulgated by a public servant lawfully empowered. If causing annoyance or obstruction: up to 6 months or fine up to ₹2,500. If causing danger to life, health, or riot: up to 1 year or fine up to ₹5,000.',
      punishment:
        'Base disobedience: Up to 6 months or fine up to ₹2,500. Danger to health/riot: Up to 1 year or fine up to ₹5,000.',
      keyCharacteristics:
        'Maintains the core offence, but significantly elevates both prison limits and maximum monetary fines.',
    },
    plainLanguageDifference:
      'The familiar Section 188 IPC (invoked during curfews or administrative orders under Section 144) is now Section 223 BNS. The penalties have been increased: minor disobedience can now bring up to 6 months imprisonment (up from 1 month), and disobedience endangering public safety carries up to 1 year (up from 6 months).',
    source:
      'BNS Section 223; Ministry of Home Affairs Concordance Table.',
    searchKeywords: ['188', '223', 'curfew', 'lockdown', 'disobedience', 'section 144', 'magistrate order'],
  },
  {
    id: 'rash-driving-public-way',
    pairId: 'ipc-bns',
    topicId: 'human-body',
    topic: 'Offences Against Human Body & Life',
    offenceTitle: 'Rash Driving on a Public Way',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Direct statutory equivalent of Section 279 IPC; re-indexed to Section 281 BNS.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Section 279 IPC',
      title: 'Rash driving or riding on a public way',
      status: 'Repealed (past offences only)',
      scopeText:
        'Whoever drives any vehicle, or rides, on any public way in a manner so rash or negligent as to endanger human life, or to be likely to cause hurt or injury to any other person, shall be punished with imprisonment of either description for a term which may extend to six months, or with fine which may extend to one thousand rupees, or with both.',
      punishment: 'Imprisonment up to 6 months, or fine up to ₹1,000, or both.',
      keyCharacteristics: 'Standard baseline charge registered for dangerous driving before fatal outcomes occur.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 281 BNS',
      title: 'Rash driving or riding on a public way',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Whoever drives any vehicle, or rides, on any public way in a manner so rash or negligent as to endanger human life, or to be likely to cause hurt or injury to any other person, shall be punished with imprisonment of either description for a term which may extend to six months, or with fine which may extend to one thousand rupees, or with both.',
      punishment: 'Imprisonment of either description up to 6 months, or fine up to ₹1,000, or both.',
      keyCharacteristics:
        'Text and sentencing preserved in Chapter XV (Public Health, Safety, Convenience).',
    },
    plainLanguageDifference:
      'The classic traffic offence of rash driving (formerly Section 279 IPC) is now Section 281 BNS. The elements of driving dangerously on a public road and the maximum sentence of 6 months imprisonment or ₹1,000 fine remain identical.',
    source:
      'BNS Section 281; MHA Concordance Table.',
    searchKeywords: ['279', '281', 'rash driving', 'traffic violation', 'dangerous driving', 'public road crash'],
  },
  {
    id: 'mischief-property-damage',
    pairId: 'ipc-bns',
    topicId: 'property',
    topic: 'Offences Against Property',
    offenceTitle: 'Mischief (Graduated Valuation Brackets)',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Substantively equivalent offence; completely updates colonial monetary damage thresholds from ₹50 to modern amounts.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Sections 425 to 427 IPC',
      title: 'Mischief & Mischief causing damage to the amount of fifty rupees',
      status: 'Repealed (past offences only)',
      scopeText:
        'Defined mischief as intentional destruction or diminution of property value. Under Section 427 IPC, causing damage of ₹50 or upwards carried up to 2 years imprisonment.',
      punishment: 'General: Up to 3 months or fine. Damage > ₹50 (Sec 427): Up to 2 years, or fine, or both.',
      keyCharacteristics: 'Antiquated Victorian financial thresholds (₹50) frozen from 1860.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 324 BNS',
      title: 'Mischief',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Section 324 modernizes the monetary tiers:\n(1)–(3) Base mischief: up to 6 months or fine.\n(4) If damage is between twenty thousand rupees (₹20,000) and one lakh rupees (₹1,00,000): imprisonment up to 2 years, or fine, or both.\n(5) If damage is one lakh rupees (₹1,00,000) or upwards: imprisonment up to 5 years, or fine, or both.',
      punishment:
        'Base: Up to 6 months. ₹20k–₹1 lakh damage: Up to 2 years. ₹1 lakh or above damage: Up to 5 years + fine.',
      keyCharacteristics:
        'Introduced realistic financial tiers reflecting contemporary economic valuations.',
    },
    plainLanguageDifference:
      'Under IPC Section 427, causing property damage worth more than fifty rupees (₹50) was a 2-year criminal offence. BNS Section 324 brings realistic monetary thresholds: minor vandalism is up to 6 months, damage between ₹20,000 and ₹1,00,000 brings up to 2 years, and severe damage of ₹1,00,000 or more carries up to 5 years imprisonment.',
    source:
      'BNS Section 324; Parliamentary Standing Committee Report No. 246; MHA Concordance Table.',
    searchKeywords: ['425', '427', '324', 'mischief', 'vandalism', 'property damage', 'twenty thousand', 'one lakh'],
  },
  {
    id: 'criminal-breach-of-trust-epf',
    pairId: 'ipc-bns',
    topicId: 'property',
    topic: 'Offences Against Property',
    offenceTitle: 'Criminal Breach of Trust (Includes EPF & ESI Defaults)',
    mappingStatus: 'verified',
    legalEquivalenceSummary:
      'Substantively equivalent; retains statutory explanations on employer provident fund deductions.',
    oldProvision: {
      law: 'Indian Penal Code, 1860',
      section: 'Sections 405 & 406 IPC',
      title: 'Criminal breach of trust & Punishment',
      status: 'Repealed (past offences only)',
      scopeText:
        'Dishonest misappropriation or conversion of entrusted property, or dishonest use/disposal in violation of legal direction or contract. Explanations 1 & 2 explicitly established that employers who deduct EPF or ESI contributions from employee wages and fail to deposit them are guilty of criminal breach of trust.',
      punishment: 'General: Imprisonment up to 3 years, or fine, or both. By public servant/banker (409): Up to Life or 10 yrs.',
      keyCharacteristics: 'Essential doctrine for safeguarding entrusted public and commercial assets.',
    },
    newProvision: {
      law: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Section 316 BNS',
      title: 'Criminal breach of trust',
      status: 'In Force (from 1 July 2024)',
      scopeText:
        'Section 316 preserves the substantive definition and retains Explanations 1 & 2 regarding employer defaults on Employee Provident Fund (EPF) and Employees’ State Insurance (ESI). Elevates the baseline penalty from 3 years to 5 years.',
      punishment: 'General: Imprisonment up to 5 years, and liability to fine (elevated from 3 years under IPC).',
      keyCharacteristics:
        'Strengthened general penalty from 3 to 5 years; preserved employee wage protection clauses.',
    },
    plainLanguageDifference:
      'Criminal breach of trust (misusing money or property entrusted to you) is now Section 316 BNS. The baseline maximum sentence has been raised from 3 years to 5 years. Crucially, the rule remains in force that if an employer deducts PF or ESI from workers’ salaries and fails to deposit it with the government, it is a criminal breach of trust.',
    source:
      'BNS Section 316; MHA Concordance Table.',
    searchKeywords: ['405', '406', '316', 'breach of trust', 'entrustment', 'epf', 'esi', 'employer default', 'misappropriation'],
  },
]
