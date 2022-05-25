from django.urls import include, path
from rest_framework import routers
from .views import ThreadView, ThreadViewSets

router = routers.DefaultRouter()
router.register(r"public/thread", ThreadViewSets, basename='thread')

urlpatterns = [
    path("", include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('thread/', ThreadView.as_view())
]
