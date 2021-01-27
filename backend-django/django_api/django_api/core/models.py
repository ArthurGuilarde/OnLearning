from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username', 'password']

  email = models.EmailField(max_length=254, unique=True)
  
  credit = models.IntegerField(default=0)

  created_at = models.DateTimeField(("Criado em"), auto_now_add=True)
  updated_at = models.DateTimeField(("Atualizado em"), auto_now=True)
  
  class Meta:
    permissions = (
      ('teacher_user', 'Give user permission of Teacher.'),
      ('student_user', 'Give user permission of Teacher.'),
    )