from django.db import models
from modules.models import Module, Sheet, SheetExercise, SheetExerciseItem
from schools.models import SchoolStudent, SchoolTeacher

# Create your models here.
class Subscription(models.Model):
  school_student = models.ForeignKey(SchoolStudent, related_name='subscriptions', on_delete=models.CASCADE)
  module = models.ForeignKey(Module, related_name='subscriptions', on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True, null=False)

  class Meta:
    unique_together = ['school_student', 'module']

  def __str__(self):
    return f'{self.school_student.student.user.full_name()} - {self.module.name}'
  
class SubscriptionSheet(models.Model):
  subscription = models.ForeignKey(Subscription, related_name='subscription_sheets', on_delete=models.CASCADE)
  sheet = models.ForeignKey(Sheet, related_name='subscription_sheets', on_delete=models.CASCADE)
  start_datetime = models.DateTimeField(null=False)
  end_datetime = models.DateTimeField(null=True)
  completed = models.BooleanField(default=False)
  score = models.IntegerField(null=True)

  class Meta:
    unique_together = ['subscription', 'sheet']

  def __str__(self):
    return f'{self.subscription} - {self.sheet}'
  
class SubscriptionExercise(models.Model):
  subscription_sheet = models.ForeignKey(SubscriptionSheet, related_name='sheets', on_delete=models.CASCADE)
  exercise = models.ForeignKey(SheetExercise, related_name='exercises', on_delete=models.CASCADE)
  start_datetime = models.DateTimeField(auto_now_add=True, null=False)
  end_datetime = models.DateTimeField(null=True)
  completed = models.BooleanField(default=False)
  score = models.IntegerField(null=True)

  class Meta:
    unique_together = ['subscription_sheet', 'exercise']

  def __str__(self):
    return f'{self.subscription_sheet} - {self.exercise}'

class SubscriptionExerciseItem(models.Model):
  subscription_exercise = models.ForeignKey(SubscriptionExercise, related_name='exercises', on_delete=models.CASCADE)
  exercise_item = models.ForeignKey(SheetExerciseItem, related_name='exercise_items', on_delete=models.CASCADE)
  student_answer1 = models.CharField(max_length=255, null=False)
  answer1_correct = models.BooleanField(default=False)
  student_answer2 = models.CharField(max_length=255, null=True)
  answer2_correct = models.BooleanField(default=False)
  completed_datetime = models.DateTimeField(null=True)

  class Meta:
    unique_together = ['subscription_exercise', 'exercise_item']

  def __str__(self):
    return f'{self.subscription_exercise} - {self.exercise_item}'
