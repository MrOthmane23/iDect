from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='dash'),
    path('home/', views.home),
    path('login/', views.login_user, name='login'),
    path('add/', views.create),
    path('edit/<int:id>', views.edit),
    path('delete/<int:id>', views.delete),
]
