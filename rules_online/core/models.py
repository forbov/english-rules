from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group
from django.db import models
from django.utils import timezone

from core.utilities import BootstrapTabs

# Define the User manager class.

class UserManager(BaseUserManager):
  def _create_user(self, email, password, is_staff, is_superuser, first_name, last_name, phone, gender, group_name):
    if not email:
      raise ValueError('User must have an email address')
    
    if not password:
      raise ValueError('User must have a password')
    
    if not first_name:
      raise ValueError('User must have a first name')
    
    if not last_name:
      raise ValueError('User must have a last name')
    
    if not gender:
      raise ValueError('User must have a gender')
    
    if not group_name:
      raise ValueError('User must belong to a group')
    
    now = timezone.now()
    email = self.normalize_email(email)
    user = self.model(
        email=email,
        is_staff=is_staff, 
        is_active=True,
        is_superuser=is_superuser, 
        last_login=now,
        date_joined=now, 
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        gender=gender
    )
    user.set_password(password)
    user.save(using=self._db)
    try:
      group = Group.objects.get(name=group_name)

    except Group.DoesNotExist:
      raise ValueError(f'User must belong to a valid group. Group {group_name} was not found.')
    
    user.groups.add(group)
    return user

  def create_user(self, email, password, first_name, last_name, phone, gender, group_name):
    return self._create_user(email, password, False, False, first_name, last_name, phone, gender, group_name)

  def create_superuser(self, email, password, first_name, last_name, gender):
    phone = None
    user=self._create_user(email, password, True, True, first_name, last_name, phone, gender, 'admin')
    return user

# Create the User model.

class User(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=254, unique=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  last_login = models.DateTimeField(null=True, blank=True)
  date_joined = models.DateTimeField(auto_now_add=True)
  first_name = models.CharField(max_length=50, null=False)
  last_name = models.CharField(max_length=50, null=False)
  phone = models.CharField(max_length=20, null=True)
  gender = models.CharField(max_length=20, null=False)

  USERNAME_FIELD = 'email'
  EMAIL_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name', 'gender']

  objects = UserManager()

  def __str__(self):
      return self.email

  def get_absolute_url(self):
      return "core/users/%i/" % (self.pk)

  def gender_description(self):
    return get_gender_description(self.gender)

  def full_name(self):
    return f'{self.first_name} {self.last_name}'
  
  def group_description(self):
    group_names = []
    for group in self.groups.all():
      group_names.append(get_group_description(group.name))

    return ', '.join(group_names)

  def has_pending_invites(self):
    return self.invitations_created.filter(status='PENDING').exists()

  def bootstrap_tabs(self):
    return BootstrapTabs({'invitations': {'label': 'Invitations', 
                                          'render': 'invitations/_invitations.html', 
                                          'dataset': self.invitations_created.all(), 
                                          'source': 'user'}})
  def is_admin(self):
    return self.groups.filter(name='admin').exists()

  def is_manager(self):
    return self.groups.filter(name='manager').exists()

  def is_teacher(self):
    return self.groups.filter(name='teacher').exists()

  def is_student(self):
    return self.groups.filter(name='student').exists()

  def is_manager_or_teacher_at_school(self, school):
    sql = f"""select usr.*
                from schools_teacher tch
               inner join schools_schoolteacher sct
                  on sct.teacher_id = tch.id
                 and sct.school_id = {school.id}
               inner join core_user usr
                  on usr.id = tch.user_id
               where tch.user_id = {self.id}"""
    
    return User.objects.raw(sql).exists()
               
  def is_teacher_at_school(self, school):
    return self.is_teacher() and self.is_manager_or_teacher_at_school() 

  def is_manager_at_school(self, school):
    return self.is_manager() and self.is_manager_or_teacher_at_school()

  def is_student_at_school(self, school):
    sql = f"""select usr.*
                from schools_student std
               inner join schools_schoolstudent scs
                  on scs.student_id = std.id
                 and scs.school_id = {school.id}
               inner join core_user usr
                  on usr.id = std.user_id
               where std.user_id = {self.id}"""
    
    return self.is_student() and User.objects.raw(sql).exists()
  

# Create the SystemCode model.

class SystemCode(models.Model):
  class Meta:
    unique_together = ('domain', 'code')

  domain = models.CharField(max_length=20, null=False)
  code = models.CharField(max_length=20, null=False)
  description = models.CharField(max_length=255, null=False)
  integer_value = models.IntegerField(null=True)
  alt_description = models.CharField(max_length=255, null=True)  

  def __str__(self):
    return f'{self.domain} - {self.code} - {self.description}'
  
# The following code relates to resolving system code sets and descriptions

GENDER_DOMAIN = 'GENDER'
STATE_DOMAIN = 'STATE'
INVITE_STATUS_DOMAIN = 'INVITE_STATUS'
TOKEN_DOMAIN = 'TOKEN'
SCHOOL_GRADE_DOMAIN = 'SCHOOL_GRADE'
DROPDOWN_TYPE_DOMAIN = 'DROPDOWN_TYPE'
SPEECH_TYPE_DOMAIN = 'SPEECH_TYPE'
NOUN_TYPE_DOMAIN = 'NOUN_TYPE'
PUNCTUATION_DOMAIN = 'PUNCTUATION'
MODULE_LEVEL_DOMAIN = 'MODULE_LEVEL'

BLANK_LIST_ITEM = [(None, '-----')]

# CodeSet and CodeRecord classes to manage system code sets and descriptions

class CodeSet():
  def __init__(self, domain):
    self.domain = domain
    self.code_set = SystemCode.objects.filter(domain=domain).order_by('integer_value', 'description')

  def as_choices(self):
    return [(code.code, code.description) for code in self.code_set]

class CodeRecord():
  def __init__(self, domain, code):
    self.domain = domain
    self.code = code

    if code:
      try:
        self.code_record = SystemCode.objects.get(domain=domain, code=code)

      except SystemCode.DoesNotExist:
        raise ValueError(f'System code {domain}-{code} does not exist.')
    else:
      self.code_record = None

  def get_descripton(self):
    if self.code_record is None:
      return None
    
    return self.code_record.description
  
  def get_integer_value(self):
    if self.code_record is None:
      return None
    
    return self.code_record.integer_value
  
  def get_alt_description(self):
    if self.code_record is None:
      return None
    
    return self.code_record.alt_description

# Resolution for each domain 

def get_choices_by_domain_with_blank(domain):
  return BLANK_LIST_ITEM + CodeSet(domain).as_choices()

def get_description_by_domain(domain, code):
  return CodeRecord(domain, code).get_descripton()

def get_gender_choices():
  return CodeSet(GENDER_DOMAIN).as_choices()

def get_gender_choices_with_blank():
  return BLANK_LIST_ITEM + get_gender_choices()

def get_gender_description(code):
  return CodeRecord(GENDER_DOMAIN, code).get_descripton()

def get_state_choices():
  return CodeSet(STATE_DOMAIN).as_choices()

def get_state_choices_with_blank():
  return BLANK_LIST_ITEM + get_state_choices()

def get_state_description(code):
  return CodeRecord(STATE_DOMAIN, code).get_descripton()

def get_group_choices():
  return [(group.name, group.name.title()) for group in Group.objects.all()]

def get_group_choices_with_blank():
  return BLANK_LIST_ITEM + get_group_choices()

def get_group_description(group_name):
  try:
    group = Group.objects.get(name=group_name)
    return group.name.title()
  
  except Group.DoesNotExist:
    return ValueError(f'Invalid Group name: {group_name}')
  
def get_invite_status_choices():
  return CodeSet(INVITE_STATUS_DOMAIN).as_choices()

def get_invite_status_description(code):
  return CodeRecord(INVITE_STATUS_DOMAIN, code).get_descripton()

def get_token_choices():
  return CodeSet(TOKEN_DOMAIN).as_choices()

def get_token_description(code):
  return CodeRecord(TOKEN_DOMAIN, code).get_descripton()

def get_token_expiry():
  return CodeRecord(TOKEN_DOMAIN, 'EXPIRY').get_integer_value()

def get_school_grade_choices():
  return CodeSet(SCHOOL_GRADE_DOMAIN).as_choices()

def get_school_grade_description(code):
  return CodeRecord(SCHOOL_GRADE_DOMAIN, code).get_descripton()

def get_dropdown_type_choices():
  return CodeSet(DROPDOWN_TYPE_DOMAIN).as_choices()

def get_dropdown_type_choices_with_blank():
  return BLANK_LIST_ITEM + get_dropdown_type_choices()

def get_dropdown_type_description(code):
  return CodeRecord(DROPDOWN_TYPE_DOMAIN, code).get_descripton()

def get_speech_type_choices():
  return CodeSet(SPEECH_TYPE_DOMAIN).as_choices()

def get_speech_type_choices_with_blank():
  return BLANK_LIST_ITEM + get_speech_type_choices()

def get_speech_type_description(code):
  return CodeRecord(SPEECH_TYPE_DOMAIN, code).get_descripton()

def get_noun_type_choices():
  return CodeSet(NOUN_TYPE_DOMAIN).as_choices()

def get_noun_type_choices_with_blank():
  return BLANK_LIST_ITEM + get_noun_type_choices()

def get_noun_type_description(code):
  return CodeRecord(NOUN_TYPE_DOMAIN, code).get_descripton()

def get_module_level_choices():
  return CodeSet(MODULE_LEVEL_DOMAIN).as_choices()

def get_module_level_description(code):
  return CodeRecord(MODULE_LEVEL_DOMAIN, code).get_descripton()