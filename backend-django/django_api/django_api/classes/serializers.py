from rest_framework import serializers
from .models import Class

class ClassSerilizer(serializers.ModelSerializer):
  class Meta:
    model = Class
    fields = '__all__'
    # exclude = ('password',)