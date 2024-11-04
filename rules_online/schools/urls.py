from django.urls import path
from. import views

app_name = 'schools'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('', views.schools_index, name='schools_index'),
    path('<school_id>/', views.school_show, name='school_show'),
    path('<school_id>/edit/', views.school_edit, name='school_edit'),
    path('<school_id>/delete/', views.school_delete, name='school_delete'),
    path('invitations/new/', views.invitation_new, name='invitation_new'),
    path('invitations/<invitation_id>', views.invitation_show, name='invitation_show'),
    path('invitations/<invitation_id>/edit/', views.invitation_edit, name='invitation_edit'),
    path('invitations/<invitation_id>/delete/', views.invitation_delete, name='invitation_delete'),
    path('invitations/<invitation_id>/reset/', views.invitation_reset, name='invitation_reset'),
]
