from django.forms import ModelForm, ChoiceField, DateInput
from .models import Invitation, School
from core.models import get_gender_choices
from bootstrap_datepicker_plus.widgets import DatePickerInput

class StudentInvitationForm(ModelForm):
  gender = ChoiceField(label="Gender", choices=get_gender_choices())
  class Meta:
    model = Invitation
    fields = ['email', 'first_name', 'last_name', 'gender', 'student_no', 'date_of_birth']
    widgets = { 'date_of_birth': DatePickerInput() }

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    for field in self.fields:
      if field in 'gender':
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      else:
        self.fields[field].widget.attrs.update({'class': 'form-control'})

class OthersInvitationForm(ModelForm):
  gender = ChoiceField(label="Gender", choices=get_gender_choices())
  class Meta:
    model = Invitation
    fields = ['email', 'first_name', 'last_name', 'gender', 'phone']

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)    
    for field in self.fields:
      if field in 'gender':
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      else:
        self.fields[field].widget.attrs.update({'class': 'form-control'})
