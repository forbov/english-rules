from django.shortcuts import redirect, render
from modules.forms import ModuleForm, NounsForm, WordListForm
from modules.models import Module
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
  return render(request,'modules/show.html', {'module': module, 'page_header': page_header})

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
# sample views

def sample_spell_wordlist(request):
  page_header = 'Sample Wordlist'
  form = WordListForm()
  return render(request,'samples/sample_spell_wordlist.html', {'form': form, 'page_header': page_header})

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