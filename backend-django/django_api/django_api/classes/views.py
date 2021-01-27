from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import exceptions

from .models import Class
from .serializers import ClassSerilizer
from django_api.core.models import User

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

  teacher = User.objects.filter(id=teacher_id).first()
  student = User.objects.filter(id=student_id).first()

  if teacher_id == student_id:
    raise exceptions.AuthenticationFailed('Class to yourself is not permited.')
  
  if (teacher is None) or (student is None):
    raise exceptions.AuthenticationFailed('Users not found')

  if not teacher.is_active or not student.is_active:
    raise exceptions.AuthenticationFailed('Users are inactive')

  if not teacher.has_perm('teacher_user'):
    raise exceptions.AuthenticationFailed('Teacher not have permission.')

  if not teacher.has_perm('student_user'):
    raise exceptions.AuthenticationFailed('Student not have permission.')

  

  my_class, created = Class.objects.get_or_create(
    teacher=teacher,
    student=student,
    progam_date=progam_date,
    title=title,
    description=description
  )

  serialized = ClassSerilizer(my_class).data
  response.data = {
    'is_created':created,
    'class':serialized
  }

  return response