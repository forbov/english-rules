# Generated by Django 5.1.2 on 2024-11-27 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0006_rename_end_datetime_subscriptionexercise_end_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptionexercise',
            name='start_at',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='subscriptionexerciseitem',
            name='student_answer1',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='subscriptionsheet',
            name='start_at',
            field=models.DateTimeField(null=True),
        ),
    ]
