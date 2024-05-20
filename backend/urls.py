from django.urls import path
from . import views

urlpatterns = [
    path('', views.StudentView.as_view()),
    path('attendance/', views.AttendanceView.as_view()),
    path('mark', views.MarkView.as_view()),
]