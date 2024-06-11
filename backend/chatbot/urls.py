from django.urls import path
from . import views

urlpatterns = [
    path('chatbot/', views.chatbot, name='voice-chatbot'),
    path('events/', views.events, name='events-chatbot'),
    # path('endConversation/', views.endConversation, name='endConversation'),
    # path('startConversation/', views.startConversation, name='startConversation'),
    # path('getSummary/', views.getSummary, name='getSummary'),
]