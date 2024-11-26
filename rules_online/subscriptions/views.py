from django.shortcuts import redirect, render
from django.contrib import messages
from subscriptions.models import Subscription
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

def subscription_show(request, subscription_id):
  page_header = 'Subscription Details'
  return render(request,'subscriptions/show.html', {'page_header': page_header})

def subscription_sheet_new(request, subscription_id):
  page_header = 'New Subscription Sheet'
  return render(request,'subscription_sheets/new.html', {'page_header': page_header})

def subscription_sheet_edit(request, subscription_sheet_id):
  page_header = 'Edit Subscription Sheet'
  return render(request,'subscription_sheets/edit.html', {'page_header': page_header})

def subscription_sheet_delete(request, subscription_sheet_id):
  page_header = 'Delete Subscription Sheet'
  return render(request,'subscription_sheets/delete.html', {'page_header': page_header})

def subscription_sheet_show(request, subscription_sheet_id):
  page_header = 'Subscription Sheet Details'
  return render(request,'subscription_sheets/show.html', {'page_header': page_header})

def subscription_exercise_new(request, subscription_sheet_id):
  page_header = 'New Subscription Exercise'
  return render(request,'subscription_exercises/new.html', {'page_header': page_header})

def subscription_exercise_edit(request, subscription_exercise_id):
  page_header = 'Edit Subscription Exercise'
  return render(request,'subscription_exercises/edit.html', {'page_header': page_header})

def subscription_exercise_delete(request, subscription_exercise_id):
  page_header = 'Delete Subscription Exercise'
  return render(request,'subscription_exercises/delete.html', {'page_header': page_header})

def subscription_exercise_show(request, subscription_exercise_id):
  page_header = 'Subscription Exercise Details'
  return render(request,'subscription_exercises/show.html', {'page_header': page_header})

