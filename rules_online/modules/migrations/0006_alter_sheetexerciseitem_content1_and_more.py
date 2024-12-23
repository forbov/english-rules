# Generated by Django 5.1.2 on 2024-11-17 03:15

import django_ckeditor_5.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0005_sheetexercise_dropdown_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sheetexerciseitem',
            name='content1',
            field=django_ckeditor_5.fields.CKEditor5Field(verbose_name='Content 1'),
        ),
        migrations.AlterField(
            model_name='sheetexerciseitem',
            name='content2',
            field=django_ckeditor_5.fields.CKEditor5Field(blank=True, null=True, verbose_name='Content 2'),
        ),
        migrations.AlterField(
            model_name='sheetexerciseitem',
            name='content3',
            field=django_ckeditor_5.fields.CKEditor5Field(blank=True, null=True, verbose_name='Content 3'),
        ),
    ]
