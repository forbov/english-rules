import csv
from datetime import datetime
from django.forms import CharField, ChoiceField, Form, HiddenInput, ModelForm, Select, TextInput, ValidationError, inlineformset_factory
from core.models import get_choices_by_domain_with_blank

from rules_online import settings
from subscriptions.models import Subscription, SubscriptionExerciseItem

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

          item.completed_at = datetime.now()
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

          item.completed_at = datetime.now()
          item.save()

class PunctuationForm(Form):
  def __init__(self, subscription_exercise, *args, **kwargs):
    super(PunctuationForm, self).__init__(*args, **kwargs)
    subscription_items = subscription_exercise.items.all()
    item_count = 0
    for item in subscription_items:
      item_count += 1
      field_id = f'sentence{item_count:02}'
      raw_words = None
      if item.student_answer1 and len(item.student_answer1) > 0:
        raw_words = item.student_answer1
      else:
        raw_words = item.exercise_item.content1.replace('<p>', '').replace('</p>', '')

      words_as_spans = ''
      for word in raw_words.split(' '):
        words_as_spans = words_as_spans + f"<span onclick=\"modifyWord('word_action', this, '{field_id}')\">{word}</span> "

      self.fields[field_id] = CharField(required = False, label=words_as_spans, 
                                        widget=HiddenInput(attrs={'id': field_id}))
      
      self.fields[f'{field_id}_answer'] = CharField(widget=HiddenInput(attrs={'id': f'{field_id}_answer'}), 
                                                    required = False, initial=item.student_answer1)
      
      self.fields[f'{field_id}_item_id'] = CharField(widget=HiddenInput(attrs={'id': f'{field_id}_item_id'}), 
                                                     required = False, initial=item.id)
      
  def save(self):
    for field in self.cleaned_data:
      if field.startswith('sentence') and len(field) == 10:
        item_id = int(self.cleaned_data[f'{field}_item_id'])
        answer = self.cleaned_data[f'{field}_answer']

        if len(answer) > 0:
          item = SubscriptionExerciseItem.objects.get(id=item_id)

          item.student_answer1 = answer
          if item.student_answer1 == item.exercise_item.answer1:
            item.answer1_correct = True
          else:
            item.answer1_correct = False

          item.completed_at = datetime.now()
          item.save()

class WordLadderForm(Form):
  def __init__(self, subscription_exercise, *args, **kwargs):
    self.subscription_exercise = subscription_exercise

    super(WordLadderForm, self).__init__(*args, **kwargs)
    words = []
    DATA_DIR = f'{settings.BASE_DIR}/static/data'
    with open(f'{DATA_DIR}/4_letter_words.csv', 'r') as file:
      reader = csv.DictReader(file)

      for row in reader:
        words.append(row['4-letter-word'])

    for x in range(2, (subscription_exercise.exercise.line_items_for_student)):
      field_id = f'word{x:02}'
      previous_field_id = f'word{x-1:02}'
      self.fields[field_id] = CharField(widget=TextInput(attrs={'id': field_id,
                                                                'class': 'form-control',
                                                                'onchange': f"validateEntry(this, '{previous_field_id}', {words})"}), required=False, max_length=4)
  
  def is_valid(self):
    if super().is_valid():
      for field in self.cleaned_data:
        if field.startswith('word') and len(field) == 6:
          if len(self.cleaned_data[field]) < 4:
            self.add_error(None, 'You have not completed an entry for all words in the ladder.')
            return False
          
    return True
        

  def save(self):
    self.subscription_exercise.end_at = datetime.now()
    self.subscription_exercise.score = 1
    self.subscription_exercise.save()