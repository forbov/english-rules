# Generated by Django 5.1.2 on 2024-10-31 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SystemCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('domain', models.CharField(max_length=20)),
                ('code', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=255)),
                ('integer_value', models.IntegerField(null=True)),
                ('alt_description', models.CharField(max_length=255, null=True)),
            ],
            options={
                'unique_together': {('domain', 'code')},
            },
        ),
    ]
