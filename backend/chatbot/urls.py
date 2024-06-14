from django.urls import path
from .views import *

urlpatterns = [
    path('default', chatbot_default, name='chatbot-default'),
    path('default/', chatbot_default, name='chatbot-default'),

    path('event', chatbot_event, name='chatbot-events'),
    path('event/', chatbot_event, name='chatbot-events'),

    path('audio', chatbot_audio, name='chatbot-audio'),
    path('audio/', chatbot_audio, name='chatbot-audio'),
]