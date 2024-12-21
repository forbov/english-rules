from django.shortcuts import render, redirect

from invitations.utilities import send_pending_invites
from core.models import User

from core.decorators import authenticated_user, unauthenticated_user
from core.forms import LoginForm, RegisterForm, UserForm
from core.filters import UserFilter
from django.contrib.auth import login, logout
from django.contrib import messages


# Create your views here.
@authenticated_user
def users_index(request):
  page_header = 'Users'
  first_name = ''
  last_name = ''
  gender = ''
  group_name = ''

  if 'search' in request.GET:
    first_name = request.GET.get('first_name', '')
    last_name = request.GET.get('last_name', '')
    gender = request.GET.get('gender', '')
    group_name = request.GET.get('group_name', '')

    users_filter = UserFilter(initial={'first_name': first_name, 'last_name': last_name, 
                                       'gender': gender, 'group_name': group_name})
  else:
    users_filter = UserFilter(initial=None)

  sql = f""" select distinct usr.*
               from core_user usr
              inner join core_user_groups ugr
                 on ugr.user_id = usr.id
              inner join auth_group grp
                 on grp.id = ugr.group_id
                and ('{group_name}' = '' or grp.name = '{group_name}')
              where lower(usr.first_name) like '%%{first_name.lower()}%%'
                and lower(usr.last_name) like '%%{last_name.lower()}%%'
                and ('{gender}' = '' or usr.gender = '{gender}')
              order by usr.last_name
                  , usr.first_name"""

  users = User.objects.raw(sql)

  return render(request, 'users/index.html', {'users': users, 'page_header': page_header,
                                              'users_filter': users_filter,
                                              'has_pending_invites': request.user.has_pending_invites(),})

@authenticated_user
def user_show(request, user_id):
  user = User.objects.get(id=user_id)
  bootstrap_tabs = user.bootstrap_tabs()
  page_header = f'{user.full_name()} Profile'
  
  return render(request, 'users/show.html', {'user': user, 'page_header': page_header, 
                                             'has_tabs': bootstrap_tabs.has_tabs, 
                                             'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                             'tab_contents': bootstrap_tabs.render_tab_contents()})

@authenticated_user
def user_dashboard(request, user_id):
  user = User.objects.get(id=user_id)
  bootstrap_tabs = user.bootstrap_tabs()
  page_header = f'{user.full_name()} Dashboard'
  
  return render(request, 'users/dashboard.html', {'user': user, 'page_header': page_header, 
                                             'has_tabs': bootstrap_tabs.has_tabs, 
                                             'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                             'tab_contents': bootstrap_tabs.render_tab_contents()})

@authenticated_user
def user_edit(request, user_id):
  user = User.objects.get(id=user_id)
  page_header = f'Edit User for {user.full_name()}'

  if request.method == 'POST':
    form = UserForm(data=request.POST)

    if form.is_valid():
      user.first_name = request.POST['first_name']
      user.last_name = request.POST['last_name']
      user.gender = request.POST['gender']
      user.phone = request.POST['phone']

      user.save()
      messages.success(request, f'User {user.full_name()} updated successfully.')
      return redirect('core:user_show', user_id=user.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'users/edit.html', {'form': form, 'user': user, 
                                                 'page_header': page_header, })
  else:
    form = UserForm(initial={'email': user.email, 'first_name': user.first_name, 
                             'last_name': user.last_name, 'gender': user.gender, 
                             'phone': user.phone, })
      
    return render(request, 'users/edit.html', {'form': form, 'user': user, 
                                                     'page_header': page_header, })
  
@authenticated_user
def user_delete(request, user_id):
  user = User.objects.get(id=user_id)
  user.delete()
  messages.success(request, 'User deleted successfully.')
  return redirect('core:users_index')

@unauthenticated_user
def user_register(request):
  page_header = 'Register User'
  if request.method == 'POST':
    form = RegisterForm(request.POST)
    if form.is_valid():
      user = form.save()
      login(request, user)
      messages.success(request, f'{user.full_name()} registered successfully and now logged in.')
      return redirect('core:index')
    else:
      messages.error(request, f'<p><strong>Registration failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'users/register.html', {'form': form, 'page_header': page_header})
  else:
    form = RegisterForm()
    return render(request, 'users/register.html', {'form': form, 'page_header': page_header})

# @unauthenticated_user
def user_login(request):
  page_header = 'Login'
  if request.method == 'POST':
    form = LoginForm(data=request.POST)
    if form.is_valid():
      login(request, form.get_user())
      if 'next' in request.POST:
        return redirect(request.POST.get('next'))
      else:
        messages.success(request, f'{form.get_user().full_name()} logged in successfully.')
        return redirect('core:user_dashboard', user_id=form.get_user().id)
    else:
      messages.error(request, f'<p><strong>Login failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'users/login.html', {'form': form, 'page_header': page_header})
  else:
    form = LoginForm()
  
  return render(request, 'users/login.html', {'form': form, 'page_header': page_header})
@authenticated_user
def user_logout(request):
  if request.user.is_authenticated:   
    logout(request)
    messages.success(request, 'You have logged out successfully.')
    return redirect('home')

@authenticated_user
def send_invites(request):
  invite_count = send_pending_invites(user=request.user, school=None)
  messages.success(request, f'Sent {invite_count} invitations.')
  return redirect('core:users_index')
