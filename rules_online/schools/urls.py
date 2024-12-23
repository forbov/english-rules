from django.urls import path
from. import views

app_name = 'schools'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('', views.schools_index, name='schools_index'),
    path('<school_id>/', views.school_show, name='school_show'),
    path('<school_id>/edit/', views.school_edit, name='school_edit'),
    path('<school_id>/delete/', views.school_delete, name='school_delete'),
    path('<school_id>/send_invites/', views.send_invites, name='send_invites'),
    path('students/<student_id>/', views.student_show, name='student_show'),
    path('teachers/<teacher_id>/', views.teacher_show, name='teacher_show'),
    path('school_students/<school_student_id>/', views.school_student_show, name='school_student_show')
]
