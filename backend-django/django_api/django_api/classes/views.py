from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['POST'])
def CreateClasse(request):
  response = Response()

  response.data = {
    'ok':True
  }

  return response