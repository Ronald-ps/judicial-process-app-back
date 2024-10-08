from django.urls import include, path
from core import views
from rest_framework.routers import SimpleRouter

from django.conf import settings
from django.conf.urls.static import static

router = SimpleRouter()
router.register(r"client", views.ClientViewSets)
router.register(r"evolution", views.EvolutionViewSets)
router.register(r"observation", views.ObservationViewSets)
router.register(r"process", views.ProcessViewSets)
router.register(r"honorary", views.HonoraryViewSets)

urlpatterns = [
    path("whoami", views.whoami, name="whoami"),
    path(
        "client/<int:client_id>/legal-process/simple",
        views.simple_legal_processes,
        name="simple_legal_processes",
    ),
    path("client/<int:client_id>/legal-process", views.legal_processes, name="legal_processes"),
    path("client/<int:client_id>/profile-image/", views.profile_image, name="profile_image"),
    path("", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
