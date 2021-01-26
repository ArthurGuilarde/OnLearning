from django.shortcuts import render
from django.contrib.auth import authenticate

from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializer
from .utils import GenerateAccessToken, GenerateRefreshToken, CheckRefreshToken

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def Login(request):
  username = request.data.get('login')
  password = request.data.get('password')
  response = Response()

  if (username is  None) or (password is None):
    raise exceptions.AuthenticationFailed('Credentials required.')

  user = authenticate(username=username, password=password)
  
  if not user:
    raise exceptions.AuthenticationFailed('Credentials do not match.')
  
  serialized_user = UserSerializer(user).data

  access_token = GenerateAccessToken(user)
  refresh_token = GenerateRefreshToken(user)

  response.data = {
    'access_token': access_token,
    'user': serialized_user,
    'refresh_token': refresh_token
  }

  return response

@api_view(['POST'])
@permission_classes([AllowAny])
def Refresh(request):
  refresh = request.data.get('refresh')

  if (refresh is  None):
    raise exceptions.AuthenticationFailed('Refresh token required.')

  response = Response()
  
  new_acces_token = CheckRefreshToken(refresh)

  response.data = {
    'acces_token': new_acces_token
  }

  return response
  
