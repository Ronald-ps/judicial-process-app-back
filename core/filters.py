from django_filters import rest_framework as filters
from django.db.models import Q

from core.models import Client


class ClientFilter(filters.FilterSet):
    search_term = filters.CharFilter(method="filter_by_search_term")

    def filter_by_custom_field(self, queryset, name, value):
        return queryset.filter(Q(name__icontains=value) | Q(email__iexact=value))

    class Meta:
        model = Client
        fields = ["name", "email"]
