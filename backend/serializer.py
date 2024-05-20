from rest_framework import serializers
from .models import *


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['firstname', 'lastname', 'email', 'password', 'rollno','courses']


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'