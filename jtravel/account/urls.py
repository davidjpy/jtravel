from django.urls import path, include
from rest_framework import routers

from .views import RegisterViewSet, LoginViewSet, UserViewSet, RefreshViewSet, BlacklistTokenView

router = routers.DefaultRouter()
router.register(r'auth/user', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginViewSet.as_view({'post': 'create'})),
    path('auth/register/', RegisterViewSet.as_view({'post': 'create'})),
    path('auth/refresh/', RefreshViewSet.as_view({'post': 'create'})),
    path('auth/logout/', BlacklistTokenView.as_view({'post': 'post'})),
]