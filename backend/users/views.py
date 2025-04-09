from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Doctor, Patient, Assistant
from .serializers import DoctorSerializer, PatientSerializer, AssistantSerializer, CustomUserSerializer

from .views_doctor import DoctorView
from .views_patient import PatientView
from .views_assistant import AssistantView
from .views_auth import AuthView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from collections import defaultdict
class GoogleOAuthLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter  # Handles Google OAuth  # Serializes the OAuth token



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    user = request.user
    role = user.role

    # Default base user data
    base_data = CustomUserSerializer(user).data

    # Extend based on role
    if role == 'doctor':
        try:
            doctor = Doctor.objects.get(user=user)
            serialized = DoctorSerializer(doctor).data
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor profile not found"}, status=status.HTTP_404_NOT_FOUND)

    elif role == 'patient':
        try:
            patient = Patient.objects.get(user=user)
            serialized = PatientSerializer(patient).data
        except Patient.DoesNotExist:
            return Response({"error": "Patient profile not found"}, status=status.HTTP_404_NOT_FOUND)

    elif role == 'assistant':
        try:
            assistant = Assistant.objects.get(user=user)
            serialized = AssistantSerializer(assistant).data
        except Assistant.DoesNotExist:
            return Response({"error": "Assistant profile not found"}, status=status.HTTP_404_NOT_FOUND)

    else:  # admin or unknown roles
        serialized = base_data

    # Combine base data and extended data
    profile_data = {**base_data, **serialized}
    return Response(profile_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def doctors_grouped_by_speciality(request):
    doctors = Doctor.objects.select_related('user').all()
    grouped = defaultdict(list)

    for doc in doctors:
        serializer = DoctorSerializer(doc)
        grouped[doc.specialization].append(serializer.data)

    return Response(grouped)


@login_required
def doctor_dashboard(request):
    return render(request, 'templates/users/doc_dash.html')

@login_required
def patient_dashboard(request):
    return render(request, 'templates/users/pat_dash.html')

@login_required
def assistant_dashboard(request):
    return render(request, 'templates/users/ass_dash.html')