import csv
from django.forms import ChoiceField, Form, ModelForm, HiddenInput, CharField, Select, TextInput, Textarea
from django_ckeditor_5.widgets import CKEditor5Widget
from core.models import get_choices_by_domain_with_blank, get_dropdown_type_choices_with_blank, get_module_level_choices, get_noun_type_choices_with_blank
from modules.models import ExerciseType, Module, Sheet, SheetExercise, SheetExerciseItem
from rules_online import settings

class ModuleForm(ModelForm):
  level = ChoiceField(label='Level', choices=get_module_level_choices())

  class Meta:
    model = Module
    fields = ['name', 'level', 'description']
    widgets = {
              "description": CKEditor5Widget(attrs={"class": "django_ckeditor_5"})
              }

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    for field in self.fields:
      if field == 'level':
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      elif field != 'description':
        self.fields[field].widget.attrs.update({'class': 'form-control'})

  def save(self):
    module = Module.objects.create(name=self.cleaned_data['name'],
                                   level=self.cleaned_data['level'],
                                   description=self.cleaned_data['description'])
    module.save()
    return module

class ExerciseTypeForm(ModelForm):
  class Meta:
    model = ExerciseType
    fields = ['name', 'banner', 'instructions', 'html_pt1', 'html_pt2', 'html_pt3']
    widgets = {
              "banner": CKEditor5Widget(attrs={"class": "django_ckeditor_5"}),
              "instructions": Textarea(attrs={'rows': 4}),
              "html_pt1": Textarea(attrs={'rows': 4}),
              "html_pt2": Textarea(attrs={'rows': 4}),
              "html_pt3": Textarea(attrs={'rows': 4})
              }
    
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    for field in self.fields:
      if field != 'banner':
        self.fields[field].widget.attrs.update({'class': 'form-control'})

  def save(self):
    exercise_type = ExerciseType.objects.create(name=self.cleaned_data['name'],
                                               banner=self.cleaned_data['banner'],
                                               instructions=self.cleaned_data['instructions'],
                                               html_pt1=self.cleaned_data['html_pt1'],
                                               html_pt2=self.cleaned_data['html_pt2'],
                                               html_pt3=self.cleaned_data['html_pt3'])
    exercise_type.save()
    return exercise_type

class SheetForm(ModelForm):
  class Meta:
    model = Sheet
    fields = ['name', 'sheet_number', 'description',]
    widgets = {"description": Textarea(attrs={'rows': 4}),}

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    for field in self.fields:
      self.fields[field].widget.attrs.update({'class': 'form-control'})

  def save(self, module):
    sheet = Sheet.objects.create(module=module,
                                 name=self.cleaned_data['name'],
                                 sheet_number=self.cleaned_data['sheet_number'],
                                 description=self.cleaned_data['description'])
    module.save()
    return module

class SheetExerciseForm(ModelForm):
  dropdown_type = ChoiceField(required=False, choices=get_dropdown_type_choices_with_blank())

  class Meta:
    model = SheetExercise
    fields = ['title', 'order', 'exercise_type', 'banner', 'instructions', 'line_items_for_student', 'dropdown_type']
    widgets = {"banner": CKEditor5Widget(attrs={"class": "django_ckeditor_5"}),
               "instructions": Textarea(attrs={'rows': 4}),}
    
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    for field in self.fields:
      if field in ['order', 'instructions', 'line_items_for_student', 'title']:
        self.fields[field].widget.attrs.update({'class': 'form-control'})
      elif field in ['exercise_type', 'dropdown_type']:
        self.fields[field].widget.attrs.update({'class': 'form-select'})

  def save(self, sheet):
    sheet_exercise = SheetExercise.objects.create(sheet=sheet,
                                                 order=self.cleaned_data['order'],
                                                 title=self.cleaned_data['title'],
                                                 exercise_type=self.cleaned_data['exercise_type'],
                                                 banner=self.cleaned_data['banner'],
                                                 instructions=self.cleaned_data['instructions'],
                                                 line_items_for_student=self.cleaned_data['line_items_for_student'],
                                                 dropdown_type=self.cleaned_data['dropdown_type'])
    sheet_exercise.save()
    return sheet_exercise
  
class SheetExerciseItemForm(ModelForm):

  class Meta:
    model = SheetExerciseItem
    fields = ['content1', 'answer1', 'answer2', ]
    widgets = {"content1": CKEditor5Widget(attrs={"class": "django_ckeditor_5"}),}
    
  def __init__(self, sheet_exercise, *args, **kwargs):
    super(SheetExerciseItemForm, self).__init__(*args, **kwargs)
    print(f"Dropdown type: {sheet_exercise.dropdown_type}")
    if sheet_exercise.dropdown_type:
      self.fields['answer1'] = ChoiceField(label="Answer 1", required=True, choices=get_choices_by_domain_with_blank(sheet_exercise.dropdown_type),
                                 widget=Select(attrs={"class": "form-select"}))
    else:
      self.fields['answer1'] = CharField(label="Answer 1", required=True, widget=TextInput(attrs={'class': 'form-control'}))

    self.fields['answer2'] = CharField(label="Answer 2", required=False, widget=TextInput(attrs={'class': 'form-control'}))

      
  def save(self, sheet_exercise):
    sheet_exercise_item = SheetExerciseItem.objects.create(sheet_exercise=sheet_exercise,
                                                          content1=self.cleaned_data['content1'],
                                                          # content2=self.cleaned_data['content2'],
                                                          # content3=self.cleaned_data['content3'],
                                                          answer1=self.cleaned_data['answer1'],
                                                          answer2=self.cleaned_data['answer2'])
    sheet_exercise_item.save()
    return sheet_exercise_item
  
class WordListForm(Form):
  def __init__(self, sheet_exercise, *args, **kwargs):
    super(WordListForm, self).__init__(*args, **kwargs)
    exercise_items = sheet_exercise.exercise_items.all()[:sheet_exercise.line_items_for_student]
    item_count = 0
    for item in exercise_items:
      item_count += 1
      field_id = f'word{item_count:02}'
      master_id = f'{field_id}_master'
      self.fields[field_id] = CharField(widget=HiddenInput(attrs={'id': master_id}), required = False, initial=item.answer1)

class SentenceWithDropdownForm(Form):
  def __init__(self, sheet_exercise, *args, **kwargs):
    super(SentenceWithDropdownForm, self).__init__(*args, **kwargs)
    exercise_items = sheet_exercise.exercise_items.all()[:sheet_exercise.line_items_for_student]
    item_count = 0
    for item in exercise_items:
      item_count += 1
      field_id = f'sentence{item_count:02}'
      self.fields[field_id] = ChoiceField(required = False, label=f'<td>{item_count}.</td><td>{item.content1}</td>',
                                          choices=get_choices_by_domain_with_blank(sheet_exercise.dropdown_type),
                                          widget=Select(attrs={'id': field_id, 'class': 'form-select'}))
      
class NounsForm(Form):
  noun_type = ChoiceField(label = "Type", choices=get_noun_type_choices_with_blank())

  fields = ['noun_type']

class WordLadderForm(Form):
  def __init__(self, sheet_exercise, *args, **kwargs):
    super(WordLadderForm, self).__init__(*args, **kwargs)
    words = []
    DATA_DIR = f'{settings.BASE_DIR}/static/data'
    with open(f'{DATA_DIR}/4_letter_words.csv', 'r') as file:
      reader = csv.DictReader(file)

      for row in reader:
        words.append(row['4-letter-word'])

    for x in range(2, (sheet_exercise.line_items_for_student)):
      field_id = f'word{x:02}'
      previous_field_id = f'word{x-1:02}'
      self.fields[field_id] = CharField(widget=TextInput(attrs={'id': field_id,
                                                                'class': 'form-control',
                                                                'onchange': f"validateEntry(this, '{previous_field_id}', {words})"}), required=False, max_length=4)


class PunctuationForm(Form):
  def __init__(self, sheet_exercise, *args, **kwargs):
    super(PunctuationForm, self).__init__(*args, **kwargs)
    exercise_items = sheet_exercise.exercise_items.all()[:sheet_exercise.line_items_for_student]
    item_count = 0
    for item in exercise_items:
      item_count += 1
      field_id = f'sentence{item_count:02}'
      raw_words = item.content1.replace('<p>', '').replace('</p>', '')
      words_as_spans = ''
      for word in raw_words.split(' '):
        words_as_spans = words_as_spans + f"<span onclick=\"modifyWord('word_action', this)\">{word}</span> "

      self.fields[field_id] = CharField(required = False, label=words_as_spans, 
                                        widget=HiddenInput(attrs={'id': field_id, }))
      