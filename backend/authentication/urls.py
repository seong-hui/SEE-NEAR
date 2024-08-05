from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
routine_detail = RoutineViewSet.as_view({
    "get": "retrive",
    "put": "update",
    "delete": "destroy"
})

urlpatterns = [
    path("user/signup", signup),
    path("user/signup/", signup),
    path("user/login", login),
    path("user/login/", login),
    path("user/logout", logout),
    path("user/logout/", logout),

    path('family', get_family),
    path('family/', get_family),
    path('family/join', join_family),
    path('family/join/', join_family),
    path('family/member', get_members),
    path('family/member/', get_members),
    path('family/update', update_family),
    path('family/update/', update_family),

    path('routine', get_routines),
    path('routine/', get_routines),
    path('routine/create', create_routine),
    path('routine/create/', create_routine),
    path('routine/<int:pk>', routine_detail),
    path('routine/<int:pk>/', routine_detail),
]
