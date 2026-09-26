// Official Citizen Rights Dataset: "Know Your Rights" Hub
// Grounded exclusively in codified Indian statutes, the Constitution of India,
// Supreme Court precedents, and official Government of India portals.
// No fictional citations or hypothetical legal outcomes.

export const rightsCategories = [
  {
    id: 'police-enforcement',
    title: 'Police & Law Enforcement',
    shortTitle: 'Police & Custody',
    icon: 'Shield',
    description:
      'Statutory protections and procedural safeguards when interacting with police officers, during questioning, vehicular checks, search, seizure, detention, and arrest.',
    topics: [
      {
        id: 'arrest-safeguards-24h',
        title: 'Rights Upon Arrest & the Mandatory 24-Hour Rule',
        legalArea: 'Criminal Procedure & Constitutional Safeguards',
        relevantLaw: 'BNSS 2023 Sections 35, 36, 47, 48, 58 & Constitution Article 22',
        explanation:
          'When a police officer arrests an individual, the officer is legally mandated to inform them immediately of the exact grounds for arrest and whether the alleged offence is bailable. An Arrest Memorandum must be prepared on the spot, recording the exact date and time, and signed by at least one family member or respected local witness. The arrested person has the statutory right to have one relative or friend immediately informed of the arrest and the location of custody.',
        practicalExample:
          'If an officer detains you at a police station without explaining the offence or refuses to let you phone your family, they are violating Section 47 and Section 48 of the BNSS 2023. Furthermore, under Section 58 and Article 22(2), police cannot detain any person in custody for more than 24 hours without producing them before the nearest Judicial Magistrate (excluding journey time).',
        actionPoints: [
          'Demand to know whether the offence is bailable or non-bailable under the schedule of the Sanhita.',
          'Verify that an Arrest Memo is signed and that your designated family member is formally contacted.',
          'Request an immediate medical examination by a government medical officer under BNSS Section 53.',
          'Insist on production before the jurisdictional Magistrate within 24 hours of detention.',
        ],
        relatedPages: [
          { title: 'BNSS 2023 Bare Act', to: '/laws/bnss-2023' },
          { title: 'Article 22: Preventive Detention & Arrest', to: '/fundamental-rights' },
          { title: 'Bail & Undertrial Rights Guide', to: '/search?q=bail' },
          { title: 'Legal Term: Bail', to: '/legal-terms#bail' },
        ],
        officialSource: {
          name: 'National Legal Services Authority (NALSA) — Arrest Rights',
          url: 'https://nalsa.gov.in',
          portal: 'nalsa.gov.in',
        },
        keywords: ['arrest', 'police detention', '24 hour rule', 'grounds of arrest', 'dk basu', 'arrest memo', 'bnss 35', 'bnss 58'],
      },
      {
        id: 'women-arrest-safeguards',
        title: 'Special Safeguards for Women During Arrest & Interrogation',
        legalArea: 'Criminal Procedure & Gender Protections',
        relevantLaw: 'BNSS 2023 Section 43(5), Section 51(2), Section 179 & Section 183',
        explanation:
          'No woman can be arrested after sunset and before sunrise except in extraordinary circumstances, and even then, only by a woman police officer with prior written permission from a Judicial Magistrate First Class. Searches of a woman can strictly be conducted only by another woman with strict regard to decency. Women and minors under 15 years cannot be required to attend a police station for witness examination; questioning must take place at their place of residence.',
        practicalExample:
          'If male police officers attempt to arrest a woman at 9:00 PM without a woman officer or without an express Magisterial warrant, the action is unlawful under Section 43(5) of the BNSS 2023. Her family can cite this provision and contact the District Control Room or Magistrate.',
        actionPoints: [
          'Verify that a female police officer is present during any interrogation, custody, or search.',
          'Remind officers that arrests between sunset and sunrise require prior written judicial sanction.',
          'For witness statements, women are entitled to be questioned at their home in the presence of parents or guardians.',
        ],
        relatedPages: [
          { title: 'BNSS 2023 Section 43', to: '/laws/bnss-2023' },
          { title: 'Article 14 & 15: Gender Equality', to: '/fundamental-rights' },
          { title: 'What Happened? Incident Assessment', to: '/harmed' },
        ],
        officialSource: {
          name: 'National Commission for Women (NCW)',
          url: 'http://ncw.nic.in',
          portal: 'ncw.nic.in',
        },
        keywords: ['women arrest', 'sunset sunrise', 'female officer', 'search decency', 'interrogation at home', 'bnss 43'],
      },
      {
        id: 'zero-fir-complaint-rights',
        title: 'Zero FIR & Remedy on Police Refusal to Register Complaints',
        legalArea: 'Criminal Procedure & Statutory Registration',
        relevantLaw: 'BNSS 2023 Section 173 (replaces CrPC Section 154)',
        explanation:
          'A Zero FIR enables any citizen to lodge an FIR for a cognizable crime at any police station across India, regardless of where the incident took place. The station assigns it number "0" and is statutorily required to register it immediately and transfer it to the jurisdictional police station within 15 days. Additionally, complainants have the statutory right to receive a signed copy of the FIR free of cost immediately.',
        practicalExample:
          'If your vehicle or phone is stolen while travelling across state lines and the nearest local police station refuses to file an FIR claiming "this occurred in another jurisdiction," they violate Section 173(1). If an officer refuses to register a cognizable complaint, Section 173(4) empowers you to send the complaint in writing by registered post or electronic mail directly to the Superintendent of Police (SP) or Deputy Commissioner of Police (DCP).',
        actionPoints: [
          'Request the Station House Officer (SHO) to record a Zero FIR under BNSS Section 173(1).',
          'Demand your free physical or digitally signed copy of the registered FIR (Section 173(2)).',
          'If refused, submit the complaint directly to the SP/DCP by registered post or email under Section 173(4).',
          'If the SP fails to act, approach the Judicial Magistrate under Section 175(3) for an order directing registration.',
        ],
        relatedPages: [
          { title: 'BNSS 2023 Section 173', to: '/laws/bnss-2023' },
          { title: 'BNS 2023 Offence Index', to: '/laws/bns-2023' },
          { title: 'Legal Term: Cognizable Offence', to: '/legal-terms#cognizable-offence' },
          { title: 'Legal Term: First Information Report (FIR)', to: '/legal-terms#fir' },
        ],
        officialSource: {
          name: 'Ministry of Home Affairs (MHA) — Citizen Grievances',
          url: 'https://mha.gov.in',
          portal: 'mha.gov.in',
        },
        keywords: ['zero fir', 'fir registration', 'refusal to file fir', 'sp complaint', 'bnss 173', 'cognizable'],
      },
      {
        id: 'search-seizure-videography',
        title: 'Mandatory Videography of Search & Seizure',
        legalArea: 'Evidence Integrity & Investigating Standards',
        relevantLaw: 'BNSS 2023 Section 105',
        explanation:
          'Under the new criminal procedural framework, all searches conducted by police officers and all seizures of property, documents, or digital devices must be recorded through audio-video electronic means, including mobile phones. The investigating officer must forward the recording without delay to the Judicial Magistrate.',
        practicalExample:
          'If police officers conduct a search of your premises or confiscate laptops and mobile phones without independent local witnesses and without audio-video recording, the seizure procedure breaches Section 105, which can be challenged during trial to dispute the chain of custody.',
        actionPoints: [
          'Observe whether independent local witnesses are present during the search (BNSS Section 103).',
          'Ensure the seizing officer notes all items in a formal seizure list and provides a copy to you.',
          'Verify that audio-video recording is active during the seizure process.',
        ],
        relatedPages: [
          { title: 'BNSS 2023 Section 105', to: '/laws/bnss-2023' },
          { title: 'Compare CrPC 1973 ↔ BNSS 2023', to: '/compare' },
        ],
        officialSource: {
          name: 'Gazette of India — Act No. 46 of 2023',
          url: 'https://egazette.gov.in',
          portal: 'egazette.gov.in',
        },
        keywords: ['search seizure', 'videography', 'bnss 105', 'evidence recording', 'independent witnesses'],
      },
    ],
  },
  {
    id: 'consumer-rights',
    title: 'Consumer Rights',
    shortTitle: 'Consumers',
    icon: 'ShoppingBag',
    description:
      'Statutory guarantees protecting buyers of products, digital services, e-commerce deliveries, banking facilities, and commercial goods against unfair practices.',
    topics: [
      {
        id: 'consumer-six-guarantees',
        title: 'The Six Codified Consumer Rights in India',
        legalArea: 'Consumer Protection & Fair Trade',
        relevantLaw: 'Consumer Protection Act, 2019 Section 2(9)',
        explanation:
          'Every consumer in India is granted six fundamental statutory rights: (1) Right to Safety against hazardous goods/services, (2) Right to Information regarding quality, quantity, potency, purity, standard, and price, (3) Right to Choice across competitive varieties, (4) Right to be Heard in appropriate forums, (5) Right to Redressal against unfair trade practices or restrictive exploitation, and (6) Right to Consumer Awareness.',
        practicalExample:
          'If an electronics manufacturer conceals known battery defects, refuses to display the Maximum Retail Price (MRP), or forces tied purchases, it infringes the Rights to Information and Choice under Section 2(9).',
        actionPoints: [
          'Preserve tax invoices, warranties, transaction SMS, delivery receipts, and packaging.',
          'Send a formal notice giving the vendor 15 days to remedy or refund before filing a dispute.',
          'Lodge a grievance on the National Consumer Helpline (1915) or consumerhelpline.gov.in.',
        ],
        relatedPages: [
          { title: 'Consumer Protection Act, 2019', to: '/laws/consumer-protection-2019' },
          { title: 'Indian Contract Act: Breach & Compensation', to: '/laws/indian-contract-1872' },
          { title: 'Legal Term: Consumer Forum', to: '/legal-terms#consumer-forum' },
        ],
        officialSource: {
          name: 'Department of Consumer Affairs — National Consumer Helpline',
          url: 'https://consumerhelpline.gov.in',
          portal: 'consumerhelpline.gov.in (Toll Free: 1915)',
        },
        keywords: ['consumer rights', 'right to safety', 'right to information', 'unfair trade practice', 'cpa 2019'],
      },
      {
        id: 'edaakhil-complaint-filing',
        title: 'Online Filing via e-Daakhil Without an Advocate',
        legalArea: 'Consumer Dispute Resolution',
        relevantLaw: 'Consumer Protection Act, 2019 Section 35 & E-Daakhil Portal',
        explanation:
          'Under the 2019 Act, consumers can file complaints electronically through the official e-Daakhil portal from the comfort of their home. Complaints can be instituted in the District Commission within whose jurisdiction the consumer resides or works, eliminating the requirement to travel to the seller’s location. Moreover, there is zero court fee for claims up to ₹5 lakh, and hiring an advocate is not mandatory; consumers may present their case in person or via video conferencing.',
        practicalExample:
          'If an online shopping portal delivers a damaged television and refuses a refund, you can file a complaint directly on edaakhil.nic.in against the e-commerce entity from your home city without hiring a lawyer.',
        actionPoints: [
          'Register on edaakhil.nic.in with your Aadhaar or mobile verification.',
          'Upload your complaint petition with invoice, photos of defective merchandise, and communication logs.',
          'Check if claim amount is up to ₹5 lakh to benefit from zero court fee exemption.',
          'Track hearing dates and submit evidence or participate via online video hearings.',
        ],
        relatedPages: [
          { title: 'Consumer Protection Act Overview', to: '/laws/consumer-protection-2019' },
          { title: 'What Happened? Guided Situation Tool', to: '/harmed' },
        ],
        officialSource: {
          name: 'e-Daakhil Portal (National Consumer Disputes Redressal Commission)',
          url: 'https://edaakhil.nic.in',
          portal: 'edaakhil.nic.in',
        },
        keywords: ['edaakhil', 'consumer complaint', 'no lawyer needed', 'district commission', 'online shopping refund'],
      },
      {
        id: 'product-liability-claims',
        title: 'Product Liability: Compensation for Harm from Defective Goods',
        legalArea: 'Civil Liability & Manufacturer Accountability',
        relevantLaw: 'Consumer Protection Act, 2019 Sections 82–87',
        explanation:
          'The Consumer Protection Act introduced strict Product Liability. Manufacturers, service providers, and product sellers can be held liable to compensate a consumer for any physical injury, property damage, or death caused by a defective product, design defect, inadequate warning, or deficiency in service.',
        practicalExample:
          'If a smartphone battery explodes during regular use causing burns and damaging personal property, the manufacturer cannot escape liability simply by offering a replacement device; they are liable under Section 84 to pay compensation for personal injury and medical expenses.',
        actionPoints: [
          'Retain the damaged product, serial numbers, box, and charging accessories as physical evidence.',
          'Document medical records, burn treatments, doctor prescriptions, and hospital billing.',
          'File a comprehensive product liability claim before the appropriate Consumer Commission.',
        ],
        relatedPages: [
          { title: 'Consumer Protection Act, 2019', to: '/laws/consumer-protection-2019' },
          { title: 'Indian Contract Act, 1872', to: '/laws/indian-contract-1872' },
        ],
        officialSource: {
          name: 'Central Consumer Protection Authority (CCPA)',
          url: 'https://consumeraffairs.nic.in',
          portal: 'consumeraffairs.nic.in',
        },
        keywords: ['product liability', 'defective goods', 'injury compensation', 'cpa section 84', 'consumer damage'],
      },
    ],
  },
  {
    id: 'workplace-rights',
    title: 'Workplace & Labor Rights',
    shortTitle: 'Workplace',
    icon: 'Briefcase',
    description:
      'Statutory entitlements for salaried employees, wage earners, contract workers, and corporate staff governing wages, working hours, safety, and termination.',
    topics: [
      {
        id: 'posh-workplace-harassment',
        title: 'Protection Against Sexual Harassment (POSH Act)',
        legalArea: 'Labor Rights, Gender Equality & Safety',
        relevantLaw: 'Sexual Harassment of Women at Workplace Act, 2013 & Vishaka Doctrine',
        explanation:
          'Every workplace employing 10 or more workers is statutorily required to establish an Internal Committee (IC) headed by a senior woman employee, with at least 50% women members and one external member from an NGO. For smaller establishments or grievances against an employer, a Local Committee (LC) functions at the District Magistrate level. Complainants are guaranteed complete confidentiality under Section 16; identity details cannot be disclosed to the public or press.',
        practicalExample:
          'If a supervisor makes unwelcome physical advances or conditions promotions on sexual favors, the employee can lodge a formal written complaint with the IC within 3 months. The IC is empowered to grant interim relief, such as paid leave up to 3 months or department transfer, during the inquiry.',
        actionPoints: [
          'Submit a written complaint to any member of your workplace Internal Committee within 90 days.',
          'If no IC exists, lodge your complaint on the Ministry of Women and Child Development SHe-Box portal.',
          'Request interim protective relief (transfer or paid leave) while the inquiry proceeds.',
          'The IC must conclude its inquiry within 90 days and submit its report within 10 days thereafter.',
        ],
        relatedPages: [
          { title: 'Landmark Precedent: Vishaka v. State of Rajasthan', to: '/case-law' },
          { title: 'Article 14 & 21: Dignity & Equality', to: '/fundamental-rights' },
          { title: 'Legal Term: Natural Justice', to: '/legal-terms#natural-justice' },
        ],
        officialSource: {
          name: 'Ministry of Women and Child Development — SHe-Box Portal',
          url: 'https://shebox.wcd.gov.in',
          portal: 'shebox.wcd.gov.in',
        },
        keywords: ['posh', 'sexual harassment', 'internal committee', 'she-box', 'workplace dignity', 'vishaka'],
      },
      {
        id: 'retrenchment-severance-notice',
        title: 'Retrenchment, Notice Pay & Severance Compensation',
        legalArea: 'Industrial Law & Employment Protection',
        relevantLaw: 'Industrial Disputes Act, 1947 Section 25F',
        explanation:
          'An employer cannot retrench a workman who has completed one year of continuous service without: (a) giving one month’s written notice indicating the reasons for retrenchment, or paying wages in lieu of notice, and (b) paying compensation equal to 15 days’ average pay for every completed year of continuous service.',
        practicalExample:
          'If an industrial enterprise terminates an employee with 4 years of continuous service overnight without notice or severance dues, the termination is unlawful under Section 25F and can be challenged before the Labor Conciliation Officer or Labor Court for reinstatement with back wages.',
        actionPoints: [
          'Collect your appointment letter, monthly payslips, provident fund (EPF) statements, and termination email.',
          'Calculate your entitlement: 1 month notice wages + 15 days wages per completed year of service.',
          'Submit a demand notice to the employer, followed by a dispute petition before the jurisdictional Labor Officer.',
        ],
        relatedPages: [
          { title: 'Industrial Disputes Act, 1947', to: '/laws/industrial-disputes-1947' },
          { title: 'Indian Contract Act: Employment Contracts', to: '/laws/indian-contract-1872' },
        ],
        officialSource: {
          name: 'Ministry of Labour & Employment — Shram Suvidha Portal',
          url: 'https://shramsuvidha.gov.in',
          portal: 'labour.gov.in',
        },
        keywords: ['retrenchment', 'severance pay', 'wrongful termination', 'industrial disputes 25f', 'notice period'],
      },
      {
        id: 'maternity-benefits-entitlement',
        title: '26 Weeks Paid Maternity Leave & Creche Entitlements',
        legalArea: 'Maternity Protection & Healthcare',
        relevantLaw: 'Maternity Benefit Act, 1961 (Amended 2017) Section 5 & 11A',
        explanation:
          'Women employees in establishments with 10 or more employees are entitled to 26 weeks of fully paid maternity leave for their first two surviving children (up to 8 weeks before delivery). Employers are prohibited from dismissing, discharging, or altering employment conditions to a woman’s disadvantage during maternity leave. Establishments with 50 or more employees must mandatorily provide a creche facility within prescribed distance.',
        practicalExample:
          'If an IT company or corporate office terminates a pregnant employee or denies paid maternity leave citing company policy, they commit an offence punishable with imprisonment under Section 21 of the Maternity Benefit Act.',
        actionPoints: [
          'Submit formal written notice to employer specifying expected delivery date and leave commencement.',
          'Ensure you have worked at least 80 days with the establishment in the preceding 12 months.',
          'Report unlawful dismissal or denial of benefit to the State Chief Inspector of Factories / Labor Commissioner.',
        ],
        relatedPages: [
          { title: 'Article 15(3): Special Provisions for Women', to: '/fundamental-rights' },
          { title: 'Industrial Disputes Act', to: '/laws/industrial-disputes-1947' },
        ],
        officialSource: {
          name: 'Ministry of Labour and Employment — Maternity Benefits',
          url: 'https://labour.gov.in',
          portal: 'labour.gov.in',
        },
        keywords: ['maternity benefit', '26 weeks leave', 'creche facility', 'paid maternity', 'pregnancy dismissal'],
      },
    ],
  },
  {
    id: 'tenant-property',
    title: 'Tenant & Property Rights',
    shortTitle: 'Tenants & Property',
    icon: 'Home',
    description:
      'Legal protections governing residential rental agreements, landlord obligations, security deposits, eviction procedures, and peaceful possession.',
    topics: [
      {
        id: 'essential-services-protection',
        title: 'Protection Against Disconnection of Water & Electricity',
        legalArea: 'Tenancy Law & Essential Municipal Amenities',
        relevantLaw: 'Model Tenancy Act 2021 Section 20 & State Rent Control Enactments',
        explanation:
          'No landlord or property owner can sever, withhold, or cut off essential supplies—such as water, electricity, sanitary services, or lift access—to rented premises, even in the event of rental arrears or tenancy disputes. Landlords must seek recovery through lawful adjudication, not municipal sabotage.',
        practicalExample:
          'If a landlord disconnects electricity or locks the water valve because rent was delayed by two weeks, they commit an actionable violation. The tenant can file an urgent petition before the Rent Authority or Civil Court, which has the power to restore connections immediately and levy penal fines on the landlord.',
        actionPoints: [
          'Photograph or record videos demonstrating the disconnection (e.g. main breaker turned off, dry taps).',
          'Send a written text or email to the landlord requesting restoration within 24 hours.',
          'Approach the jurisdictional Rent Tribunal or District Civil Court under Section 20 for an immediate restoration injunction.',
        ],
        relatedPages: [
          { title: 'Transfer of Property Act, 1882', to: '/laws/transfer-of-property-1882' },
          { title: 'Indian Contract Act, 1872', to: '/laws/indian-contract-1872' },
          { title: 'What Happened? Incident Assessment', to: '/harmed' },
        ],
        officialSource: {
          name: 'Ministry of Housing and Urban Affairs — Model Tenancy Act',
          url: 'https://mohua.gov.in',
          portal: 'mohua.gov.in',
        },
        keywords: ['tenant rights', 'cut water', 'cut electricity', 'landlord dispute', 'essential services', 'rent control'],
      },
      {
        id: 'unlawful-eviction-safeguards',
        title: 'Protection Against Forceful or Arbitrary Eviction',
        legalArea: 'Property Possession & Civil Procedure',
        relevantLaw: 'Transfer of Property Act, 1882 Section 106, 111 & Supreme Court Rulings',
        explanation:
          'In India, a landlord cannot physically evict a tenant or throw belongings onto the street by force, muscle power, or extra-judicial threats. Due process of law is mandatory: the landlord must serve a formal statutory notice to quit and obtain a formal decree or eviction order from a competent court or Rent Tribunal.',
        practicalExample:
          'If a landlord hires individuals to lock a tenant out of their rented apartment while they are at work, the landlord commits criminal trespass and wrongful restraint under BNS 2023 Sections 329 and 126, alongside civil tort liability.',
        actionPoints: [
          'Immediately dial emergency police helpline (112) to report criminal trespass and unlawful lockout.',
          'File an application under Section 6 of the Specific Relief Act, 1963 for summary recovery of possession.',
          'Maintain proof of rent payments, utility bills in your name, and signed tenancy agreements.',
        ],
        relatedPages: [
          { title: 'Transfer of Property Act, 1882', to: '/laws/transfer-of-property-1882' },
          { title: 'BNS 2023: Criminal Trespass & Wrongful Restraint', to: '/laws/bns-2023' },
          { title: 'Legal Term: Injunction', to: '/legal-terms#injunction' },
        ],
        officialSource: {
          name: 'India Code — Transfer of Property Act, 1882',
          url: 'https://indiacode.nic.in',
          portal: 'indiacode.nic.in',
        },
        keywords: ['illegal eviction', 'landlord lock out', 'notice to quit', 'peaceful possession', 'transfer of property'],
      },
      {
        id: 'landlord-entry-notice',
        title: '24-Hour Notice Requirement for Landlord Entry',
        legalArea: 'Privacy & Tenancy Management',
        relevantLaw: 'Model Tenancy Act 2021 Section 15 & Right to Privacy (Art. 21)',
        explanation:
          'A tenant holds exclusive possession of rented premises during the subsistence of the lease. A landlord cannot barge in unannounced. Under modern tenancy statutes, the landlord or their agent must give at least 24 hours prior written or electronic notice before entering the premises for inspections, repairs, or structural viewings, and entry must strictly occur during daylight hours.',
        practicalExample:
          'If a landlord uses a duplicate key to enter a rented apartment uninvited without notice, they infringe the tenant’s right to domestic privacy and quiet enjoyment of leased property.',
        actionPoints: [
          'Ensure the rental agreement specifies the 24-hour advance notice requirement and reasonable entry hours.',
          'Request that any property inspection be scheduled via written message or email.',
          'In case of persistent intrusion, issue a legal cease-and-desist notice for violation of quiet possession.',
        ],
        relatedPages: [
          { title: 'Right to Privacy (Article 21)', to: '/fundamental-rights' },
          { title: 'Transfer of Property Act, 1882', to: '/laws/transfer-of-property-1882' },
        ],
        officialSource: {
          name: 'Department of Urban Development — Tenancy Guidelines',
          url: 'https://mohua.gov.in',
          portal: 'mohua.gov.in',
        },
        keywords: ['landlord entry', '24 hour notice', 'tenant privacy', 'quiet enjoyment', 'duplicate key'],
      },
      {
        id: 'security-deposit-refund',
        title: 'Return of Security Deposit & Unjustified Deductions',
        legalArea: 'Tenancy Law & Contractual Obligations',
        relevantLaw: 'Model Tenancy Act 2021 Section 11 & Indian Contract Act 1872 Section 73',
        explanation:
          'Security deposits collected by landlords for residential tenancies are held in trust to secure performance and cannot exceed standard statutory ceilings (typically up to two months rent under the Model Tenancy Act). Upon vacation of the premises and handing over of peaceful possession, the landlord is legally obligated to return the security deposit after deducting legitimate actual dues or structural damage repair costs. Landlords cannot deduct for standard wear-and-tear resulting from normal daily usage.',
        practicalExample:
          'If a tenant vacates a flat, returns the keys, and the landlord refuses to return a ₹50,000 deposit claiming general painting or arbitrary cleaning expenses without invoice evidence or agreement basis, the landlord is unlawfully withholding money under civil contract principles and tenancy regulations.',
        actionPoints: [
          'Document the move-out condition with dated high-resolution photos and video walkthroughs before handing over keys.',
          'Issue a formal written demand notice specifying account details and demanding deposit refund within 14 to 30 days.',
          'If refused, file a complaint before the local Rent Authority / Rent Court or submit a consumer/civil claim for wrongful retention.',
        ],
        relatedPages: [
          { title: 'Transfer of Property Act, 1882', to: '/laws/transfer-of-property-1882' },
          { title: 'Indian Contract Act, 1872', to: '/laws/indian-contract-1872' },
          { title: 'Legal Tools: Complaint Prep Guide', to: '/tools?tool=complaint' },
          { title: 'Legal Terms: Breach of Contract & Compensation', to: '/legal-terms#compensation' },
        ],
        officialSource: {
          name: 'Ministry of Housing and Urban Affairs — Model Tenancy Guidelines',
          url: 'https://mohua.gov.in',
          portal: 'mohua.gov.in',
        },
        keywords: [
          'deposit',
          'security deposit',
          'landlord deposit',
          'return deposit',
          'refund deposit',
          'withheld deposit',
          'tenancy deposit',
          'rental bond',
        ],
      },
    ],
  },
  {
    id: 'women-child',
    title: 'Women & Child Rights',
    shortTitle: 'Women & Children',
    icon: 'Users',
    description:
      'Statutory protections shielding women and minors from domestic violence, sexual offences, economic deprivation, child labour, and inheritance exclusion.',
    topics: [
      {
        id: 'pwdva-domestic-violence-relief',
        title: 'Immediate Protective Relief Under the Domestic Violence Act',
        legalArea: 'Family Law & Civil-Criminal Protective Remedies',
        relevantLaw: 'Protection of Women from Domestic Violence Act, 2005 (PWDVA)',
        explanation:
          'The PWDVA protects wives, live-in partners, mothers, and sisters from physical, sexual, emotional, verbal, and economic abuse in a shared household. Crucially, the Act provides civil remedies: Protection Orders (prohibiting the abuser from entering the victim’s workplace or residence), Residence Orders (barring the abuser from dispossessing the woman from the shared home), Monetary Relief (medical costs and maintenance), and Temporary Child Custody Orders.',
        practicalExample:
          'If an abusive spouse or in-laws attempt to throw a woman out of the marital home or cut off grocery funds, she can approach a Protection Officer or Magistrate for an urgent ex-parte Residence Order under Section 19 preventing her eviction, regardless of whether she owns the property.',
        actionPoints: [
          'Contact the District Protection Officer, local Mahila Police Station, or call National Women Helpline: 181.',
          'File an application under Section 12 before the Judicial Magistrate for an interim Protection & Residence order.',
          'Obtain free legal assistance through the District Legal Services Authority (DLSA).',
        ],
        relatedPages: [
          { title: 'Hindu Marriage Act, 1955', to: '/laws/hindu-marriage-1955' },
          { title: 'BNS 2023: Cruelty by Husband or Relatives (Sec 85/86)', to: '/laws/bns-2023' },
          { title: 'Free Legal Aid (Article 39A)', to: '/search?q=legal+aid' },
        ],
        officialSource: {
          name: 'National Commission for Women (Helpline: 7827170170 / 181)',
          url: 'http://ncw.nic.in',
          portal: 'ncw.nic.in',
        },
        keywords: ['domestic violence', 'pwdva', 'residence order', 'protection order', 'women helpline 181', 'shared household'],
      },
      {
        id: 'victim-identity-masking',
        title: 'Mandatory Anonymity for Sexual Assault Survivors',
        legalArea: 'Criminal Law & Victim Dignity',
        relevantLaw: 'BNS 2023 Section 72 (replaces IPC 228A) & POCSO Act Section 23',
        explanation:
          'Indian law strictly criminalizes publishing or revealing the name, address, photograph, family details, or any information leading to the identification of a victim of rape or sexual offences under BNS 2023 Section 72. Violation is punishable with imprisonment up to two years and fine. Under POCSO Section 23, disclosing child victim identity in media or social networks is severely punished.',
        practicalExample:
          'If a media channel, newspaper, or social media user publishes the photograph or identity of a survivor of sexual assault, they commit a distinct cognizable criminal offence under Section 72, independent of the main assault trial.',
        actionPoints: [
          'Survivors have the right to have court trials held in camera (closed court without public) under BNSS Section 366.',
          'Police records and chargesheets must mask the survivor’s name using pseudonyms (e.g. "Victim X").',
          'Report social media posts revealing survivor identities to cybercrime.gov.in and the platform grievance officer.',
        ],
        relatedPages: [
          { title: 'BNS 2023 Section 72: Identity Masking', to: '/laws/bns-2023' },
          { title: 'BNSS 2023 In-Camera Trials', to: '/laws/bnss-2023' },
        ],
        officialSource: {
          name: 'Supreme Court Guidelines — Nipun Saxena v. Union of India',
          url: 'https://main.sci.gov.in',
          portal: 'main.sci.gov.in',
        },
        keywords: ['identity protection', 'bns 72', 'ipc 228a', 'pocso anonymity', 'victim dignity', 'in camera trial'],
      },
      {
        id: 'daughters-coparcenary-inheritance',
        title: 'Equal Coparcenary & Inheritance Rights for Daughters',
        legalArea: 'Succession & Property Inheritance',
        relevantLaw: 'Hindu Succession (Amendment) Act, 2005 Section 6 & Vineeta Sharma v. Rakesh Sharma',
        explanation:
          'Under the Hindu Succession Act as interpreted by the Supreme Court in Vineeta Sharma (2020), daughters hold equal coparcenary rights by birth in ancestral Joint Hindu Family property, with the exact same rights and liabilities as sons. This right applies whether the father was alive or not when the 2005 amendment took effect.',
        practicalExample:
          'If brothers attempt to partition ancestral agricultural land or family residential property while excluding their sister on the pretext of gender or marriage status, the partition is legally voidable; the daughter can file a civil suit for partition claiming her equal share.',
        actionPoints: [
          'Obtain revenue land records, family genealogy (kursinama), and property title deeds.',
          'Issue a formal legal notice seeking your legitimate equal share in ancestral coparcenary assets.',
          'File a Civil Partition Suit before the District Senior Civil Judge.',
        ],
        relatedPages: [
          { title: 'Hindu Marriage Act, 1955', to: '/laws/hindu-marriage-1955' },
          { title: 'Transfer of Property Act, 1882', to: '/laws/transfer-of-property-1882' },
          { title: 'Constitutional Equality (Article 14 & 15)', to: '/fundamental-rights' },
        ],
        officialSource: {
          name: 'Supreme Court Judgment — Vineeta Sharma v. Rakesh Sharma (2020)',
          url: 'https://main.sci.gov.in',
          portal: 'main.sci.gov.in',
        },
        keywords: ['coparcenary', 'daughter inheritance', 'hindu succession', 'ancestral property', 'vineeta sharma'],
      },
    ],
  },
  {
    id: 'cyber-digital',
    title: 'Cyber & Digital Rights',
    shortTitle: 'Cyber & Digital',
    icon: 'Wifi',
    description:
      'Rights protecting internet users against online banking scams, digital extortion, identity theft, unauthorized data harvesting, and cyber harassment.',
    topics: [
      {
        id: 'cyber-financial-fraud-1930',
        title: 'The Golden Hour Protocol: Helpline 1930 & Account Freezing',
        legalArea: 'Cybercrime Redressal & Emergency Financial Safeguards',
        relevantLaw: 'Information Technology Act, 2000 & Citizen Financial Cyber Fraud Reporting System',
        explanation:
          'If you fall victim to unauthorized UPI, net-banking, credit card, or investment fraud, calling National Cyber Crime Helpline 1930 immediately within the first 2 hours ("Golden Hour") activates the Citizen Financial Cyber Fraud Reporting System (CFCFRMS). This system automatically notifies beneficiary banks, payment gateways, and wallet operators to freeze the stolen funds before the scammer can withdraw them at ATMs.',
        practicalExample:
          'If ₹50,000 is siphoned from your bank account via a phishing APK or fake KYC call at 10:00 AM, calling 1930 at 10:15 AM enables the cyber cell to place an immediate hold on the recipient bank wallet, enabling fund reversal upon verification.',
        actionPoints: [
          'Call 1930 immediately with transaction UTR numbers, debit bank account, and transfer time.',
          'File a formal online report at cybercrime.gov.in and download the acknowledgment PDF.',
          'Submit the cyber acknowledgment to your home bank branch within 24 hours to trigger zero-liability safeguards.',
        ],
        relatedPages: [
          { title: 'Information Technology Act, 2000', to: '/laws/it-act-2000' },
          { title: 'BNS 2023: Cheating & Impersonation (Sec 318/319)', to: '/laws/bns-2023' },
          { title: 'What Happened? Incident Assessment', to: '/harmed' },
        ],
        officialSource: {
          name: 'National Cyber Crime Reporting Portal (Helpline: 1930)',
          url: 'https://cybercrime.gov.in',
          portal: 'cybercrime.gov.in',
        },
        keywords: ['1930 helpline', 'cyber fraud', 'freeze bank account', 'upi scam', 'it act', 'golden hour'],
      },
      {
        id: 'rbi-zero-liability-banking',
        title: 'Zero Liability for Unauthorized Electronic Banking Fraud',
        legalArea: 'Banking Law & Consumer Protection',
        relevantLaw: 'RBI Circular on Customer Protection (DBR.No.Leg.BC.78/09.07.005/2017-18)',
        explanation:
          'Under Reserve Bank of India (RBI) regulations, a bank customer has ZERO liability for unauthorized electronic transactions where the fraud is due to contributory fraud, negligence, or deficiency on the part of the bank, or where a third-party breach occurs and the customer notifies the bank within three working days of receiving the SMS or email alert.',
        practicalExample:
          'If someone clones your debit card without your knowledge and conducts transactions at midnight, and you report it to the bank within 72 hours, the bank is mandated by RBI guidelines to credit the shadow amount back to your account within 10 working days.',
        actionPoints: [
          'Never share OTPs, UPI PINs, or card CVVs with anyone under any circumstances.',
          'Immediately block the card or net-banking access via your banking app or customer care.',
          'Lodge a written dispute with the bank within 3 working days and obtain a stamped acknowledgment.',
          'If the bank fails to resolve within 30 days, escalate to the RBI Banking Ombudsman (cms.rbi.org.in).',
        ],
        relatedPages: [
          { title: 'Consumer Protection Act, 2019', to: '/laws/consumer-protection-2019' },
          { title: 'Information Technology Act, 2000', to: '/laws/it-act-2000' },
        ],
        officialSource: {
          name: 'Reserve Bank of India — Complaint Management System (CMS)',
          url: 'https://cms.rbi.org.in',
          portal: 'cms.rbi.org.in',
        },
        keywords: ['rbi zero liability', 'unauthorized transaction', 'banking ombudsman', 'card cloning', '3 days notification'],
      },
      {
        id: 'cyber-stalking-morphing-relief',
        title: 'Protection Against Cyber Stalking & Non-Consensual Image Sharing',
        legalArea: 'Cyber Criminality & Digital Autonomy',
        relevantLaw: 'BNS 2023 Section 77 & 78 (replaces IPC 354C/354D) & IT Act Section 66E, 67A',
        explanation:
          'Monitoring a person’s internet activity, social media, or emails against their wish is an offence under BNS Section 78. Capturing, publishing, or transmitting images of a private area of any person without consent is punishable under Section 66E of the IT Act and Section 77 of the BNS. Transmitting sexually explicit content electronically carries up to 5 years imprisonment under Section 67A of the IT Act.',
        practicalExample:
          'If an individual threatens to post private photographs or morphs photos taken from your profile, you can register an immediate complaint on cybercrime.gov.in under the "Report Crime Against Women & Children" tab with anonymity options, compelling social media intermediaries to take down the material within 24 hours under the IT Intermediary Rules.',
        actionPoints: [
          'Take screenshots showing account handles, URLs, timestamps, and threatening text before content is deleted.',
          'Report the offending profile to the platform’s grievance officer requesting takedown within 24 hours.',
          'File an e-complaint on cybercrime.gov.in under the specialized Women & Child module.',
        ],
        relatedPages: [
          { title: 'BNS 2023 Offences Against Women', to: '/laws/bns-2023' },
          { title: 'IT Act, 2000: Digital Offences', to: '/laws/it-act-2000' },
          { title: 'Constitutional Right to Privacy (Art. 21)', to: '/fundamental-rights' },
        ],
        officialSource: {
          name: 'Cyber Crime Portal — Report Anonymously (Women/Children)',
          url: 'https://cybercrime.gov.in',
          portal: 'cybercrime.gov.in',
        },
        keywords: ['cyber stalking', 'morphed photos', 'it act 66e', 'it act 67a', 'bns 77', 'bns 78', 'take down notice'],
      },
    ],
  },
  {
    id: 'constitutional-rights',
    title: 'Constitutional Rights',
    shortTitle: 'Constitutional',
    icon: 'Landmark',
    description:
      'Foundational human rights guaranteed to every citizen under Part III of the Constitution of India, enforceable directly against the State.',
    topics: [
      {
        id: 'article-14-equality-arbitrariness',
        title: 'Article 14: Equality Before Law & Protection from Arbitrary Action',
        legalArea: 'Constitutional Law & Administrative Justice',
        relevantLaw: 'Constitution of India Article 14 & Royappa / Maneka Gandhi Precedents',
        explanation:
          'Article 14 guarantees that the State shall not deny to any person equality before the law or the equal protection of the laws within India. The Supreme Court has ruled that equality is the antithesis of arbitrariness: any government action, tender decision, quota allocation, or official ruling that is whimsical, unreasonable, or lacking rational nexus violates Article 14.',
        practicalExample:
          'If a municipal body awards a public commercial license to a favored individual without public tender or transparent criteria, an aggrieved applicant can challenge the award before the High Court for violation of Article 14.',
        actionPoints: [
          'Establish that an authority falling under "State" (Article 12) acted without fair and transparent classification.',
          'Collect official tender documents, notification guidelines, and rejection letters.',
          'File a Writ Petition under Article 226 before the jurisdictional High Court.',
        ],
        relatedPages: [
          { title: 'Fundamental Rights: Right to Equality', to: '/fundamental-rights' },
          { title: 'Landmark Precedent: Maneka Gandhi', to: '/case-law' },
          { title: 'Legal Term: Natural Justice', to: '/legal-terms#natural-justice' },
        ],
        officialSource: {
          name: 'Supreme Court of India — Constitutional Benches',
          url: 'https://main.sci.gov.in',
          portal: 'main.sci.gov.in',
        },
        keywords: ['article 14', 'equality before law', 'arbitrariness', 'maneka gandhi', 'fundamental rights'],
      },
      {
        id: 'article-19-six-freedoms',
        title: 'Article 19: The Six Democratic Freedoms & Reasonable Restrictions',
        legalArea: 'Civil Liberties & Fundamental Freedoms',
        relevantLaw: 'Constitution of India Article 19(1)(a)–(g) & Article 19(2)–(6)',
        explanation:
          'Article 19 guarantees six basic freedoms to all Indian citizens: (a) speech and expression, (b) peaceful assembly without arms, (c) forming associations or unions, (d) moving freely throughout India, (e) residing and settling in any part of India, and (g) practicing any profession, trade, or business. However, these rights are not absolute; they can only be restricted on specific, constitutionally exhaustively enumerated grounds (such as sovereignty, security of State, public order, decency, or contempt of court) under reasonable restrictions.',
        practicalExample:
          'If authorities ban peaceful citizens from gathering in a designated public demonstration area simply because they disagree with the viewpoint being expressed, the ban fails the reasonable restriction test under Article 19(2) and can be struck down by courts.',
        actionPoints: [
          'Verify whether the restriction was imposed by an enacted law rather than mere executive fiat.',
          'Assess whether the restriction is strictly proportional to the public interest sought to be preserved.',
          'Approach the High Court under Article 226 seeking a Writ of Mandamus or Certiorari against the blanket order.',
        ],
        relatedPages: [
          { title: 'Fundamental Rights: Right to Freedom', to: '/fundamental-rights' },
          { title: 'Article 13: What Happens if a Law Violates Rights', to: '/fundamental-rights#article-13' },
          { title: 'Landmark Precedent: Shreya Singhal (Section 66A)', to: '/case-law' },
        ],
        officialSource: {
          name: 'Constitution of India (Part III) — Legislative Department',
          url: 'https://legislative.gov.in/constitution-of-india',
          portal: 'legislative.gov.in',
        },
        keywords: ['article 19', 'freedom of speech', 'freedom of assembly', 'reasonable restrictions', 'civil liberties'],
      },
      {
        id: 'article-21-life-dignity-privacy',
        title: 'Article 21: Protection of Life, Personal Liberty & Privacy',
        legalArea: 'Fundamental Human Rights & Personal Autonomy',
        relevantLaw: 'Constitution of India Article 21 & K.S. Puttaswamy v. Union of India',
        explanation:
          'Article 21 is the foundational core of Indian constitutional jurisprudence: "No person shall be deprived of his life or personal liberty except according to procedure established by law." Through judicial interpretation, "life" means living with human dignity, encompassing the right to clean environment, healthcare, shelter, speedy trial, legal aid, and the fundamental Right to Privacy declared in the 9-judge Puttaswamy ruling.',
        practicalExample:
          'If a state agency conducts unlawful phone tapping or unauthorized biometric tracking without statutory authority and judicial oversight, it violates Article 21 as affirmed in Puttaswamy.',
        actionPoints: [
          'Any deprivation of personal liberty must satisfy the triple test: valid law, legitimate state aim, and proportionality.',
          'Unlawful detention can be challenged immediately through a Writ of Habeas Corpus.',
          'Direct petition can be moved in the Supreme Court under Article 32 or High Court under Article 226.',
        ],
        relatedPages: [
          { title: 'Fundamental Rights: Right to Life (Art. 21)', to: '/fundamental-rights' },
          { title: 'Landmark Precedent: Puttaswamy (Right to Privacy)', to: '/case-law' },
          { title: 'Landmark Precedent: A.K. Gopalan & Maneka Gandhi', to: '/case-law' },
        ],
        officialSource: {
          name: 'Supreme Court of India — Landmark Constitution Bench Judgments',
          url: 'https://main.sci.gov.in',
          portal: 'main.sci.gov.in',
        },
        keywords: ['article 21', 'right to life', 'personal liberty', 'privacy right', 'puttaswamy', 'maneka gandhi'],
      },
      {
        id: 'article-32-writs-enforcement',
        title: 'Article 32 & 226: The Five Prerogative Constitutional Writs',
        legalArea: 'Constitutional Remedies & Enforcement Architecture',
        relevantLaw: 'Constitution of India Article 32 (Supreme Court) & Article 226 (High Courts)',
        explanation:
          'Dr. B.R. Ambedkar called Article 32 the "heart and soul" of the Constitution because a right without a judicial remedy is meaningless. Constitutional courts enforce fundamental rights through five specific prerogative writs: (1) Habeas Corpus (to produce a person illegally detained), (2) Mandamus (commanding a public official to perform their mandatory duty), (3) Prohibition (preventing lower courts from exceeding jurisdiction), (4) Certiorari (quashing an illegal or ultra vires order), and (5) Quo-Warranto (challenging illegal usurpation of a public office).',
        practicalExample:
          'If a person is taken into custody by police or intelligence officials without an FIR or formal record of arrest, their family can immediately file a Habeas Corpus petition before the High Court or Supreme Court commanding the state to produce the person in court.',
        actionPoints: [
          'Identify whether the violation was committed by a state authority or public functionary.',
          'Select the appropriate writ relief (Habeas Corpus for custody, Mandamus for duty failure, Certiorari to quash an order).',
          'File under Article 226 in the state High Court or Article 32 directly in the Supreme Court.',
        ],
        relatedPages: [
          { title: 'Article 32 & 226: Enforcement Architecture', to: '/fundamental-rights' },
          { title: 'Interactive Writs Breakdown', to: '/fundamental-rights#writs-breakdown' },
          { title: 'Legal Term: Writ Petition', to: '/legal-terms#writ-petition' },
        ],
        officialSource: {
          name: 'Supreme Court of India — Writ Jurisdiction Practice',
          url: 'https://main.sci.gov.in',
          portal: 'main.sci.gov.in',
        },
        keywords: ['article 32', 'article 226', 'habeas corpus', 'mandamus', 'certiorari', 'quo warranto', 'writs'],
      },
    ],
  },
  {
    id: 'access-justice',
    title: 'Access to Justice & Legal Aid',
    shortTitle: 'Access to Justice',
    icon: 'Scale',
    description:
      'Citizen entitlements to free court representation, bail reforms, Lok Adalats, RTI transparency, and legal assistance under the Legal Services Authorities Act.',
    topics: [
      {
        id: 'free-legal-aid-article-39a',
        title: 'Free Legal Services from Court-Appointed Advocates (NALSA/DLSA)',
        legalArea: 'Equal Justice & Statutory Legal Aid',
        relevantLaw: 'Legal Services Authorities Act, 1987 & Constitution Article 39A',
        explanation:
          'Article 39A mandates that the State shall secure that the operation of the legal system promotes justice on a basis of equal opportunity, ensuring opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities. Under Section 12 of the Legal Services Authorities Act, 1987, free legal aid is guaranteed to: women, children, members of Scheduled Castes (SC) and Scheduled Tribes (ST), industrial workmen, victims of human trafficking or disaster, undertrials in custody, persons with disabilities, and individuals whose annual income is below the prescribed state limit (usually ₹3,00,000 in most states).',
        practicalExample:
          'If an indigent citizen is sued in a property dispute or accused in a criminal case and cannot afford an advocate’s professional fees, they can walk into the District Legal Services Authority (DLSA) office located in any District Court complex. A panel advocate is assigned free of cost to draft pleadings and represent them in court.',
        actionPoints: [
          'Locate the DLSA front office inside your nearest District Court or Taluk Court complex.',
          'Fill out a basic legal aid application along with proof of income or category eligibility.',
          'A panel lawyer will be assigned to handle drafting, filing, and court appearances at zero expense to you.',
          'Alternatively, use the Tele-Law portal (tele-law.in) at any Common Service Centre (CSC) across India.',
        ],
        relatedPages: [
          { title: 'Fundamental Rights & Directive Principles', to: '/fundamental-rights' },
          { title: 'BNSS 2023: Accused Defence Rights', to: '/laws/bnss-2023' },
          { title: 'Legal Term: Legal Aid', to: '/legal-terms#legal-aid' },
        ],
        officialSource: {
          name: 'National Legal Services Authority (NALSA) Portal',
          url: 'https://nalsa.gov.in',
          portal: 'nalsa.gov.in (National Helpline: 15100)',
        },
        keywords: ['free legal aid', 'dlsa', 'nalsa', 'article 39a', 'free advocate', 'tele-law', 'legal services'],
      },
      {
        id: 'undertrial-one-third-release',
        title: 'The 1/3rd Sentence Formula for Undertrial Bail',
        legalArea: 'Bail Reform & Incarceration Relief',
        relevantLaw: 'BNSS 2023 Section 481 (replaces CrPC Section 436A)',
        explanation:
          'Under BNSS Section 481, a transformative bail formula is codified: where an accused person has, during the period of investigation, inquiry, or trial, undergone detention for a period extending up to one-third of the maximum period of imprisonment specified for that offence (if they are a first-time offender), they MUST be released by the Court on bail on their personal bond. For others, the threshold remains one-half of the maximum sentence. Furthermore, the Jail Superintendent is statutorily mandated to apply to the court for such release.',
        practicalExample:
          'If a first-time offender is accused of an offence carrying a maximum 3-year term and has spent 12 months in custody awaiting trial completion, they are entitled to mandatory statutory bail under Section 481 upon completing one-third of the sentence.',
        actionPoints: [
          'Calculate total days spent in custody against the maximum statutory punishment of the charged section.',
          'If detention exceeds 1/3rd (for first-time offenders) or 1/2 (for repeat), file an application under BNSS Section 481.',
          'Remind the Jail Superintendent to submit their mandatory periodic report to the trial Magistrate or Sessions Judge.',
        ],
        relatedPages: [
          { title: 'BNSS 2023 Section 481', to: '/laws/bnss-2023' },
          { title: 'Compare CrPC 436A ↔ BNSS 481', to: '/compare' },
          { title: 'Legal Term: Bail & Undertrial', to: '/legal-terms#bail' },
        ],
        officialSource: {
          name: 'e-Courts Services — Case Status & Bail Petitions',
          url: 'https://ecourts.gov.in',
          portal: 'ecourts.gov.in',
        },
        keywords: ['undertrial bail', 'bnss 481', 'crpc 436a', 'one third sentence', 'first time offender bail'],
      },
      {
        id: 'lok-adalat-dispute-settlement',
        title: 'Lok Adalats: Fast Dispute Settlement with Zero Court Fees',
        legalArea: 'Alternative Dispute Resolution (ADR)',
        relevantLaw: 'Legal Services Authorities Act, 1987 Sections 19–22',
        explanation:
          'Lok Adalats are statutory alternative dispute resolution forums. There is zero court fee for disputes referred to a Lok Adalat, and if a pending court matter is settled in Lok Adalat, the court fee already paid is completely refunded. The award passed by a Lok Adalat has the binding force of a civil court decree, and no appeal lies against it, bringing finality to the dispute.',
        practicalExample:
          'If you have an ongoing motor accident claims tribunal (MACT) case, bank loan recovery matter, or compoundable criminal case that has lingered for years, both parties can jointly refer it to the National Lok Adalat for an amicable, final settlement without ongoing litigation costs.',
        actionPoints: [
          'Approach the Secretary of the DLSA or the presiding court to refer your matter to the upcoming Lok Adalat.',
          'Participate in conciliation sessions where retired judges and advocates facilitate mutually agreeable terms.',
          'Collect the sealed Lok Adalat award, which can be directly executed in court without appeal delays.',
        ],
        relatedPages: [
          { title: 'Legal Terms: Lok Adalat', to: '/legal-terms#lok-adalat' },
          { title: 'Explore Civil & Property Laws', to: '/laws' },
        ],
        officialSource: {
          name: 'National Legal Services Authority — National Lok Adalat Schedule',
          url: 'https://nalsa.gov.in',
          portal: 'nalsa.gov.in',
        },
        keywords: ['lok adalat', 'zero court fees', 'fast settlement', 'refund court fee', 'adr', 'binding award'],
      },
      {
        id: 'rti-transparency-records',
        title: 'Right to Information (RTI): Inspecting Government Records',
        legalArea: 'Democratic Accountability & Public Transparency',
        relevantLaw: 'Right to Information Act, 2005 Sections 3, 6 & 7',
        explanation:
          'Every citizen has the legal right to inspect public works, documents, records, and obtain certified copies of government files from public authorities under Section 3 of the RTI Act. Public Information Officers (PIOs) are required to respond within 30 days of receiving the request (or within 48 hours if the information concerns the life or liberty of a person).',
        practicalExample:
          'If a civic road in your neighborhood was repaved on paper but remains broken, you can file an RTI request with the municipal corporation asking for copies of the contractor work order, inspection reports, and expenditure vouchers.',
        actionPoints: [
          'Draft concise, specific questions asking for existing documents or records (not hypothetical opinions).',
          'File online at rtionline.gov.in for Central Government bodies with a nominal ₹10 fee.',
          'If information is denied or delayed past 30 days, file a First Appeal under Section 19(1) within 30 days.',
        ],
        relatedPages: [
          { title: 'Article 19(1)(a): Right to Know', to: '/fundamental-rights' },
          { title: 'How Nyaya Works: Transparency Standards', to: '/how-nyaya-works' },
        ],
        officialSource: {
          name: 'RTI Online Portal (Government of India)',
          url: 'https://rtionline.gov.in',
          portal: 'rtionline.gov.in',
        },
        keywords: ['rti act', 'right to information', 'public records', 'rtionline', '48 hours life liberty', 'first appeal'],
      },
    ],
  },
]

export function getAllRightsTopics() {
  return rightsCategories.flatMap((cat) =>
    cat.topics.map((topic) => ({
      ...topic,
      categoryId: cat.id,
      categoryTitle: cat.title,
      categoryShortTitle: cat.shortTitle,
    }))
  )
}

export function getRightsCategoryById(id) {
  if (!id) return null
  return rightsCategories.find((cat) => cat.id.toLowerCase() === id.toLowerCase()) || null
}

export function getRightsTopicById(id) {
  if (!id) return null
  for (const cat of rightsCategories) {
    const found = cat.topics.find((t) => t.id.toLowerCase() === id.toLowerCase())
    if (found) {
      return {
        ...found,
        categoryId: cat.id,
        categoryTitle: cat.title,
        categoryShortTitle: cat.shortTitle,
      }
    }
  }
  return null
}

