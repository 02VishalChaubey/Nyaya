// Comprehensive statutory reference dataset for the Hindu Marriage Act, 1955 (Act No. 25 of 1955)
// Preserves original statutory wording intact while providing plain-language "Explained Simply" commentary.
// Verified against India Code (indiacode.nic.in) and Ministry of Law and Justice (Legislative Department).

export const hmaMetadata = {
  name: 'Hindu Marriage Act, 1955',
  actNo: 'Act No. 25 of 1955',
  category: 'Family Law',
  jurisdiction: 'India',
  type: 'Central Act',
  year: 1955,
  enactmentDate: '18th May, 1955',
  officialSource: 'India Code (indiacode.nic.in) — Legislative Department, Ministry of Law and Justice',
  officialDocumentUrl: '/docs/hindu-marriage-act-1955.pdf',
  externalSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1560',
  description:
    'An Act to amend and codify the law relating to marriage among Hindus, Buddhists, Jains, and Sikhs in India. Regulates conditions for valid marriage, registration, restitution of conjugal rights, judicial separation, void and voidable marriages, divorce (fault grounds and mutual consent), interim and permanent maintenance, and custody of children.',
}

export const hmaSections = [
  {
    id: 'sec-2',
    number: 'Section 2',
    title: 'Application of Act',
    statutoryText: `(1) This Act applies—
(a) to any person who is a Hindu by religion in any of its forms or developments, including a Virashaiva, a Lingayat or a follower of the Brahmo, Prarthana or Arya Samaj;
(b) to any person who is a Buddhist, Jaina or Sikh by religion; and
(c) to any other person domiciled in the territories to which this Act extends who is not a Muslim, Christian, Parsi or Jew by religion, unless it is proved that any such person would not have been governed by the Hindu law or by any custom or usage as part of that law in respect of any of the matters dealt with herein if this Act had not been passed.
(2) Notwithstanding anything contained in sub-section (1), nothing contained in this Act shall apply to the members of any Scheduled Tribe within the meaning of clause (25) of article 366 of the Constitution unless the Central Government, by notification in the Official Gazette, otherwise directs.`,
    explainedSimply:
      'This Act applies to Hindus, Buddhists, Jains, and Sikhs throughout India. It also covers anyone who is not Muslim, Christian, Parsi, or Jewish unless proven otherwise. It does not automatically apply to members of Scheduled Tribes unless notified by the Central Government.',
    otherLawsNote:
      'Inter-faith marriages or marriages between persons of different religions who choose civil registration are governed by the Special Marriage Act, 1954.',
  },
  {
    id: 'sec-3',
    number: 'Section 3',
    title: 'Definitions (Sapinda Relationship & Prohibited Degrees)',
    statutoryText: `In this Act, unless the context otherwise requires,—
(a) the expressions "custom" and "usage" signify any rule which, having been continuously and uniformly observed for a long time, has obtained the force of law among Hindus in any local area, tribe, community, group or family: Provided that the rule is certain and not unreasonable or opposed to public policy;
(f) (i) "sapinda relationship" with reference to any person extends as far as the third generation (inclusive) in the line of ascent through the mother, and the fifth (inclusive) in the line of ascent through the father, the line being traced upwards in each case from the person concerned, who is to be counted as the first generation;
(ii) two persons are said to be "sapindas" of each other if one is a lineal ascendant of the other within the limits of sapinda relationship, or if they have a common lineal ascendant who is within the limits of sapinda relationship with reference to each of them;
(g) "degrees of prohibited relationship"—two persons are said to be within the "degrees of prohibited relationship"—
(i) if one is a lineal ascendant of the other; or
(ii) if one was the wife or husband of a lineal ascendant or descendant of the other; or
(iii) if one was the wife of the brother or of the father's or mother's brother or of the grandfather's or grandmother's brother of the other; or
(iv) if the two are brother and sister, uncle and niece, aunt and nephew, or children of brother and sister or of two brothers or of two sisters.`,
    explainedSimply:
      'Defines legal relationships that bar marriage. "Sapinda" reaches 3 generations through mother and 5 through father. "Degrees of prohibited relationship" bar marriages between close blood relations (e.g. brother-sister, uncle-niece, lineal ascendants) unless a long-standing, reasonable, and certain family or community custom permits it.',
    otherLawsNote:
      'A custom permitting marriage within prohibited degrees must be strictly proved in court and must not be opposed to public policy.',
  },
  {
    id: 'sec-5',
    number: 'Section 5',
    title: 'Conditions for a Hindu Marriage',
    statutoryText: `A marriage may be solemnized between any two Hindus, if the following conditions are fulfilled, namely:—
(i) neither party has a spouse living at the time of the marriage;
(ii) at the time of the marriage, neither party—
(a) is incapable of giving a valid consent to it in consequence of unsoundness of mind; or
(b) though capable of giving a valid consent, has been suffering from mental disorder of such a kind or to such an extent as to be unfit for marriage and the procreation of children; or
(c) has been subject to recurrent attacks of insanity;
(iii) the bridegroom has completed the age of twenty-one years and the bride, the age of eighteen years at the time of the marriage;
(iv) the parties are not within the degrees of prohibited relationship unless the custom or usage governing each of them permits of a marriage between the two;
(v) the parties are not sapindas of each other, unless the custom or usage governing each of them permits of a marriage between the two.`,
    explainedSimply:
      'For a valid Hindu marriage, five mandatory statutory conditions must be met: (1) Monogamy (no living spouse at the time); (2) Mental capacity (sound mind capable of giving valid consent); (3) Legal age (groom at least 21 years old, bride at least 18 years old); (4) Not within prohibited degrees unless customary; and (5) Not sapindas unless customary.',
    otherLawsNote:
      'Marrying below statutory age is also subject to the Prohibition of Child Marriage Act, 2006. Bigamy is penalised under Section 17 of this Act and Bharatiya Nyaya Sanhita, 2023 (Section 82).',
  },
  {
    id: 'sec-7',
    number: 'Section 7',
    title: 'Ceremonies for a Hindu Marriage',
    statutoryText: `(1) A Hindu marriage may be solemnized in accordance with the customary rites and ceremonies of either party thereto.
(2) Where such rites and ceremonies include the saptapadi (that is, the taking of seven steps by the bridegroom and the bride jointly before the sacred fire), the marriage becomes complete and binding when the seventh step is taken.`,
    explainedSimply:
      'A Hindu marriage must be solemnized according to the customary rites of either spouse. Where customary rites include the Saptapadi (taking seven steps together around the sacred fire), the marriage becomes legally complete and binding upon completion of the seventh step.',
    otherLawsNote:
      'Supreme Court precedent confirms that customary ceremonies essential to either party must actually be performed for the marriage to be legally solemnized under this Act.',
  },
  {
    id: 'sec-8',
    number: 'Section 8',
    title: 'Registration of Hindu Marriages',
    statutoryText: `(1) For the purpose of facilitating the proof of Hindu marriages, the State Government may make rules providing that the parties to any such marriage may have the particulars relating to their marriage entered in such manner and subject to such conditions as may be prescribed in a Hindu Marriage Register kept for the purpose.
(2) They shall be admissible as evidence of the matters stated therein.
(5) Notwithstanding anything contained in this section, the validity of any Hindu marriage shall in no way be affected by the omission to make the entry.`,
    explainedSimply:
      'State Governments maintain Hindu Marriage Registers to facilitate proof of marriage. Entries in the register serve as official evidence. Under Section 8(5), failure to register does not itself invalidate a properly solemnized marriage, though state rules may impose minor registration fines.',
    otherLawsNote:
      'Registration is widely mandatory under state laws following the Supreme Court judgment in Seema v. Ashwani Kumar (2006).',
  },
  {
    id: 'sec-9',
    number: 'Section 9',
    title: 'Restitution of Conjugal Rights',
    statutoryText: `When either the husband or the wife has, without reasonable excuse, withdrawn from the society of the other, the aggrieved party may apply, by petition to the district court, for restitution of conjugal rights and the court, on being satisfied of the truth of the statements made in such petition and that there is no legal ground why the application should not be granted, may decree restitution of conjugal rights accordingly.
Explanation.—Where a question arises whether there has been reasonable excuse for withdrawal from the society, the burden of proving reasonable excuse shall be on the person who has withdrawn from the society.`,
    explainedSimply:
      'If either spouse withdraws from marital cohabitation without reasonable cause, the other spouse may petition the District Court for an order directing them to return. The person who left bears the legal burden of proving they had a reasonable excuse (such as cruelty or misconduct).',
    otherLawsNote:
      'If there is no cohabitation for 1 year or more after a decree of restitution of conjugal rights is passed, it becomes a statutory ground for divorce under Section 13(1A)(ii).',
  },
  {
    id: 'sec-10',
    number: 'Section 10',
    title: 'Judicial Separation',
    statutoryText: `(1) Either party to a marriage, whether solemnized before or after the commencement of this Act, may present a petition praying for a decree for judicial separation on any of the grounds specified in sub-section (1) of section 13, and in the case of a wife also on any of the grounds specified in sub-section (2) thereof, as grounds on which a petition for divorce might have been presented.
(2) Where a decree for judicial separation has been passed, it shall no longer be obligatory for the petitioner to cohabit with the respondent, but the court may, on the application by petition of either party and on being satisfied of the truth of the statements made in such petition, rescind the decree if it considers it just and reasonable to do so.`,
    explainedSimply:
      'Either spouse may petition for judicial separation on any ground that would also permit divorce. Unlike divorce, judicial separation does not dissolve the marital bond, but suspends the legal obligation to live together. If cohabitation is not resumed for 1 year or more after the decree, either party may apply for divorce.',
    otherLawsNote:
      'Judicial separation offers a legal remedy when parties wish to live separately without formally dissolving the marriage.',
  },
  {
    id: 'sec-11',
    number: 'Section 11',
    title: 'Void Marriages (Null and Void Ab Initio)',
    statutoryText: `Any marriage solemnized after the commencement of this Act shall be null and void and may, on a petition presented by either party thereto against the other party, be so declared by a decree of nullity if it contravenes any one of the conditions specified in clauses (i), (iv) and (v) of section 5.`,
    explainedSimply:
      'A marriage is completely void from the beginning (null and void ab initio) if it violates Section 5 clauses (i), (iv), or (v): namely, if either party had a living spouse at the time (bigamy), or if the parties are within prohibited degrees or sapinda relationship without customary exemption. Either party may apply to the court for a formal decree of nullity.',
    otherLawsNote:
      'Children of void marriages are legally deemed legitimate under Section 16 of this Act.',
  },
  {
    id: 'sec-12',
    number: 'Section 12',
    title: 'Voidable Marriages (Annulment)',
    statutoryText: `(1) Any marriage solemnized, whether before or after the commencement of this Act, shall be voidable and may be annulled by a decree of nullity on any of the following grounds, namely:—
(a) that the marriage has not been consummated owing to the impotence of the respondent; or
(b) that the marriage is in contravention of the condition specified in clause (ii) of section 5 (unsoundness of mind or mental disorder); or
(c) that the consent of the petitioner was obtained by force or by fraud as to the nature of the ceremony or as to any material fact or circumstance concerning the respondent; or
(d) that the respondent was at the time of the marriage pregnant by some person other than the petitioner.
(2) Notwithstanding anything contained in sub-section (1), no petition for annulling a marriage—
(a) on the ground specified in clause (c) of sub-section (1) shall be entertained if—
(i) the petition is presented more than one year after the force had ceased to operate or, as the case may be, the fraud had been discovered; or
(ii) the petitioner has, with his or her full consent, lived with the other party to the marriage as husband or wife after the force had ceased to operate or, as the case may be, the fraud had been discovered.`,
    explainedSimply:
      'A voidable marriage is valid until annulled by a court. Grounds for annulment are: (a) non-consummation due to respondent\'s impotency; (b) unsoundness of mind at the time of marriage; (c) consent obtained by force or fraud regarding material facts (petition must be filed within 1 year of discovering fraud); or (d) bride was pregnant by another person at the time of marriage.',
    otherLawsNote:
      'Petitions under clause (c) have a strict statutory limitation: they must be filed within 1 year of discovering the fraud or cessation of force, and the parties must not have voluntarily cohabited after discovery.',
  },
  {
    id: 'sec-13',
    number: 'Section 13',
    title: 'Divorce (Statutory Grounds)',
    statutoryText: `(1) Any marriage solemnized, whether before or after the commencement of this Act, may, on a petition presented by either the husband or the wife, be dissolved by a decree of divorce on the ground that the other party—
(i) has, after the solemnization of the marriage, had voluntary sexual intercourse with any person other than his or her spouse; or
(ia) has, after the solemnization of the marriage, treated the petitioner with cruelty; or
(ib) has deserted the petitioner for a continuous period of not less than two years immediately preceding the presentation of the petition; or
(ii) has ceased to be a Hindu by conversion to another religion; or
(iii) has been incurably of unsound mind, or has been suffering continuously or intermittently from mental disorder of such a kind and to such an extent that the petitioner cannot reasonably be expected to live with the respondent; or
(iv) has been suffering from a virulent and incurable form of leprosy; or
(v) has been suffering from venereal disease in a communicable form; or
(vi) has renounced the world by entering any religious order; or
(vii) has not been heard of as being alive for a period of seven years or more by those persons who would naturally have heard of it, had that party been alive.
(1A) Either party to a marriage may also present a petition for the dissolution of the marriage by a decree of divorce on the ground—
(i) that there has been no resumption of cohabitation as between the parties to the marriage for a period of one year or upwards after the passing of a decree for judicial separation; or
(ii) that there has been no restitution of conjugal rights as between the parties to the marriage for a period of one year or upwards after the passing of a decree for restitution of conjugal rights.
(2) A wife may also present a petition for the dissolution of her marriage on the ground—
(i) in the case of any marriage solemnized before the commencement of this Act, that the husband was married again before such commencement or that any other wife of the husband married before such commencement was alive at the time of the solemnization of the marriage of the petitioner; or
(ii) that the husband has, since the solemnization of the marriage, been guilty of rape, sodomy or bestiality; or
(iii) that in a suit under section 18 of the Hindu Adoptions and Maintenance Act, 1956, or in a proceeding under section 125 of the Code of Criminal Procedure, 1973 (now Section 144 of BNSS 2023), a decree or order has been passed against the husband awarding maintenance to the wife and that since the passing of such decree or order, cohabitation between the parties has not been resumed for one year or upwards; or
(iv) that her marriage (whether consummated or not) was solemnized before she attained the age of fifteen years and she has repudiated the marriage after attaining that age but before attaining the age of eighteen years.`,
    explainedSimply:
      'Outlines the statutory fault grounds for divorce available to either spouse: (1) Adultery (voluntary intercourse outside marriage); (2) Cruelty (physical or mental); (3) Desertion for at least 2 continuous years; (4) Religious conversion; (5) Incurable mental disorder; (6) Renunciation of the world; (7) Presumption of death (not heard of for 7+ years); and (8) Non-resumption of cohabitation for 1+ year after a decree of judicial separation or restitution of conjugal rights. In addition, wives have special statutory grounds including non-resumption of cohabitation for 1 year after a maintenance order, or repudiation of child marriage before age 18.',
    otherLawsNote:
      'Supreme Court under Article 142 has discretion to grant divorce on grounds of irretrievable breakdown of marriage (Shilpa Sailesh v. Varun Sreenivasan, 2023), although irretrievable breakdown is not yet an explicit statutory text ground under Section 13.',
  },
  {
    id: 'sec-13b',
    number: 'Section 13B',
    title: 'Divorce by Mutual Consent',
    statutoryText: `(1) Subject to the provisions of this Act a petition for dissolution of marriage by a decree of divorce may be presented to the district court by both the parties to a marriage together, whether such marriage was solemnized before or after the commencement of the Marriage Laws (Amendment) Act, 1976, on the ground that they have been living separately for a period of one year or more, that they have not been able to live together and that they have mutually agreed that the marriage should be dissolved.
(2) On the motion of both the parties made not earlier than six months after the date of the presentation of the petition referred to in sub-section (1) and not later than eighteen months after the said date, if the petition is not withdrawn in the meantime, the court shall, on being satisfied, after hearing the parties and after making such inquiry as it thinks fit, that a marriage has been solemnized and that the averments in the petition are true, pass a decree of divorce declaring the marriage to be dissolved with effect from the date of the decree.`,
    explainedSimply:
      'Spouses can jointly petition for divorce by mutual consent if: (1) they have lived separately for at least 1 year; (2) they cannot live together; and (3) they mutually agree to end the marriage. After filing (first motion), there is a mandatory statutory waiting period between 6 and 18 months before the second motion can be made to confirm the decree, unless waived by court discretion under Supreme Court Amardeep Singh guidelines.',
    otherLawsNote:
      'The Supreme Court in Amardeep Singh v. Harveen Kaur (2017) held that the 6-month cooling-off period under Section 13B(2) is directory, not mandatory, and can be waived by the court in genuine cases where all mediation and settlement efforts have concluded.',
  },
  {
    id: 'sec-14',
    number: 'Section 14',
    title: 'No Petition for Divorce within One Year of Marriage',
    statutoryText: `(1) Notwithstanding anything contained in this Act, it shall not be competent for any court to entertain any petition for dissolution of a marriage by a decree of divorce, unless at the date of the presentation of the petition one year has elapsed since the date of the marriage:
Provided that the court may, upon application made to it in accordance with such rules as may be made by the High Court in that behalf, allow a petition to be presented before one year has elapsed since the date of the marriage on the ground that the case is one of exceptional hardship to the petitioner or of exceptional depravity on the part of the respondent, but if it appears to the court at the hearing of the petition that the petitioner obtained leave to present the petition by any misrepresentation or concealment of the nature of the case, the court may, if it pronounces a decree, do so subject to the condition that the decree shall not have effect until after the expiry of one year from the date of the marriage or may dismiss the petition without prejudice to any petition which may be brought after the expiration of the said one year upon the same or substantially the same facts as those alleged in support of the petition so dismissed.`,
    explainedSimply:
      'A divorce petition generally cannot be filed until at least 1 year has passed since the marriage date. An exception is permitted only with special leave of the court in cases of exceptional hardship to the petitioner or exceptional depravity by the respondent.',
    otherLawsNote:
      'This one-year statutory bar aims to encourage reconciliation and prevent hasty dissolutions during early marital adjustment.',
  },
  {
    id: 'sec-15',
    number: 'Section 15',
    title: 'Divorced Persons When May Marry Again',
    statutoryText: `When a marriage has been dissolved by a decree of divorce and either there is no right of appeal against the decree or, if there is such a right of appeal, the time for appealing has expired without an appeal having been presented, or an appeal has been presented but has been dismissed, it shall be lawful for either party to the marriage to marry again.`,
    explainedSimply:
      'Once a divorce decree is granted, either party is legally free to remarry after the statutory appeal limitation period (normally 90 days under Section 28) has expired with no appeal filed, or after any appeal has been dismissed.',
    otherLawsNote:
      'Remarriage before the appeal period expires or while an appeal is actively pending may be legally vulnerable if the decree is subsequently reversed.',
  },
  {
    id: 'sec-16',
    number: 'Section 16',
    title: 'Legitimacy of Children of Void and Voidable Marriages',
    statutoryText: `(1) Notwithstanding that a marriage is null and void under section 11, any child of such marriage who would have been legitimate if the marriage had been valid, shall be legitimate, whether such child is born before or after the commencement of the Marriage Laws (Amendment) Act, 1976, and whether or not a decree of nullity is granted in respect of that marriage under this Act and whether or not the marriage is held to be void otherwise than on a petition under this Act.
(2) Where a decree of nullity is granted in respect of a voidable marriage under section 12, any child begotten or conceived before the decree is made, who would have been the legitimate child of the parties to the marriage if at the date of the decree it had been dissolved instead of being annulled, shall be deemed to be their legitimate child notwithstanding the decree of nullity.
(3) Nothing contained in sub-section (1) or sub-section (2) shall be construed as conferring upon any child of a marriage which is null and void or which is annulled by a decree of nullity under section 12, any rights in or to the property of any person, other than the parents, in any case where, but for the passing of this Act, such child would have been incapable of possessing or acquiring any such rights by reason of his not being the legitimate child of his parents.`,
    explainedSimply:
      'Children born of void or voidable marriages are statutorily conferred full legal legitimacy. Under Section 16(3) as interpreted by the Supreme Court (Revanasiddappa v. Mallikarjun, 2023), such children are entitled to share in their parents\' self-acquired and coparcenary ancestral property, though not in the property of other relatives.',
    otherLawsNote:
      'Supreme Court landmark 3-judge bench ruling in Revanasiddappa (2023) affirmed that children of void/voidable marriages have rights in parents\' share of joint Hindu family coparcenary property.',
  },
  {
    id: 'sec-17',
    number: 'Section 17',
    title: 'Punishment of Bigamy',
    statutoryText: `Any marriage between two Hindus solemnized after the commencement of this Act is void if at the date of such marriage either party had a husband or wife living; and the provisions of sections 494 and 495 of the Indian Penal Code (45 of 1860) [now Section 82 of Bharatiya Nyaya Sanhita, 2023] shall apply accordingly.`,
    explainedSimply:
      'Bigamy is strictly prohibited. Entering into a second marriage while an earlier marriage is legally subsisting is void, and the offending spouse is liable to criminal prosecution under penal law (up to 7 years imprisonment and fine).',
    otherLawsNote:
      'Penal provisions are now codified in Section 82 of the Bharatiya Nyaya Sanhita (BNS), 2023 (formerly Sections 494 and 495 of IPC 1860).',
  },
  {
    id: 'sec-24',
    number: 'Section 24',
    title: 'Maintenance Pendente Lite and Expenses of Proceedings',
    statutoryText: `Where in any proceeding under this Act it appears to the court that either the wife or the husband, as the case may be, has no independent income sufficient for her or his support and the necessary expenses of the proceeding, it may, on the application of the wife or the husband, order the respondent to pay to the petitioner the expenses of the proceeding, and monthly during the proceeding such sum as, having regard to the petitioner's own income and the income of the respondent, it may seem to the court to be reasonable:
Provided that the application for the payment of the expenses of the proceeding and such monthly sum during the proceeding, shall, as far as possible, be disposed of within sixty days from the date of service of notice on the wife or the husband, as the case may be.`,
    explainedSimply:
      'Allows either spouse (husband or wife) who has no sufficient independent income to apply for interim monthly maintenance and court litigation expenses while matrimonial proceedings are pending. The court aims to decide the interim maintenance application within 60 days of notice.',
    otherLawsNote:
      'Maintenance may also be sought concurrently under Section 144 of BNSS 2023 (former Section 125 CrPC) or the Protection of Women from Domestic Violence Act (PWDVA), 2005. The Supreme Court in Rajnesh v. Neha (2020) mandates filing comprehensive Affidavits of Assets and Liabilities to prevent overlapping or conflicting maintenance orders.',
  },
  {
    id: 'sec-25',
    number: 'Section 25',
    title: 'Permanent Alimony and Maintenance',
    statutoryText: `(1) Any court exercising jurisdiction under this Act may, at the time of passing any decree or at any time subsequent thereto, on application made to it for the purpose by either the wife or the husband, as the case may be, order that the respondent shall pay to the applicant for her or his maintenance and support such gross sum or such monthly or periodical sum for a term not exceeding the life of the applicant as, having regard to the respondent's own income and other property, if any, the income and other property of the applicant, the conduct of the parties and other circumstances of the case, it may seem to the court to be just, and any such payment may be secured, if necessary, by a charge on the immovable property of the respondent.
(2) If the court is satisfied that there is a change in the circumstances of either party at any time after it has made an order under sub-section (1), it may at the instance of either party, vary, modify or rescind any such order in such manner as the court may deem just.
(3) If the court is satisfied that the party in whose favour an order has been made under this section has re-married or, if such party is the wife, that she has not remained chaste, or, if such party is the husband, that he has had sexual intercourse with any woman outside wedlock, it may at the instance of the other party vary, modify or rescind any such order in such manner as the court may deem just.`,
    explainedSimply:
      'At the time of granting divorce, judicial separation, or decree of nullity, the court may order permanent alimony—either as a one-time lump sum or monthly payments for life—considering the income, property, and conduct of both parties. Maintenance orders may be modified if financial circumstances change, or cancelled if the recipient remarries.',
    otherLawsNote:
      'Section 25 applies gender-neutrally under HMA (either wife or husband can apply depending on dependency), whereas Hindu Adoptions and Maintenance Act 1956 and BNSS 144 apply specifically for the maintenance of wives, children, and aged parents.',
  },
  {
    id: 'sec-26',
    number: 'Section 26',
    title: 'Custody of Children',
    statutoryText: `In any proceeding under this Act, the court may, from time to time, pass such interim orders and make such provisions in the decree as it may deem just and proper with respect to the custody, maintenance and education of minor children, consistently with their wishes, wherever possible, and may, after the decree, upon application by petition for the purpose, make from time to time, all such orders and provisions with respect to the custody, maintenance and education of such children as might have been made by such decree or interim orders in case the proceeding for obtaining such decree were still pending, and may also from time to time revoke, suspend or vary any such orders and provisions previously made:
Provided that the application with respect to the maintenance and education of the minor children, during the proceeding, shall, as far as possible, be disposed of within sixty days from the date of service of notice on the respondent.`,
    explainedSimply:
      'The court can make interim and permanent orders regarding the custody, maintenance, and education of minor children, keeping the child\'s wishes in view wherever possible. The court may modify custody orders at any time as the child grows.',
    otherLawsNote:
      'The paramount consideration in all custody matters under Indian law is the welfare of the minor child (as reaffirmed in Gaurav Nagpal v. Sumedha Nagpal and under the Guardians and Wards Act, 1890).',
  },
  {
    id: 'sec-27',
    number: 'Section 27',
    title: 'Disposal of Property',
    statutoryText: `In any proceeding under this Act, the court may make such provisions in the decree as it deems just and proper with respect to any property presented, at or about the time of marriage, which may belong jointly to both the husband and the wife.`,
    explainedSimply:
      'During marital proceedings, the court has statutory authority to make fair orders concerning wedding gifts, jewellery, or property presented at or around the wedding that belongs jointly to the husband and wife.',
    otherLawsNote:
      'A woman\'s Stridhan (exclusive personal wedding gifts, gold, and property) remains her absolute personal property under Section 14 of the Hindu Succession Act, 1956 and criminal breach of trust applies if withheld.',
  },
  {
    id: 'sec-28',
    number: 'Section 28',
    title: 'Appeals from Decrees and Orders',
    statutoryText: `(1) All decrees made by the court in any proceeding under this Act shall, subject to the provisions of sub-section (3), be appealable as decrees of the court made in the exercise of its original civil jurisdiction, and every such appeal shall lie to the court to which appeals ordinarily lie from the decisions of the court given in the exercise of its original civil jurisdiction.
(4) Every appeal under this section shall be preferred within a period of ninety days from the date of the decree or order.`,
    explainedSimply:
      'Any decree or appealable order passed under the Act can be appealed to the appropriate appellate civil court or High Court. The statutory limitation period to file an appeal is 90 days from the date of the decree.',
    otherLawsNote:
      'Under the Family Courts Act, 1984 (Section 19), an appeal against a judgment of a Family Court lies directly to a Division Bench of the High Court within 30 days.',
  },
]
