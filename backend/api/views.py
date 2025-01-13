from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializers, NoteSerializer, UserProfileSerializer #AdminTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .models import Note
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]


# class UserProfile(APIView):
#     permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

#     def get(self, request, *args, **kwargs):
#         user = request.user  # Get the currently authenticated user
#         serializer = UserProfileSerializer(user)  # Serialize only the username
#         return Response(serializer.data)
class UserProfile(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    # GET request to retrieve user profile (username)
    def get(self, request, *args, **kwargs):
        user = request.user  # Get the currently authenticated user
        serializer = UserProfileSerializer(user)  # Serialize only the username
        return Response(serializer.data)

    # PUT request to update the username
    def put(self, request, *args, **kwargs):
        user = request.user  # Get the currently authenticated user
        new_username = request.data.get('username')  # Get the new username from request data

        if new_username:
            # Update the username and save it
            user.username = new_username
            user.save()
            return Response({"username": user.username}, status=status.HTTP_200_OK)
        
        # If no username is provided in the request
        return Response({"detail": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)



    
# class AdminLoginView(TokenObtainPairView):
#     serializer_class = AdminTokenObtainPairSerializer  # Use the custom serializer
#     permission_classes = [IsAdminUser]  # Ensure only admin users can log in



# class AllUsersView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         # Only admins can access this endpoint
#         users = User.objects.all()
#         users_data = [{"id": user.id, "username": user.username} for user in users]
#         return Response({"users": users_data}, status=status.HTTP_200_OK)