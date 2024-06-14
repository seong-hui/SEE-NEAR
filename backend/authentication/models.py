from django.db import models
from django.contrib.auth.models import AbstractUser
from constant.authentication import *
import uuid

class User(AbstractUser):
    is_senior = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, null=True)
    birth = models.DateField(null=True)
    family_id = models.ForeignKey('Family', related_name='user', on_delete=models.SET_NULL, db_column='family_id', null=True)
    role = models.CharField(max_length=20, null=True)

class Family(models.Model):
    id = models.CharField(max_length=6, primary_key=True, default=uuid.uuid4().hex[:7].upper(), editable=False)
    senior_id = models.ForeignKey('User', related_name='senior', on_delete=models.SET_NULL, db_column='senior_id', null=True)
    senior_birth = models.DateField(null=True)
    senior_gender = models.IntegerField(default=0, choices=GENDER_CHOICES)
    senior_diseases = models.CharField(max_length=128, blank=True, default='')
    senior_interests = models.CharField(max_length=128, blank=True, default='')

    class Meta:
        verbose_name = 'family'
        verbose_name_plural = 'familes'
        ordering = ('id',)

    def __str__(self):
        return self.id

class Routine(models.Model):
    family_id = models.ForeignKey('Family', related_name='routine', on_delete=models.SET_NULL, db_column='family_id', null=True)
    name = models.CharField(max_length=20, default='')
    time = models.TimeField(null=True)

    def __str__(self):
        return self.name