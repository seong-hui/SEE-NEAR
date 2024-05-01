from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    signup, 
    login, 
    logout, 
    join_family, 
    create_family,
    FamilyViewSet,
    UserViewSet,
)

router = DefaultRouter()
router.register("family", FamilyViewSet)
router.register("user", UserViewSet)

urlpatterns = [
    path("user/signup/", signup),
    path("user/login/", login),
    path("user/logout/", logout),
    path('family/join/', join_family),
    path('family/create/', create_family),
    path("", include(router.urls)),
]
