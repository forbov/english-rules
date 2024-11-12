from django.shortcuts import render
from modules.forms import NounsForm, WordListForm

# Create your views here.

def sample_spell_wordlist(request):
  page_header = 'Sample Wordlist'
  form = WordListForm()
  return render(request,'questions/sample_spell_wordlist.html', {'form': form, 'page_header': page_header})

def sample_drag_drop(request):
  page_header = 'Sample Drag & Drop'
  return render(request,'questions/sample_drag_drop.html', {'page_header': page_header})

def sample_highlight_nouns(request):
  page_header = 'Sample Highlight Nouns'
  return render(request,'questions/sample_highlight_nouns.html', {'page_header': page_header})

def sample_finish_sentences(request):
  page_header = 'Sample Finish Sentences'
  return render(request,'questions/sample_finish_sentences.html', {'page_header': page_header})

def sample_nouns(request):
  page_header = 'Sample Nouns'
  form = NounsForm()
  return render(request,'questions/sample_nouns.html', {'page_header': page_header, 'form': form})

def sample_pronouns(request):
  page_header = 'Sample Pronouns'
  return render(request,'questions/sample_pronouns.html', {'page_header': page_header})

def sample_apostrophes(request):
  page_header = 'Sample Apostrophes'
  return render(request,'questions/sample_apostrophes.html', {'page_header': page_header})