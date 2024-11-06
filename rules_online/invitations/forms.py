from django.forms import ModelForm, ChoiceField, CharField, PasswordInput, ValidationError

from core.auth_forms import PasswordValidator
from .models import Invitation
from core.models import get_gender_choices, User
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

class AcceptForm(ModelForm):

  # A form that accepts a user given an invitation

  password1 = CharField(label="Password", widget=PasswordInput)
  password2 = CharField(label="Password confirmation", widget=PasswordInput, 
                        help_text="Enter the same password as above, for verification.")
  
  class Meta:
    model = User
    fields = ['password1', 'password2']

  def __init__(self, *args, **kwargs):
    self.invitation = kwargs.pop('invitation')
    super().__init__(*args, **kwargs)

    for field in self.fields:
      self.fields[field].widget.attrs.update({'class': 'form-control'})

  def is_valid(self):
    is_valid = super().is_valid()
    password1 = self.cleaned_data["password1"]
    password2 = self.cleaned_data["password2"]

    if is_valid:
      password_validator = PasswordValidator(password1, password2)
      try:
        password_validator.validate()

      except ValidationError as e:
        self.add_error('password1', str(e))
        is_valid = False  

    return is_valid

  def save(self):
    user = User.objects.create(email=self.invitation.email, first_name=self.invitation.first_name,
                               last_name=self.invitation.last_name, gender=self.invitation.gender,
                               phone=self.invitation.phone)
      
    user.set_password(self.cleaned_data["password2"])
    user.save()
    return user
