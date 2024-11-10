from django.shortcuts import render
from modules.forms import WordListForm

# Create your views here.

def sample_spell_wordlist(request):
  page_header = 'Sample Wordlist'
  form = WordListForm()
  return render(request,'questions/sample_spell_wordlist.html', {'form': form, 'page_header': page_header})

def sample_drag_drop(request):
  page_header = 'Sample Drag & Drop'
  return render(request,'questions/sample_drag_drop.html', {'page_header': page_header})
