from django.db import models
from authentication.models import Family

class Event(models.Model):
    family_id = models.ForeignKey(Family, related_name="event", on_delete=models.CASCADE, db_column="family_id")
    title = models.CharField(max_length=32)
    location = models.CharField(max_length=32, blank=True)
    datetime = models.DateTimeField()
    is_checked = models.BooleanField(default=False)

    class Meta:
        verbose_name = "events"
        verbose_name_plural = "event"
        ordering = ("id",)

    def __str__(self):
        return self.title