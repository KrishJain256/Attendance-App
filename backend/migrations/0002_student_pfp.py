# Generated by Django 5.0.6 on 2024-05-18 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='pfp',
            field=models.TextField(default='<no-pfp>'),
        ),
    ]