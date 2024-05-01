from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer, DayReportSerializer

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer()
    post = serializer.create(request.user.family_id)
    data = {"id": post.id}
    return Response(data, status=status.HTTP_201_CREATED)

@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_post(request, pk):
    postSerializer = PostSerializer()
    post = Post.objects.get(pk=pk)

    data = {
        "content": "content",
        "emotion": 4,
        "keyword": "keyword"
    }

    postSerializer.update(post=post, data=data)

    reportSerializer = DayReportSerializer()
    report = reportSerializer.get_or_create(family=request.user.family_id, date=post.date)
    report = reportSerializer.update(report=report, data=data)
    return Response({"message": "update was successful"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_posts(request, date):
    try:
        queryset = Post.objects.filter(
            Q(family_id=request.user.family_id) &
            Q(date=date)
        )
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    serializer = PostSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]