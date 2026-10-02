// Comprehensive statutory reference dataset for the Information Technology Act, 2000 Notifications & Subordinate Rules:
// 1. Notification G.S.R. 788 (E) — Commencement of Information Technology Act, 2000 on 17th October 2000
// 2. Notification G.S.R. 789 (E) — Information Technology (Certifying Authorities) Rules, 2000
// 3. Notification G.S.R. 790 (E) — Constitution of Cyber Regulation Advisory Committee
// 4. Notification G.S.R. 791 (E) — Cyber Regulations Appellate Tribunal (Procedure) Rules, 2000
// Extracted verbatim from Gazette of India, Extraordinary, Part II, Section 3, Sub-section (i) dated 17th October 2000.

export const itGazetteMetadata = {
  actName: 'Information Technology Act, 2000 (Act No. 21 of 2000)',
  commencementDate: '17th October, 2000',
  commencementNotification: 'G.S.R. 788 (E), dated 17 October 2000 (Ministry of Information Technology)',
  rulesTitle: 'Information Technology (Certifying Authorities) Rules, 2000 & Appellate Tribunal Rules, 2000',
  rulesNotification: 'G.S.R. 789 (E) & G.S.R. 791 (E)',
  advisoryCommitteeNotification: 'G.S.R. 790 (E) under Section 88',
  gazetteReference: 'Gazette of India, Extraordinary, Part II, Section 3, Sub-section (i), No. 1(20)/97-IID(NII)/F6',
  authority: 'Ministry of Information Technology (now Ministry of Electronics and Information Technology - MeitY)',
  officialDocumentUrl: '/docs/it-certifying-authorities-rules-2000.pdf',
  category: 'Cyber Law',
  jurisdiction: 'India',
}

export const itGazetteRules = [
  {
    id: 'it-commencement-2000',
    number: 'Notification G.S.R. 788 (E)',
    title: 'Commencement of Information Technology Act, 2000',
    statutoryText: `In exercise of the powers conferred by sub-section (3) of section 1 of the Information Technology Act, 2000 (21 of 2000), the Central Government hereby appoints 17th Day of October 2000 as the date on which the provisions of the said Act comes into force.`,
    explainedSimply:
      'The foundational statutory commencement order issued by the Central Government officially bringing the Information Technology Act, 2000 (Act 21 of 2000) into full legal effect across India on 17 October 2000.',
    otherLawsNote:
      'Marks the formal statutory beginning of India\'s cyber law framework, legal recognition of electronic records, digital signatures, and cyber offenses.',
  },
  {
    id: 'it-ca-rule-3',
    number: 'Rule 3 (Certifying Authorities Rules)',
    title: 'Manner in which Information is Authenticated by Means of Digital Signature',
    statutoryText: `A Digital Signature shall,—
(a) be created and verified by cryptography that concerns itself with transforming electronic record into seemingly unintelligible forms and back again;
(b) use what is known as "Public Key Cryptography", which employs an algorithm using two different but mathematically related "keys" – one for creating a Digital Signature or transforming data into a seemingly unintelligible form, and another key for verifying a Digital Signature or returning the electronic record to original form,
the process termed as hash function shall be used in both creating and verifying a Digital Signature.
Explanation: Computer equipment and software utilizing two such keys are often termed as "asymmetric cryptography".`,
    explainedSimply:
      'Statutorily defines that a valid digital signature under Indian law must use asymmetric public-key cryptography and cryptographic hash functions. One private key creates the signature, and a mathematically related public key verifies it without revealing the private key.',
    otherLawsNote:
      'Grounded in Section 3 of the IT Act, 2000 and the Indian Evidence Act / BSA 2023 for admissibility of electronic records.',
  },
  {
    id: 'it-ca-rule-4',
    number: 'Rule 4 (Certifying Authorities Rules)',
    title: 'Creation of Digital Signature',
    statutoryText: `To sign an electronic record or any other item of information, the signer shall first apply the hash function in the signer's software; the hash function shall compute a hash result of standard length which is unique (for all practical purposes) to the electronic record; the signer's software transforming the hash result into a Digital Signature using signer's private key; the resulting Digital Signature shall be unique to both electronic record and private key used to create it; and the Digital Signature shall be attached to its electronic record and stored or transmitted with its electronic record.`,
    explainedSimply:
      'Lays down the step-by-step technical and legal procedure to create a valid digital signature: software hashes the document to generate a unique digest, encrypts that digest using the signer\'s secret private key, and attaches the resulting signature to the electronic document.',
    otherLawsNote:
      'Any modification to the underlying document after signing alters the hash and invalidates the signature.',
  },
  {
    id: 'it-ca-rule-5',
    number: 'Rule 5 (Certifying Authorities Rules)',
    title: 'Verification of Digital Signature',
    statutoryText: `The verification of a Digital Signature shall be accomplished by computing a new hash result of the original electronic record by means of the hash function used to create a Digital Signature and by using the public key and the new hash result, the verifier shall check—
(i) if the Digital Signature was created using the corresponding private key; and
(ii) if the newly computed hash result matches the original result which was transformed into Digital Signature during the signing process. The verification software will confirm the Digital Signature as verified if:—
(a) the signer's private key was used to digitally sign the electronic record, which is known to be the case if the signer's public key was used to verify the signature because the signer's public key will verify only a Digital Signature created with the signer's private key; and
(b) the electronic record was unaltered, which is known to be the case if the hash result computed by the verifier is identical to the hash result extracted from the Digital Signature during the verification process.`,
    explainedSimply:
      'Prescribes how verification software legally validates a signature: it computes a fresh hash of the received record, decrypts the signature using the signer\'s public key, and verifies both that the signer\'s private key was used and that the document has remained completely unaltered in transit.',
    otherLawsNote:
      'Provides the legal standard for non-repudiation in electronic commerce, digital contracts, and court evidence.',
  },
  {
    id: 'it-ca-rule-6',
    number: 'Rule 6 (Certifying Authorities Rules)',
    title: 'Open Standards & Cryptographic Architecture for Certifying Authorities',
    statutoryText: `The Information Technology (IT) architecture for Certifying Authorities may support open standards and accepted de facto standards; the most important standards that may be considered for different activities associated with the Certifying Authority's functions are as under:
- Public Key Infrastructure: PKIX
- Digital Signature Certificates & CRL: X.509 version 3 certificates as specified in ITU RFC 1422
- Directory (DAP and LDAP): X.500 for publication of certificates and Certification Revocation Lists (CRLs)
- Database Management Operations: Use of generic SQL
- Public Key algorithm: DSA and RSA
- Digital Hash Function: MD5 and SHA-1
- RSA Public Key Technology: PKCS#1 (512, 1024, 2048 bit), PKCS#5, PKCS#7, PKCS#8, PKCS#9, PKCS#10, PKCS#12
- Distinguished Name: X.520
- Digital Encryption and Digital Signature: PKCS#7
- Digital Signature Request Format: PKCS#10`,
    explainedSimply:
      'Mandates global open technical standards for Indian PKI infrastructure, including ITU X.509 version 3 certificates, RSA/DSA asymmetric algorithms, SHA hash standards, X.500 directory access, and PKCS cryptographic message syntax.',
    otherLawsNote:
      'Enables interoperability between Indian licensed Certifying Authorities (such as eMudhra, NIC, Capricorn, NSDL) and international cryptographic standards.',
  },
  {
    id: 'it-ca-rule-7',
    number: 'Rule 7 (Certifying Authorities Rules)',
    title: 'Digital Signature Certificate Standard',
    statutoryText: `All Digital Signature Certificates issued by the Certifying Authorities shall conform to ITU X.509 version 3 standard as per rule 6 and shall inter alia contain the following data, namely:—
(a) Serial Number (assigning of serial number to the Digital Signature Certificate by Certifying Authority to distinguish it from other certificate);
(b) Signature Algorithm Identifier (which identifies the algorithm used by Certifying Authority to sign the Digital Signature Certificate);
(c) Issuer Name (name of the Certifying Authority who issued the Digital Signature Certificate);
(d) Validity period of the Digital Signature Certificate;
(e) Name of the subscriber (whose public key the Certificate identifies); and
(f) Public Key information of the subscriber.`,
    explainedSimply:
      'Prescribes mandatory fields that must be embedded in every valid Digital Signature Certificate (DSC): serial number, algorithm identifier, name of issuing CA, validity start and expiry dates, subscriber identity, and subscriber\'s public key.',
    otherLawsNote:
      'Any certificate missing these statutory particulars cannot be treated as a valid DSC under Section 35 of the IT Act.',
  },
  {
    id: 'it-ca-rule-8',
    number: 'Rule 8 (Certifying Authorities Rules)',
    title: 'Licensing Requirements for Certifying Authorities',
    statutoryText: `(1) The following persons may apply for grant of a licence to issue Digital Signature Certificates, namely :—
(a) an individual, being a citizen of India and having a capital of five crores of rupees or more in his business or profession;
(b) a company having paid up capital of not less than five crores of rupees; and net worth of not less than fifty crores of rupees (FDI/NRI aggregate equity capped at 49%);
(c) a firm having capital subscribed by all partners of not less than five crores of rupees; and net worth of not less than fifty crores of rupees;
(d) Central Government or a State Government or any of the Ministries or Departments, Agencies or Authorities of such Governments.
(2) The applicant shall submit a performance bond or furnish a banker's guarantee from a scheduled bank in favour of the Controller for an amount of not less than five crores of rupees valid for six years.`,
    explainedSimply:
      'Sets high financial and governance thresholds to operate as a licensed Certifying Authority in India: ₹5 Crore paid-up capital, ₹50 Crore net worth, maximum 49% foreign equity, and a mandatory ₹5 Crore (or ₹10 Crore) performance bank guarantee valid for 6 years.',
    otherLawsNote:
      'Strict financial backing ensures that CAs can satisfy liabilities, potential subscriber claims, and continuity of operations.',
  },
  {
    id: 'it-ca-rule-27',
    number: 'Rule 27 (Certifying Authorities Rules)',
    title: 'Mandatory 7-Year Archival of Digital Signature Records',
    statutoryText: `A Certifying Authority shall archive—
(a) applications for issue of Digital Signature Certificates;
(b) registration and verification documents of generated Digital Signature Certificates;
(c) Digital Signature Certificates;
(d) notices of suspension;
(e) information of suspended Digital Signature Certificates;
(f) information of revoked Digital Signature Certificates;
(g) expired Digital Signature Certificates,
for a minimum period of seven years or for a period in accordance with legal requirement.`,
    explainedSimply:
      'Mandates that Certifying Authorities must safely preserve all DSC applications, KYC verification records, suspension notices, and Certificate Revocation Lists (CRLs) for at least seven (7) years.',
    otherLawsNote:
      'Aligns with statutory evidentiary and limitation periods under Indian law for resolving electronic commercial disputes.',
  },
  {
    id: 'it-ca-rule-28-29',
    number: 'Rules 28 & 29 (Certifying Authorities Rules)',
    title: 'Compromise, Revocation & Certificate Revocation List (CRL)',
    statutoryText: `Rule 28: Digital Signature Certificates in operational use that become compromised shall be revoked in accordance with the procedure defined in the Certification Practice Statement. Deemed compromised where integrity of private key or owner is in doubt.
Rule 29: Digital Signature Certificate shall be revoked and become invalid for any trusted use where:
(a) there is a compromise of the Digital Signature Certificate owner's private key;
(b) there is a misuse of the Digital Signature Certificate;
(c) there is a misrepresentation or errors in the Digital Signature Certificate;
(d) the Digital Signature Certificate is no longer required.
(2) The revoked Digital Signature Certificate shall be added to the Certificate Revocation List (CRL).`,
    explainedSimply:
      'Establishes immediate revocation when a private key is leaked, lost, or compromised, or when fraud/misuse is discovered. Revoked certificates are immediately posted to public Certificate Revocation Lists (CRLs) so relying parties know not to trust them.',
    otherLawsNote:
      'Under Section 42 of the IT Act, subscribers have a strict legal duty to exercise reasonable care to retain control of their private key.',
  },
  {
    id: 'it-ca-sched-2-3',
    number: 'Schedules II & III (Certifying Authorities Rules)',
    title: 'IT Security Guidelines & Multi-Tiered Access Controls',
    statutoryText: `Schedule-II: IT Security Guidelines covering information classification (Top Secret, Secret, Confidential, Restricted, Unclassified), physical security, water detectors, fire protection, 24/7 video surveillance, password management (min 8 chars, 90-day changes, 3 failed retries limit), and disaster recovery plans.
Schedule-III: Dedicated Security Guidelines for CAs requiring multi-tiered access control, concrete reinforced walls, split-knowledge dual passwords for private keys, dual control over inventory, and destruction of private keys upon expiry.`,
    explainedSimply:
      'Prescribes defense-in-depth security standards for data centers and CA operations: physical access control, dual passwords for root keys, biometric screening, air-gapped PKI servers, encrypted backups at three geographical locations, and mandatory business continuity drills.',
    otherLawsNote:
      'Forms the regulatory baseline audited annually by Controller-accredited computer security auditors under Rule 31.',
  },
  {
    id: 'it-crat-rules-2000',
    number: 'Notification G.S.R. 791 (E)',
    title: 'Cyber Regulations Appellate Tribunal (Procedure) Rules, 2000',
    statutoryText: `In exercise of the powers conferred by section 87 of the Information Technology Act, 2000 (21 of 2000), the Central Government makes the Cyber Regulations Appellate Tribunal (Procedure) Rules, 2000:
- Rule 3: Filing of applications in Form-1 in six complete sets in paper-book form.
- Rule 6: Application fee of Rs. 2,000/- via crossed demand draft.
- Rule 10: Service of notice on respondents via dasti or registered post.
- Rule 11: Respondent reply to be filed within one month of service.
- Rule 14: Sittings ordinarily in New Delhi; applications to be decided as far as possible within six months.
- Rule 24: Working hours 10:00 a.m. to 5:00 p.m.
- Form-1: Standard application format under Section 57 of the Act.
- Form-2: Application for registration of legal practitioner's clerk.`,
    explainedSimply:
      'Sets out the official procedural rules for appealing against orders of the Controller of Certifying Authorities or Adjudicating Officers before the Cyber Appellate Tribunal (now Telecom Disputes Settlement and Appellate Tribunal - TDSAT). Applications must be filed in six copies with a ₹2,000 fee and aimed to be decided within six months.',
    otherLawsNote:
      'Appeals against tribunal orders lie to the High Court under Section 62 of the IT Act within 60 days on questions of fact or law.',
  },
  {
    id: 'it-crac-notification-2000',
    number: 'Notification G.S.R. 790 (E)',
    title: 'Constitution of Cyber Regulation Advisory Committee (Section 88)',
    statutoryText: `In exercise of the powers conferred by section 88 of the Information Technology Act, 2000 (21 of 2000), the Central Government hereby constitutes the "Cyber Regulation Advisory Committee" consisting of:
- Minister, Information Technology (Chairman)
- Secretary, Legislative Department (Member)
- Secretary, Ministry of Information Technology (Member)
- Secretary, Department of Telecommunications (Member)
- Finance Secretary (Member)
- Secretary, Ministry of Defence (Member)
- Secretary, Ministry of Home Affairs (Member)
- Secretary, Ministry of Commerce (Member)
- Deputy Governor, Reserve Bank of India (Member)
- Member Secretary, Law Commission (Member)
- President, NASSCOM; President, ISPAI; Director, CBI; Controller of Certifying Authorities; State IT Secretaries; DGPs; IIT Directors; CII, FICCI, ASSOCHAM representatives.`,
    explainedSimply:
      'Official statutory notification constituting the high-level Cyber Regulation Advisory Committee chaired by the IT Minister to advise the Central Government on framing regulations and cyber policy across law, security, banking, and commerce.',
    otherLawsNote:
      'Section 88 ensures inter-ministerial, law enforcement, and industry consultation before framing secondary cyber legislation.',
  },
]
