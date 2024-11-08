from django.urls import path
from. import views

app_name = 'core'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('', views.users_index, name='users_index'),
    path('send_invites/', views.send_invites, name='send_invites'),
    # path('register/', views.register, name='user_register'),
    path('login/', views.user_login, name='user_login'),
    path('logout/', views.user_logout, name='user_logout'),
    path('<user_id>/', views.user_show, name='user_show'),
    path('<user_id>/edit/', views.user_edit, name='user_edit'),
    path('<user_id>/delete/', views.user_delete, name='user_delete'),
    path('<user_id>/dashboard/', views.user_dashboard, name='user_dashboard'),
    # path('<user_id>/reset_password/', views.reset_password, name='reset_password'),
    # path('<user_id>/reset_password_confirm/', views.reset_password_confirm, name='reset_password_confirm'),
]
