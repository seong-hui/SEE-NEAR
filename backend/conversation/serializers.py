import numpy as np
from datetime import datetime, timedelta
from django.db.models import Q
from rest_framework import serializers
from .models import Post, DayReport
from .functions.emotion_calulation import updateEmotionMean
from authentication.models import Family
from constant.conversation import EMOTION_COUNT

class PostSerializer(serializers.ModelSerializer):
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
        post.content = data.get("content", "")
        post.emotion = np.argmax(data.get("emotion", [[0]]))
        post.emotion_0 = data.get("emotion", [[0, 0, 0, 0]])[0][0]
        post.emotion_1 = data.get("emotion", [[0, 0, 0, 0]])[0][1]
        post.emotion_2 = data.get("emotion", [[0, 0, 0, 0]])[0][2]
        post.emotion_3 = data.get("emotion", [[0, 0, 0, 0]])[0][3]
        post_keyword = ""
        for keyword in data.get("keyword", [("",0)]):
            post_keyword += keyword[0] + " "
        post.keyword = post_keyword
        post.save()
        return post
    
    def createDummy(self, family, data):
        family = Family.objects.get(id=family)
        keyword = ""
        for keyword in data.get("keyword"):
            keyword += keyword[0] + " "
        new_post = Post.objects.create(
            family_id = family,
            date = data["date"],
            content = data["content"],
            keyword = keyword,
            emotion = np.argmax(data["emotion"]),
            emotion_0 = data["emotion"][0][0],
            emotion_1 = data["emotion"][0][1],
            emotion_2 = data["emotion"][0][2],
            emotion_3 = data["emotion"][0][3],
        )
        new_post.save()
        return new_post
    
class DayReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayReport
        fields = ("id", "emotion", "date")

    def get_or_create(self, family, date):
        report, new_report = DayReport.objects.get_or_create(
            family_id = Family.objects.get(id=family),
            date = date
        )
        if report:
            return report
        elif new_report:
            return new_report
    
    def update(self, report, data, post):
        post_count = getattr(report, "post_count", 0)
        setattr(report, "post_count", post_count + 1)

        keywords = getattr(report, "keywords", "")
        keywords += post.keyword
        setattr(report, "keywords", keywords)

        emotion_count_label = f"emotion_{post.emotion}_count"
        emotion_count = getattr(report, emotion_count_label, 0)
        setattr(report, emotion_count_label, emotion_count + 1)

        emotion = [[0, 0, 0, 0]]
        for i in range(EMOTION_COUNT):
            emotion_mean_label = f"emotion_{i}_mean"
            emotion_mean = getattr(report, emotion_mean_label, 0)
            updated_emotion_mean = updateEmotionMean(emotion_mean, data["emotion"][0][i], post_count)
            setattr(report, emotion_mean_label, updated_emotion_mean)
            emotion[0][i] = updated_emotion_mean
        setattr(report, "emotion", np.argmax(emotion))

        start = datetime.combine(datetime.today(), post.start)
        end = datetime.combine(datetime.today(), post.end)
        if end < start:
            end += timedelta(days=1)

        time_difference = end - start
        now_usetime = time_difference.total_seconds()
        usetime = getattr(report, "usetime", 0)
        usetime += now_usetime
        setattr(report, "usetime", usetime)

        report.save()
        return report