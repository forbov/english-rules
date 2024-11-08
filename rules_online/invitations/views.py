from datetime import datetime, timedelta
from uuid import uuid4
from django.shortcuts import redirect, render
from core.decorators import unauthenticated_user
from .models import Invitation
from schools.models import School, SchoolStudent, SchoolTeacher, Student, Teacher
from .forms import StudentInvitationForm, OthersInvitationForm, AcceptForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib.auth.models import Group
from django.contrib import messages
from core.models import get_token_expiry, User

from .utilities import send_invitation_email


# Create your views here.

@login_required
def invitation_show(request, invitation_id):
  invitation = Invitation.objects.get(id=invitation_id)
  page_header = f'Invitation for {invitation.full_name()}'
  
  return render(request, 'invitations/show.html', {'invitation': invitation, 'page_header': page_header})

@login_required
def invitation_new(request):
  role = None
  school_id = None
  school = None
  form = None
  if request.method == 'POST':
    if 'role' in request.POST:
      role = request.POST['role']

    if 'school_id' in request.POST:
      school_id = request.POST['school_id']

  else: # request.GET:
    if 'role' in request.GET:
      role = request.GET['role']

    if 'school_id' in request.GET:
      school_id = request.GET['school_id']

  if school_id:
    school = School.objects.get(id=school_id)

  if role == 'admin':
    role_options = ['teacher','manager','student']
  if role == None:
    raise ValueError('You must have role as a parameter')
  
  if role in ['teacher', 'manager', 'student'] and school == None:
    raise ValueError('Must have school_id as a parameter in the request for everything except an admin user.')

  page_header = f'Create {role.title()} Invitation'
  user = request.user

  if request.method == 'POST':
    if role == 'student':
      form = StudentInvitationForm(data=request.POST)
    else:
      form = OthersInvitationForm(data=request.POST)

    if form.is_valid():
      invitation = form.save(user=user, school=school, role=role)
      messages.success(request, f'Invitation for {invitation.full_name()} saved successfully.')
      if school:
        return redirect('schools:school_show', school_id=school.id)
      else:
        return redirect('core:users_index')
    else:
      messages.error(request, f'<p><strong>Save failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'invitations/new.html', {'form': form, 'page_header': page_header, 'school': school, 'role': role})
  else:
    if role == 'student':
      form = StudentInvitationForm()
    else:
      form = OthersInvitationForm()

    return render(request, 'invitations/new.html', {'form': form, 'page_header': page_header, 'school': school, 'role': role})
      
@login_required
def invitation_edit(request, invitation_id):
  invitation = Invitation.objects.get(id=invitation_id)
  page_header = f'Edit Invitation for {invitation.full_name()}'

  if request.method == 'POST':
    if invitation.group_name == 'student':
      form = StudentInvitationForm(data=request.POST)
    else:
      form = OthersInvitationForm(data=request.POST)

    if form.is_valid():
      invitation.email = request.POST['email']
      invitation.first_name = request.POST['first_name']
      invitation.last_name = request.POST['last_name']
      invitation.gender = request.POST['gender']

      if invitation.group_name in ['admin', 'teacher', 'manager']:
        invitation.phone = request.POST['phone']
      elif invitation.group_name =='student':
        invitation.student_no = request.POST['student_no']
        invitation.date_of_birth = request.POST['date_of_birth']

      invitation.save()
      messages.success(request, f'Invitation for {invitation.full_name()} updated successfully.')
      return redirect('invitations:invitation_show', invitation_id=invitation.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'invitations/edit.html', {'form': form, 'invitation': invitation, 
                                                       'page_header': page_header, 'school': invitation.school})
  else:
    if invitation.group_name == 'student':
      form = StudentInvitationForm(initial={'email': invitation.email, 'first_name': invitation.first_name, 
                                              'last_name': invitation.last_name, 'gender': invitation.gender, 
                                              'phone': invitation.phone, 'student_no': invitation.student_no, 
                                              'date_of_birth': invitation.date_of_birth})
    else:
      form = OthersInvitationForm(initial={'email': invitation.email, 'first_name': invitation.first_name, 
                                              'last_name': invitation.last_name, 'gender': invitation.gender, 
                                              'phone': invitation.phone})
      
    return render(request, 'invitations/edit.html', {'form': form, 'invitation': invitation, 
                                                     'page_header': page_header, 'school': invitation.school})
  
@login_required
def invitation_delete(request, invitation_id):
  invitation = Invitation.objects.get(id=invitation_id)
  invitation.delete()
  messages.success(request, 'Invitation deleted successfully.')
  if invitation.school:
    return redirect('schools:school_show', school_id=invitation.school.id)
  else:
    return redirect('core:users_index')

# @unauthenticated_user
def invitation_accept(request):
  page_header = None
  token = None
  form = None

  if request.method == 'POST':
    invitation = Invitation.objects.get(id=request.POST['invitation_id'])
    form = AcceptForm(request.POST, invitation=invitation)
    if form.is_valid():
      # Create the user
      user = form.save()
      user.groups.add(Group.objects.get(name=invitation.group_name))
      
      if invitation.group_name == 'manager':
        user.groups.add(Group.objects.get(name='teacher'))
      
      if invitation.group_name in ['teacher', 'manager']:
        teacher = Teacher.objects.create(user=user)
        teacher.save()
        school_teacher = SchoolTeacher.objects.create(teacher=teacher, school=invitation.school, date_start=datetime.now())
        school_teacher.save()
      elif invitation.group_name =='student':
        student = Student.objects.create(user=user, date_of_birth=invitation.date_of_birth, student_no=invitation.student_no)
        student.save()
        school_student = SchoolStudent.objects.create(student=student, school=invitation.school, 
                                                      date_start=datetime.now(), school_grade=invitation.school_grade)
        school_student.save()

      invitation.status = 'ACCEPTED'
      invitation.accepted_at = datetime.now()
      invitation.save()

      login(request, user)
      messages.success(request, f'{user.full_name()} registered successfully and now logged in.')
      return redirect('core:user_dashboard', user_id=user.id)
    else:
      messages.error(request, f'<p><strong>Registration failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'invitations/accept.html', {'form': form, 'page_header': page_header, 'invitation': invitation})
  else:
    if 'token' in request.GET:
      token = request.GET['token']
      try:
        invitation = Invitation.objects.get(invitation_token=token,
                                                status='INVITED',
                                                expires_at__gte=datetime.now())
      except Invitation.DoesNotExist:
        messages.error(request, 'Invalid token or invitation has expired.')
        return redirect('home')
    else:
      messages.error(request, 'You must have a token to accept an invitation.')
      return redirect('home')

    form = AcceptForm(invitation=invitation)
    page_header = f'Accept {invitation.group_description()} Invitation'
    return render(request, 'invitations/accept.html', {'form': form, 'page_header': page_header, 'invitation': invitation})


@login_required
def invitation_reset(request, invitation_id):
  invitation = Invitation.objects.get(id=invitation_id)
  invitation.status = 'PENDING'
  invitation.invitation_token = uuid4()
  invitation.expires_at = datetime.now() + timedelta(days=get_token_expiry())
  invitation.save()
  messages.success(request, 'Invitation reset successfully.')
  return redirect('invitations:invitation_show', invitation_id=invitation.id)
