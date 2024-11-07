from django.db import models
from core.models import User, get_group_description, get_invite_status_description, get_gender_description, get_school_grade_description
from schools.models import School

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
  school_grade = models.CharField(max_length=20, null=True)

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
  
  def school_grade_description(self):
    return get_school_grade_description(self.school_grade)

