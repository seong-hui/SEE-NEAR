from django.db.models import F
from rest_framework.serializers import ModelSerializer
from .models import Post, DayReport
from .reportFunc import calculateEmotionRate, calculateBadRate
from authentication.models import Family

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ("id",)
        extra_kwargs = {
            'family_id': {'write_only': True},
            'date': {'write_only': True},
        }

    def create(self, family):
        family = Family.objects.get(id=family)
        new_post = Post.objects.create(
            family_id = family,
        )
        new_post.save()
        return new_post
    
    def update(self, post, data):
        post.content = data.get("content")
        post.emotion = data.get("emotion")
        post.keyword = data.get("keyword")
        post.save()
        return post
    
class DayReportSerializer(ModelSerializer):
    class Meta:
        model = DayReport
        fields = '__all__'
        read_only_fields = ("id",)

    def get_or_create(self, family, date):
        report, new_report = DayReport.objects.get_or_create(
            family_id = Family.objects.get(id=family),
            date = date
        )
        if report:
            return report
        elif new_report:
            return new_report
    
    def update(self, report, data):
        post_count = getattr(report, "post_count")
        setattr(report, "post_count", post_count + 1)

        emotion = f"emotion_{data['emotion']}"
        emotion_count = getattr(report, emotion)
        setattr(report, emotion, emotion_count + 1)

        keywords = getattr(report, "keywords")
        setattr(report, "keywords", keywords + " " + data["keyword"])

        emotion_rate = getattr(report, "emotion_rate")
        updated_emotion_rate = calculateEmotionRate(emotion_rate, data["emotion"], post_count)
        setattr(report, "emotion_rate", updated_emotion_rate)

        bad_rate = getattr(report, "bad_rate")
        updated_bad_rate = calculateBadRate(bad_rate, data["emotion"], post_count)
        setattr(report, "bad_rate", updated_bad_rate)

        report.save()
        return report