from django import views
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import ThreadSerializer
from .models import Thread

class ThreadView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ThreadSerializer
    
    def get_queryset(self):

        username = self.request.user.username
        return Thread.objects.filter(username=username)
    
class ThreadViewSets(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
