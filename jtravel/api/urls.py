from django.urls import include, path
from rest_framework import routers
from .views import ThreadView

router = routers.DefaultRouter()
router.register(r"thread", ThreadView, basename='thread')

urlpatterns = [
    path("", include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
