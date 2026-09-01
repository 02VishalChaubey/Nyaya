from django.contrib import admin

from .models import Category, FundamentalRight, Law, LawSection, LegalTerm, SituationCategory


class LawSectionInline(admin.TabularInline):
    model = LawSection
    extra = 1


@admin.register(FundamentalRight)
class FundamentalRightAdmin(admin.ModelAdmin):
    list_display = ('title', 'articles', 'order')
    ordering = ('order',)
    prepopulated_fields = {'id': ('title',)}
    search_fields = ('title', 'summary')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    ordering = ('order',)
    prepopulated_fields = {'id': ('title',)}
    search_fields = ('title',)


@admin.register(Law)
class LawAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'category', 'last_verified')
    list_filter = ('category', 'year')
    search_fields = ('name', 'description')
    inlines = [LawSectionInline]
    filter_horizontal = ('related_laws',)
    prepopulated_fields = {'id': ('name',)}


@admin.register(LegalTerm)
class LegalTermAdmin(admin.ModelAdmin):
    list_display = ('term', 'full_form')
    search_fields = ('term', 'definition')
    filter_horizontal = ('related_laws',)
    prepopulated_fields = {'id': ('term',)}


@admin.register(SituationCategory)
class SituationCategoryAdmin(admin.ModelAdmin):
    list_display = ('label', 'order')
    ordering = ('order',)
    prepopulated_fields = {'id': ('label',)}


admin.site.site_header = 'Nyaya Content Admin'
admin.site.site_title = 'Nyaya Admin'
admin.site.index_title = 'Manage laws, rights, and glossary content'
