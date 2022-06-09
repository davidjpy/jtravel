from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import ThreadSerializer
from .models import Thread

class ThreadView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ThreadSerializer
    
    def get_queryset(self):
        username = self.request.user.id
        return Thread.objects.filter(username=username)
    
class ThreadViewSets(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()

@api_view(('POST',))
def add_favourite(request, id):
    thread = get_object_or_404(Thread, id=id)
    
    if thread.liked.filter(id=request.user.id).exists():
        thread.liked.remove(request.user.id)
        
    else:
        thread.liked.add(request.user.id)
        
    return Response(status=status.HTTP_200_OK)