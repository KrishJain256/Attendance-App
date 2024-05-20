from django.db import models

# Create your models here.
class Student(models.Model):
    firstname = models.CharField(max_length=100, default="no-name>")
    lastname = models.CharField(max_length=100, default="<no-name>")
    password = models.CharField(max_length=255, default="<no-passwd>")
    email = models.EmailField(max_length=254, default="<no-email>")
    rollno = models.IntegerField(default=000000)
    pfp = models.TextField(default="<no-pfp>")
    courses = models.JSONField(default=dict({"no-courses":1}))


class Attendance(models.Model):
    student = models.IntegerField(default=000000)
    date = models.DateField()
    course = models.CharField(max_length=10, default="<no-courses>")