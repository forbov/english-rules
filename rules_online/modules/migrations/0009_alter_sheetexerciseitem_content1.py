# Generated by Django 5.1.2 on 2024-11-22 22:56

import django_ckeditor_5.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0008_sheetexercise_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sheetexerciseitem',
            name='content1',
            field=django_ckeditor_5.fields.CKEditor5Field(blank=True, null=True, verbose_name='Content 1'),
        ),
    ]
