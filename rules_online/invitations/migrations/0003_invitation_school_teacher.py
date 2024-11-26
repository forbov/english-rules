# Generated by Django 5.1.2 on 2024-11-26 04:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invitations', '0002_invitation_school_grade'),
        ('schools', '0008_schoolstudent_school_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='school_teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invited_students', to='schools.schoolteacher'),
        ),
    ]