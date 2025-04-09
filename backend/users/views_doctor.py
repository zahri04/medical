import datetime
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Doctor, Appointment, Patient
from .serializers import PatientSerializer, AppointmentSerializer

class DoctorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, action=None, pk=None):
        """
        Handles retrieving data:
        - `accepted-times/<doctor_id>/<date>/` → Returns accepted appointment times for a doctor on a given date.
        - `free-times/<doctor_id>/<date>/` → Returns available appointment slots.
        - `patient-info/<patient_id>/` → Returns patient details.
        - `app-details/<app_id>/` → Returns appointment details.
        - `diag-details/<patient_id>/` → Returns diagnosis details for a patient.
        """
        if action == "accepted-times" and pk:
            doctor_id = pk
            date = request.query_params.get("date")
            return self.get_accepted_times(doctor_id, date)

        elif action == "free-times" and pk:
            doctor_id = pk
            date = request.query_params.get("date")
            return self.get_free_times(doctor_id, date)

        elif action == "patient-info" and pk:
            return self.get_patient_info(pk)

        elif action == "app-details" and pk:
            return self.get_app_details(pk)

        elif action == "diag-details" and pk:
            return self.get_diag_details(pk)

        return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, action=None, pk=None):
        """
        Handles accepting or rejecting appointments:
        - `accept-appointment/<appointment_id>/` → Accepts an appointment.
        - `reject-appointment/<appointment_id>/` → Rejects an appointment.
        """
        if action == "accept-appointment" and pk:
            return self.accept_appointment(pk)

        elif action == "reject-appointment" and pk:
            return self.reject_appointment(pk)

        return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    def accept_appointment(self, appointment_id):
        appointment = get_object_or_404(Appointment, pk=appointment_id)
        appointment.status = 'Accepted'
        appointment.save()
        return Response({'message': 'Appointment accepted'}, status=status.HTTP_200_OK)

    def reject_appointment(self, appointment_id):
        appointment = get_object_or_404(Appointment, pk=appointment_id)
        appointment.status = 'Rejected'
        appointment.save()
        return Response({'message': 'Appointment rejected'}, status=status.HTTP_200_OK)

    def get_accepted_times(self, doctor_id, date):
        doctor = get_object_or_404(Doctor, pk=doctor_id)
        appointments = Appointment.objects.filter(doctor=doctor, appointment_date=date, status='Accepted')
        available_times = [appointment.appointment_time for appointment in appointments]
        return Response({"accepted_times": available_times}, status=status.HTTP_200_OK)

    def get_free_times(self, doctor_id, date):
        doctor = get_object_or_404(Doctor, pk=doctor_id)
        appointments = Appointment.objects.filter(doctor=doctor, appointment_date=date)
        booked_times = [appointment.appointment_time for appointment in appointments]
        all_times = [(datetime.time(hour), datetime.time(hour+1)) for hour in range(0, 24)]
        free_times = [time for time in all_times if time not in booked_times]
        return Response({"free_times": free_times}, status=status.HTTP_200_OK)

    def get_patient_info(self, patient_id):
        patient = get_object_or_404(Patient, user_id=patient_id)
        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_app_details(self, app_id):
        appointment = get_object_or_404(Appointment, pk=app_id)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_diag_details(self, patient_id):
        patient = get_object_or_404(Patient, user_id=patient_id)
        diagnoses = patient.diagnosis_set.all()
        serializer = PatientSerializer(diagnoses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
