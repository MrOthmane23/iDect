from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='dash'),
    path('home/', views.home),
    path('login/', views.login_user, name='login'),
    path('add/', views.create),
    path('edit/<int:id>', views.edit),
    path('delete/<int:id>', views.delete),
<<<<<<< HEAD
=======
    path('upload/', views.upload, name='upload'),

>>>>>>> 3a38b269f3791c6e75e40b072666f3f0fc8d2300
]
