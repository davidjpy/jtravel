from rest_framework import serializers
from .models import Thread


class ThreadSerializer(serializers.ModelSerializer):

    created = serializers.DateTimeField(format="%d %B, %Y %H:%M:%S")

    class Meta:
        model = Thread
        fields = ('username', 
                  'alt', 
                  'image', 
                  'content', 
                  'created', 
                  'status')
