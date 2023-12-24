from core.models import Client, Evolution, Honorary, Observation, Process
from rest_framework import serializers


class ClientBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
        ready_only_fields = ["created_at", "profile_image"]


class ObservationSerializer(serializers.ModelSerializer):
    process_code = serializers.CharField(source="process.code", read_only=True)

    class Meta:
        model = Observation
        fields = ["id", "process_code", "process", "description", "created_at", "created_by"]
        extra_kwargs = {"created_by": {"default": serializers.CurrentUserDefault()}}


class EvolutionSerializer(serializers.ModelSerializer):
    process_code = serializers.CharField(source="process.code", read_only=True)

    class Meta:
        model = Evolution
        fields = ["id", "process_code", "process", "description", "created_at", "created_by"]
        extra_kwargs = {"created_by": {"default": serializers.CurrentUserDefault()}}


class LegalProcessSerializer(serializers.ModelSerializer):
    observations = ObservationSerializer(many=True, read_only=True)
    evolutions = EvolutionSerializer(many=True, read_only=True)

    class Meta:
        model = Process
        fields = ["id", "client", "code", "type", "start_date", "description", "observations", "evolutions"]


class ProcessBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Process
        fields = "__all__"


class HonoraryBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Honorary
        fields = "__all__"
