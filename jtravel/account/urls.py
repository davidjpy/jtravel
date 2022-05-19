from django.urls import path
from rest_framework import routers
from .views import RegisterViewSet, LoginViewSet, UserViewSet, RefreshViewSet, BlacklistTokenView

# router = routers.DefaultRouter()

# router.register(r'auth/login', LoginViewSet, basename='auth-login')
# router.register(r'auth/register', RegisterViewSet, basename='auth-register')
# router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
# router.register(r'user', UserViewSet, basename='user')


urlpatterns = [
    # path('', include(router.urls)),
    path('auth/login/', LoginViewSet.as_view({'post': 'create'}), name='auth-login'),
    path('auth/register/', RegisterViewSet.as_view({'post': 'create'}), name='auth-register'),
    path('auth/refresh/', RefreshViewSet.as_view({'post': 'create'}), name='auth-refresh'),
    path('auth/logout/', BlacklistTokenView.as_view({'post': 'post'}), name='auth-logout'),
    path('auth/user/', UserViewSet.as_view({'get': 'get_object', 'get': 'get_queryset'}), name='auth-user'),
]