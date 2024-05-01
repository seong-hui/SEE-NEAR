from django.urls import path, register_converter
from .converters import DateConverter
from .views import (
    create_post,
    update_post,
    get_posts,
    PostViewSet
    )

register_converter(DateConverter, "date")
post_detail = PostViewSet.as_view({
    "get": "retrieve",
    "delete": "destroy"
})

urlpatterns = [
    path('create/', create_post, name="create-post"),
    path('update/<int:pk>/', update_post, name="update-post"),
    path("<date:date>/", get_posts, name="get-posts"),
    path("<int:pk>/", post_detail, name="post-detail"),
]