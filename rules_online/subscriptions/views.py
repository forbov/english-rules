from django.shortcuts import redirect, render
from django.contrib import messages
from core.utilities import BootstrapTabs
from subscriptions.models import Subscription, SubscriptionExercise, SubscriptionSheet
from subscriptions.forms import SubscriptionForm
from schools.models import SchoolStudent

# Create your views here.
def subscription_new(request, school_student_id):
  school_student = SchoolStudent.objects.get(id=school_student_id)
  page_header = f'New Subscription for {school_student.student.user.full_name()}'
  
  if request.method == 'POST':
    form = SubscriptionForm(data=request.POST, school_student=school_student)
    if form.is_valid():
      form.save()
      return redirect('schools:school_student_show', school_student_id=school_student_id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request,'subscriptions/new.html', {'page_header': page_header,
                                                   'school_student': school_student,
                                                   'form': form})
    
  form = SubscriptionForm(school_student=school_student)
  return render(request,'subscriptions/new.html', {'page_header': page_header,
                                                   'school_student': school_student,
                                                   'form': form})

def subscription_edit(request, subscription_id):
  subscription = Subscription.objects.get(id=subscription_id)
  page_header = f'Edit Subscription for {subscription.school_student.student.user.full_name()}'
  
  if request.method == 'POST':
    form = SubscriptionForm(data=request.POST, instance=subscription, school_student=subscription.school_student)
    if form.is_valid():
      subscription.module = form.cleaned_data['module']
      subscription.save()
      messages.success(request, 'Subscription updated successfully.')
      return redirect('schools:school_student_show', school_student_id=subscription.school_student.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request,'subscriptions/edit.html', {'page_header': page_header,
                                                        'subscription': subscription,
                                                        'form': form})
    
  form = SubscriptionForm(instance=subscription, school_student=subscription.school_student)
  return render(request,'subscriptions/edit.html', {'page_header': page_header,
                                                    'subscription': subscription,
                                                    'form': form})

def subscription_delete(request, subscription_id):
  subscription = Subscription.objects.get(id=subscription_id)
  subscription.delete()
  messages.success(request, 'Subscription deleted successfully.')
  return redirect('schools:school_student_show', school_student_id=subscription.school_student.id)

def subscription_show(request, subscription_id):
  subscription = Subscription.objects.get(id=subscription_id)
  page_header = 'Subscription Details'

  bootstrap_tabs = BootstrapTabs({'sheets': {'label': 'Sheets', 
                                             'render': 'subscription_sheets/_subscription_sheets.html', 
                                             'dataset': subscription.sheets.all(), 
                                             'source': 'subscription'}})

  return render(request,'subscriptions/show.html', {'page_header': page_header,
                                                    'subscription': subscription,
                                                    'has_tabs': bootstrap_tabs.has_tabs, 
                                                    'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                                    'tab_contents': bootstrap_tabs.render_tab_contents()})

def subscription_start(request, subscription_id):
  subscription = Subscription.objects.get(id=subscription_id)
  subscription.start()
  messages.success(request, 'Subscription started successfully.')
  return redirect('subscriptions:subscription_show', subscription_id=subscription.id)

def subscription_sheet_show(request, subscription_sheet_id):
  page_header = 'Subscription Sheet Details'
  subscription_sheet = SubscriptionSheet.objects.get(id=subscription_sheet_id)

  bootstrap_tabs = BootstrapTabs({'sheets': {'label': 'Exercises', 
                                             'render': 'subscription_exercises/_subscription_exercises.html', 
                                             'dataset': subscription_sheet.exercises.all(), 
                                             'source': 'subscription_sheet'}})

  return render(request,'subscription_sheets/show.html', {'page_header': page_header,
                                                          'subscription_sheet': subscription_sheet,
                                                          'has_tabs': bootstrap_tabs.has_tabs, 
                                                          'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                                          'tab_contents': bootstrap_tabs.render_tab_contents()})

def subscription_exercise_show(request, subscription_exercise_id):
  page_header = 'Subscription Exercise Details'
  subscription_exercise = SubscriptionExercise.objects.get(id=subscription_exercise_id)

  return render(request,'subscription_exercises/show.html', {'page_header': page_header,
                                                             'subscription_exercise': subscription_exercise})

