from django.shortcuts import render
from django.contrib.auth import authenticate

from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializer
from .utils import GenerateAccessToken, GenerateRefreshToken, CheckRefreshToken

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
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

  response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
  response.data = {
    'access_token': access_token,
    'user': serialized_user,
  }

  return response

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def Refresh(request):
  '''
  To obtain a new access_token this view expects 2 important things:
      1. a cookie that contains a valid refresh_token
      2. a header 'X-CSRFTOKEN' with a valid csrf token, client app can get it from cookies "csrftoken"
  '''
  refresh_token = request.COOKIES.get('refresh_token')
 
  if refresh_token is None:
      raise exceptions.AuthenticationFailed(
          'Authentication credentials were not provided.')
  
  refresh_token = refresh_token.replace("b'", '')
  refresh_token = refresh_token.replace("'", '')
  
  access_token = CheckRefreshToken(refresh_token)

  return Response({'access_token': access_token})
  
