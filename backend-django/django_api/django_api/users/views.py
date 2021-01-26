import random
from django.shortcuts import render

from django.contrib.auth.models import Permission

from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from django_api.core.models import User
from django_api.core.serializers import UserSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def CreateUser(request):
  usertType = request.data.get('userType')
  email = request.data.get('email')
  password = request.data.get('password')
  username = email.split('@')[0] + '-' + str(random.getrandbits(24))
  response = Response()

  my_user, created = User.objects.get_or_create(
    email=email,
  )

  print(created)
  serialized = UserSerializer(my_user).data

  if created: 
    my_user.username=username
    my_user.set_password(password) 
    my_user.save()

    # Get permissions and add permission to user
    permission_codename = 'student_user'
    
    if usertType == 'teacher':
      permission_codename = 'teacher_user'

    permission = Permission.objects.get(codename=permission_codename)
    my_user.user_permissions.add(permission)
    

    response.data = {
      'user':serialized
    }
    
  else:
    response.data = {
      'user': serialized
    }

  return response