from django.db import models
from django_api.core.models import User

# Create your models here.

class Classe(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(("Description"))
    progam_date = models.DateField(("Programmed date"), auto_now=False, auto_now_add=False)
    exec_date = models.DateField(("Execution date"), auto_now=False, auto_now_add=False, null=True, blank=True)

    STATUS_OPTIONS = (
        ('p', 'paid'),
        ('un', 'unpaid'),
    )
    status = models.CharField(max_length=2, choices=STATUS_OPTIONS, default='un')

    teacher = models.ForeignKey(User, related_name='teacher_of_student', on_delete=models.CASCADE)
    student = models.ForeignKey(User, related_name='student_of_teacher', on_delete=models.CASCADE)

    created_at = models.DateTimeField(("Criado em"), auto_now_add=True)
    updated_at = models.DateTimeField(("Atualizado em"), auto_now=True)
    
    REQUIRED_FIELDS = ['name', 'description', 'progam_date', 'teacher', 'student']

    def __str__(self):
      return str(self.name)
    
    class Meta:
        permissions = (('change_sensible_fields', 'Change all Classe fields'),)
    
 