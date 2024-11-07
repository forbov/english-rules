from datetime import datetime, timedelta
from uuid import uuid4
from django.forms import ModelForm, ChoiceField, CharField, PasswordInput, ValidationError

from core.auth_forms import PasswordValidator
from .models import Invitation
from core.models import get_gender_choices, get_school_grade_choices, User, get_token_expiry
from bootstrap_datepicker_plus.widgets import DatePickerInput

class StudentInvitationForm(ModelForm):
  gender = ChoiceField(label="Gender", choices=get_gender_choices())
  school_grade = ChoiceField(label="School Grade", choices=get_school_grade_choices())
  
  class Meta:
    model = Invitation
    fields = ['email', 'first_name', 'last_name', 'gender', 'student_no', 'date_of_birth', 'school_grade']
    widgets = { 'date_of_birth': DatePickerInput(), }

    required_fields = ['email', 'first_name', 'last_name', 'gender', 'student_no', 'date_of_birth', 'school_grade']

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    for field in self.fields:
      if field in ['gender', 'school_grade']:
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      else:
        self.fields[field].widget.attrs.update({'class': 'form-control'})

  def save(self, user, school, role):
    email = self.cleaned_data['email']
    invitation_token = uuid4()
    invited_by = user
    created_at = datetime.now()
    expires_at = created_at + timedelta(days=get_token_expiry())
    first_name = self.cleaned_data['first_name']
    last_name = self.cleaned_data['last_name']
    gender = self.cleaned_data['gender']
    student_no = self.cleaned_data['student_no']
    date_of_birth = self.cleaned_data['date_of_birth']
    school_grade = self.cleaned_data['school_grade']

    invitation = Invitation.objects.create(email=email, invitation_token=invitation_token, 
                                            invited_by=invited_by, created_at=created_at, 
                                            expires_at=expires_at, first_name=first_name, 
                                            last_name=last_name, gender=gender, school=school,
                                            student_no=student_no, date_of_birth=date_of_birth,
                                            school_grade=school_grade, group_name=role)
    invitation.save()
    return invitation

class OthersInvitationForm(ModelForm):
  gender = ChoiceField(label="Gender", choices=get_gender_choices())
  class Meta:
    model = Invitation
    fields = ['email', 'first_name', 'last_name', 'gender', 'phone']

    required_fields = ['email', 'first_name', 'last_name', 'gender', 'phone']

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)    
    for field in self.fields:
      if field in 'gender':
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      else:
        self.fields[field].widget.attrs.update({'class': 'form-control'})

  def save(self, user, school, role):
    email = self.cleaned_data['email']
    invitation_token = uuid4()
    invited_by = user
    created_at = datetime.now()
    expires_at = created_at + timedelta(days=get_token_expiry())
    first_name = self.cleaned_data['first_name']
    last_name = self.cleaned_data['last_name']
    gender = self.cleaned_data['gender']
    phone = self.cleaned_data['phone']

    invitation = Invitation.objects.create(email=email, invitation_token=invitation_token, 
                                            invited_by=invited_by, created_at=created_at, 
                                            expires_at=expires_at, first_name=first_name, 
                                            last_name=last_name, gender=gender, group_name=role,
                                            school=school, phone=phone)
    invitation.save()
    return invitation  

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
