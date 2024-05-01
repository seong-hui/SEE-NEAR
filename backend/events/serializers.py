from rest_framework.serializers import ModelSerializer
from .models import Event
from authentication.models import Family

class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ("id", "title", "location", "datetime")
        read_only_fields = ("id",)

    def create(self, family):
        family = Family.objects.get(id=family)
        new_event = Event.objects.create(
            family_id = family,
            title = self.validated_data.get("title"),
            location = self.validated_data.get("location"),
            datetime = self.validated_data.get("datetime")
        )
        new_event.save()
        return new_event