import os
from django.conf import settings
from django.http import FileResponse, HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.filters import ClientFilter
from core.models import Client, Evolution, Observation, Process
from rest_framework import status
from django.core.files.storage import default_storage
from django.contrib.auth.decorators import login_required

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


@login_required
def profile_image(request, client_id):
    """
        Atualizar e buscar a imagem de perfil de um cliente
    """
    if request.method == 'PUT':
        try:
            client = Client.objects.get(pk=client_id)
        except Client.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if 'profile_image' not in request.FILES:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['profile_image']
        file_name = default_storage.save(file.name, file)
        client.profile_image = file_name
        client.save()
        return Response(status=status.HTTP_200_OK)

    if request.method == 'GET':
        try:
            client = Client.objects.get(pk=client_id)
        except Client.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not (client.profile_image and os.path.isfile(os.path.join(settings.MEDIA_ROOT, client.profile_image.path))):
            return JsonResponse({"detail": "user do not have profile image"}, status=status.HTTP_200_OK)

        file_path = os.path.join(settings.MEDIA_ROOT, client.profile_image.path)
        return FileResponse(open(file_path, 'rb'), content_type='image/jpeg')

    return HttpResponse(status=404)
