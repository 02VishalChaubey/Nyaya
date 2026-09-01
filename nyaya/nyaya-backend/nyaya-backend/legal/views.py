from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, FundamentalRight, Law, LawSection, LegalTerm, SituationCategory
from .serializers import (
    CategorySerializer,
    FundamentalRightSerializer,
    LawDetailSerializer,
    LawListSerializer,
    LegalTermSerializer,
    SituationCategorySerializer,
)


class FundamentalRightListView(generics.ListAPIView):
    queryset = FundamentalRight.objects.all()
    serializer_class = FundamentalRightSerializer
    pagination_class = None


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


class LawListView(generics.ListAPIView):
    """
    GET /api/laws/                       -> all laws
    GET /api/laws/?category=consumer     -> filter by category id
    GET /api/laws/?q=contract            -> search name/description
    """

    serializer_class = LawListSerializer

    def get_queryset(self):
        qs = Law.objects.select_related('category').all()
        category = self.request.query_params.get('category')
        q = self.request.query_params.get('q')
        if category:
            qs = qs.filter(category_id=category)
        if q:
            qs = qs.filter(Q(name__icontains=q) | Q(description__icontains=q))
        return qs


class LawDetailView(generics.RetrieveAPIView):
    queryset = Law.objects.select_related('category').prefetch_related('sections', 'related_laws')
    serializer_class = LawDetailSerializer
    lookup_field = 'id'


class LegalTermListView(generics.ListAPIView):
    """GET /api/legal-terms/?q=fir"""

    serializer_class = LegalTermSerializer
    pagination_class = None

    def get_queryset(self):
        qs = LegalTerm.objects.prefetch_related('related_laws').all()
        q = self.request.query_params.get('q')
        if q:
            qs = qs.filter(
                Q(term__icontains=q) | Q(definition__icontains=q) | Q(full_form__icontains=q)
            )
        return qs


class LegalTermDetailView(generics.RetrieveAPIView):
    queryset = LegalTerm.objects.prefetch_related('related_laws')
    serializer_class = LegalTermSerializer
    lookup_field = 'id'


class SituationCategoryListView(generics.ListAPIView):
    queryset = SituationCategory.objects.all()
    serializer_class = SituationCategorySerializer
    pagination_class = None


class SearchView(APIView):
    """
    Aggregated search across rights, laws, sections, and glossary terms.
    GET /api/search/?q=fir
    """

    def get(self, request):
        q = request.query_params.get('q', '').strip()
        if not q:
            return Response({'rights': [], 'laws': [], 'sections': [], 'terms': []})

        rights = FundamentalRight.objects.filter(Q(title__icontains=q) | Q(summary__icontains=q))
        laws = Law.objects.select_related('category').filter(
            Q(name__icontains=q) | Q(description__icontains=q)
        )
        sections = LawSection.objects.select_related('law').filter(
            Q(title__icontains=q) | Q(number__icontains=q)
        )
        terms = LegalTerm.objects.filter(Q(term__icontains=q) | Q(definition__icontains=q))

        return Response({
            'rights': FundamentalRightSerializer(rights, many=True).data,
            'laws': LawListSerializer(laws, many=True).data,
            'sections': [
                {
                    'id': section.id,
                    'number': section.number,
                    'title': section.title,
                    'lawId': section.law_id,
                    'lawName': section.law.name,
                }
                for section in sections
            ],
            'terms': LegalTermSerializer(terms, many=True).data,
        })


class SituationAnalyzeView(APIView):
    """
    Mock endpoint for the "I Have Been Harmed" flow.

    This does NOT call any AI or legal-recommendation engine. It returns a
    fixed, clearly-labelled placeholder result so the frontend has a real
    endpoint to call instead of hardcoding the mock result in JS. Replace
    the body of `post()` with real matching logic when that's ready.

    POST /api/situations/analyze/
    Body: {"description": "...", "category": "consumer" (optional)}
    """

    def post(self, request):
        description = (request.data.get('description') or '').strip()
        category = request.data.get('category')

        if not description:
            return Response(
                {'detail': 'description is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = {
            'legalArea': 'Consumer / Contract dispute',
            'areaDescription': (
                'Based on the general pattern of what you described, this may fall '
                'under consumer protection or contract-related law. This is only a '
                'starting point for your own reading — not a legal determination.'
            ),
            'relevantLaws': [
                {
                    'lawName': 'Consumer Protection Act, 2019',
                    'section': 'Section 35 — Manner of filing complaint',
                    'explanation': (
                        'Placeholder: describes the process for a consumer to file a '
                        'complaint about defective goods or deficient services.'
                    ),
                },
                {
                    'lawName': 'Indian Contract Act, 1872',
                    'section': 'Section 73 — Compensation for breach',
                    'explanation': (
                        'Placeholder: describes the general principle of compensation '
                        'when one party fails to honour an agreement.'
                    ),
                },
            ],
            'remedies': [
                {
                    'title': 'Consumer complaint',
                    'description': (
                        'Placeholder: a complaint may be filed with the relevant '
                        'consumer forum describing the loss suffered.'
                    ),
                },
                {
                    'title': 'Civil suit for breach of contract',
                    'description': (
                        'Placeholder: a civil suit may be an option if there was a '
                        'written or verbal agreement that was not honoured.'
                    ),
                },
            ],
            'penalties': [
                {
                    'title': 'Compensation to the affected party',
                    'description': (
                        'Placeholder: courts or forums may direct the responsible '
                        'party to pay compensation for proven loss.'
                    ),
                },
                {
                    'title': 'Refund or replacement',
                    'description': (
                        'Placeholder: in consumer matters, a refund, replacement, or '
                        'repair may be ordered depending on the facts.'
                    ),
                },
            ],
            'receivedCategory': category,
        }
        return Response(result)
