from datetime import datetime
from django.db import models
from modules.models import Module, Sheet, SheetExercise, SheetExerciseItem
from schools.models import SchoolStudent, SchoolTeacher

# Create your models here.
class Subscription(models.Model):
  school_student = models.ForeignKey(SchoolStudent, related_name='subscriptions', on_delete=models.CASCADE)
  module = models.ForeignKey(Module, related_name='subscriptions', on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True, null=False)
  started_at = models.DateTimeField(null=True)

  class Meta:
    unique_together = ['school_student', 'module']

  def __str__(self):
    return f'{self.school_student.student.user.full_name()} - {self.module.name}'
  
  def start(self):
    for sheet in self.module.sheets.all():
      subscription_sheet = SubscriptionSheet.objects.create(subscription=self,
                                                            sheet=sheet)
      
      for exercise in sheet.exercises.all():
        subscription_exercise = SubscriptionExercise.objects.create(subscription_sheet=subscription_sheet,
                                                                    exercise=exercise)
        
        sql = f"""select exi.*
                    from modules_sheetexerciseitem exi
                   where exi.sheet_exercise_id = {exercise.id}
                   order by random()
                   limit {exercise.line_items_for_student}"""
        
        items = SubscriptionExerciseItem.objects.raw(sql)
        
        for item in SheetExerciseItem.objects.raw(sql):
          SubscriptionExerciseItem.objects.create(subscription_exercise=subscription_exercise,
                                                  exercise_item=item)
 
    self.started_at = datetime.now()
    self.save()

  def started(self):
    return self.started_at is not None
  
class SubscriptionSheet(models.Model):
  subscription = models.ForeignKey(Subscription, related_name='sheets', on_delete=models.CASCADE)
  sheet = models.ForeignKey(Sheet, related_name='subscription_sheets', on_delete=models.CASCADE)
  start_at = models.DateTimeField(null=True)
  end_at = models.DateTimeField(null=True)
  score = models.IntegerField(null=True)

  class Meta:
    unique_together = ['subscription', 'sheet']

  def __str__(self):
    return f'{self.subscription} - {self.sheet}'
  
  def completed(self):
    return self.end_at is not None
  
class SubscriptionExercise(models.Model):
  subscription_sheet = models.ForeignKey(SubscriptionSheet, related_name='exercises', on_delete=models.CASCADE)
  exercise = models.ForeignKey(SheetExercise, related_name='subscription_exercises', on_delete=models.CASCADE)
  start_at = models.DateTimeField(null=True)
  end_at = models.DateTimeField(null=True)
  score = models.IntegerField(null=True)

  class Meta:
    unique_together = ['subscription_sheet', 'exercise']

  def __str__(self):
    return f'{self.subscription_sheet} - {self.exercise}'
  
  def completed(self):
    return self.end_at is not None
  
  def next_exercise(self):
    sql = f"""select sse1.*
                from subscriptions_subscriptionexercise sse0
               inner join modules_sheetexercise mse0
                  on mse0.id = sse0.exercise_id
               inner join modules_sheetexercise mse1
                  on mse1.sheet_id = mse0.sheet_id
                 and mse1."order" > mse0."order"
               inner join subscriptions_subscriptionexercise sse1
                  on sse1.subscription_sheet_id = sse0.subscription_sheet_id
                 and sse1.exercise_id = mse1.id
               where sse0.id = {self.id}
               order by mse1."order" 
               limit 1"""
    
    next_exercises = SubscriptionExercise.objects.raw(sql)
    for exercise in next_exercises:
      return exercise

    return None
  
  def previous_exercise(self):
    sql = f"""select sse1.*
                from subscriptions_subscriptionexercise sse0
               inner join modules_sheetexercise mse0
                  on mse0.id = sse0.exercise_id
               inner join modules_sheetexercise mse1
                  on mse1.sheet_id = mse0.sheet_id
                 and mse1."order" < mse0."order"
               inner join subscriptions_subscriptionexercise sse1
                  on sse1.subscription_sheet_id = sse0.subscription_sheet_id
                 and sse1.exercise_id = mse1.id
               where sse0.id = {self.id}
               order by mse1."order"
               limit 1"""
    
    previous_exercises = SubscriptionExercise.objects.raw(sql)
    for exercise in previous_exercises:
      return exercise

    return None

class SubscriptionExerciseItem(models.Model):
  subscription_exercise = models.ForeignKey(SubscriptionExercise, related_name='items', on_delete=models.CASCADE)
  exercise_item = models.ForeignKey(SheetExerciseItem, related_name='subscribed_items', on_delete=models.CASCADE)
  student_answer1 = models.CharField(max_length=255, null=True)
  answer1_correct = models.BooleanField(default=False)
  student_answer2 = models.CharField(max_length=255, null=True)
  answer2_correct = models.BooleanField(default=False)
  completed_at = models.DateTimeField(null=True)

  class Meta:
    unique_together = ['subscription_exercise', 'exercise_item']

  def __str__(self):
    return f'{self.subscription_exercise} - {self.exercise_item}'
  
  def completed(self):
    return self.completed_at is not None
