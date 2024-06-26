# Generated by Django 5.0.6 on 2024-05-19 20:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_student_courses'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('course', models.CharField(default='<no-courses>', max_length=10)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='backend.student')),
            ],
        ),
    ]
