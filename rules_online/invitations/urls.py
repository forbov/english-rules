from django.urls import path
from. import views

app_name = 'invitations'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('new/', views.invitation_new, name='invitation_new'),
    path('<invitation_id>', views.invitation_show, name='invitation_show'),
    path('<invitation_id>/edit/', views.invitation_edit, name='invitation_edit'),
    path('<invitation_id>/delete/', views.invitation_delete, name='invitation_delete'),
    path('<invitation_id>/reset/', views.invitation_reset, name='invitation_reset'),
    path('accept/', views.invitation_accept, name='invitation_accept'),
]
