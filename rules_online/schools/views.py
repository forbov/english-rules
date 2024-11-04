from django.shortcuts import redirect, render
from uuid import uuid4
from django.contrib.auth.decorators import login_required
from .utilities import send_invitation_email
from django.contrib import messages
from .models import School, Invitation
from core.app_helper import BootstrapTabs
from .forms import StudentInvitationForm, OthersInvitationForm
from datetime import datetime, timedelta
from core.codes_utilities import get_token_expiry
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
                                               'dataset': school.teachers.all(), 
                                               'source': 'school'},
                                  'students': {'label': 'Students', 
                                               'render': 'students/_students.html', 
                                               'dataset': school.students.all(), 
                                               'source':'school'},
                                  'invitations': {'label': 'Invitations', 
                                                  'render': 'invitations/_invitations.html', 
                                                  'dataset': school.invitations.all(), 
                                                  'source':'school'}})
  
  return render(request, 'schools/show.html', {'school': school, 'page_header': page_header, 
                                               'has_tabs': bootstrap_tabs.has_tabs, 
                                               'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                               'tab_contents': bootstrap_tabs.render_tab_contents()})

def school_edit(request, school_id):
  school = School.objects.get(id=school_id)
  if request.method == 'POST':
    school.school_name = request.POST['school_name']
    school.save()
    messages.success(request, 'School profile updated successfully.')
    return redirect('schools:show', school_id=school.id)
  return render(request, 'schools/edit.html', {'school': school})

def school_delete(request, school_id):
  school = School.objects.get(id=school_id)
  school.delete()
  messages.success(request, 'School deleted successfully.')
  return redirect('schools:index')

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
      email = request.POST['email']
      invitation_token = uuid4()
      invited_by = user
      created_at = datetime.now()
      expires_at = created_at + timedelta(days=get_token_expiry())
      first_name = request.POST['first_name']
      last_name = request.POST['last_name']
      gender = request.POST['gender']
      phone = None
      student_no = None
      date_of_birth = None

      if role in ['admin', 'teacher', 'manager']:
        phone = request.POST['phone']
      elif role =='student':
        student_no = request.POST['student_no']
        date_of_birth = request.POST['date_of_birth']
        
      # Create the invitation
      invitation = Invitation.objects.create(email=email, invitation_token=invitation_token, invited_by=invited_by, 
                                             created_at=created_at, expires_at=expires_at,
                                             first_name=first_name, last_name=last_name, gender=gender, 
                                             group_name=role, phone=phone,
                                             student_no=student_no, date_of_birth=date_of_birth, school=school)
      invitation.save()
      messages.success(request, f'Invitation for {invitation.full_name()} saved successfully.')
      return redirect('schools:school_show', school_id=school.id)
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
      return redirect('schools:invitation_show', invitation_id=invitation.id)
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
  school_id = invitation.school.id
  invitation.delete()
  messages.success(request, 'Invitation deleted successfully.')
  return redirect('schools:school_show', school_id=school_id)

@login_required
def invitation_reset(request, invitation_id):
  invitation = Invitation.objects.get(id=invitation_id)
  invitation.status = 'PENDING'
  invitation.invitation_token = uuid4()
  invitation.expires_at = datetime.now() + timedelta(days=get_token_expiry())
  invitation.save()
  messages.success(request, 'Invitation reset successfully.')
  return redirect('schools:invitation_show', invitation_id=invitation.id)

@login_required
def invite_pending_students(request):
  user = request.user
  if request.method == 'POST':
    teacher = user.teacher
    school = teacher.current_school()
    pending_invitations = None
    invitation_count = 0
    if user.is_manager():
      # process all pending invitations for the school
      pending_invitations = school.invitations.filter(status='PENDING',
                                                      group_name='student')      
    else:
      # Process pending invitations for the teacher
      pending_invitations = user.invitations_created.invitations.filter(status='PENDING',
                                                                        group_name='student')
 
    for invitation in pending_invitations:
      invitation_count += 1
      # Send the invitation email
      send_invitation_email(invitation, school, 'Invitation to Join Your School')
      
      # Mark the invitation as sent
      invitation.status = 'INVITED'
      invitation.save()

    messages.success(request, f'Sent invitations to {invitation_count} students.')
    return redirect('schools:show', school_id=school.id)

@login_required
def invite_pending_teachers(request):
  user = request.user
  if request.method == 'POST':
    teacher = user.teacher
    school = teacher.current_school()
    pending_invitations = None
    invitation_count = 0
    if user.is_manager():
      # process all pending invitations for the school
      pending_invitations = school.invitations.filter(status='PENDING',
                                                      group_name='teacher')          
      for invitation in pending_invitations:
        invitation_count += 1
        # Send the invitation email
        send_invitation_email(invitation, school, 'Invitation to Join Your School')
        
        # Mark the invitation as sent
        invitation.status = 'INVITED'
        invitation.save()

    messages.success(request, f'Sent invitations to {invitation_count} teachers.')
    return redirect('schools:show', school_id=school.id)
  