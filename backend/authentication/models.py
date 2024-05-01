from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    is_senior = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, null=True)
    birth = models.DateField(null=True)
    family_id = models.ForeignKey("Family", related_name="family", on_delete=models.SET_NULL, db_column="family_id", null=True)
    role = models.CharField(max_length=20, null=True)

GENDER_CHOICES = [
    (0, "Unknown"),
    (1, "Male"),
    (2, "Female"),
]

class Family(models.Model):
    id = models.CharField(max_length=6, primary_key=True, default=uuid.uuid4().hex[:7].upper(), editable=False)
    family_name = models.CharField(max_length=32, default="new family")
    senior_id = models.ForeignKey("User", related_name="senior", on_delete=models.SET_NULL, db_column="senior_id", null=True)
    senior_birth = models.DateField(null=True)
    senior_gender = models.CharField(max_length=8, default=0, choices=GENDER_CHOICES)
    senior_diseases = models.CharField(max_length=128, blank=True)
    senior_interests = models.CharField(max_length=128, blank=True)
    morning = models.TimeField(null=True)
    evening = models.TimeField(null=True)
    breakfast = models.TimeField(null=True)
    lunch = models.TimeField(null=True)
    dinner = models.TimeField(null=True)

    class Meta:
        verbose_name = "family"
        verbose_name_plural = "familes"
        ordering = ("id",)

    def __str__(self):
        return self.id
