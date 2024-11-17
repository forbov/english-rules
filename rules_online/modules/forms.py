from django.forms import ChoiceField, Form, ModelForm, HiddenInput, CharField, Textarea
from django_ckeditor_5.widgets import CKEditor5Widget
from core.models import get_dropdown_type_choices_with_blank, get_module_level_choices, get_noun_type_choices_with_blank
from modules.models import ExerciseType, Module, Sheet, SheetExercise, SheetExerciseItem

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
    fields = ['order', 'exercise_type', 'banner', 'instructions', 'line_items_for_student', 'dropdown_type']
    widgets = {"banner": CKEditor5Widget(attrs={"class": "django_ckeditor_5"}),
               "instructions": Textarea(attrs={'rows': 4}),}
    
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    for field in self.fields:
      if field in ['order', 'instructions', 'line_items_for_student']:
        self.fields[field].widget.attrs.update({'class': 'form-control'})
      elif field in ['exercise_type', 'dropdown_type']:
        self.fields[field].widget.attrs.update({'class': 'form-select'})

  def save(self, sheet):
    sheet_exercise = SheetExercise.objects.create(sheet=sheet,
                                                 order=self.cleaned_data['order'],
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
    fields = ['content1', 'content2', 'content3', 'answer1', 'answer2']
    widgets = {"content1": CKEditor5Widget(attrs={"class": "django_ckeditor_5"}),
               "content2": CKEditor5Widget(attrs={"class": "django_ckeditor_5"}),
               "content3": CKEditor5Widget(attrs={"class": "django_ckeditor_5"}),}
    
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    for field in self.fields:
      if field in ['content1', 'content2', 'content3']:
        self.fields[field].widget.attrs.update({"rows": 1,
                                                "height": "100"})
      elif field in ['answer1', 'answer2']:
        self.fields[field].widget.attrs.update({"class": "form-control"})
      
  def save(self, sheet_exercise):
    sheet_exercise_item = SheetExerciseItem.objects.create(sheet_exercise=sheet_exercise,
                                                          content1=self.cleaned_data['content1'],
                                                          content2=self.cleaned_data['content2'],
                                                          content3=self.cleaned_data['content3'],
                                                          answer1=self.cleaned_data['answer1'],
                                                          answer2=self.cleaned_data['answer2'])
    sheet_exercise_item.save()
    return sheet_exercise_item
  
class WordListForm(Form):
  word01 = CharField(widget=HiddenInput(attrs={'id': 'word01_master'}), required = False, initial="annually")
  word02 = CharField(widget=HiddenInput(attrs={'id': 'word02_master'}), required = False, initial="luggage")
  word03 = CharField(widget=HiddenInput(attrs={'id': 'word03_master'}), required = False, initial="overseas")
  word04 = CharField(widget=HiddenInput(attrs={'id': 'word04_master'}), required = False, initial="delight")
  word05 = CharField(widget=HiddenInput(attrs={'id': 'word05_master'}), required = False, initial="carnival")
  word06 = CharField(widget=HiddenInput(attrs={'id': 'word06_master'}), required = False, initial="bikini")
  word07 = CharField(widget=HiddenInput(attrs={'id': 'word07_master'}), required = False, initial="freckle")
  word08 = CharField(widget=HiddenInput(attrs={'id': 'word08_master'}), required = False, initial="swimsuit")
  word09 = CharField(widget=HiddenInput(attrs={'id': 'word09_master'}), required = False, initial="secluded")
  word10 = CharField(widget=HiddenInput(attrs={'id': 'word10_master'}), required = False, initial="refreshment")
  word11 = CharField(widget=HiddenInput(attrs={'id': 'word11_master'}), required = False, initial="relaxing")
  word12 = CharField(widget=HiddenInput(attrs={'id': 'word12_master'}), required = False, initial="sunscreen")
  word13 = CharField(widget=HiddenInput(attrs={'id': 'word13_master'}), required = False, initial="luxury")
  word14 = CharField(widget=HiddenInput(attrs={'id': 'word14_master'}), required = False, initial="destination")
  word15 = CharField(widget=HiddenInput(attrs={'id': 'word15_master'}), required = False, initial="paradise")
  word16 = CharField(widget=HiddenInput(attrs={'id': 'word16_master'}), required = False, initial="airport")
  word17 = CharField(widget=HiddenInput(attrs={'id': 'word17_master'}), required = False, initial="oyster")
  word18 = CharField(widget=HiddenInput(attrs={'id': 'word18_master'}), required = False, initial="lobster")
  word19 = CharField(widget=HiddenInput(attrs={'id': 'word19_master'}), required = False, initial="casual")
  word20 = CharField(widget=HiddenInput(attrs={'id': 'word20_master'}), required = False, initial="lifeguard")

  fields = ['word01', 'word02', 'word03', 'word04', 'word05', 'word06', 'word07', 'word08', 'word09', 'word10', 
            'word11', 'word12', 'word13', 'word14', 'word15', 'word16', 'word17', 'word18', 'word19', 'word20']

class NounsForm(Form):
  noun_type = ChoiceField(label = "Type", choices=get_noun_type_choices_with_blank())

  fields = ['noun_type']