from django.shortcuts import render
from django.views.generic import detail
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *


# Create your views here.
class StudentView(APIView):
    serializer_class = StudentSerializer

    def get(self, request):
        detail = [{"firstname": detail.firstname, "lastname": detail.lastname, "password": detail.password, "email":detail.email, "rollno":detail.rollno,"course":detail.courses}
                  for detail in Student.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class AttendanceView(APIView):
    serializer_class = AttendanceSerializer

    def get(self, request):
        detail = [{"student": detail.student, "date": detail.date, "course": detail.course} for detail in Attendance.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class MarkView(APIView):
    serializer_class = MarkSerializer
    def get(self, request):
        detail = [{"firstname": detail.firstname, "lastname": detail.lastname, "password": detail.password, "email":detail.email, "rollno":detail.rollno,"course":detail.courses,"pfp":detail.pfp} for detail in Student.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = MarkSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
