from django.urls import path
from . import views

urlpatterns = [
    path('chatbot/', views.chatbot, name='text-chatbot'),
    path('chataudio/', views.chatbot_audio, name='voice-chatbot'),
    path('events/', views.events, name='events-chatbot'),
    # path('endConversation/', views.endConversation, name='endConversation'),
    # path('startConversation/', views.startConversation, name='startConversation'),
    # path('getSummary/', views.getSummary, name='getSummary'),
]