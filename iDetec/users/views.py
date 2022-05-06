from pyexpat.errors import messages

from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.shortcuts import render, redirect

# Create your views here.
from .models import User


def home(request):
    return render(request, 'index.html')


def index(request):
    users = User.objects.all()
    return render(request, 'CRUD/listUser.html', {
        'users': users
    })


def login_user(request):
    if request.method == "GET":
        return render(request, 'registration/login.html')
    else:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('users/')
        else:
            messages.success(request, "Username password not correct!!")
            return redirect('users/login/')


def detail(request, id):
    user = User.objects.get(pk=id)
    # profil
    return render(request, 'profile.html', {
        'user': user
    })


def edit(request, id):
    id1 = id
    if request.method == "GET":
        user = User.objects.filter(id=id).get
        return render(request, 'CRUD/editUser.html', {
            'user': user
        })
    else:
        nom = request.POST['nom']
        prenom = request.POST['prenom']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        role = request.POST['role']

        user = User(id1, nom, prenom, username, email, password, role)
        user.save()

        return redirect('/users')


def delete(request, id):
    user = User.objects.get(pk=id).delete()

    return redirect('/users')


def create(request):
    if request.method == "GET":
        return render(request, 'CRUD/createUser.html')
    else:
        nom = request.POST['nom']
        prenom = request.POST['prenom']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        role = request.POST['role']

        user = User(None, nom, prenom, username, email, password, role)
        user.save()

        return redirect('/users')
