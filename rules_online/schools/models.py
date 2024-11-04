from django.db import models
from core.models import User, get_gender_description, get_group_description, get_invite_status_description

# Create your models here.
class School(models.Model): 
  school_no = models.IntegerField(null=False, unique=True)
  school_name = models.CharField(max_length=255, null=False)
  school_type = models.CharField(max_length=30, null=False)
  school_status = models.CharField(max_length=10, null=False)
  address_line_1 = models.CharField(max_length=255, null=False)
  address_line_2 = models.CharField(max_length=255, null=True)
  address_town = models.CharField(max_length=50, null=False)
  address_state = models.CharField(max_length=20, null=False)
  address_postcode = models.CharField(max_length=10, null=False)
  postal_address_line_1 = models.CharField(max_length=255, null=True)
  postal_address_line_2 = models.CharField(max_length=255, null=True)
  postal_town = models.CharField(max_length=50, null=True)
  postal_state = models.CharField(max_length=20, null=True)
  postal_postcode = models.CharField(max_length=10, null=True)
  full_phone_no = models.CharField(max_length=255, null=False)
  lga_id = models.IntegerField(null=False)
  lga_name = models.CharField(max_length=50, null=False)
  longitude = models.DecimalField(max_digits=10, decimal_places=6, null=False)
  latitude = models.DecimalField(max_digits=10, decimal_places=6, null=False)

  def __str__(self):
      return self.school_name
  
  def street_address_as_html(self):
    the_address_line_2 = ''
    if self.address_line_2:
      the_address_line_2 = f'<br>{self.address_line_2}'

    return f'{self.address_line_1}{the_address_line_2}<br>{self.address_town}, {self.address_state} {self.address_postcode}'
  
  def postal_address_as_html(self):
    the_address_line_2 = ''
    if self.postal_address_line_2:
      the_address_line_2 = f'<br>{self.postal_address_line_2}'
      
    return f'{self.postal_address_line_1}{the_address_line_2}<br>{self.postal_town}, {self.postal_state} {self.postal_postcode}'

# Create the Student model.

class Student(models.Model):
  student_no = models.CharField(max_length=20, null=False, unique=True)
  date_of_birth = models.DateField(null=True)
  user = models.OneToOneField(User, related_name='student', on_delete=models.CASCADE, null=False)

  def __str__(self):
    return self.user.full_name
  
  def current_school(self):
    return self.attends.filter(date_ended__isnull=True).first()

# Create the Teacher model.

class Teacher(models.Model):
  user = models.OneToOneField(User, related_name='teacher', on_delete=models.CASCADE, null=False)

  def __str__(self):
    return self.user.full_name
  
  def current_school(self):
    return self.teaches_at.filter(date_ended__isnull=True).first()

# Create the School-Teacher model.

class SchoolTeacher(models.Model):
  school = models.ForeignKey(School, related_name='teachers', on_delete=models.CASCADE, null=False)
  teacher = models.ForeignKey(Teacher, related_name='teaches_at', on_delete=models.CASCADE, null=False)
  role = models.CharField(max_length=50, null=False)
  date_started = models.DateField(null=False)
  date_ended = models.DateField(null=True)

  def __str__(self):
    return f'{self.school.school_name} - {self.teacher.user.full_name}'

# Create the School-Student model.

class SchoolStudent(models.Model):
  school = models.ForeignKey(School, related_name='students', on_delete=models.CASCADE, null=False)
  student = models.ForeignKey(Student, related_name='attends', on_delete=models.CASCADE, null=False)
  date_started = models.DateField(null=False)
  date_ended = models.DateField(null=True)
  grade_level = models.CharField(max_length=20, null=False)

  def __str__(self):
    return f'{self.school.school_name} - {self.student.user.full_name}'

# Create the Invitation model.

class Invitation(models.Model):
  class Meta:
    unique_together = ('email', 'invitation_token')

  email = models.EmailField(max_length=254, null=False)
  invitation_token = models.CharField(max_length=40, null=False)
  invited_by = models.ForeignKey(User, related_name='invitations_created', on_delete=models.CASCADE, null=False)
  created_at = models.DateTimeField(auto_now_add=True)
  expires_at = models.DateTimeField(null=False)
  status = models.CharField(max_length=20, null=False, default='PENDING')
  invited_at = models.DateTimeField(null=True)
  accepted_at = models.DateTimeField(null=True)
  declined_at = models.DateTimeField(null=True)
  declined_reason = models.CharField(max_length=255, null=True)
  first_name = models.CharField(max_length=50, null=False)
  last_name = models.CharField(max_length=50, null=False)
  student_no = models.CharField(max_length=20, null=True)
  date_of_birth = models.DateField(null=True)
  phone = models.CharField(max_length=20, null=True)
  gender = models.CharField(max_length=20, null=False)
  group_name = models.CharField(max_length=50, null=False)
  school = models.ForeignKey(School, related_name='invitations', on_delete=models.CASCADE, null=True)

  def __str__(self):
    return self.email

  def gender_description(self):
    return get_gender_description(self.gender)

  def full_name(self):
    return f'{self.first_name} {self.last_name}'
  
  def group_description(self):
    return get_group_description(self.group_name)
  
  def status_description(self):
    return get_invite_status_description(self.status)