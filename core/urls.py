from django.urls import path
from core import views

urlpatterns = [
  path("whoami", views.whoami, name="whoami"),
]
