from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from rest_framework import status

class AuthView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = []  # Allow all users

    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'patient')

        if not email or not password:
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(email=email, password=password, role=role)

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
