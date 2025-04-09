from django.contrib import admin
from .models import *

admin.site.register(CustomUser)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Assistant)
admin.site.register(Diagnostic)
admin.site.register(Appointment)
# Register your models here.
