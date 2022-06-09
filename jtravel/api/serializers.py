from rest_framework import serializers

from .models import Thread
from account.models import Account

class ThreadSerializer(serializers.ModelSerializer):
    
    profile_image = serializers.SerializerMethodField('get_profile_image')
    username_display = serializers.SerializerMethodField('get_username')
    liked = serializers.SlugRelatedField(queryset=Account.objects.all(), many=True, slug_field='username') 
    created = serializers.DateTimeField(format='%d %B, %Y %H:%M:%S')
    
    class Meta:
        model = Thread
        fields = (
                  'id',
                  'username',
                  'username_display',
                  'profile_image',
                  'alt', 
                  'image', 
                  'content', 
                  'liked',
                  'created', 
                  'status')
        
    def get_profile_image(self, thread):
        profile_image_url = thread.username.profile_image.url
        return profile_image_url
    
    def get_username(self, thread):
        return thread.username.username