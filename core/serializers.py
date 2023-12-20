from core.models import Client
from rest_framework import serializers


class ClientBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
