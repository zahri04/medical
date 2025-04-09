from django.db import models
from django.utils import timezone # type: ignore
from django.utils.timezone import now # type: ignore
from django.contrib.auth.models import AbstractUser, BaseUserManager # type: ignore

class Users_Manager(BaseUserManager):
    """Custom user manager for handling user creation."""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)

        # Optional: fallback for username if not supplied
        username = extra_fields.get("username") or extra_fields.get("name", "")
        
        # Set the default role to 'patient' if not provided in extra_fields
        role = extra_fields.pop('role', 'patient')  # Pop role out so it's not passed twice

        user = self.model(
            email=email,
            username=username,
            role=role,  # Only set role here
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """Creates and returns a superuser with admin privileges."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    """Custom user model that extends Django's AbstractUser."""
    
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
        ('assistant', 'Assistant'),
    )
    role = models.CharField(max_length=10, default='patient', choices=ROLE_CHOICES)
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=40, null=True, blank=True)
    image = models.ImageField(upload_to="images",null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = Users_Manager()

    def is_doctor(self):
        """Checks if the user is a doctor."""
        return self.role.lower() == 'doctor'

    def is_patient(self):
        """Checks if the user is a patient."""
        return self.role.lower() == 'patient'

    def is_assistant(self):
        """Checks if the user is an assistant."""
        return self.role.lower() == 'assistant'

    def is_admin(self):
        """Checks if the user is an admin."""
        return self.role.lower() == 'admin'

class Doctor(models.Model):
    """Model representing a doctor with specialization and credentials."""
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    specialization = models.CharField(max_length=255)
    license_number = models.CharField(max_length=50, unique=True)
    hospital_name = models.CharField(max_length=255)
    certificate = models.FileField(upload_to='doctors/certificates/',blank=True,null=True)
    experience = models.IntegerField(default=0,blank=True,null=True)

    def __str__(self):
        """Returns a string representation of the doctor."""
        return f"Dr. {self.user.first_name} {self.user.last_name}"

class Patient(models.Model):
    """Model representing a patient with medical history."""
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    medical_history = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True, default="2000-01-01")
    insurance_number = models.CharField(max_length=50, unique=True, blank=True, null=True)

    def __str__(self):
        """Returns a string representation of the patient."""
        return f"{self.user.first_name} {self.user.last_name}"

class Assistant(models.Model):
    """Model representing a medical assistant."""
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True,)
    hospital_name = models.CharField(max_length=255)
    experience = models.IntegerField(default=0, null=True,blank=True)
    certificate = models.FileField(upload_to='assistants/certificates/',blank=True,null=True)
    def __str__(self):
        """Returns a string representation of the assistant."""
        return f"{self.user.first_name} {self.user.last_name}"

class Appointment(models.Model):
    """Model representing a doctor's appointment."""
    
    app_doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    app_patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    app_date = models.DateField(default=timezone.localdate)
    app_time = models.TimeField(default=now)
    app_aprv = models.BooleanField(default=False)
    app_done = models.BooleanField(default=False)
    @property
    def doctor_name(self):
        return self.app_doctor.user.first_name + ' ' + self.app_doctor.user.last_name

    @property
    def patient_name(self):
        return self.app_patient.user.first_name + ' ' + self.app_patient.user.last_name

    def __str__(self):
        """Returns a string representation of the appointment."""
        return f"Appointment for {self.app_patient.user.first_name} {self.app_patient.user.last_name} with {self.app_doctor.user.first_name} {self.app_doctor.user.last_name} on {self.app_date} / {self.app_time}"

class Report(models.Model):
    """Model representing a medical report."""
    
    SEX_TYPES = (
        ("Male", "Male"),
        ("Female", "Female"),
    )
    SOCIAL_STATUS = (
        ("Single", "Single"),
        ("Married", "Married"),
        ('Divorced', 'Divorced'),
        ('Widowed', 'Widowed'),
    )
    BLOOD_CATEGORY = (
        ("A-", "A-"),
        ("A+", "A+"),
        ("B-", "B-"),
        ("B+", "B+"),
        ("AB-", "AB-"),
        ("AB+", "AB+"),
        ("O-", "O-"),
        ("O+", "O+"),
    )

    report_id = models.AutoField(primary_key=True)
    report = models.CharField(max_length=250, default="")
    report_doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='reports')
    report_patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='reports')
    report_assistant = models.ForeignKey(Assistant, on_delete=models.CASCADE, related_name='reports')
    sex = models.CharField(max_length=20, choices=SEX_TYPES)
    marital = models.CharField(max_length=20, choices=SOCIAL_STATUS)
    blood = models.CharField(max_length=10, choices=BLOOD_CATEGORY)
    date = models.DateField(default=timezone.now)
    report_screenshot = models.ImageField(upload_to='reports/screenshots/', null=True)

    def __str__(self):
        """Returns a string representation of the medical report."""
        return f"Report {self.report_id} of the patient {self.report_patient.user.first_name} {self.report_patient.user.last_name} with the Dr {self.report_doctor.user.first_name} {self.report_doctor.user.last_name} "


class Diagnostic(models.Model):
    """Model representing a diagnostic report."""
    DIAG_TYPES = (
        ("Alzheimer","Alzheimer"),
        ("Covid","Covid"),
        ("Tubes","Tubes"),
        ("Dementia","Dementia"),
        ("Epilepsy","Epilepsy"),
        ("Hepatitis","Hepatitis"),
        ("Hypertension","Hypertension"),
        ("Kidney disease","Kidney disease"),
    )
    diagnostic_id = models.AutoField(primary_key=True)
    diagnostic_name = models.CharField(max_length=250, default="")
    diagnostic_doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='diagnostics')
    diagnostic_patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='diagnostics')
    diagnostic_assistant = models.ForeignKey(Assistant, on_delete=models.CASCADE, related_name='diagnostics')
    diag_date = models.DateField(default=timezone.now)
    diag_time = models.TimeField(default=now)
    diagnostic_screenshot = models.ImageField(upload_to='diagnostics/screenshots/', null=True)
    diag_type = models.CharField(max_length=100, choices=DIAG_TYPES)
    
    def __str__(self):
        """Returns a string representation of the diagnostic report."""
        return f"Diagnostic report {self.diagnostic_id} {self.diagnostic_name} / {self.diag_type} of the patient {self.diagnostic_patient.user.first_name} {self.diagnostic_patient.user.last_name} with the Dr {self.diagnostic_doctor.user.first_name} {self.diagnostic_doctor.user.last_name} "
    
    
class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"
