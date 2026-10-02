// Comprehensive statutory reference dataset for the Dissolution of Muslim Marriages Act, 1939 (Act No. 8 of 1939)
// Preserves original statutory wording intact while providing plain-language "Explained Simply" commentary.
// Verified against Gazette of India and primary legislative text (India Code / Indian Kanoon doc 110749554).

export const dmmaMetadata = {
  name: 'Dissolution of Muslim Marriages Act, 1939',
  actNo: 'Act No. 8 of 1939',
  category: 'Family Law',
  jurisdiction: 'India',
  type: 'Central Act',
  year: 1939,
  enactmentDate: '17th March, 1939',
  officialSource: 'India Code / Gazette of India (Published 17 March 1939, Act 08 of 1939)',
  officialDocumentUrl: '/docs/dissolution-of-muslim-marriages-act-1939.pdf',
  externalSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2415',
  description:
    'An Act to consolidate and clarify the provisions of Muslim law relating to suits for dissolution of marriage by women married under Muslim law and to remove doubts as to the effect of the renunciation of Islam by a married Muslim woman on her marriage tie. Enacted on 17th March, 1939.',
}

export const dmmaSections = [
  {
    id: 'sec-1',
    number: 'Section 1',
    title: 'Short title and extent',
    statutoryText: `(1) This Act may be called the Dissolution of Muslim Marriages Act, 1939.
(2) It extends to the whole of India.`,
    explainedSimply:
      'Gives the official title of the enactment as the Dissolution of Muslim Marriages Act, 1939 and specifies that its statutory jurisdiction extends across the whole of India.',
    otherLawsNote:
      'Applies specifically to women married under Muslim law seeking judicial dissolution of marriage through civil courts.',
  },
  {
    id: 'sec-2',
    number: 'Section 2',
    title: 'Grounds for decree for dissolution of marriage',
    statutoryText: `A woman married under Muslim law shall be entitled to obtain a decree for the dissolution of her marriage on any one or more of the following grounds, namely:—
(i) that the whereabouts of the husband have not been known for a period of four years;
(ii) that the husband has neglected or has failed to provide for her maintenance for a period of two years;
(iii) that the husband has been sentenced to imprisonment for a period of seven years or upwards;
(iv) that the husband has failed to perform, without reasonable cause, his marital obligations for a period of three years;
(v) that the husband was impotent at the time of the marriage and continues to be so;
(vi) that the husband has been insane for a period of two years or is suffering from leprosy or a virulent venereal disease;
(vii) that she, having been given in marriage by her father or other guardian before she attained the age of fifteen years, repudiated the marriage before attaining the age of eighteen years: Provided that the marriage has not been consummated;
(viii) that the husband treats her with cruelty, that is to say—
(a) habitually assaults her or makes her life miserable by cruelty of conduct even if such conduct does not amount to physical ill-treatment, or
(b) associates with women of evil repute or leads an infamous life, or
(c) attempts to force her to lead an immoral life, or
(d) disposes of her property or prevents her exercising her legal rights over it, or
(e) obstructs her in the observance of her religious profession or practice, or
(f) if he has more wives than one, does not treat her equitably in accordance with the injunctions of the Quran;
(ix) on any other ground which is recognised as valid for the dissolution of marriages under Muslim law:
Provided that—
(a) no decree shall be passed on ground (iii) until the sentence has become final;
(b) a decree passed on ground (i) shall not take effect for a period of six months from the date of such decree, and if the husband appears either in person or through an authorised agent within that period and satisfies the Court that he is prepared to perform his conjugal duties, the Court shall set aside the said decree; and
(c) before passing a decree on ground (v) the Court shall, on application by the husband, make an order requiring the husband to satisfy the Court within a period of one year from the date of such order that he has ceased to be impotent, and if the husband so satisfies the Court within such period, no decree shall be passed on the said ground.`,
    explainedSimply:
      'Gives a Muslim wife the statutory right to petition a civil court for dissolution of marriage on 9 distinct grounds: (1) Husband missing/whereabouts unknown for 4 years; (2) Husband neglected or failed to provide maintenance for 2 years; (3) Husband sentenced to imprisonment for 7+ years; (4) Husband failed to perform marital obligations without cause for 3 years; (5) Husband was impotent at marriage and remains so; (6) Husband insane for 2 years or suffering from virulent venereal disease or leprosy; (7) Repudiation of underage marriage ("option of puberty") before age 18 if unconsummated; (8) Cruelty (including physical assault, mental cruelty, forcing an immoral life, disposing of her property, obstructing religious practice, or unequal treatment among multiple wives); and (9) Any other ground recognized under Muslim law (such as Khula, Mubarat, or Ila/Zihar).',
    otherLawsNote:
      'Maintenance may also be claimed concurrently under Section 144 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (former Section 125 CrPC) and the Protection of Women from Domestic Violence Act, 2005. Triple Talaq (Talaq-e-Biddat) has been separately declared void and illegal under the Muslim Women (Protection of Rights on Marriage) Act, 2019.',
  },
  {
    id: 'sec-3',
    number: 'Section 3',
    title: "Notice to be served on heirs of the husband, when the husband's whereabouts are not known",
    statutoryText: `In a suit to which clause (i) of section 2 applies—
(a) the names and addresses of the persons who would have been the heirs of the husband under Muslim law if he had died on the date of the filing of the plaint shall be stated in the plaint,
(b) notice of the suit shall be served on such persons, and
(c) such persons shall have the right to be heard in the suit:
Provided that paternal uncle and the brother of the husband, if any, shall be cited as party even if he or they are not heirs.`,
    explainedSimply:
      'When a wife petitions for divorce because her husband has been missing for 4 years (under Section 2(i)), she must list the names and addresses of who would be his legal heirs under Muslim law. Formal court notice must be served on them, giving them the legal right to appear and be heard. The paternal uncle and brother of the husband must be cited as parties even if not heirs.',
    otherLawsNote:
      'Ensures procedural fairness and safeguards inheritance interests before a missing husband is judicially presumed absent for matrimonial purposes.',
  },
  {
    id: 'sec-4',
    number: 'Section 4',
    title: 'Effect of conversion to another faith',
    statutoryText: `The renunciation of Islam by a married Muslim woman or her conversion to a faith other than Islam shall not by itself operate to dissolve her marriage:
Provided that after such renunciation, or conversion, the woman shall be entitled to obtain a decree for the dissolution of her marriage on any of the grounds mentioned in section 2:
Provided further that the provisions of this section shall not apply to a woman converted to Islam from some other faith who re-embraces her former faith.`,
    explainedSimply:
      'A Muslim woman who converts to another religion or renounces Islam does not automatically dissolve her marriage by that act alone. However, she retains full legal right to seek a decree of dissolution on any of the statutory grounds in Section 2. If she originally converted to Islam from another faith and later re-embraces her former faith, this limitation does not apply.',
    otherLawsNote:
      'Before 1939, apostasy was sometimes used to escape marriage ties; this section codified that judicial decree under Section 2 is the formal statutory remedy.',
  },
  {
    id: 'sec-5',
    number: 'Section 5',
    title: 'Right to dower (Mahr) not to be affected',
    statutoryText: `Nothing contained in this Act shall affect any right which a married woman may have under Muslim law to her dower or any part thereof on the dissolution of her marriage.`,
    explainedSimply:
      'Guarantees that when a Muslim woman obtains a divorce under this Act, her legal right to her agreed Mahr (dower)—whether prompt (Mu’ajjal) or deferred (Muwajjal)—is completely protected and is not forfeited or reduced by the dissolution decree.',
    otherLawsNote:
      'Post-divorce maintenance and return of Mahr and wedding properties are also protected under the Muslim Women (Protection of Rights on Divorce) Act, 1986 and Section 144 of BNSS 2023 (as affirmed by the Supreme Court in Danial Latifi and Mohd. Abdul Samad v. State of Telangana, 2024).',
  },
  {
    id: 'sec-6',
    number: 'Section 6',
    title: 'Repeal of Section 5 of Act 26 of 1937',
    statutoryText: `[Repealed by the Repealing and Amending Act, 1942 (25 of 1942), s. 2 and Sch. I.]`,
    explainedSimply:
      'A formal legislative repeal provision concerning Section 5 of the Muslim Personal Law (Shariat) Application Act, 1937, which was repealed by the Repealing and Amending Act, 1942.',
    otherLawsNote:
      'Historical legislative housekeeping clause.',
  },
]
