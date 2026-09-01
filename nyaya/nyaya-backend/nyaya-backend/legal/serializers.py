from rest_framework import serializers

from .models import (
    Category,
    FundamentalRight,
    Law,
    LawSection,
    LegalTerm,
    SituationCategory,
)


class FundamentalRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundamentalRight
        fields = ['id', 'icon', 'title', 'articles', 'summary', 'example']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'icon', 'title', 'description']


class LawSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawSection
        fields = ['id', 'number', 'title', 'content']


class LawRelatedSerializer(serializers.ModelSerializer):
    """Minimal law representation used when nested inside another law or a term."""

    class Meta:
        model = Law
        fields = ['id', 'name']


class LawListSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='id', read_only=True)

    class Meta:
        model = Law
        fields = ['id', 'name', 'year', 'category', 'description']


class LawDetailSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='id', read_only=True)
    sections = LawSectionSerializer(many=True, read_only=True)
    related_laws = LawRelatedSerializer(many=True, read_only=True)

    class Meta:
        model = Law
        fields = [
            'id', 'name', 'year', 'category', 'description',
            'sections', 'official_source', 'last_verified', 'related_laws',
        ]


class LegalTermSerializer(serializers.ModelSerializer):
    related_laws = LawRelatedSerializer(many=True, read_only=True)

    class Meta:
        model = LegalTerm
        fields = ['id', 'term', 'full_form', 'definition', 'related_laws']


class SituationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SituationCategory
        fields = ['id', 'icon', 'label']
