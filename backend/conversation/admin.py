from django.contrib import admin
from .models import Post, DayReport

admin.site.register(Post)

class DayReportAdmin(admin.ModelAdmin):
    list_display = ["id", "family_id", "date"]
    fieldsets = [
        (None, {"fields": ("family_id", "date", "usetime")}),
        ("mean", {"fields": ("emotion", "emotion_0_mean", "emotion_1_mean", "emotion_2_mean", "emotion_3_mean")}),
        ("count", {"fields": ("post_count", "emotion_0_count", "emotion_1_count", "emotion_2_count", "emotion_3_count")}),
        ("keywords", {"fields": ("keywords", )})
    ]

admin.site.register(DayReport, DayReportAdmin)