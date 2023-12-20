from django.urls import include, path
from core import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'client', views.ClientViewSets)

urlpatterns = [
  path("whoami", views.whoami, name="whoami"),
  path("", include(router.urls)),
]
