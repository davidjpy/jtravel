from django.urls import include, path
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt

from .views import ThreadViewSets, ProfileThreadView, ProfileFavouriteView, ProfileBookmarkView, add_favourite, add_bookmark

router = routers.DefaultRouter()
router.register(r'public/thread', ThreadViewSets, basename='thread')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('public/favourite/<int:id>/', csrf_exempt(add_favourite), name='add_favourite'),
    path('public/bookmark/<int:id>/', csrf_exempt(add_bookmark), name='add_bookmark'),
    path('thread/', ProfileThreadView.as_view()),
    path('favourite/', ProfileFavouriteView.as_view()),
    path('bookmark/', ProfileBookmarkView.as_view())
]
