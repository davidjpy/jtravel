from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
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
            'start_date',
            'is_active',
        )
        read_only_field = ('start_date',)

# Register Serializer
class RegisterSerializer(UserSerializer):
    
    password = serializers.CharField(max_length=128, min_length=8, required=True, write_only=True)
    email = serializers.EmailField(max_length=128, required=True, write_only=True)
    username = serializers.CharField(max_length=128, required=True)
    name = serializers.CharField(max_length=128, required=True)

    class Meta:
        model = Account
        fields = [
            'id',
            'email',
            'username',
            'password',
            'name',
            'start_date',
            'is_active',
        ]

    def create(self, validated_data):
        try:
            user = Account.objects.get(email=validated_data['email'])
            
        except ObjectDoesNotExist:
            user = Account.objects.create_user(**validated_data)
            
        return user

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
