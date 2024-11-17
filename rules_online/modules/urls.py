from django.urls import path
from. import views

app_name = 'modules'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('exercise_types/new/', views.exercise_type_new, name='exercise_type_new'),
    path('exercise_types/<exercise_type_id>/', views.exercise_type_show, name='exercise_type_show'),
    path('exercise_types/<exercise_type_id>/edit/', views.exercise_type_edit, name='exercise_type_edit'),
    path('exercise_types/<exercise_type_id>/delete/', views.exercise_type_delete, name='exercise_type_delete'),
    path('exercise_types/', views.exercise_types_index, name='exercise_types_index'),

    path('<module_id>/sheets/new/', views.sheet_new, name='sheet_new'),
    path('sheets/<sheet_id>/', views.sheet_show, name='sheet_show'),
    path('sheets/<sheet_id>/edit/', views.sheet_edit, name='sheet_edit'),
    path('sheets/<sheet_id>/delete/', views.sheet_delete, name='sheet_delete'),

    path('<sheet_id>/sheet_exercises/new/', views.sheet_exercise_new, name='sheet_exercise_new'),
    path('sheet_exercises/<sheet_exercise_id>/', views.sheet_exercise_show, name='sheet_exercise_show'),
    path('sheet_exercises/<sheet_exercise_id>/edit/', views.sheet_exercise_edit, name='sheet_exercise_edit'),
    path('sheet_exercises/<sheet_exercise_id>/delete/', views.sheet_exercise_delete, name='sheet_exercise_delete'),

    path('<sheet_exercise_id>/sheet_exercise_items/new/', views.sheet_exercise_item_new, name='sheet_exercise_item_new'),
    path('sheet_exercise_items/<sheet_exercise_item_id>/', views.sheet_exercise_item_show, name='sheet_exercise_item_show'),
    path('sheet_exercise_items/<sheet_exercise_item_id>/edit/', views.sheet_exercise_item_edit, name='sheet_exercise_item_edit'),
    path('sheet_exercise_items/<sheet_exercise_item_id>/delete/', views.sheet_exercise_item_delete, name='sheet_exercise_item_delete'),

    path('new/', views.module_new, name='module_new'),
    path('<module_id>/', views.module_show, name='module_show'),
    path('<module_id>/edit/', views.module_edit, name='module_edit'),
    path('<module_id>/delete/', views.module_delete, name='module_delete'),
    path('', views.modules_index, name='modules_index'),

    path('sample_spell_wordlist', views.sample_spell_wordlist, name='sample_spell_wordlist'),
    path('sample_drag_drop', views.sample_drag_drop, name='sample_drag_drop'),
    path('sample_highlight_nouns', views.sample_highlight_nouns, name='sample_highlight_nouns'),
    path('sample_finish_sentences', views.sample_finish_sentences, name='sample_finish_sentences'),
    path('sample_nouns', views.sample_nouns, name='sample_nouns'),
    path('sample_pronouns', views.sample_pronouns, name='sample_pronouns'),
    path('sample_apostrophes', views.sample_apostrophes, name='sample_apostrophes'),
    path('sample_grid', views.sample_grid, name='sample_grid'),
]
