from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from invitations.utilities import send_pending_invites
from .models import School, Student, Teacher
from core.app_helper import BootstrapTabs

# Create your views here.

@login_required
def schools_index(request):
  page_header = 'Schools'
  schools = School.objects.all()
  return render(request, 'schools/index.html', {'schools': schools, 'page_header': page_header})

def school_show(request, school_id):
  school = School.objects.get(id=school_id)
  page_header = school.school_name

  bootstrap_tabs = BootstrapTabs({'teachers': {'label': 'Teachers', 
                                               'render': 'teachers/_teachers.html', 
                                               'dataset': school.current_teachers(), 
                                               'source': 'school'},
                                  'students': {'label': 'Students', 
                                               'render': 'students/_students.html', 
                                               'dataset': school.current_students(), 
                                               'source':'school'},
                                  'invitations': {'label': 'Invitations', 
                                                  'render': 'invitations/_invitations.html', 
                                                  'dataset': school.invitations.all(), 
                                                  'source':'school'}})
  
  return render(request, 'schools/show.html', {'school': school, 'page_header': page_header, 
                                               'has_pending_invites': school.has_pending_invites(request.user),
                                               'has_tabs': bootstrap_tabs.has_tabs, 
                                               'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                               'tab_contents': bootstrap_tabs.render_tab_contents()})

def school_edit(request, school_id):
  school = School.objects.get(id=school_id)
  if request.method == 'POST':
    school.school_name = request.POST['school_name']
    school.save()
    messages.success(request, 'School profile updated successfully.')
    return redirect('schools:school_show', school_id=school.id)
  return render(request, 'schools/edit.html', {'school': school})

def school_delete(request, school_id):
  school = School.objects.get(id=school_id)
  school.delete()
  messages.success(request, 'School deleted successfully.')
  return redirect('schools:schools_index')

def send_invites(request, school_id):
  school = School.objects.get(id=school_id)
  invite_count = send_pending_invites(user=request.user, school=school)
  messages.success(request, f'Sent {invite_count} invitations.')
  return redirect('schools:school_show', school_id=school.id)

# Students

def student_show(request, student_id):
  student = Student.objects.get(id=student_id)
  page_header = f'Student: {student.user.full_name()}'

  # bootstrap_tabs = BootstrapTabs({'teachers': {'label': 'Teachers', 
  #                                              'render': 'teachers/_teachers.html', 
  #                                              'dataset': school.teachers.all(), 
  #                                              'source': 'school'},
  #                                 'students': {'label': 'Students', 
  #                                              'render': 'students/_students.html', 
  #                                              'dataset': school.students.all(), 
  #                                              'source':'school'},
  #                                 'invitations': {'label': 'Invitations', 
  #                                                 'render': 'invitations/_invitations.html', 
  #                                                 'dataset': school.invitations.all(), 
  #                                                 'source':'school'}})
  
  return render(request, 'students/show.html', {'student': student, 'page_header': page_header, })
                                              #  'has_tabs': bootstrap_tabs.has_tabs, 
                                              #  'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                              #  'tab_contents': bootstrap_tabs.render_tab_contents()})

def teacher_show(request, teacher_id):
  teacher = Teacher.objects.get(id=teacher_id)
  page_header = f'Teacher: {teacher.user.full_name()}'

  # bootstrap_tabs = BootstrapTabs({'teachers': {'label': 'Teachers', 
  #                                              'render': 'teachers/_teachers.html', 
  #                                              'dataset': school.teachers.all(), 
  #                                              'source': 'school'},
  #                                 'students': {'label': 'Students', 
  #                                              'render': 'students/_students.html', 
  #                                              'dataset': school.students.all(), 
  #                                              'source':'school'},
  #                                 'invitations': {'label': 'Invitations', 
  #                                                 'render': 'invitations/_invitations.html', 
  #                                                 'dataset': school.invitations.all(), 
  #                                                 'source':'school'}})
  
  return render(request, 'teachers/show.html', {'teacher': teacher, 'page_header': page_header, })
                                              #  'has_tabs': bootstrap_tabs.has_tabs, 
                                              #  'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                              #  'tab_contents': bootstrap_tabs.render_tab_contents()})
