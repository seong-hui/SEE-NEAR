from django.utils import timezone
from django.db import models
from authentication.models import Family
from constant.conversation import EMOTION_CHOICES

class Post(models.Model):
    family_id = models.ForeignKey(Family, related_name="post", on_delete=models.CASCADE, db_column="family_id")
    content = models.TextField(null=True)
    date = models.DateField(default=timezone.now)
    start = models.TimeField(auto_now_add=True)
    end = models.TimeField(auto_now=True)
    keyword = models.CharField(max_length=32, blank=True)
    emotion = models.IntegerField(null=True)
    emotion_0 = models.FloatField(default=0)
    emotion_1 = models.FloatField(default=0)
    emotion_2 = models.FloatField(default=0)
    emotion_3 = models.FloatField(default=0)

    class Meta:
        verbose_name = "posts"
        verbose_name_plural = "post"
        ordering = ("id",)

    def __str__(self):
        return self.keyword
    
    
class DayReport(models.Model):
    family_id = models.ForeignKey(Family, related_name="day", on_delete=models.CASCADE, db_column="family_id")
    post_count = models.IntegerField(default=0)
    emotion = models.IntegerField(default=0, choices=EMOTION_CHOICES)
    emotion_0_count = models.IntegerField(default=0)
    emotion_1_count = models.IntegerField(default=0)
    emotion_2_count = models.IntegerField(default=0)
    emotion_3_count = models.IntegerField(default=0)
    emotion_0_mean = models.FloatField(default=0)
    emotion_1_mean = models.FloatField(default=0)
    emotion_2_mean = models.FloatField(default=0)
    emotion_3_mean = models.FloatField(default=0)
    date = models.DateField(default=timezone.now)
    keywords = models.TextField(default="")
    usetime = models.IntegerField(default=0)

    class Meta:
        verbose_name = "reports"
        verbose_name_plural = "report"
        ordering = ("id",)