from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.filters import ClientFilter
from core.models import Client, Evolution, Observation, Process

from core.serializers import (
    ClientBaseSerializer,
    EvolutionSerializer,
    LegalProcessSerializer,
    ObservationSerializer,
)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def whoami(request):
    serialized_user = {
        "id": request.user.id,
        "email": request.user.email,
        "name": request.user.get_full_name(),
    }
    return Response(serialized_user)


class ClientViewSets(viewsets.ModelViewSet):
    queryset = Client.objects.filter().order_by("-created_at")
    serializer_class = ClientBaseSerializer
    filterset_class = ClientFilter


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def legal_processes(request, client_id):
    processes = Process.objects.filter(client_id=client_id)
    serialized_processes = LegalProcessSerializer(processes, many=True).data
    return Response(serialized_processes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def simple_legal_processes(request, client_id):
    processes = Process.objects.filter(client_id=client_id).values("id", "code")
    return Response(processes)


class EvolutionViewSets(viewsets.ModelViewSet):
    queryset = Evolution.objects.filter().order_by("-created_at")
    serializer_class = EvolutionSerializer
    filterset_fields = ["process", "id"]


class ObservationViewSets(viewsets.ModelViewSet):
    queryset = Observation.objects.filter().order_by("-created_at")
    serializer_class = ObservationSerializer
    filterset_fields = ["process", "id"]
