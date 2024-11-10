from django.shortcuts import render
from modules.forms import WordListForm

# Create your views here.

def sample_spell_wordlist(request):
    page_header = 'Sample Wordlist'
    form = WordListForm()
    return render(request,'questions/sample_spell_wordlist.html', {'form': form, 'page_header': page_header})
