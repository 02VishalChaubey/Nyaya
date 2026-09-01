from django.urls import path

from . import views

urlpatterns = [
    path('rights/', views.FundamentalRightListView.as_view(), name='rights-list'),
    path('categories/', views.CategoryListView.as_view(), name='categories-list'),
    path('laws/', views.LawListView.as_view(), name='laws-list'),
    path('laws/<str:id>/', views.LawDetailView.as_view(), name='laws-detail'),
    path('legal-terms/', views.LegalTermListView.as_view(), name='terms-list'),
    path('legal-terms/<str:id>/', views.LegalTermDetailView.as_view(), name='terms-detail'),
    path(
        'situation-categories/',
        views.SituationCategoryListView.as_view(),
        name='situation-categories',
    ),
    path('search/', views.SearchView.as_view(), name='search'),
    path('situations/analyze/', views.SituationAnalyzeView.as_view(), name='situation-analyze'),
]
