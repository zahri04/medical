from rest_framework.views import APIView
import json
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
from .models import CustomUser,Doctor, Patient, Assistant, Appointment
from .serializers import *

# USER MANAGEMENT
class UserListCreateView(APIView):
    permission_classes = []
    authentication_classes = []

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
        # Log the incoming data
            print("Received data:", json.loads(request.body))  # For debugging

        # If using Django serializers
            serializer = CustomUserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                print("Validation errors:", serializer.errors)  # Debugging
                return Response(serializer.errors, status=400)
        except Exception as e:
            print("Error:", e)  # Log the exception
            return Response({"error": str(e)}, status=400)


class UserDetailView(APIView):
    permission_classes = []
    authentication_classes = []
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return None

    def get(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Doctor Management
class DoctorListCreateView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DoctorDetailView(APIView):
    permission_classes = []
    authentication_classes = []
    def get_object(self, pk):
        try:
            return Doctor.objects.get(pk=pk)
        except Doctor.DoesNotExist:
            return None

    def get(self, request, pk):
        doctor = self.get_object(pk)
        if not doctor:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)

    def put(self, request, pk):
        doctor = self.get_object(pk)
        if not doctor:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = DoctorSerializer(doctor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            #khod the doctor instance
            doctor = Doctor.objects.get(pk=pk)
            user = doctor.user  # Get related user
            # 7ayd the doctor record first
            doctor.delete()
            # moraha 7ayed the user account
            user.delete()
            return Response(
                {"message": "Doctor and associated user deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Doctor.DoesNotExist:
            return Response(
                {"error": "Doctor not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# the same shit for Patients, Assistants, and Appointments...

# Patient Manager

class PatientListCreateView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class PatientDetailView(APIView):
    permission_classes = []
    authentication_classes = []
    def get_object(self, pk):
        try:
            return Patient.objects.get(pk=pk)
        except Patient.DoesNotExist:
            return None

    def get(self, request, pk):
        patient = self.get_object(pk)
        if not patient:
            return Response({"error": "patient not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

    def put(self, request, pk):
        patient = self.get_object(pk)
        if not patient:
            return Response({"error": "patient not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            #khod the patient instance
            patient = Patient.objects.get(pk=pk)
            user = patient.user  # Get related user
            # 7ayd the doctor record first
            patient.delete()
            # moraha 7ayed the user account
            user.delete()
            return Response(
                {"message": "Patient and associated user deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Patient.DoesNotExist:
            return Response(
                {"error": "Patient not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# Assistant Manager

class AssistantListCreateView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        assistants = Assistant.objects.all()
        serializer = AssistantSerializer(assistants, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AssistantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssistantDetailView(APIView):
    permission_classes = []
    authentication_classes = []
    def get_object(self, pk):
        try:
            return Assistant.objects.get(pk=pk)
        except Assistant.DoesNotExist:
            return None

    def get(self, request, pk):
        assistant = self.get_object(pk)
        if not assistant:
            return Response({"error": "Assistant not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AssistantSerializer(assistant)
        return Response(serializer.data)

    def put(self, request, pk):
        assistant = self.get_object(pk)
        if not assistant:
            return Response({"error": "Assistant not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AssistantSerializer(assistant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            #khod the assisstant instance
            assisstant = Assistant.objects.get(pk=pk)
            user = assisstant.user  # Get related user
            # 7ayd the assisstant record first
            assisstant.delete()
            # moraha 7ayed the user account
            user.delete()
            return Response(
                {"message": "Assisstant and associated user deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Assistant.DoesNotExist:
            return Response(
                {"error": "Assisstant not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
            
            
# Appointment Manager
class AppointmentListCreateView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
    def post(self, request):
        try:
            app_doctor_id = request.data.get('app_doctor')
            app_patient_id = request.data.get('app_patient')
            # Get Doctor and Patient instances
            doctor = Doctor.objects.get(pk=app_doctor_id)
            patient = Patient.objects.get(pk=app_patient_id)
            # Create appointment using validated doctor and patient
            appointment = Appointment.objects.create(
                app_doctor=doctor,
                app_patient=patient,
                app_date=request.data.get('app_date'),
                app_time=request.data.get('app_time'),
                app_aprv=request.data.get('app_aprv', False),
                app_done=request.data.get('app_done', False),
            )
            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)

        except Patient.DoesNotExist:
            return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
class AppointmentDetailView(APIView):
    permission_classes = []
    authentication_classes = []
    def get_object(self, pk):
        try:
            return Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return None

    def get(self, request, pk):
        appointment = self.get_object(pk)
        if not appointment:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    def put(self, request, pk):
        appointment = self.get_object(pk)
        if not appointment:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        appointment = self.get_object(pk)
        if not appointment:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)