import os
from django.conf import settings
from django.http import FileResponse, HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.filters import ClientFilter, HonoraryFilter, ProcessFilter
from core.models import Client, Evolution, Honorary, Observation, Process
from rest_framework import status
from django.core.files.storage import default_storage

from core.serializers import (
    ClientBaseSerializer,
    DetailedProcessSerializer,
    EvolutionSerializer,
    HonoraryBaseSerializer,
    LegalProcessSerializer,
    ObservationSerializer,
    ProcessBaseSerializer,
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

    def destroy(self, request, *args, **kwargs):
        client = self.get_object()

        client.is_active = False
        client.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


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
    queryset = Evolution.objects.filter().order_by("-created_at").select_related("process")
    serializer_class = EvolutionSerializer
    filterset_fields = ["process", "id"]

    def create(self, request, *args, **kwargs):
        file = request.FILES.get("file")
        data = request.data.copy()
        if file:
            data["file"] = file

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ObservationViewSets(viewsets.ModelViewSet):
    queryset = Observation.objects.filter().order_by("-created_at").select_related("process")
    serializer_class = ObservationSerializer
    filterset_fields = ["process", "id"]


class ProcessViewSets(viewsets.ModelViewSet):
    queryset = Process.objects.filter().order_by("-start_date")
    serializer_class = ProcessBaseSerializer
    filterset_class = ProcessFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return DetailedProcessSerializer

        return ProcessBaseSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def profile_image(request, client_id):
    """
    Atualizar e buscar a imagem de perfil de um cliente
    """
    if request.method == "POST":
        try:
            client = Client.objects.get(pk=client_id)
        except Client.DoesNotExist:
            return JsonResponse(
                {"detail": "Validation error, client do not exists"}, status=status.HTTP_404_NOT_FOUND
            )

        if "profile-image" not in request.FILES:
            return JsonResponse({"detail": "Validation error"}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES["profile-image"]
        file_name = default_storage.save(file.name, file)
        client.profile_image = file_name
        client.save()
        return JsonResponse({"detail": "Saved profile image"}, status=status.HTTP_200_OK)

    if request.method == "GET":
        try:
            client = Client.objects.get(pk=client_id)
        except Client.DoesNotExist:
            return JsonResponse(
                {"detail": "Validation error, client do not exists"}, status=status.HTTP_404_NOT_FOUND
            )

        if not (
            client.profile_image
            and os.path.isfile(os.path.join(settings.MEDIA_ROOT, client.profile_image.path))
        ):
            return JsonResponse({"detail": "user do not have profile image"}, status=status.HTTP_200_OK)

        file_path = os.path.join(settings.MEDIA_ROOT, client.profile_image.path)
        return FileResponse(open(file_path, "rb"), content_type="image/*")

    return HttpResponse(status=404)


class HonoraryViewSets(viewsets.ModelViewSet):
    queryset = Honorary.objects.all().order_by("-date")
    serializer_class = HonoraryBaseSerializer
    filterset_class = HonoraryFilter
