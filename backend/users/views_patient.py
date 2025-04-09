from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *

class PatientView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,action=None):
        if action == "appointments":
            appointments = Appointment.objects.all().order_by('app_date')  # Use correct field name
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif action == "doctors":
            doctors = Doctor.objects.all()
            serializer = DoctorSerializer(doctors, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif action == "profile":
            patient = get_object_or_404(Patient, user=request.user)  # Automatically raises 404
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request,action=None):
        if action == "profile":
            patient = get_object_or_404(Patient, user=request.user)
            serializer = PatientSerializer(patient, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
    def post(self, request,action=None):
        if action == "send-message":
            receiver_identifier = request.data.get("receiver")  # Can be email or username
            content = request.data.get("content")

            if not receiver_identifier or not content:
                return Response({"error": "Receiver and message content are required"}, status=status.HTTP_400_BAD_REQUEST)

            # Find the doctor by email or username
            receiver = CustomUser.objects.filter(
                models.Q(email=receiver_identifier) | models.Q(username=receiver_identifier),
                role="doctor"
            ).first()

            if not receiver:
                return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

            # Create and save the message
            message = Message.objects.create(sender=request.user, receiver=receiver, content=content)
            serializer = MessageSerializer(message)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
