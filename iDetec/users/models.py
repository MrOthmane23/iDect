from django.db import models
import os
# Create your models here.
class User(models.Model):
    id = models.IntegerField
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    role = models.CharField(max_length=50)

class Images(models.Model):
        id = models.IntegerField
        chemin = models.ImageField(upload_to="static/filepath", null=True, blank=True)
