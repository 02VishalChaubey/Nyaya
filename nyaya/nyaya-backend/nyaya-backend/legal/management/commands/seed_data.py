from django.core.management.base import BaseCommand

from legal.models import Category, FundamentalRight, Law, LawSection, LegalTerm, SituationCategory


class Command(BaseCommand):
    help = "Seeds the database with the same placeholder content the frontend's mock data uses."

    def handle(self, *args, **options):
        self.seed_rights()
        self.seed_categories()
        self.seed_laws()
        self.seed_terms()
        self.seed_situation_categories()
        self.stdout.write(self.style.SUCCESS('Seed data loaded.'))

    def seed_rights(self):
        data = [
            dict(
                id='equality', icon='Scale', title='Right to Equality',
                articles='Articles 14–18', order=1,
                summary=(
                    'Guarantees that every person is equal before the law and prohibits '
                    'discrimination on grounds such as religion, race, caste, sex, or '
                    'place of birth.'
                ),
                example=(
                    'Example: a government office cannot refuse to process your '
                    'application because of your caste or religion.'
                ),
            ),
            dict(
                id='freedom', icon='Wind', title='Right to Freedom',
                articles='Articles 19–22', order=2,
                summary=(
                    'Covers freedom of speech, assembly, movement, and the right to '
                    'practise any profession, along with protections around arrest and '
                    'detention.'
                ),
                example=(
                    'Example: you generally have the right to express an opinion '
                    'publicly, within reasonable restrictions defined by law.'
                ),
            ),
            dict(
                id='exploitation', icon='ShieldOff', title='Right against Exploitation',
                articles='Articles 23–24', order=3,
                summary=(
                    'Prohibits human trafficking, forced labour, and the employment of '
                    'children below fourteen years in hazardous work.'
                ),
                example='Example: an employer cannot force someone to work without fair wages or consent.',
            ),
            dict(
                id='religion', icon='Landmark', title='Right to Freedom of Religion',
                articles='Articles 25–28', order=4,
                summary=(
                    'Protects the freedom of conscience and the right to freely '
                    'profess, practise, and propagate any religion.'
                ),
                example='Example: a person cannot be compelled to follow a religious practice against their will.',
            ),
            dict(
                id='cultural-educational', icon='BookOpen',
                title='Cultural & Educational Rights', articles='Articles 29–30', order=5,
                summary=(
                    'Protects the right of any community to conserve its language, '
                    'script, and culture, and to establish educational institutions.'
                ),
                example='Example: a linguistic minority can run its own school to teach in its native language.',
            ),
            dict(
                id='constitutional-remedies', icon='Gavel',
                title='Right to Constitutional Remedies', articles='Article 32', order=6,
                summary=(
                    'Allows individuals to directly approach the courts if any of their '
                    'fundamental rights are violated — often described as the provision '
                    'that gives the other rights their force.'
                ),
                example='Example: if a fundamental right is violated, a person may petition the courts for enforcement.',
            ),
        ]
        for item in data:
            FundamentalRight.objects.update_or_create(id=item['id'], defaults=item)
        self.stdout.write(f'  rights: {len(data)}')

    def seed_categories(self):
        data = [
            dict(id='criminal', icon='Gavel', title='Criminal Law',
                 description='Offences, punishments, and criminal procedure.', order=1),
            dict(id='civil', icon='Scale', title='Civil Law',
                 description='Disputes between individuals or organisations.', order=2),
            dict(id='property', icon='Home', title='Property Law',
                 description='Ownership, transfer, and disputes over property.', order=3),
            dict(id='consumer', icon='ShoppingBag', title='Consumer Law',
                 description='Protections for buyers of goods and services.', order=4),
            dict(id='cyber', icon='Wifi', title='Cyber Law',
                 description='Online fraud, data misuse, and digital offences.', order=5),
            dict(id='family', icon='Users', title='Family Law',
                 description='Marriage, custody, inheritance, and maintenance.', order=6),
            dict(id='labour', icon='Briefcase', title='Labour Law',
                 description='Workplace rights, wages, and working conditions.', order=7),
            dict(id='constitutional', icon='Landmark', title='Constitutional Law',
                 description='Rights, government structure, and public authority.', order=8),
        ]
        for item in data:
            Category.objects.update_or_create(id=item['id'], defaults=item)
        self.stdout.write(f'  categories: {len(data)}')

    def seed_laws(self):
        laws_data = [
            dict(
                id='bns-2023', name='Bharatiya Nyaya Sanhita, 2023', year=2023,
                category_id='criminal',
                description="India's principal legislation defining various criminal offences and their punishments.",
                official_source='egazette.gov.in (placeholder link)',
                sections=[
                    ('Section 1', 'Title and application',
                     'Placeholder text — sets out the short title, extent, and commencement of the law.'),
                    ('Section 2', 'Definitions',
                     'Placeholder text — defines key terms used throughout the statute.'),
                    ('Section 3', 'Example provision',
                     'Placeholder text — illustrates how an operative provision is typically structured.'),
                ],
                related=['bnss-2023'],
            ),
            dict(
                id='bnss-2023', name='Bharatiya Nagarik Suraksha Sanhita, 2023', year=2023,
                category_id='criminal',
                description='Governs criminal procedure — how investigations, arrests, and trials are conducted.',
                official_source='egazette.gov.in (placeholder link)',
                sections=[
                    ('Section 1', 'Title and application',
                     'Placeholder text — procedural code coverage and applicability.'),
                    ('Section 2', 'Definitions',
                     'Placeholder text — defines procedural terms such as complaint and inquiry.'),
                ],
                related=['bns-2023'],
            ),
            dict(
                id='consumer-protection-2019', name='Consumer Protection Act, 2019', year=2019,
                category_id='consumer',
                description='Protects consumer interests and establishes authorities to resolve consumer disputes.',
                official_source='consumeraffairs.nic.in (placeholder link)',
                sections=[
                    ('Section 2', 'Definitions',
                     'Placeholder text — defines "consumer", "goods", "service", and "unfair trade practice".'),
                    ('Section 35', 'Manner of filing complaint',
                     'Placeholder text — outlines how a consumer complaint may be filed.'),
                ],
                related=['it-act-2000'],
            ),
            dict(
                id='it-act-2000', name='Information Technology Act, 2000', year=2000,
                category_id='cyber',
                description='Covers electronic governance, cybercrime, and data-related offences in India.',
                official_source='meity.gov.in (placeholder link)',
                sections=[
                    ('Section 43', 'Penalty for damage to computer systems',
                     'Placeholder text — describes unauthorised access and related penalties.'),
                    ('Section 66', 'Computer-related offences',
                     'Placeholder text — outlines offences involving dishonest or fraudulent acts.'),
                ],
                related=['consumer-protection-2019'],
            ),
            dict(
                id='hindu-marriage-1955', name='Hindu Marriage Act, 1955', year=1955,
                category_id='family',
                description='Governs marriage, divorce, and related matters for Hindus, Buddhists, Jains, and Sikhs.',
                official_source='indiacode.nic.in (placeholder link)',
                sections=[
                    ('Section 5', 'Conditions for a Hindu marriage',
                     'Placeholder text — sets out requirements such as age and consent.'),
                    ('Section 13', 'Divorce',
                     'Placeholder text — describes grounds on which divorce may be sought.'),
                ],
                related=[],
            ),
            dict(
                id='industrial-disputes-1947', name='Industrial Disputes Act, 1947', year=1947,
                category_id='labour',
                description='Provides a framework for resolving disputes between employers and workers.',
                official_source='labour.gov.in (placeholder link)',
                sections=[
                    ('Section 2', 'Definitions',
                     'Placeholder text — defines "workman", "industry", and "industrial dispute".'),
                    ('Section 25F', 'Conditions for retrenchment',
                     'Placeholder text — outlines notice and compensation requirements.'),
                ],
                related=[],
            ),
            dict(
                id='transfer-of-property-1882', name='Transfer of Property Act, 1882', year=1882,
                category_id='property',
                description='Regulates how property may be transferred between living persons in India.',
                official_source='indiacode.nic.in (placeholder link)',
                sections=[
                    ('Section 5', '"Transfer of property" defined',
                     'Placeholder text — defines what counts as a transfer of property.'),
                    ('Section 54', 'Sale defined',
                     'Placeholder text — describes the essential elements of a valid sale.'),
                ],
                related=[],
            ),
            dict(
                id='indian-contract-1872', name='Indian Contract Act, 1872', year=1872,
                category_id='civil',
                description='Lays down the general principles governing contracts in India.',
                official_source='indiacode.nic.in (placeholder link)',
                sections=[
                    ('Section 10', 'What agreements are contracts',
                     'Placeholder text — sets out the requirements for a valid contract.'),
                    ('Section 73', 'Compensation for breach',
                     'Placeholder text — describes compensation available for breach of contract.'),
                ],
                related=['consumer-protection-2019'],
            ),
        ]

        # First pass: create/update laws and their sections. related_laws is
        # deferred to a second pass since target laws may not exist yet.
        for item in laws_data:
            law, _ = Law.objects.update_or_create(
                id=item['id'],
                defaults=dict(
                    name=item['name'],
                    year=item['year'],
                    category_id=item['category_id'],
                    description=item['description'],
                    official_source=item['official_source'],
                    last_verified='Not yet verified — placeholder content',
                ),
            )
            law.sections.all().delete()
            for order, (number, title, content) in enumerate(item['sections']):
                LawSection.objects.create(
                    law=law, number=number, title=title, content=content, order=order
                )

        for item in laws_data:
            Law.objects.get(id=item['id']).related_laws.set(item['related'])

        self.stdout.write(f'  laws: {len(laws_data)}')

    def seed_terms(self):
        data = [
            dict(id='fir', term='FIR', full_form='First Information Report',
                 definition=(
                     'A written document prepared by police when they receive '
                     'information about a cognizable offence — usually the first step '
                     'in a criminal investigation.'
                 ), related=['bnss-2023']),
            dict(id='bail', term='Bail', full_form='',
                 definition=(
                     'The temporary release of an accused person while their case is '
                     'ongoing, usually on conditions set by a court or police officer.'
                 ), related=['bnss-2023']),
            dict(id='cognizable-offence', term='Cognizable offence', full_form='',
                 definition=(
                     'An offence for which police can arrest without a warrant and '
                     'start an investigation without prior court permission, such as '
                     'serious crimes like theft or assault.'
                 ), related=['bnss-2023']),
            dict(id='non-cognizable-offence', term='Non-cognizable offence', full_form='',
                 definition=(
                     'A less serious offence where police cannot arrest without a '
                     'warrant and generally need court permission to investigate.'
                 ), related=['bnss-2023']),
            dict(id='summons', term='Summons', full_form='',
                 definition=(
                     'A formal order from a court requiring a person to appear before '
                     'it on a given date, usually in connection with a case.'
                 ), related=['bnss-2023']),
            dict(id='warrant', term='Warrant', full_form='',
                 definition=(
                     'A written order issued by a court authorising an action, such as '
                     'the arrest of a person or the search of a place.'
                 ), related=['bnss-2023']),
            dict(id='civil-suit', term='Civil suit', full_form='',
                 definition=(
                     'A legal case filed in court to resolve a dispute between '
                     'individuals or organisations, such as over property or a '
                     'contract, rather than a criminal offence.'
                 ), related=['indian-contract-1872']),
            dict(id='criminal-complaint', term='Criminal complaint', full_form='',
                 definition=(
                     'A formal allegation made to a magistrate or police that a person '
                     'has committed an offence, which may lead to an investigation or '
                     'trial.'
                 ), related=['bnss-2023']),
            dict(id='compensation', term='Compensation', full_form='',
                 definition=(
                     'A payment ordered by a court or authority to make up for loss, '
                     'injury, or damage suffered by a person.'
                 ), related=['consumer-protection-2019']),
            dict(id='injunction', term='Injunction', full_form='',
                 definition=(
                     'A court order that requires a person to do, or to stop doing, a '
                     'specific act — often used to prevent harm before a full trial is '
                     'completed.'
                 ), related=['indian-contract-1872']),
        ]
        for item in data:
            related = item.pop('related')
            term, _ = LegalTerm.objects.update_or_create(id=item['id'], defaults=item)
            term.related_laws.set(related)
        self.stdout.write(f'  legal terms: {len(data)}')

    def seed_situation_categories(self):
        data = [
            dict(id='money-fraud', icon='Landmark', label='Money / Fraud', order=1),
            dict(id='property', icon='Home', label='Property', order=2),
            dict(id='cyber', icon='Wifi', label='Online / Cyber', order=3),
            dict(id='consumer', icon='ShoppingBag', label='Consumer', order=4),
            dict(id='workplace', icon='Briefcase', label='Workplace', order=5),
            dict(id='personal-rights', icon='ShieldOff', label='Personal Rights', order=6),
            dict(id='family', icon='Users', label='Family', order=7),
            dict(id='other', icon='MoreHorizontal', label='Other', order=8),
        ]
        for item in data:
            SituationCategory.objects.update_or_create(id=item['id'], defaults=item)
        self.stdout.write(f'  situation categories: {len(data)}')
