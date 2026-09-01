from django.db import models


class FundamentalRight(models.Model):
    """One of the six Fundamental Rights sections shown on the frontend."""

    id = models.SlugField(primary_key=True, max_length=64)
    icon = models.CharField(
        max_length=64, help_text='Lucide icon name used by the frontend, e.g. "Scale".'
    )
    title = models.CharField(max_length=120)
    articles = models.CharField(max_length=60, help_text='e.g. "Articles 14–18"')
    summary = models.TextField()
    example = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


class Category(models.Model):
    """A law category, e.g. Criminal Law, Consumer Law."""

    id = models.SlugField(primary_key=True, max_length=64)
    icon = models.CharField(max_length=64)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.title


class Law(models.Model):
    """A statute. Content here is placeholder until verified by an editor."""

    id = models.SlugField(primary_key=True, max_length=80)
    name = models.CharField(max_length=255)
    year = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='laws')
    description = models.TextField()
    official_source = models.CharField(
        max_length=255, blank=True,
        help_text='Link or citation to the official source, once verified.',
    )
    last_verified = models.CharField(
        max_length=120, blank=True, default='Not yet verified — placeholder content',
    )
    related_laws = models.ManyToManyField('self', blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class LawSection(models.Model):
    """An individual, expandable section within a Law."""

    law = models.ForeignKey(Law, on_delete=models.CASCADE, related_name='sections')
    number = models.CharField(max_length=60, help_text='e.g. "Section 1"')
    title = models.CharField(max_length=255)
    content = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f'{self.law_id} — {self.number}'


class LegalTerm(models.Model):
    """A glossary entry, e.g. FIR, Bail."""

    id = models.SlugField(primary_key=True, max_length=80)
    term = models.CharField(max_length=120)
    full_form = models.CharField(max_length=255, blank=True)
    definition = models.TextField()
    related_laws = models.ManyToManyField(Law, blank=True, related_name='legal_terms')

    class Meta:
        ordering = ['term']

    def __str__(self):
        return self.term


class SituationCategory(models.Model):
    """One of the optional category buttons on the 'I Have Been Harmed' form."""

    id = models.SlugField(primary_key=True, max_length=64)
    icon = models.CharField(max_length=64)
    label = models.CharField(max_length=120)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'situation categories'

    def __str__(self):
        return self.label
