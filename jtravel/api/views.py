from rest_framework import viewsets, permissions
from .serializers import ThreadSerializer
from .models import Thread

class ThreadView(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ThreadSerializer
