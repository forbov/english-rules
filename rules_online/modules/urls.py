from django.urls import path
from. import views

app_name = 'modules'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('sample_spell_wordlist', views.sample_spell_wordlist, name='sample_spell_wordlist'),
    path('sample_drag_drop', views.sample_drag_drop, name='sample_drag_drop'),
    path('sample_highlight_nouns', views.sample_highlight_nouns, name='sample_highlight_nouns'),
    path('sample_finish_sentences', views.sample_finish_sentences, name='sample_finish_sentences'),
    path('sample_nouns', views.sample_nouns, name='sample_nouns'),
    path('sample_pronouns', views.sample_pronouns, name='sample_pronouns'),
    path('sample_apostrophes', views.sample_apostrophes, name='sample_apostrophes'),
]
