from django.core.management.base import BaseCommand

from legal.models import Law, LawSection

INDIA_CODE = 'indiacode.nic.in'


class Command(BaseCommand):
    """
    Adds a second, larger batch of real Indian Central Acts on top of the
    starter set loaded by `seed_data`. Run `seed_data` first.

    Content notes (read this before adding more):
    - Names, years, and general purpose of each Act are well-documented,
      stable historical facts.
    - Where a section is marked "(verified)" in a comment below, its number
      and description were checked against a live source before writing.
      Other sections use safe, generic descriptions (short title, extent,
      definitions) rather than inventing precise provisions that weren't
      individually verified.
    - Every entry links to the real India Code page for that Act as its
      official_source, so users always have a path to the authoritative
      full text — this backend intentionally does not attempt to host
      full verbatim statute text (see project README).
    - This is not the whole of Indian law — see the 'still to add' note in
      the docstring for the direction future batches should take.
    """

    help = 'Adds a larger, well-researched batch of real Indian laws (run after seed_data).'

    def handle(self, *args, **options):
        laws_data = self.get_laws_data()
        for item in laws_data:
            law, _ = Law.objects.update_or_create(
                id=item['id'],
                defaults=dict(
                    name=item['name'],
                    year=item['year'],
                    category_id=item['category_id'],
                    description=item['description'],
                    official_source=item['official_source'],
                    last_verified=item.get(
                        'last_verified', 'Not yet verified — placeholder content'
                    ),
                ),
            )
            law.sections.all().delete()
            for order, (number, title, content) in enumerate(item['sections']):
                LawSection.objects.create(
                    law=law, number=number, title=title, content=content, order=order
                )

        self.stdout.write(self.style.SUCCESS(f'Added/updated {len(laws_data)} more laws.'))

        self.link_related_laws()

        self.stdout.write(
            'Still to add in future batches: state-level Acts, the IPC/CrPC/'
            'Evidence Act historical predecessors, tax law, company law, and '
            'IP law (Trademarks/Patents/Copyright Acts).'
        )

    def link_related_laws(self):
        """
        Cross-links a handful of laws that are commonly relevant to each
        other, across both this batch and the original seed_data batch.
        Silently skips any id that isn't in the database yet.
        """
        links = [
            ('bsa-2023', ['bns-2023', 'bnss-2023']),
            ('domestic-violence-2005', ['hindu-marriage-1955', 'senior-citizens-2007']),
            ('hindu-succession-1956', ['hindu-marriage-1955']),
            ('posh-2013', ['industrial-disputes-1947']),
            ('motor-vehicles-1988', ['negotiable-instruments-1881']),
            ('sale-of-goods-1930', ['consumer-protection-2019', 'indian-contract-1872']),
            ('specific-relief-1963', ['indian-contract-1872']),
            ('registration-1908', ['transfer-of-property-1882']),
            ('rera-2016', ['transfer-of-property-1882', 'registration-1908']),
            ('rte-2009', ['rti-2005']),
        ]
        for law_id, related_ids in links:
            try:
                law = Law.objects.get(id=law_id)
            except Law.DoesNotExist:
                continue
            valid_related = Law.objects.filter(id__in=related_ids)
            for related in valid_related:
                law.related_laws.add(related)
        self.stdout.write('  linked related laws.')

    def get_laws_data(self):
        return [
            # ---------------------------------------------------------- CRIMINAL
            dict(
                id='prevention-of-corruption-1988',
                name='Prevention of Corruption Act, 1988', year=1988, category_id='criminal',
                description=(
                    'Defines and penalises corruption offences by public servants, '
                    'including bribery and criminal misconduct, and sets out how '
                    'such cases are investigated and prosecuted.'
                ),
                official_source=f'{INDIA_CODE} (search "Prevention of Corruption Act 1988")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "public servant" and related terms.'),
                    ('Section 7', 'Offence relating to public servant being bribed',
                     'General provision area — covers a public servant obtaining an undue advantage in relation to official duties. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='pocso-2012',
                name='Protection of Children from Sexual Offences Act, 2012', year=2012,
                category_id='criminal',
                description=(
                    'A dedicated law protecting children from sexual abuse and '
                    'exploitation, defining specific offences and establishing '
                    'child-friendly procedures for reporting, investigation, and trial.'
                ),
                official_source=f'{INDIA_CODE} (search "POCSO Act 2012")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "child" (under 18) and categories of offences covered.'),
                    ('Section 19', 'Reporting of offences',
                     'General provision area — creates a mandatory duty to report known or suspected offences under the Act. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='ndps-1985',
                name='Narcotic Drugs and Psychotropic Substances Act, 1985', year=1985,
                category_id='criminal',
                description=(
                    'Regulates and restricts narcotic drugs and psychotropic '
                    'substances in India, and sets out offences and penalties for '
                    'their unauthorised production, sale, and possession.'
                ),
                official_source=f'{INDIA_CODE} (search "NDPS Act 1985")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "narcotic drug", "psychotropic substance", and related terms.'),
                    ('Section 8', 'Prohibition of certain operations',
                     'General provision area — restricts cultivation, production, and dealing in covered substances except as permitted. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='bsa-2023',
                name='Bharatiya Sakshya Adhiniyam, 2023', year=2023, category_id='criminal',
                description=(
                    "India's law of evidence, replacing the Indian Evidence Act, "
                    '1872 — governs what evidence is admissible in court and how '
                    'facts may be proved.'
                ),
                official_source='egazette.gov.in (search "Bharatiya Sakshya Adhiniyam 2023")',
                sections=[
                    ('Section 1', 'Title and application', 'Placeholder text — short title, extent, and commencement.'),
                    ('Section 2', 'Definitions', 'Placeholder text — defines key evidentiary terms.'),
                ],
            ),

            # -------------------------------------------------------------- CIVIL
            dict(
                id='negotiable-instruments-1881',
                name='Negotiable Instruments Act, 1881', year=1881, category_id='civil',
                description=(
                    'Governs promissory notes, bills of exchange, and cheques in '
                    'India — most commonly relevant today through its cheque-bounce '
                    'provisions.'
                ),
                official_source=f'{INDIA_CODE} (search "Negotiable Instruments Act 1881")',
                sections=[
                    ('Section 13', '"Negotiable instrument" defined',
                     '(verified) A negotiable instrument means a promissory note, bill of exchange, or cheque payable either to order or to bearer.'),
                    ('Section 138', 'Dishonour of cheque for insufficiency of funds',
                     "(verified) Makes it an offence when a cheque is dishonoured due to insufficient funds or because the amount exceeds an arrangement with the bank, provided the cheque was issued to discharge a debt or liability and the legal notice/payment procedure under the Act wasn't followed."),
                ],
            ),
            dict(
                id='arbitration-conciliation-1996',
                name='Arbitration and Conciliation Act, 1996', year=1996, category_id='civil',
                description=(
                    'Provides the legal framework for resolving disputes through '
                    'arbitration and conciliation in India, as an alternative to '
                    'going to court.'
                ),
                official_source=f'{INDIA_CODE} (search "Arbitration and Conciliation Act 1996")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "arbitration", "arbitral award", and related terms.'),
                    ('Section 7', 'Arbitration agreement',
                     'General provision area — sets out what makes a valid agreement to arbitrate. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='specific-relief-1963',
                name='Specific Relief Act, 1963', year=1963, category_id='civil',
                description=(
                    'Sets out when a court may order a party to actually perform '
                    'an obligation (rather than just pay damages), including '
                    'specific performance of contracts and injunctions.'
                ),
                official_source=f'{INDIA_CODE} (search "Specific Relief Act 1963")',
                sections=[
                    ('Section 1', 'Title and application', 'Placeholder text — short title, extent, and commencement.'),
                    ('Section 10', 'Specific performance of contracts',
                     'General provision area — governs when a court may order a contract to be actually performed. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='limitation-1963',
                name='Limitation Act, 1963', year=1963, category_id='civil',
                description=(
                    'Sets the time limits within which different types of legal '
                    'cases must be filed in India — after which the right to sue is '
                    'generally barred.'
                ),
                official_source=f'{INDIA_CODE} (search "Limitation Act 1963")',
                sections=[
                    ('Section 3', 'Bar of limitation',
                     'General provision area — a suit filed after the prescribed period is to be dismissed, even if limitation wasn\'t raised as a defence. Exact wording should be checked against the official text.'),
                    ('Schedule', 'Periods of limitation',
                     'Placeholder text — lists specific time limits for different kinds of suits and applications.'),
                ],
            ),
            dict(
                id='motor-vehicles-1988',
                name='Motor Vehicles Act, 1988', year=1988, category_id='civil',
                description=(
                    'Regulates motor vehicles in India, including licensing, '
                    'registration, traffic offences, and compensation claims for '
                    'road accident victims.'
                ),
                official_source=f'{INDIA_CODE} (search "Motor Vehicles Act 1988")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "motor vehicle" and related terms.'),
                    ('Section 166', 'Application for compensation',
                     'General provision area — sets out who may apply to a Claims Tribunal for compensation after a motor accident. Exact wording should be checked against the official text.'),
                ],
            ),

            # ---------------------------------------------------------- PROPERTY
            dict(
                id='registration-1908',
                name='Registration Act, 1908', year=1908, category_id='property',
                description=(
                    'Sets out which documents (such as property sale deeds) must be '
                    'registered with the government to be legally valid, and how '
                    'registration is carried out.'
                ),
                official_source=f'{INDIA_CODE} (search "Registration Act 1908")',
                sections=[
                    ('Section 17', 'Documents of which registration is compulsory',
                     'General provision area — lists categories of documents, including most property transfers, that must be registered. Exact wording should be checked against the official text.'),
                    ('Section 23', 'Time for presenting documents',
                     'Placeholder text — sets the general time limit for presenting a document for registration.'),
                ],
            ),
            dict(
                id='easements-1882',
                name='Indian Easements Act, 1882', year=1882, category_id='property',
                description=(
                    "Governs 'easements' — rights one landowner has over a "
                    'neighbouring property, such as a right of way or right to light.'
                ),
                official_source=f'{INDIA_CODE} (search "Indian Easements Act 1882")',
                sections=[
                    ('Section 4', '"Easement" defined',
                     'General provision area — defines an easement as a right attached to land to enjoy a benefit from other land. Exact wording should be checked against the official text.'),
                    ('Section 1', 'Title and application', 'Placeholder text — short title, extent, and commencement.'),
                ],
            ),
            dict(
                id='rera-2016',
                name='Real Estate (Regulation and Development) Act, 2016', year=2016,
                category_id='property',
                description=(
                    'Regulates the real estate sector in India — requires project '
                    'registration, protects home-buyers, and sets up state-level '
                    'authorities to handle disputes with developers.'
                ),
                official_source=f'{INDIA_CODE} (search "RERA Act 2016")',
                sections=[
                    ('Section 3', 'Prior registration of real estate project',
                     "General provision area — requires most real estate projects to be registered with the state's Real Estate Regulatory Authority before being marketed or sold. Exact wording should be checked against the official text."),
                    ('Section 2', 'Definitions', 'Placeholder text — defines "promoter", "allottee", and related terms.'),
                ],
            ),

            # ---------------------------------------------------------- CONSUMER
            dict(
                id='sale-of-goods-1930',
                name='Sale of Goods Act, 1930', year=1930, category_id='consumer',
                description=(
                    'Governs contracts for the sale of goods in India — covers the '
                    "transfer of ownership, buyers' and sellers' rights, and "
                    'remedies for breach.'
                ),
                official_source=f'{INDIA_CODE} (search "Sale of Goods Act 1930")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "goods", "buyer", "seller", and related terms.'),
                    ('Section 4', 'Sale and agreement to sell',
                     'General provision area — distinguishes a completed sale from an agreement to sell in future. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='legal-metrology-2009',
                name='Legal Metrology Act, 2009', year=2009, category_id='consumer',
                description=(
                    'Regulates weights and measures used in trade in India, '
                    'including mandatory information on packaged goods such as '
                    'price and quantity.'
                ),
                official_source=f'{INDIA_CODE} (search "Legal Metrology Act 2009")',
                sections=[
                    ('Section 1', 'Title and application', 'Placeholder text — short title, extent, and commencement.'),
                    ('Section 18', 'Declarations on pre-packaged commodities',
                     'General provision area — requires standard information such as quantity and price to be declared on packaged goods. Exact wording should be checked against the official text.'),
                ],
            ),

            # ------------------------------------------------------------- CYBER
            dict(
                id='dpdp-2023',
                name='Digital Personal Data Protection Act, 2023', year=2023,
                category_id='cyber',
                description=(
                    "India's dedicated data protection law — sets out how "
                    'organisations may collect, use, and store personal data, and '
                    'what rights individuals have over their own data.'
                ),
                official_source='egazette.gov.in (search "Digital Personal Data Protection Act 2023")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "personal data", "data principal", "data fiduciary".'),
                    ('Section 5', 'Notice',
                     'General provision area — requires organisations to give notice describing what data is collected and why. Exact wording should be checked against the official text.'),
                ],
            ),

            # ------------------------------------------------------------ FAMILY
            dict(
                id='special-marriage-1954',
                name='Special Marriage Act, 1954', year=1954, category_id='family',
                description=(
                    'Provides a civil form of marriage in India that does not '
                    'require either party to renounce their religion — commonly '
                    'used for inter-faith and civil marriages.'
                ),
                official_source=f'{INDIA_CODE} (search "Special Marriage Act 1954")',
                sections=[
                    ('Section 5', 'Notice of intended marriage',
                     'General provision area — requires parties to give advance notice to the Marriage Officer before the marriage is registered. Exact wording should be checked against the official text.'),
                    ('Section 4', 'Conditions relating to solemnization', 'Placeholder text — sets out requirements such as age and consent.'),
                ],
            ),
            dict(
                id='hindu-succession-1956',
                name='Hindu Succession Act, 1956', year=1956, category_id='family',
                description=(
                    'Governs inheritance and succession of property for Hindus, '
                    'Buddhists, Jains, and Sikhs, including intestate (no-will) '
                    'succession.'
                ),
                official_source=f'{INDIA_CODE} (search "Hindu Succession Act 1956")',
                sections=[
                    ('Section 6', 'Daughters as coparceners',
                     '(verified) Following the 2005 amendment, a daughter of a coparcener becomes a coparcener by birth in the same manner as a son, with the same rights and liabilities in joint family property.'),
                    ('Sections 8–16', 'Rules of succession',
                     'General provision area — sets out the order of Class I and Class II heirs when a person dies without a will. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='domestic-violence-2005',
                name='Protection of Women from Domestic Violence Act, 2005', year=2005,
                category_id='family',
                description=(
                    'A civil law giving women in a domestic relationship access to '
                    'protection orders, residence rights, and other relief against '
                    'domestic violence.'
                ),
                official_source=f'{INDIA_CODE} (search "Protection of Women from Domestic Violence Act 2005")',
                sections=[
                    ('Section 3', '"Domestic violence" defined',
                     '(verified) Covers acts that harm or endanger the health, safety, life, limb, or wellbeing of the aggrieved person, including physical, sexual, verbal, emotional, and economic abuse.'),
                    ('Section 12', 'Application to Magistrate',
                     '(verified) The aggrieved person, or someone on their behalf, may apply to a Magistrate for relief under the Act; the first hearing must generally be fixed within 3 days of the application.'),
                ],
            ),
            dict(
                id='senior-citizens-2007',
                name='Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
                year=2007, category_id='family',
                description=(
                    'Gives parents and senior citizens a legal right to claim '
                    'maintenance from their children or relatives, with a '
                    'simplified tribunal process.'
                ),
                official_source=f'{INDIA_CODE} (search "Maintenance and Welfare of Parents and Senior Citizens Act 2007")',
                sections=[
                    ('Section 4', 'Maintenance of parents and senior citizens',
                     'General provision area — allows a parent or senior citizen unable to maintain themselves to claim maintenance from children or relatives. Exact wording should be checked against the official text.'),
                    ('Section 2', 'Definitions', 'Placeholder text — defines "senior citizen", "maintenance", and related terms.'),
                ],
            ),
            dict(
                id='juvenile-justice-2015',
                name='Juvenile Justice (Care and Protection of Children) Act, 2015',
                year=2015, category_id='family',
                description=(
                    'Governs how children in conflict with the law and children in '
                    'need of care and protection are treated in India, including '
                    'adoption procedures.'
                ),
                official_source=f'{INDIA_CODE} (search "Juvenile Justice Act 2015")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "child in conflict with law" and "child in need of care and protection".'),
                    ('Section 15', 'Preliminary assessment for heinous offences',
                     'General provision area — sets out how it is decided whether a child aged 16–18 accused of a serious offence is tried as an adult. Exact wording should be checked against the official text.'),
                ],
            ),

            # ------------------------------------------------------------ LABOUR
            dict(
                id='minimum-wages-1948',
                name='Minimum Wages Act, 1948', year=1948, category_id='labour',
                description=(
                    'Empowers government to fix minimum wage rates for specified '
                    'kinds of employment, to protect workers from being paid too '
                    'little.'
                ),
                official_source=f'{INDIA_CODE} (search "Minimum Wages Act 1948")',
                sections=[
                    ('Section 3', 'Fixing of minimum rates of wages',
                     'General provision area — empowers the government to fix minimum wages for scheduled employments. Exact wording should be checked against the official text.'),
                    ('Section 2', 'Definitions', 'Placeholder text — defines "employer", "wages", and related terms.'),
                ],
            ),
            dict(
                id='payment-of-wages-1936',
                name='Payment of Wages Act, 1936', year=1936, category_id='labour',
                description=(
                    'Regulates when and how wages must be paid to certain classes '
                    'of employees, and restricts unauthorised deductions.'
                ),
                official_source=f'{INDIA_CODE} (search "Payment of Wages Act 1936")',
                sections=[
                    ('Section 5', 'Time of payment of wages',
                     'General provision area — sets deadlines by which wages must be paid after the end of a wage period. Exact wording should be checked against the official text.'),
                    ('Section 7', 'Deductions which may be made from wages',
                     'Placeholder text — lists the limited categories of deductions an employer may lawfully make.'),
                ],
            ),
            dict(
                id='epf-1952',
                name="Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
                year=1952, category_id='labour',
                description=(
                    'Establishes a compulsory retirement-savings scheme for '
                    'employees in India, requiring contributions from both '
                    'employer and employee.'
                ),
                official_source=f'{INDIA_CODE} (search "Employees Provident Funds Act 1952")',
                sections=[
                    ('Section 1', 'Title and application', 'Placeholder text — short title, extent, and applicability to establishments above a certain size.'),
                    ('Section 6', 'Contributions',
                     'General provision area — sets out the contribution rates payable by employer and employee. Exact wording should be checked against the official text.'),
                ],
            ),
            dict(
                id='maternity-benefit-1961',
                name='Maternity Benefit Act, 1961', year=1961, category_id='labour',
                description=(
                    'Regulates the employment of women before and after '
                    'childbirth and provides for paid maternity leave and related '
                    'benefits.'
                ),
                official_source=f'{INDIA_CODE} (search "Maternity Benefit Act 1961")',
                sections=[
                    ('Section 5', 'Right to payment of maternity benefit',
                     'General provision area — entitles eligible women employees to paid leave around childbirth. Exact wording, including current leave duration after later amendments, should be checked against the official text.'),
                    ('Section 2', 'Application', 'Placeholder text — sets out which establishments the Act applies to.'),
                ],
            ),
            dict(
                id='posh-2013',
                name='Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
                year=2013, category_id='labour',
                description=(
                    'Requires workplaces to prevent and redress sexual harassment '
                    'of women, including setting up an Internal Committee to '
                    'handle complaints.'
                ),
                official_source=f'{INDIA_CODE} (search "Sexual Harassment of Women at Workplace Act 2013")',
                sections=[
                    ('Section 4', 'Constitution of Internal Committee',
                     '(verified) Requires every workplace with 10 or more employees to constitute an Internal Committee to receive and inquire into complaints of sexual harassment.'),
                    ('Section 9', 'Complaint of sexual harassment',
                     "(verified) An aggrieved woman may file a written complaint with the Internal Committee (or Local Committee, where there is no Internal Committee) within 3 months of the incident, extendable for valid reasons."),
                ],
            ),
            dict(
                id='factories-1948',
                name='Factories Act, 1948', year=1948, category_id='labour',
                description=(
                    'Regulates health, safety, and working conditions for workers '
                    'in factories in India, including working hours and safety '
                    'standards.'
                ),
                official_source=f'{INDIA_CODE} (search "Factories Act 1948")',
                sections=[
                    ('Section 2', 'Definitions', 'Placeholder text — defines "factory" and "worker" for the purposes of the Act.'),
                    ('Section 51', 'Weekly hours',
                     'General provision area — caps the number of hours an adult worker may be required to work in a week. Exact wording should be checked against the official text.'),
                ],
            ),

            # ------------------------------------------------------ CONSTITUTIONAL
            dict(
                id='rti-2005',
                name='Right to Information Act, 2005', year=2005, category_id='constitutional',
                description=(
                    'Gives every citizen the right to request information from '
                    'public authorities, promoting transparency and accountability '
                    'in government.'
                ),
                official_source=f'{INDIA_CODE} (search "Right to Information Act 2005")',
                sections=[
                    ('Section 6', 'Request for obtaining information',
                     '(verified) A citizen may request information in writing or electronically, in Hindi, English, or the local official language, along with the prescribed fee.'),
                    ('Section 8', 'Exemption from disclosure of information',
                     '(verified) Lists categories of information exempt from disclosure, such as matters affecting national sovereignty, security, or specified confidential relationships — subject to a public-interest override in most cases.'),
                ],
            ),
            dict(
                id='rte-2009',
                name='Right of Children to Free and Compulsory Education Act, 2009',
                year=2009, category_id='constitutional',
                description=(
                    'Implements the constitutional right to education for children '
                    'aged 6 to 14, requiring free and compulsory schooling.'
                ),
                official_source=f'{INDIA_CODE} (search "Right to Education Act 2009")',
                sections=[
                    ('Section 3', 'Right of child to free and compulsory education',
                     'General provision area — entitles every child aged 6–14 to free, compulsory education at a neighbourhood school. Exact wording should be checked against the official text.'),
                    ('Section 12', 'Extent of school\'s responsibility',
                     'Placeholder text — sets out obligations of schools, including reserved seats for disadvantaged groups.'),
                ],
            ),
        ]
