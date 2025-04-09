from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import Group
from .models import Patient, Appointment, Doctor, CustomUser, Message
from .serializers import PatientSerializer, AppointmentSerializer, DoctorSerializer, MessageSerializer

class AssistantView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, action=None):
        if action == "patients":
            patients = Patient.objects.all()
            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if action == "appointments":
            appointments = Appointment.objects.all().order_by('app_date')
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if action == "doctors":
            doctors = Doctor.objects.all()
            serializer = DoctorSerializer(doctors, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, action=None):

        if action == "send-message":
            sender = request.user
            receiver_id = request.data.get("receiver_id")
            content = request.data.get("content")

            if not receiver_id or not content:
                return Response({"error": "Receiver and content are required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                receiver = CustomUser.objects.get(id=receiver_id)
                message = Message.objects.create(sender=sender, receiver=receiver, content=content)
                return Response(MessageSerializer(message).data, status=status.HTTP_201_CREATED)
            except CustomUser.DoesNotExist:
                return Response({"error": "Receiver not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)