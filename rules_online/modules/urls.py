from django.urls import path
from. import views

app_name = 'modules'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('sample_spell_wordlist', views.sample_spell_wordlist, name='sample_spell_wordlist'),
    path('sample_drag_drop', views.sample_drag_drop, name='sample_drag_drop'),
]
