from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def whoami(request):
    serialized_user = { "id": request.user.id, "email": request.user.email , "name": request.user.get_full_name() }
    return Response(serialized_user)
