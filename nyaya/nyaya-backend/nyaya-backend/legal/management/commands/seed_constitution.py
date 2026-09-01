from django.core.management.base import BaseCommand

from legal.models import Law, LawSection

LEGISLATIVE_DEPT = 'legislative.gov.in (search "Constitution of India")'


class Command(BaseCommand):
    """
    Adds the Constitution of India as a single Law entry, with one section
    per Part (22) and one per Schedule (12) — a real, accurate structural
    index (Part/Schedule titles and article ranges), not the operative
    article text itself.

    Sourced from the table of contents of the Ministry of Law and Justice's
    official pocket-size edition (as on 1 May 2026, updated through the
    Constitution (106th Amendment) Act, 2023) — the user-provided PDF.
    Article ranges for each Part were derived directly from where the next
    Part's first article begins, so they should be reliable; a couple of
    older Parts (VI, VII) mix in some well-established general knowledge
    about repealed provisions rather than page-by-page verification.

    Deliberately does NOT include the actual text of each article — only
    Part/Schedule titles and article-number ranges, plus a short original
    description. Full official text: legislative.gov.in.
    """

    help = 'Adds the Constitution of India as a structured Part/Schedule index.'

    def handle(self, *args, **options):
        law, _ = Law.objects.update_or_create(
            id='constitution-of-india',
            defaults=dict(
                name='The Constitution of India',
                year=1950,
                category_id='constitutional',
                description=(
                    "India's supreme law, which came into force on 26 January "
                    '1950. It sets up the structure and powers of the Union and '
                    'State governments, defines the fundamental rights and '
                    'duties of citizens, and lays out directive principles to '
                    'guide governance. This index reflects the text as amended '
                    'up to the Constitution (One Hundred and Sixth Amendment) '
                    'Act, 2023.'
                ),
                official_source=LEGISLATIVE_DEPT,
                last_verified=(
                    'Index structure taken from an official Ministry of Law and '
                    'Justice edition (as on 1 May 2026) — article text itself is '
                    'not hosted here; see the official source for that.'
                ),
            ),
        )
        law.sections.all().delete()

        parts = self.get_parts()
        for order, (number, title, article_range, note) in enumerate(parts):
            content = f'Covers {article_range}.'
            if note:
                content += f' {note}'
            LawSection.objects.create(
                law=law, number=number, title=title, content=content, order=order
            )

        schedules = self.get_schedules()
        for order, (number, title) in enumerate(schedules, start=len(parts)):
            LawSection.objects.create(
                law=law, number=number, title=title,
                content='One of the twelve Schedules to the Constitution — see the official text for full detail.',
                order=order,
            )

        self.stdout.write(
            self.style.SUCCESS(
                f'Added the Constitution of India with {len(parts)} Parts and '
                f'{len(schedules)} Schedules.'
            )
        )

        # Link to laws that directly implement or derive from the Constitution.
        related_ids = ['rti-2005', 'rte-2009', 'hindu-succession-1956']
        for related in Law.objects.filter(id__in=related_ids):
            law.related_laws.add(related)

    def get_parts(self):
        """(number, title, article_range, optional_note)"""
        return [
            ('Part I', 'The Union and its Territory', 'Articles 1–4', None),
            ('Part II', 'Citizenship', 'Articles 5–11', None),
            ('Part III', 'Fundamental Rights', 'Articles 12–35',
             'See the Fundamental Rights section of this site for a detailed breakdown.'),
            ('Part IV', 'Directive Principles of State Policy', 'Articles 36–51', None),
            ('Part IVA', 'Fundamental Duties', 'Article 51A', None),
            ('Part V', 'The Union', 'Articles 52–151',
             'Covers the executive (President, Vice-President, Council of Ministers), Parliament, and the judiciary at the Union level.'),
            ('Part VI', 'The States', 'Articles 152–237',
             'Covers the executive, legislature, and judiciary (High Courts) at the State level.'),
            ('Part VII', 'The States in Part B of the First Schedule', 'Originally Article 238',
             'Omitted — repealed by the Constitution (Seventh Amendment) Act, 1956, when the Part B state category was abolished.'),
            ('Part VIII', 'The Union Territories', 'Articles 239–242', None),
            ('Part IX', 'The Panchayats', 'Articles 243–243O',
             'Added by the Constitution (73rd Amendment) Act, 1992, establishing local rural self-government.'),
            ('Part IXA', 'The Municipalities', 'Articles 243P–243ZG',
             'Added by the Constitution (74th Amendment) Act, 1992, establishing local urban self-government.'),
            ('Part IXB', 'The Co-operative Societies', 'Articles 243ZH–243ZT', None),
            ('Part X', 'The Scheduled and Tribal Areas', 'Articles 244–244A', None),
            ('Part XI', 'Relations Between the Union and the States', 'Articles 245–263',
             'Covers the division of legislative, administrative, and financial powers between the Union and States.'),
            ('Part XII', 'Finance, Property, Contracts and Suits', 'Articles 264–300A',
             'Includes Article 300A, the right to property (a legal, not fundamental, right since 1978).'),
            ('Part XIII', 'Trade, Commerce and Intercourse Within the Territory of India',
             'Articles 301–307', None),
            ('Part XIV', 'Services Under the Union and the States', 'Articles 308–323',
             'Covers public services, including the Union and State Public Service Commissions.'),
            ('Part XIVA', 'Tribunals', 'Articles 323A–323B',
             'Added by the Constitution (42nd Amendment) Act, 1976.'),
            ('Part XV', 'Elections', 'Articles 324–329A',
             'Establishes the Election Commission of India.'),
            ('Part XVI', 'Special Provisions Relating to Certain Classes', 'Articles 330–342',
             'Covers reservation of seats for Scheduled Castes, Scheduled Tribes, and related provisions.'),
            ('Part XVII', 'Official Language', 'Articles 343–351', None),
            ('Part XVIII', 'Emergency Provisions', 'Articles 352–360',
             'Covers National, State (President\'s Rule), and Financial Emergency.'),
            ('Part XIX', 'Miscellaneous', 'Articles 361–367', None),
            ('Part XX', 'Amendment of the Constitution', 'Article 368',
             'Sets out the procedure for amending the Constitution.'),
            ('Part XXI', 'Temporary, Transitional and Special Provisions', 'Articles 369–392',
             'Historically included Article 370 (special status of Jammu & Kashmir), which was substantially altered in 2019.'),
            ('Part XXII', 'Short Title, Commencement, Authoritative Text in Hindi and Repeals',
             'Articles 393–395', None),
        ]

    def get_schedules(self):
        """(number, title)"""
        return [
            ('First Schedule', 'The States and Union territories, and their extent'),
            ('Second Schedule',
             'Provisions on emoluments, allowances, and privileges for the President, Governors, Speaker, judges, and CAG'),
            ('Third Schedule', 'Forms of oaths or affirmations'),
            ('Fourth Schedule', 'Allocation of seats in the Council of States (Rajya Sabha)'),
            ('Fifth Schedule', 'Administration and control of Scheduled Areas and Scheduled Tribes'),
            ('Sixth Schedule',
             'Administration of tribal areas in Assam, Meghalaya, Tripura, and Mizoram'),
            ('Seventh Schedule', 'The Union List, State List, and Concurrent List'),
            ('Eighth Schedule', 'The officially recognised languages'),
            ('Ninth Schedule', 'Validation of certain Acts and regulations placed beyond ordinary judicial review'),
            ('Tenth Schedule', 'Anti-defection provisions for elected members'),
            ('Eleventh Schedule', 'Powers, authority, and responsibilities of Panchayats'),
            ('Twelfth Schedule', 'Powers, authority, and responsibilities of Municipalities'),
        ]
