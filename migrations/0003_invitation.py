# Generated by Django 5.1.2 on 2024-11-03 01:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schools', '0002_alter_school_school_status'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('invitation_token', models.CharField(max_length=40)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expires_at', models.DateTimeField()),
                ('status', models.CharField(default='PENDING', max_length=20)),
                ('invited_at', models.DateTimeField(null=True)),
                ('accepted_at', models.DateTimeField(null=True)),
                ('declined_at', models.DateTimeField(null=True)),
                ('declined_reason', models.CharField(max_length=255, null=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=20, null=True)),
                ('gender', models.CharField(max_length=20)),
                ('group_name', models.CharField(max_length=50)),
                ('invited_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invitations_sent', to=settings.AUTH_USER_MODEL)),
                ('school', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invitations', to='schools.school')),
            ],
            options={
                'unique_together': {('email', 'invitation_token')},
            },
        ),
    ]
