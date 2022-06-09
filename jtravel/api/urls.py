from django.urls import include, path
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt

from .views import ThreadView, ThreadViewSets, add_favourite

router = routers.DefaultRouter()
router.register(r'public/thread', ThreadViewSets, basename='thread')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('public/favourites/<int:id>/', csrf_exempt(add_favourite), name='add_favourite'),
    path('thread/', ThreadView.as_view())
]
