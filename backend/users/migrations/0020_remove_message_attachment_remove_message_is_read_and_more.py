# Generated by Django 4.2.20 on 2025-04-10 20:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_remove_doctor_patients_patient_doctor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='attachment',
        ),
        migrations.RemoveField(
            model_name='message',
            name='is_read',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='doctor',
        ),
        migrations.DeleteModel(
            name='DoctorSchedule',
        ),
    ]
