from django.urls import path, register_converter
from converters import (DateConverter, YearMonthConverter)
from .views import *

register_converter(DateConverter, "date")
register_converter(YearMonthConverter, "year-month")

post_detail = PostViewSet.as_view({
    "get": "retrieve",
    "delete": "destroy"
})

urlpatterns = [
    path('posts/create', create_post, name="create-post"),
    path('posts/create/', create_post, name="create-post"),
    path('posts/update/<int:pk>', update_post, name="update-post"),
    path('posts/update/<int:pk>/', update_post, name="update-post"),
    path("posts/<date:date>", get_posts, name="get-posts"),
    path("posts/<date:date>/", get_posts, name="get-posts"),
    path("posts/<int:pk>", post_detail, name="post-detail"),
    path("posts/<int:pk>/", post_detail, name="post-detail"),

    path("day/<date:date>", get_report, name="get-day"),
    path("day/<date:date>/", get_report, name="get-day"),
    path("day/<year-month:date>", get_reports, name="get-days"),
    path("day/<year-month:date>/", get_reports, name="get-days"),

    path("week/<date:start>", get_week, name="get-week-count"),
    path("week/<date:start>/", get_week, name="get-week-count"),
    path("week/keyword/<date:start>", get_word_cloud, name="get-word-cloud"),
    path("week/keyword/<date:start>/", get_word_cloud, name="get-word-cloud"),

    path("dummy/<year-month:date>", create_dummy_datas),
    path("dummy/<year-month:date>/", create_dummy_datas),
    path("dummy/<date:date>", create_dummy_data),
    path("dummy/<date:date>/", create_dummy_data),
]