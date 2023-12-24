from django_filters import rest_framework as filters
from django.db.models import Q

from core.models import Client, Honorary


class ClientFilter(filters.FilterSet):
    search_term = filters.CharFilter(method="filter_by_search_term")

    def filter_by_search_term(self, queryset, name, value):
        return queryset.filter(
            Q(first_name__icontains=value)
            | Q(last_name__icontains=value)
            | Q(processes__code__icontains=value)
        )

    class Meta:
        model = Client
        fields = ("search_term",)


class HonoraryFilter(filters.FilterSet):
    client = filters.NumberFilter(field_name="process__client_id")

    class Meta:
        model = Honorary
        fields = ("process", "client")
