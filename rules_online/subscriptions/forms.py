from datetime import datetime
from django.forms import CharField, ChoiceField, Form, HiddenInput, ModelForm, Select, ValidationError, inlineformset_factory
from core.models import get_choices_by_domain_with_blank
from subscriptions.models import Subscription, SubscriptionExercise, SubscriptionExerciseItem

class SubscriptionForm(ModelForm):
  class Meta:
    model = Subscription
    fields = ['module']
    widgets = {'module': Select(attrs={'class': 'form-select'})}

  def __init__(self, school_student, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.school_student = school_student

  def clean(self):
    if Subscription.objects.filter(school_student=self.school_student,         
                                   module=self.cleaned_data['module']).exists():
      raise ValidationError('Subscription for this module already exists for this school student')

        # Always return cleaned_data
    return self.cleaned_data
  
  def save(self):
    module = self.cleaned_data['module']
    subscription = Subscription.objects.create(school_student=self.school_student,
                                               module=module,
                                               created_at=datetime.now())
    return subscription

class SubscriptionExerciseItemForm(ModelForm):    
  class Meta:
      model = SubscriptionExerciseItem
      fields = ['student_answer1']
      widgets = {'student_answer1': HiddenInput(attrs={'id': 'student_answer1'})}

  def __init__(self, subscription_exercise, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.subscription_exercise = subscription_exercise

class WordListForm(Form):
  def __init__(self, subscription_exercise, *args, **kwargs):
    super(WordListForm, self).__init__(*args, **kwargs)
    subscription_items = subscription_exercise.items.all()
    item_count = 0
    for item in subscription_items:
      item_count += 1
      field_id = f'word{item_count:02}'
      master_id = f'{field_id}_master'
      self.fields[field_id] = CharField(widget=HiddenInput(attrs={'id': master_id}), required = False, initial=item.exercise_item.answer1)
      self.fields[f'{field_id}_answer'] = CharField(widget=HiddenInput(attrs={'id': f'{field_id}_answer',
                                                                              'onchange': f"updateButtonColour('{master_id}', '{field_id}_answer', '{field_id}_button')"}), required = False, initial=item.student_answer1)
      self.fields[f'{field_id}_item_id'] = CharField(widget=HiddenInput(attrs={'id': f'{field_id}_item_id'}), required = False, initial=item.id)

  def save(self):
    for field in self.cleaned_data:
      if field.startswith('word') and len(field) == 6:
        item_id = int(self.cleaned_data[f'{field}_item_id'])
        answer = self.cleaned_data[f'{field}_answer']
        master = self.cleaned_data[field]

        if len(answer) > 0:
          item = SubscriptionExerciseItem.objects.get(id=item_id)
          item.student_answer1 = answer
          if answer == master:
            item.answer1_correct = True
          else:
            item.answer1_correct = False

          item.save()

class SentenceWithDropdownForm(Form):
  def __init__(self, subscription_exercise, *args, **kwargs):
    super(SentenceWithDropdownForm, self).__init__(*args, **kwargs)
    subscription_items = subscription_exercise.items.all()
    item_count = 0
    for item in subscription_items:
      item_count += 1
      field_id = f'sentence{item_count:02}'
      self.fields[field_id] = ChoiceField(required = False, label=f'<td>{item_count}.</td><td>{item.exercise_item.content1}</td>',
                                          choices=get_choices_by_domain_with_blank(subscription_exercise.exercise.dropdown_type),
                                          widget=Select(attrs={'id': field_id, 'class': 'form-select'}),
                                          initial=item.student_answer1)
      self.fields[f'{field_id}_item_id'] = CharField(widget=HiddenInput(attrs={'id': f'{field_id}_item_id'}), required = False, initial=item.id)

  def save(self):
    for field in self.cleaned_data:
      if field.startswith('sentence') and len(field) == 10:
        item_id = int(self.cleaned_data[f'{field}_item_id'])
        answer = self.cleaned_data[field]

        if len(answer) > 0:
          item = SubscriptionExerciseItem.objects.get(id=item_id)

          item.student_answer1 = answer
          if item.student_answer1 == item.exercise_item.answer1:
            item.answer1_correct = True
          else:
            item.answer1_correct = False

          item.save()