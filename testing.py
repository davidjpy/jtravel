from requests import Response
from rest_framework import serializers, views

# serializers.py
class RegisterSerializer(UserSerializer):
    
    password = serializers.CharField(max_length=128, min_length=8, required=True, write_only=True)
    email = serializers.EmailField(max_length=128, required=True, write_only=True)
    username = serializers.CharField(max_length=128, required=True)
    name = serializers.CharField(max_length=128, required=True)

    class Meta:
        model = Account
        fields = [
            'email',
            'username',
            'password',
            'name',
        ]
        extra_kwargs = {'password': {'wirte_only': True}}
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)

        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            
            instance.set_password(password)
            
        instance.save()
        
        return instance

  
# view.py
class RegisterViewSet(views.APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request, format='json'):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            if user:
                json = serializer.data
                
                return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer 
    permission_classes = (IsAuthenticated,)
    
    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Account.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj