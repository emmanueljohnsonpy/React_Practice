from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser, AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

# Serializer to update user details (only username)
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']  # Only username field is included, not email

# Admin Login View
class AdminLoginView(APIView):
    permission_classes = [AllowAny]  # No authentication required for login

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"detail": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(username=username, password=password)
        if user and user.is_staff:  # Only allow admin users
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"detail": "Invalid credentials or not an admin."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
class AdminUserListView(APIView):
    permission_classes = [IsAdminUser]  # Only allow admin users

    def get(self, request, *args, **kwargs):
        search_term = request.query_params.get('search', '')  # Get search term from query parameters

        # Filter users based on search query (searching by username or email)
        users = User.objects.filter(
            is_staff=False,
            username__icontains=search_term  # Search in the username field
        ) | User.objects.filter(
            is_staff=False,
            email__icontains=search_term  # Search in the email field
        )

        # Return filtered users with id, username, and email
        return Response(users.values('id', 'username', 'email'))
    
    
class AdminUserUpdateView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # Print user data to debug
        print(f"Updating user: {user.username}")

        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Debugging errors if serializer is invalid
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Admin User Delete View
class AdminUserDeleteView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response({"detail": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
