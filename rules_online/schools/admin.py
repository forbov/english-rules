from django.contrib import admin
from .models import School, SchoolStudent, SchoolTeacher, Student, Teacher

# Register your models here.
admin.site.register(School)
admin.site.register(SchoolStudent)
admin.site.register(SchoolTeacher)
admin.site.register(Student)
admin.site.register(Teacher)