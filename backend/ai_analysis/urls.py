# ai_analysis/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_alzheimer, name='predict_alzheimer'),
]
