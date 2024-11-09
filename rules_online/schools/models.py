from django.db import models
from core.models import User, get_school_grade_description

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
  phone = models.CharField(max_length=20, null=True)
  email = models.EmailField(max_length=255, null=True)
  website = models.URLField(max_length=200, null=True)

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

  def has_pending_invites(self, user):
    return self.invitations.filter(status='PENDING',
                                   invited_by=user).exists()
  
  def current_teachers(self):
    sql = f"""select tch.*
               from schools_school sch
               inner join schools_schoolteacher sct
                 on sct.school_id = sch.id
                and sct.date_end is null
              inner join schools_teacher tch
                 on tch.id = sct.teacher_id
              inner join core_user usr
                 on usr.id = tch.user_id
              where sch.id = {self.id}
              order by usr.last_name
                  , usr.first_name"""
    
    return Teacher.objects.raw(sql)

  def current_students(self):
    sql = f"""select std.*
               from schools_school sch
               inner join schools_schoolstudent scs
                 on scs.school_id = sch.id
                and scs.date_end is null
              inner join schools_student std
                 on std.id = scs.student_id
              inner join core_user usr
                 on usr.id = std.user_id
              where sch.id = {self.id}
              order by usr.last_name
                  , usr.first_name"""
    
    return Student.objects.raw(sql)

# Create the Student model.

class Student(models.Model):
  student_no = models.CharField(max_length=20, null=False, unique=True)
  date_of_birth = models.DateField(null=True)
  user = models.OneToOneField(User, related_name='student', on_delete=models.CASCADE, null=False)

  def __str__(self):
    return self.user.full_name()
  
  def current_school(self):
    return self.attends.filter(date_end__isnull=True).first()

# Create the Teacher model.

class Teacher(models.Model):
  user = models.OneToOneField(User, related_name='teacher', on_delete=models.CASCADE, null=False)

  def __str__(self):
    return self.user.full_name()
  
  def current_school(self):
    return self.teaches_at.filter(date_end__isnull=True).first()

# Create the School-Teacher model.

class SchoolTeacher(models.Model):
  school = models.ForeignKey(School, related_name='teachers', on_delete=models.CASCADE, null=False)
  teacher = models.ForeignKey(Teacher, related_name='teaches_at', on_delete=models.CASCADE, null=False)
  role = models.CharField(max_length=50, null=False)
  date_start = models.DateField(null=False)
  date_end = models.DateField(null=True)

  def __str__(self):
    return f'{self.school.school_name} - {self.teacher.user.full_name()}'

# Create the School-Student model.

class SchoolStudent(models.Model):
  school = models.ForeignKey(School, related_name='students', on_delete=models.CASCADE, null=False)
  student = models.ForeignKey(Student, related_name='attends', on_delete=models.CASCADE, null=False)
  date_start = models.DateField(null=False)
  date_end = models.DateField(null=True)
  school_grade = models.CharField(max_length=20, null=False)

  def __str__(self):
    return f'{self.school.school_name} - {self.student.user.full_name()}'
  
  def school_grade_description(self):
    return get_school_grade_description(self.school_grade)
