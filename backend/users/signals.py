from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, Doctor, Patient, Assistant

@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'doctor':
            Doctor.objects.create(user=instance)
        elif instance.role == 'patient':
            Patient.objects.create(user=instance)
        elif instance.role == 'assisstant':
            Assistant.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'role') and instance.role == 'doctor' and hasattr(instance, 'doctor'):
        instance.doctor.save()
    elif hasattr(instance, 'role') and instance.role == 'patient' and hasattr(instance, 'patient'):
        instance.patient.save()
    elif hasattr(instance, 'role') and instance.role == 'assistant' and hasattr(instance, 'assistant'):
        instance.assistant.save()
