from django.urls import path, register_converter
from converters import DateConverter
from .views import *

register_converter(DateConverter, "date")
event_detail = EventViewSet.as_view({
    "get": "retrieve",
    "put": "update",
    "delete": "destroy"
})

urlpatterns = [
    path('create', create_event, name="event-create"),
    path('create/', create_event, name="event-create"),

    path('<date:date>', get_events, name="event-get"),
    path('<date:date>/', get_events, name="event-get"),

    path("<int:pk>", event_detail, name="event-detail"),
    path("<int:pk>/", event_detail, name="event-detail"),
]