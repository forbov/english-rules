from django.urls import path
from. import views

app_name = 'core'  # This app's name in URLconf.  # name is used in reverse() function to get URL from name.  # reverse('app_name:

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('<user_id>/', views.show, name='show'),
]
