from django.contrib import admin
from .models import *

# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display = ['firstname', 'lastname', 'email','rollno']

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['student', 'date','course']

admin.site.register(Student, StudentAdmin)
admin.site.register(Attendance, AttendanceAdmin)