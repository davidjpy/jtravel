from rest_framework import serializers
from .models import Thread

class ThreadSerializer(serializers.ModelSerializer):
    
    profile_image = serializers.SerializerMethodField('get_profile_image')
    created = serializers.DateTimeField(format="%d %B, %Y %H:%M:%S")
    
    class Meta:
        model = Thread
        fields = (
                  'id',
                  'username',
                  'profile_image',
                  'alt', 
                  'image', 
                  'content', 
                  'created', 
                  'status')
        
    def get_profile_image(self, thread):
        profile_image_url = thread.username.profile_image.url
        return profile_image_url