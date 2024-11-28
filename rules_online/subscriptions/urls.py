from django.urls import path
from. import views

app_name = 'subscriptions'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('subscription_sheets/<subscription_sheet_id>/', views.subscription_sheet_show, name='subscription_sheet_show'),

    path('subscription_exercises/<subscription_exercise_id>/', views.subscription_exercise_show, name='subscription_exercise_show'),

    # path('<subscription_exercise_id>/subscription_exercise_items/new/', views.subscription_exercise_item_new, name='subscription_exercise_item_new'),
    # path('subscription_exercise_items/<subscription_exercise_item_id>/', views.subscription_exercise_item_show, name='subscription_exercise_item_show'),
    # path('subscription_exercise_items/<subscription_exercise_item_id>/edit/', views.subscription_exercise_item_edit, name='subscription_exercise_item_edit'),
    # path('subscription_exercise_items/<subscription_exercise_item_id>/delete/', views.subscription_exercise_item_delete, name='subscription_exercise_item_delete'),

    path('<school_student_id>/new/', views.subscription_new, name='subscription_new'),
    path('<subscription_id>/edit/', views.subscription_edit, name='subscription_edit'),
    path('<subscription_id>/delete/', views.subscription_delete, name='subscription_delete'),
    path('<subscription_id>/start/', views.subscription_start, name='subscription_start'),
    path('<subscription_id>/', views.subscription_show, name='subscription_show'),
]
