from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

from core.models import get_dropdown_type_description, get_module_level_description

# Create your models here.

class Module(models.Model):
  name = models.CharField(max_length=50, null=False, unique=True)
  level = models.CharField(max_length=20, null=False)
  description = CKEditor5Field('Description', config_name='extends', blank=True, null=True)

  def level_description(self):
    return get_module_level_description(self.level)
  
  # Add other fields if needed

class ExerciseType(models.Model):
  name = models.CharField(max_length=50, null=False, unique=True)
  banner = CKEditor5Field('Banner', config_name='extends', blank=True, null=True)
  instructions = models.TextField(blank=True)
  html_pt1 = models.TextField(blank=True)
  html_pt2 = models.TextField(blank=True)
  html_pt3 = models.TextField(blank=True)

  def __str__(self):
    return self.name

class Sheet(models.Model):
  module = models.ForeignKey(Module, related_name='sheets', on_delete=models.CASCADE, null=False)
  sheet_number = models.PositiveSmallIntegerField(null=False)
  name = models.CharField(max_length=50, null=False)
  description = models.TextField(blank=True)

  class Meta:
    unique_together = ['module', 'sheet_number']
    
  def __str__(self):
    return f'{self.module.name} - Sheet {self.sheet_number}'
  
class SheetExercise(models.Model):
  sheet = models.ForeignKey(Sheet, related_name='exercises', on_delete=models.CASCADE, null=False)
  order = models.PositiveSmallIntegerField(null=False)
  exercise_type = models.ForeignKey(ExerciseType, related_name='exercises', on_delete=models.CASCADE, null=False)
  banner = CKEditor5Field('Banner', config_name='extends', blank=True, null=True)
  instructions = models.TextField(blank=True)
  dropdown_type = models.CharField(max_length=20, null=True)
  line_items_for_student = models.PositiveSmallIntegerField(null=False)

  class Meta:
    unique_together = ['sheet', 'order']

  def __str__(self):
    return f'{self.sheet} - {self.exercise_type.name}'
  
  def dropdown_type_description(self):
    return get_dropdown_type_description(self.dropdown_type)
  
class SheetExerciseItem(models.Model):
  sheet_exercise = models.ForeignKey(SheetExercise, related_name='exercise_items', on_delete=models.CASCADE, null=False)
  content1 = CKEditor5Field('Content 1', config_name='extends', blank=False, null=False)
  content2 = CKEditor5Field('Content 2', config_name='extends', blank=True, null=True)
  content3 = CKEditor5Field('Content 3', config_name='extends', blank=True, null=True)
  answer1 = models.CharField(max_length=50, null=False)
  answer2 = models.CharField(max_length=50, null=True)

  def __str__(self):
    return f'{self.sheet_exercise} - {self.content1}'