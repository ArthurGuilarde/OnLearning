# Generated by Django 3.1.5 on 2021-01-27 00:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Classe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField(verbose_name='Description')),
                ('progam_date', models.DateField(verbose_name='Programmed date')),
                ('exec_date', models.DateField(blank=True, null=True, verbose_name='Execution date')),
                ('status', models.CharField(choices=[('p', 'paid'), ('un', 'unpaid')], default='un', max_length=2)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Criado em')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Atualizado em')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_of_teacher', to=settings.AUTH_USER_MODEL)),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teacher_of_student', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'permissions': (('change_sensible_fields', 'Change all Classe fields'),),
            },
        ),
    ]
