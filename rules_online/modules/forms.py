from django.forms import ChoiceField, Form, ModelForm, HiddenInput, CharField
from django_ckeditor_5.widgets import CKEditor5Widget
from core.models import get_module_level_choices, get_noun_type_choices_with_blank
from modules.models import Module

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