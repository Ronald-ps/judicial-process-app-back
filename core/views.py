from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.filters import ClientFilter
from core.models import Client

from core.serializers import ClientBaseSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def whoami(request):
    serialized_user = { "id": request.user.id, "email": request.user.email , "name": request.user.get_full_name() }
    return Response(serialized_user)


class ClientViewSets(viewsets.ModelViewSet):
    queryset = Client.objects.filter().order_by("-created_at")
    serializer_class = ClientBaseSerializer
    filterset_class = ClientFilter











# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.base_user import BaseUserManager


# class CustomUserManager(BaseUserManager):  # 1.
#     def create_user(self, email, password=None):  # 2.
#         if not email:
#             raise ValueError("Users must have an email address")

#         user = self.model(
#             email=self.normalize_email(email),
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None):  # 3.
#         user = self.create_user(
#             email,
#             password=password,
#         )
#         user.is_admin = True
#         user.is_superuser = True
#         user.is_staff = True
#         user.save(using=self._db)
#         return user


# class User(AbstractUser):
#     """
#     Usuário customizado com email como campo de login
#     """

#     username = None
#     email = models.EmailField(unique=True)

#     objects = CustomUserManager()

#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = []


# class Client(models.Model):
#     """ Cliente que solicita por processos """
#     class EducationLevelChoices(models.TextChoices):
#         FUNDAMENTAL = "fundamental", "Ensino fundamental"
#         MEDIO = "medio", "Ensino médio"
#         SUPERIOR = "superior", "Ensino superior"

#     class MaritalStatusChoices(models.TextChoices):
#         SOLTEIRO = "solteiro", "Solteiro"
#         CASADO = "casado", "Casado"
#         DIVORCIADO = "divorciado", "Divorciado"
#         VIUVO = "viuvo", "Viúvo"

#     first_name = models.TextField()
#     last_name = models.TextField()
#     cpf = models.CharField(max_length=14)
#     rg = models.CharField(max_length=8)
#     birth_date = models.DateField()
#     phone = models.CharField(max_length=12)
#     cellphone = models.CharField(max_length=12)
#     email = models.EmailField()
#     father_name = models.TextField()
#     mother_name = models.TextField()
#     childrens_quantity = models.IntegerField()
#     education_level = models.TextField(choices=EducationLevelChoices.choices)
#     profession = models.TextField()
#     marital_status = models.TextField(choices=MaritalStatusChoices.choices)
#     address = models.TextField()
#     city = models.TextField()


# class Process(models.Model):
#     """ Processo que o cliente solicita """
#     client = models.ForeignKey(Client, on_delete=models.CASCADE)
#     code = models.TextField()
#     start_date = models.DateField()
#     description = models.TextField()


# class Observation(models.Model):
#     """ Observação de um processo """
#     process = models.ForeignKey(Process, on_delete=models.CASCADE)
#     description = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE)


# class Evolution(models.Model):
#     """ Evolução de um processo """
#     process = models.ForeignKey(Process, on_delete=models.CASCADE)
#     description = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE)
