from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import exceptions

from .utils import CreateClassUtil
# Create your views here.

@api_view(['POST'])
def CreateClasse(request):
  title = request.data.get('title')
  description = request.data.get('description')
  progam_date = request.data.get('progam_date')
  teacher_id = request.data.get('teacher_id')
  student_id = request.data.get('student_id')
  response = Response()
  
  if (title == None) or (description == None) or (progam_date == None) or (teacher_id == None) or (student_id == None):
    raise exceptions.UnsupportedMediaType('Need all form fields.')

  class_created, created = CreateClassUtil(title, description, progam_date, teacher_id,  student_id)
  
  response.data = {
    'is_created':created,
    'class':class_created
  }

  return response

@api_view(['POST'])
def UpdateClass(request):
  title = request.data.get('title')
  description = request.data.get('description')
  progam_date = request.data.get('progam_date')
  exec_date = request.data.get('exec_date')
  status = request.data.get('status')
  teacher_id = request.data.get('teacher_id')
  student_id = request.data.get('student_id')
  response = Response()


  class_created, created = CreateClassUtil(title, description, progam_date, teacher_id,  student_id)
  
  response.data = {
    'is_created':created,
    'class':class_created
  }

  return response