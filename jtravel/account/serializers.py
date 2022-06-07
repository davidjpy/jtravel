from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login

from .models import Account

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Account
        fields = (
            'id',
            'email',
            'username',
            'name',
            'profile_image',
            'about',
            'liked_thread',
            'saved_thread',
            'start_date',
            'is_active',
            'last_login'
        )
        read_only_field = ('start_date',)
        
    def update(self, instance, validated_data):
        instance = super(UserSerializer, self).update(instance, validated_data)
        instance.is_active = True
        instance.save()
        
        return instance

# Register Serializer
class RegisterSerializer(UserSerializer):
    
    password = serializers.CharField(max_length=128, min_length=8, required=True, write_only=True)
    email = serializers.EmailField(max_length=128, required=True, write_only=True)
    username = serializers.CharField(max_length=128, required=True)
    name = serializers.CharField(max_length=128, required=True)

    class Meta:
        model = Account
        fields = (
            'email',
            'username',
            'password',
            'name',
        )
        extra_kwargs = {'password': {'wirte_only': True}}
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            instance.set_password(password)
            
        instance.save()
        
        return instance

# Login Serializer
class LoginSerialier(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
