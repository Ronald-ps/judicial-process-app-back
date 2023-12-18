from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})


@api_view(["GET"])
def hello_word_django_rest():
    return Response({"message": "Hello, world!"})
