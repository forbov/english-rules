# Generated by Django 5.1.2 on 2024-11-16 03:03

import django.db.models.deletion
import django_ckeditor_5.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0003_exercisetype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercisetype',
            name='banner',
            field=django_ckeditor_5.fields.CKEditor5Field(blank=True, verbose_name='Banner'),
        ),
        migrations.CreateModel(
            name='Sheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sheet_number', models.PositiveSmallIntegerField()),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sheets', to='modules.module')),
            ],
            options={
                'unique_together': {('module', 'sheet_number')},
            },
        ),
        migrations.CreateModel(
            name='SheetExercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField()),
                ('banner', django_ckeditor_5.fields.CKEditor5Field(blank=True, verbose_name='Banner')),
                ('instructions', models.TextField(blank=True)),
                ('line_items_for_student', models.PositiveSmallIntegerField()),
                ('exercise_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercises', to='modules.exercisetype')),
                ('sheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercises', to='modules.sheet')),
            ],
            options={
                'unique_together': {('sheet', 'order')},
            },
        ),
        migrations.CreateModel(
            name='SheetExerciseItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content1', models.TextField()),
                ('content2', models.TextField(null=True)),
                ('content3', models.TextField(null=True)),
                ('sheet_exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercise_items', to='modules.sheetexercise')),
            ],
        ),
    ]
