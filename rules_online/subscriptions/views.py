from django.shortcuts import redirect, render
from django.contrib import messages
from core.decorators import authenticated_user
from core.utilities import BootstrapTabs, ExerciseTypeContent
from modules.models import SENTENCE_WITH_DROPDOWN_EXERCISE, WORDLADDER_EXERCISE, WORDLIST_EXERCISE, PUNCTUATION_EXERCISE
from subscriptions.models import Subscription, SubscriptionExercise, SubscriptionSheet
from subscriptions.forms import PunctuationForm, SentenceWithDropdownForm, SubscriptionForm, WordLadderForm, WordListForm
from schools.models import SchoolStudent

# Create your views here.
@authenticated_user
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

@authenticated_user
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

@authenticated_user
def subscription_delete(request, subscription_id):
  subscription = Subscription.objects.get(id=subscription_id)
  subscription.delete()
  messages.success(request, 'Subscription deleted successfully.')
  return redirect('schools:school_student_show', school_student_id=subscription.school_student.id)

@authenticated_user
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

@authenticated_user
def subscription_start(request, subscription_id):
  subscription = Subscription.objects.get(id=subscription_id)
  subscription.start()
  messages.success(request, 'Subscription started successfully.')
  return redirect('subscriptions:subscription_show', subscription_id=subscription.id)

@authenticated_user
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

@authenticated_user
def subscription_exercise_show(request, subscription_exercise_id):
  page_header = 'Subscription Exercise Details'
  subscription_exercise = SubscriptionExercise.objects.get(id=subscription_exercise_id)

  return render(request,'subscription_exercises/show.html', {'page_header': page_header,
                                                             'subscription_exercise': subscription_exercise})

@authenticated_user
def subscription_exercise_edit(request, subscription_exercise_id):
  subscription_exercise = SubscriptionExercise.objects.get(id=subscription_exercise_id)
  line_items = subscription_exercise.exercise.line_items_for_student
  exercise_type = subscription_exercise.exercise.exercise_type
  page_header = f'{subscription_exercise.exercise.title}: {subscription_exercise.subscription_sheet.subscription.school_student.student.user.full_name()}'
  sheet_item_1 = subscription_exercise.exercise.exercise_items.all().first()

  form = None

  if request.method == 'POST':
    if exercise_type.id == WORDLIST_EXERCISE:
      form = WordListForm(data=request.POST, subscription_exercise=subscription_exercise)
    elif exercise_type.id == SENTENCE_WITH_DROPDOWN_EXERCISE:
      form = SentenceWithDropdownForm(data=request.POST, subscription_exercise=subscription_exercise)
    elif exercise_type.id == PUNCTUATION_EXERCISE:
      form = PunctuationForm(data=request.POST, subscription_exercise=subscription_exercise)
    elif exercise_type.id == WORDLADDER_EXERCISE:
      form = WordLadderForm(data=request.POST, subscription_exercise=subscription_exercise)
      
    exercise_type_content = ExerciseTypeContent(exercise_type=exercise_type, form=form, line_items=line_items, exercise_item=sheet_item_1)
  
    if form.is_valid():
      form.save()
      messages.success(request, 'Exercise saved successfully.')
      next_exercise = subscription_exercise.next_exercise()
      if next_exercise:
        return redirect('subscriptions:subscription_exercise_edit', subscription_exercise_id=next_exercise.id)
      else:  
        return redirect('subscriptions:subscription_sheet_show', subscription_sheet_id=subscription_exercise.subscription_sheet.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request, 'subscription_exercises/edit.html', {'page_header': page_header,
                                                                  'subscription_exercise': subscription_exercise,
                                                                  'form': form,
                                                                  'html1': exercise_type_content.render_html_pt1,
                                                                  'html2': exercise_type_content.render_html_pt2,
                                                                  'exercise_type': exercise_type.id,
                                                                  })

  if exercise_type.id == WORDLIST_EXERCISE:
    form = WordListForm(subscription_exercise=subscription_exercise)
  elif exercise_type.id == SENTENCE_WITH_DROPDOWN_EXERCISE:
    form = SentenceWithDropdownForm(subscription_exercise=subscription_exercise)
  elif exercise_type.id == PUNCTUATION_EXERCISE:
    form = PunctuationForm(subscription_exercise=subscription_exercise)
  elif exercise_type.id == WORDLADDER_EXERCISE:
    form = WordLadderForm(subscription_exercise=subscription_exercise)
    
  exercise_type_content = ExerciseTypeContent(exercise_type=exercise_type, form=form, line_items=line_items, exercise_item=sheet_item_1)
  
  return render(request,'subscription_exercises/edit.html', {'page_header': page_header,
                                                             'subscription_exercise': subscription_exercise,
                                                             'form': form,
                                                             'html1': exercise_type_content.render_html_pt1,
                                                             'html2': exercise_type_content.render_html_pt2,
                                                             'html3': exercise_type_content.render_html_pt3
                                                             })