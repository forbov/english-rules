from django.shortcuts import render, redirect
from .models import User

from core.app_helper import BootstrapTabs
from .decorators import authenticated_user
from .forms import LoginForm, RegisterForm
from django.contrib.auth import login, logout
from django.contrib import messages

# Create your views here.
@authenticated_user
def index(request):
  page_header = 'Users'
  users = User.objects.all()
  return render(request, 'users/index.html', {'users': users, 'page_header': page_header})

def show(request, user_id):
  user = User.objects.get(id=user_id)
  bootstrap_tabs = BootstrapTabs({'posts': {'label': 'Posts', 
                                            'render': 'posts', 
                                            'dataset': user.post_set.all(), 
                                            'source': 'user'}})
  page_header = f'{user.username} Profile'
  return render(request, 'users/show.html', {'user': user, 'page_header': page_header, 
                                             'has_tabs': bootstrap_tabs.has_tabs, 
                                             'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                             'tab_contents': bootstrap_tabs.render_tab_contents()})

def register(request):
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

def login_user(request):
  page_header = 'Login'
  if request.method == 'POST':
    form = LoginForm(data=request.POST)
    if form.is_valid():
      login(request, form.get_user())
      if 'next' in request.POST:
        return redirect(request.POST.get('next'))
      else:
        messages.success(request, f'{form.get_user().full_name()} logged in successfully.')
        return redirect('core:index')
    else:
      messages.error(request, f'<p><strong>Login failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'users/login.html', {'form': form, 'page_header': page_header})
  else:
    form = LoginForm()
  
  return render(request, 'users/login.html', {'form': form, 'page_header': page_header})
@authenticated_user
def logout_user(request):
  if request.user.is_authenticated:   
    logout(request)
    messages.success(request, 'You have logged out successfully.')
    return redirect('home')
