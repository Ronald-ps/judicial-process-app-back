from core.models import Client, Evolution, Observation, Process
from rest_framework import serializers


class ClientBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class ObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = "__all__"
        extra_kwargs = {"created_by": {"default": serializers.CurrentUserDefault()}}

class EvolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evolution
        fields = "__all__"
        extra_kwargs = {"created_by": {"default": serializers.CurrentUserDefault()}}


class LegalProcessSerializer(serializers.ModelSerializer):
    observations = ObservationSerializer(many=True, read_only=True)
    evolutions = EvolutionSerializer(many=True, read_only=True)

    class Meta:
        model = Process
        fields = ["client", "code", "type", "start_date", "description", "observations", "evolutions"]
