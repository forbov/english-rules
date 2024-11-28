import csv
from django.shortcuts import redirect, render
from django.forms import inlineformset_factory
from modules.forms import ExerciseTypeForm, ModuleForm, NounsForm, PunctuationForm, SentenceWithDropdownForm, SheetExerciseForm, SheetExerciseItemForm, SheetForm, WordLadderForm, WordListForm
from modules.models import ExerciseType, Module, Sheet, SheetExercise, SheetExerciseItem

from core.utilities import BootstrapTabs
from rules_online import settings
from django.contrib import messages
# Create your views here.

def modules_index(request):
  page_header = 'Modules'
  modules = Module.objects.all()
  return render(request,'modules/index.html', {'modules': modules, 'page_header': page_header})

def module_delete(request, module_id):
  module = Module.objects.get(id=module_id)
  module.delete()
  messages.success(request, 'Module deleted successfully.')
  return redirect('modules:modules_index')

def module_show(request, module_id):
  module = Module.objects.get(id=module_id)
  page_header = f'{module.name}'

  bootstrap_tabs = BootstrapTabs({'sheets': {'label': 'Sheets', 
                                             'render': 'sheets/_sheets.html', 
                                             'dataset': module.sheets.all(), 
                                             'source': 'module'}})

  return render(request,'modules/show.html', {'module': module, 'page_header': page_header,
                                              'has_tabs': bootstrap_tabs.has_tabs, 
                                               'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                               'tab_contents': bootstrap_tabs.render_tab_contents()})

def module_new(request):
  page_header = 'New Module'
  if request.method == 'POST':
    form = ModuleForm(request.POST)
    if form.is_valid():
      module = form.save()
      messages.success(request, f'Module {module.name} created successfully.')
      return redirect('modules:module_show', module.id)

  form = ModuleForm()
  return render(request,'modules/new.html', {'form': form, 'page_header': page_header})


def module_edit(request, module_id):
  module = Module.objects.get(id=module_id)
  page_header = f'Edit {module.name}'
  if request.method == 'POST':
    form = ModuleForm(request.POST, instance=module)

    if form.is_valid():
      module.name = form.cleaned_data['name']
      module.level = form.cleaned_data['level']
      module.description = form.cleaned_data['description']
      module.save()
      messages.success(request, f'Module {module.name} updated successfully.')
      return redirect('modules:module_show', module.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request,'modules/edit.html', {'form': form, 'module': module, 
                                                        'page_header': page_header, })
    
  form = ModuleForm(instance=module)
  return render(request,'modules/edit.html', {'form': form, 'module': module, 
                                                      'page_header': page_header, })

def exercise_types_index(request):
  page_header = 'Exercise Types'
  exercise_types = ExerciseType.objects.all()
  return render(request,'exercise_types/index.html', {'exercise_types': exercise_types, 'page_header': page_header})

def exercise_type_delete(request, exercise_type_id):
  exercise_type = ExerciseType.objects.get(id=exercise_type_id)
  exercise_type.delete()
  messages.success(request, 'Exercise Type deleted successfully.')
  return redirect('modules:exercise_types_index')

def exercise_type_show(request, exercise_type_id):
  exercise_type = ExerciseType.objects.get(id=exercise_type_id)
  page_header = f'{exercise_type.name}'
  return render(request,'exercise_types/show.html', {'exercise_type': exercise_type, 'page_header': page_header})

def exercise_type_new(request):
  page_header = 'New Exercise Type'
  if request.method == 'POST':
    form = ExerciseTypeForm(request.POST)
    if form.is_valid():
      exercise_type = form.save()
      messages.success(request, f'Exercise Type {exercise_type.name} created successfully.')
      return redirect('modules:exercise_type_show', exercise_type.id)
    else:
      messages.error(request, f'<p><strong>Create failed with the following errors:</strong></p>{form.errors}')
      return render(request,'exercise_types/new.html', {'form': form, 'page_header': page_header})
    
  form = ExerciseTypeForm()
  return render(request,'exercise_types/new.html', {'form': form, 'page_header': page_header})

def exercise_type_edit(request, exercise_type_id):
  exercise_type = ExerciseType.objects.get(id=exercise_type_id)
  page_header = f'Edit {exercise_type.name}'
  if request.method == 'POST':
    form = ExerciseTypeForm(request.POST, instance=exercise_type)
    if form.is_valid():
      exercise_type.name = form.cleaned_data['name']
      exercise_type.banner = form.cleaned_data['banner']
      exercise_type.instructions = form.cleaned_data['instructions']
      exercise_type.html_pt1 = form.cleaned_data['html_pt1']
      exercise_type.html_pt2 = form.cleaned_data['html_pt2']
      exercise_type.html_pt3 = form.cleaned_data['html_pt3']
      exercise_type.save()
      messages.success(request, f'Exercise Type {exercise_type.name} updated successfully.')
      return redirect('modules:exercise_type_show', exercise_type.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request,'exercise_types/edit.html', {'form': form, 'exercise_type': exercise_type, 
                                                          'page_header': page_header, })
    
  form = ExerciseTypeForm(instance=exercise_type)
  return render(request,'exercise_types/edit.html', {'form': form, 'exercise_type': exercise_type, 
                                                      'page_header': page_header, })
def sheet_show(request, sheet_id):
  sheet = Sheet.objects.get(id=sheet_id)
  page_header = f'{sheet.name} for {sheet.module.name}'
  
  bootstrap_tabs = BootstrapTabs({'exercises': {'label': 'Exercises', 
                                             'render': 'sheet_exercises/_sheet_exercises.html', 
                                             'dataset': sheet.exercises.all().order_by('order'), 
                                             'source': 'sheet'}})

  return render(request,'sheets/show.html', {'sheet': sheet, 'page_header': page_header,
                                             'has_tabs': bootstrap_tabs.has_tabs, 
                                             'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                             'tab_contents': bootstrap_tabs.render_tab_contents()})

def sheet_new(request, module_id):
  module = Module.objects.get(id=module_id)
  page_header = f'New Sheet in {module.name}'

  if request.method == 'POST':
    form = SheetForm(request.POST)

    if form.is_valid():
      sheet = form.save(module)
      messages.success(request, f'Sheet {sheet.name} created successfully.')
      return redirect('modules:sheet_show', sheet.id)
    else:
      messages.error(request, f'<p><strong>Create failed with the following errors:</strong></p>{form.errors}')
      return render(request,'sheets/new.html', {'form': form, 'module': module, 
                                                        'page_header': page_header, })
  
  form = SheetForm()
  return render(request,'sheets/new.html', {'form': form, 'module': module, 
                                            'page_header': page_header})

def sheet_delete(request, sheet_id):
  sheet = Sheet.objects.get(id=sheet_id)
  module = sheet.module
  sheet.delete()
  messages.success(request, 'Sheet deleted successfully.')
  return redirect('modules:module_show', module_id=module.id)

def sheet_edit(request, sheet_id):
  sheet = Sheet.objects.get(id=sheet_id)
  module = sheet.module
  page_header = f'Edit {sheet.name} for {module.name}'
  if request.method == 'POST':
    form = SheetForm(request.POST, instance=sheet)
    if form.is_valid():
      sheet.module_id = module.id
      sheet.name = form.cleaned_data['name']
      sheet.sheet_number = form.cleaned_data['sheet_number']
      sheet.description = form.cleaned_data['description']
      sheet.save()
      messages.success(request, f'{sheet.name} updated successfully.')
      return redirect('modules:sheet_show', sheet.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request,'sheets/edit.html', {'form': form, 'sheet': sheet, 
                                                 'module': module, 'page_header': page_header, })
    
  form = SheetForm(instance=sheet)
  return render(request,'sheets/edit.html', {'form': form, 'sheet': sheet, 
                                             'module': module, 'page_header': page_header, })


def sheet_exercise_show(request, sheet_exercise_id):
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  page_header = f'Exercise {sheet_exercise.order} for {sheet_exercise.sheet.name}'
  
  bootstrap_tabs = BootstrapTabs({'exercise_items': {'label': 'Items', 
                                             'render': 'sheet_exercise_items/_sheet_exercise_items.html', 
                                             'dataset': sheet_exercise.exercise_items.all(), 
                                             'source': 'sheet_exercise'}})

  return render(request,'sheet_exercises/show.html', {'sheet_exercise': sheet_exercise, 
                                                      'page_header': page_header,
                                                      'has_tabs': bootstrap_tabs.has_tabs, 
                                                      'tab_headers': bootstrap_tabs.render_tab_headers(), 
                                                      'tab_contents': bootstrap_tabs.render_tab_contents()})

def sheet_exercise_new(request, sheet_id):
  sheet = Sheet.objects.get(id=sheet_id)
  page_header = f'New Exercise for {sheet.name}'
  if request.method == 'POST':
    form = SheetExerciseForm(request.POST)
    if form.is_valid():
      sheet_exercise = form.save(sheet)
      messages.success(request, f'Exercise {sheet_exercise.order} created successfully.')
      return redirect('modules:sheet_show', sheet_id=sheet.id)
    else:
      messages.error(request, f'<p><strong>Create failed with the following errors:</strong></p>{form.errors}')
      return render(request,'sheet_exercises/new.html', {'form': form, 'page_header': page_header, 
                                                         'sheet': sheet})
    
  form = SheetExerciseForm()
  return render(request,'sheet_exercises/new.html', {'form': form, 'page_header': page_header, 
                                                     'sheet': sheet})

def sheet_exercise_delete(request, sheet_exercise_id):
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  sheet = sheet_exercise.sheet
  sheet_exercise.delete()
  messages.success(request, 'Exercise deleted successfully.')
  return redirect('modules:sheet_show', sheet_id=sheet.id)

def sheet_exercise_edit(request, sheet_exercise_id):
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  sheet = sheet_exercise.sheet
  page_header = f'Edit Exercise {sheet_exercise.order} for {sheet.name}'
  if request.method == 'POST':
    form = SheetExerciseForm(request.POST, instance=sheet_exercise)
    if form.is_valid():
      # exercise_type = ExerciseType.objects.get(id=form.cleaned_data['exercise_type'])
      sheet_exercise.exercise_type = form.cleaned_data['exercise_type']
      sheet_exercise.title = form.cleaned_data['title']
      sheet_exercise.order = form.cleaned_data['order']
      sheet_exercise.banner = form.cleaned_data['banner']
      sheet_exercise.instructions = form.cleaned_data['instructions']
      sheet_exercise.line_items_for_student = form.cleaned_data['line_items_for_student']
      sheet_exercise.dropdown_type = form.cleaned_data['dropdown_type']

      sheet_exercise.save()
      messages.success(request, f'Exercise updated successfully.')
      return redirect('modules:sheet_exercise_show', sheet_exercise_id=sheet_exercise.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request,'sheet_exercises/edit.html', {'form': form, 'sheet_exercise': sheet_exercise, 
                                                        'sheet': sheet, 'page_header': page_header, })
    
  form = SheetExerciseForm(instance=sheet_exercise)
  return render(request,'sheet_exercises/edit.html', {'form': form, 'sheet_exercise': sheet_exercise, 
                                                     'sheet': sheet, 'page_header': page_header, })


def sheet_exercise_item_show(request, sheet_exercise_item_id):
  sheet_exercise_item = SheetExerciseItem.objects.get(id=sheet_exercise_item_id)
  page_header = f'Exercise Item for Sheet Exercise {sheet_exercise_item.sheet_exercise.order}'

  return render(request,'sheet_exercise_items/show.html', {'sheet_exercise_item': sheet_exercise_item, 
                                                           'page_header': page_header})

def sheet_exercise_item_new(request, sheet_exercise_id):
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  page_header = f'New Exercise Item for Sheet Exercise {sheet_exercise.order}'
  if request.method == 'POST':
    form = SheetExerciseItemForm(data=request.POST, sheet_exercise=sheet_exercise)
    if form.is_valid():
      sheet_exercise_item = form.save(sheet_exercise)
      messages.success(request, f'Exercise Item created successfully.')
      return redirect('modules:sheet_exercise_show', sheet_exercise_id=sheet_exercise.id)
    else:
      messages.error(request, f'<p><strong>Create failed with the following errors:</strong></p>{form.errors}')
      return render(request,'sheet_exercise_items/new.html', {'form': form, 'page_header': page_header, 
                                                            'sheet_exercise': sheet_exercise})
    
  form = SheetExerciseItemForm(sheet_exercise=sheet_exercise)
  return render(request,'sheet_exercise_items/new.html', {'form': form, 'page_header': page_header, 
                                                        'sheet_exercise': sheet_exercise})

def sheet_exercise_item_delete(request, sheet_exercise_item_id):
  sheet_exercise_item = SheetExerciseItem.objects.get(id=sheet_exercise_item_id)
  sheet_exercise = sheet_exercise_item.sheet_exercise
  sheet_exercise_item.delete()
  messages.success(request, 'Exercise Item deleted successfully.')
  return redirect('modules:sheet_exercise_show', sheet_exercise_id=sheet_exercise.id)

def sheet_exercise_item_edit(request, sheet_exercise_item_id):
  sheet_exercise_item = SheetExerciseItem.objects.get(id=sheet_exercise_item_id)
  sheet_exercise = sheet_exercise_item.sheet_exercise
  page_header = f'Edit Exercise Item for Sheet Exercise {sheet_exercise.order}'
  if request.method == 'POST':
    form = SheetExerciseItemForm(data=request.POST, instance=sheet_exercise_item, sheet_exercise=sheet_exercise)
    if form.is_valid():
      sheet_exercise_item.content1 = form.cleaned_data['content1']
      # sheet_exercise_item.content2 = form.cleaned_data['content2']
      # sheet_exercise_item.content3 = form.cleaned_data['content3']
      sheet_exercise_item.answer1 = form.cleaned_data['answer1']
      sheet_exercise_item.answer2 = form.cleaned_data['answer2']
      sheet_exercise_item.save()
      messages.success(request, f'Exercise Item updated successfully.')
      return redirect('modules:sheet_exercise_item_show', sheet_exercise_item_id=sheet_exercise_item.id)
    else:
      messages.error(request, f'<p><strong>Update failed with the following errors:</strong></p>{form.errors}')
      return render(request,'sheet_exercise_items/edit.html', {'form': form, 'sheet_exercise_item': sheet_exercise_item, 
                                                               'sheet_exercise': sheet_exercise, 'page_header': page_header})
    
  form = SheetExerciseItemForm(instance=sheet_exercise_item, sheet_exercise=sheet_exercise)
  return render(request,'sheet_exercise_items/edit.html', {'form': form, 'sheet_exercise_item': sheet_exercise_item, 
                                                           'sheet_exercise': sheet_exercise, 'page_header': page_header})

    

# sample views

def sample_spell_wordlist(request, sheet_exercise_id):
  page_header = 'Sample Wordlist'
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  form = WordListForm(sheet_exercise=sheet_exercise)
  return render(request,'samples/sample_spell_wordlist.html', {'form': form, 'page_header': page_header, 
                                                               'sheet_exercise': sheet_exercise})

def sample_drag_drop(request):
  page_header = 'Sample Drag & Drop'
  return render(request,'samples/sample_drag_drop.html', {'page_header': page_header})

def sample_highlight_nouns(request):
  page_header = 'Sample Highlight Nouns'
  return render(request,'samples/sample_highlight_nouns.html', {'page_header': page_header})

def sample_finish_sentences(request):
  page_header = 'Sample Finish Sentences'
  return render(request,'samples/sample_finish_sentences.html', {'page_header': page_header})

def sample_nouns(request):
  page_header = 'Sample Nouns'
  form = NounsForm()
  return render(request,'samples/sample_nouns.html', {'page_header': page_header, 'form': form})

def sample_pronouns(request):
  page_header = 'Sample Pronouns'
  return render(request,'samples/sample_pronouns.html', {'page_header': page_header})

def sample_apostrophes(request):
  page_header = 'Sample Apostrophes'
  return render(request,'samples/sample_apostrophes.html', {'page_header': page_header})

def sample_grid(request):
  page_header = 'Sample Grid'
  return render(request,'samples/sample_grid.html', {'page_header': page_header})

def sample_punctuation(request, sheet_exercise_id):
  page_header = 'Sample Punctuation'
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  form = PunctuationForm(sheet_exercise=sheet_exercise)

  return render(request,'samples/sample_punctuation.html', {'page_header': page_header,
                                                            'form': form,
                                                            'sheet_exercise': sheet_exercise})

def sample_sentence_with_dropdown(request, sheet_exercise_id):
  page_header = 'Sample Sentence With Dropdown'
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  form = SentenceWithDropdownForm(sheet_exercise=sheet_exercise)
  return render(request,'samples/sample_sentence_with_dropdown.html', {'page_header': page_header,
                                                                       'sheet_exercise': sheet_exercise,
                                                                       'form': form})

def sample_wordsearch(request, sheet_exercise_id):
  page_header = 'Sample Word Search'
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  words = ['save', 'earn', 'invest', 'retirement', 'account', 'money', 'credit', 'debt', 'assets', 'loan', 'interest', 'accrual',
 'economy', 'sharing', 'savings', 'budget', 'capital', 'collateral', 'bond', 'market', 'value', 'index']
  
  return render(request,'samples/sample_wordsearch.html', {'page_header': page_header,
                                                           'sheet_exercise': sheet_exercise,
                                                           'words': sheet_exercise.answer1_as_list(),})

def sample_wordladder(request, sheet_exercise_id):
  page_header = 'Sample Word Ladder'
  sheet_exercise = SheetExercise.objects.get(id=sheet_exercise_id)
  sheet_item_1 = sheet_exercise.exercise_items.all().first()

  form = WordLadderForm(sheet_exercise=sheet_exercise)
  return render(request,'samples/sample_wordladder.html', {'page_header': page_header,
                                                            'sheet_exercise': sheet_exercise,
                                                            'word0': sheet_item_1.answer1,
                                                            'word_final': sheet_item_1.answer2,
                                                            'form': form})