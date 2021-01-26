import datetime
import jwt
from django.conf import settings
from .models import User

access_token_exp_min = 5
refresh_token_exp_day = 7
refresh_token_exp_min = 0

def GenerateAccessToken(user):
  access_token_payload = {
    'user_id': user.id,
    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=access_token_exp_min),
    'iat': datetime.datetime.utcnow()
  }

  access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256')

  return access_token

def CheckAccessToken(token):
  return jwt.decode(token, settings.SECRET_KEY, algorithms='HS256') 

def GenerateRefreshToken(user):
  refresh_token_payload = {
    'user_id': user.id,
    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=refresh_token_exp_day, minutes=refresh_token_exp_min),
    'iat': datetime.datetime.utcnow()
  }

  refresh_token = jwt.encode(refresh_token_payload, settings.REFRESH_SECRET_KEY, algorithm='HS256')

  return refresh_token

def CheckRefreshToken(token):
  decoded = jwt.decode(token, settings.REFRESH_SECRET_KEY, algorithms='HS256')
  
  user = User(id=decoded['user_id'])

  acces_token = GenerateAccessToken(user)
  
  return acces_token

  