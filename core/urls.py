from django.urls import include, path
from core import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"client", views.ClientViewSets)

urlpatterns = [
    path("whoami", views.whoami, name="whoami"),
    path(
        "client/<int:client_id>/legal-process/simple",
        views.simple_legal_processes,
        name="simple_legal_processes",
    ),
    path("client/<int:client_id>/legal-process", views.legal_processes, name="legal_processes"),
    path("", include(router.urls)),
]
