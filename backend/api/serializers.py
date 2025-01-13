from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} 


# class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
        
#         # Retrieve the user after validation
#         user = self.user
        
#         # Check if the user is an admin (staff)
#         if not user.is_staff:
#             raise exceptions.AuthenticationFailed("You must be an admin to log in.")
        
#         # Optionally, you can add any additional custom data to the response here.
#         data['username'] = user.username
#         return data
    

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]  # Only include the username field