from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
from .views_admin import *
from .views_doctor import *
urlpatterns = [
    # admin Endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', user_profile_view),
    path('users/list/', UserListCreateView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('doctors/list/', DoctorListCreateView.as_view(), name='doctor-list'),
    path('doctors/<int:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('appointments/list/', AppointmentListCreateView.as_view(), name='appointment-list'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('patients/list/', PatientListCreateView.as_view(), name='patient-list'),
    path('patients/<int:pk>/', PatientDetailView.as_view(), name='patient-detail'),
    path('assistants/list/', AssistantListCreateView.as_view(), name='assistant-list'),
    path('assistants/<int:pk>/', AssistantDetailView.as_view(), name='assistant-detail'),
    # Authentication Endpoints
    path('auth/google/',GoogleOAuthLogin.as_view(), name='google_login'),
    path('auth/', include('dj_rest_auth.urls')),  # Login/logout
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/register', AuthView.as_view(), name='register'),

    # Doctor Endpoints
    path('doctor/accept_appointment/<int:appointment_id>/', DoctorView.as_view(), name='accept_appointment'),
    path('doctor/reject_appointment/<int:appointment_id>/', DoctorView.as_view(), name='reject_appointment'),
    path('doctors/grouped/', doctors_grouped_by_speciality, name='doctors-grouped'),
    path('doctor/patient/<int:patient_id>/', DoctorView.as_view(), name='patient_info'),
    path('doctor/appointment/<int:appointment_id>/', DoctorView.as_view(), name='app_details'),
    path('doctor/<str:action>/',DoctorView.as_view(), name='doctor-action'),

    # Patient Endpoints
    path('patient/<str:action>/', PatientView.as_view(), name='patient-action'),

    # Assistant Endpoints
    path('assistant/<str:action>/', AssistantView.as_view(), name='assistant-action'),
    
    
]
