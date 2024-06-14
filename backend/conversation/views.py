import calendar
import datetime
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import FileResponse
from .models import Post, DayReport
from .serializers import PostSerializer, DayReportSerializer
from .functions.create_wordcloud import *
from .functions.create_data import *
from constant.conversation import *

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_post(request):
    try:
        serializer = PostSerializer()
        post = serializer.create(request.user.family_id)
        response_data = {"id": post.id}
        return Response(response_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_post(request, pk):
    try:
        postSerializer = PostSerializer()
        post = Post.objects.get(pk=pk)
        data = createModelData(str(request.user.family_id))
        postSerializer.update(post=post, data=data)
        reportSerializer = DayReportSerializer()
        report = reportSerializer.get_or_create(family=request.user.family_id, date=post.date)
        report = reportSerializer.update(report=report, data=data, post=post)
        response_data = {"message": UPDATE_POST_MESSAGE}
        return Response(response_data, status=status.HTTP_200_OK)
    except (FileNotFoundError, ValueError) as e:
        post.delete()
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_posts(request, date):
    try:
        queryset = Post.objects.filter(
            Q(family_id=request.user.family_id) &
            Q(date=date)
        )
        serializer = PostSerializer(queryset, many=True)
        response_data = serializer.data
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_report(request, date):
    try:
        queryset = DayReport.objects.get(
            Q(family_id=request.user.family_id) &
            Q(date=date)
        )
        serializer = DayReportSerializer(queryset)
        response_data = serializer.data
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_reports(request, date):
    try:
        queryset = DayReport.objects.filter(
            Q(family_id=request.user.family_id) &
            Q(date__year=date.year) &
            Q(date__month=date.month)
        )
        serializer = DayReportSerializer(queryset, many=True)
        response_data = serializer.data
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_week(request, start):
    try:
        counts_data, means_data, variances_data = [], [], []
        keywords = ""
        for i in range(7):
            date = start + datetime.timedelta(days=i)
            posts = Post.objects.filter(Q(family_id=request.user.family_id) & Q(date=date))
            try:
                report = DayReport.objects.get(family_id=request.user.family_id, date=date)
                count_data = createResponseData("count", i + 1, [report.emotion_0_count, report.emotion_1_count, report.emotion_2_count, report.emotion_3_count])
                mean_data = createResponseData("mean", i + 1, [report.emotion_0_mean, report.emotion_1_mean, report.emotion_2_mean, report.emotion_3_mean])
                keywords += report.keywords
                deviation = [0, 0, 0, 0]
                for post in posts:
                    deviation[0] += (post.emotion_0 - report.emotion_0_mean) ** 2
                    deviation[1] += (post.emotion_1 - report.emotion_1_mean) ** 2
                    deviation[2] += (post.emotion_2 - report.emotion_2_mean) ** 2
                    deviation[3] += (post.emotion_3 - report.emotion_3_mean) ** 2
                variance = sum(deviation) / report.post_count / 4
                variance_data = createResponseData("variance", i + 1, variance)
            except DayReport.DoesNotExist:
                count_data = createResponseData("count", i + 1, [0, 0, 0, 0])
                mean_data = createResponseData("mean", i + 1, [0, 0, 0, 0])
                variance_data = createResponseData("variance", i + 1, 0)
            counts_data.append(count_data)
            means_data.append(mean_data)
            variances_data.append(variance_data)
        keywords_data = createResponseKeywords(keywords)
        response_data = {"keywords": keywords_data, "counts": counts_data, "averages": means_data, "variances": variances_data}
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_dummy_datas(request, date):
    try:
        _, days = calendar.monthrange(date.year, date.month)
        postSerializer = PostSerializer()
        reportSerializer = DayReportSerializer()
        keywords = DUMMY_KEYWORD.split(" ")
        for day in range(1, days + 1):
            temp_date = f"{date.year}-{date.month}-{day}"
            report = reportSerializer.get_or_create(family=request.user.family_id, date=temp_date)
            random_number = np.random.randint(3, 7)
            for i in range(random_number):
                data = createDummyData(temp_date)
                post = postSerializer.createDummy(family=request.user.family_id, data=data)
                report = reportSerializer.update(report=report, data=data, post=post)
        response_data = {"message": UPDATE_POST_MESSAGE}
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_dummy_data(request, date):
    try:
        postSerializer = PostSerializer()
        reportSerializer = DayReportSerializer()
        report = reportSerializer.get_or_create(family=request.user.family_id, date=date)

        data = createDummyData(date)
        post = postSerializer.createDummy(family=request.user.family_id, data=data)
        report = reportSerializer.update(report=report, data=data, post=post)
        response_data = {"message": UPDATE_POST_MESSAGE}
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_word_cloud(request, start):
    try:
        keywords = ""
        for i in range(7):
            date = start + datetime.timedelta(days=i)
            try:
                report = DayReport.objects.get(family_id=request.user.family_id, date=date)
                keywords += report.keywords
            except DayReport.DoesNotExist:
                continue
        createWordCloud(keywords)
        f = open(WORDCLOUD_PATH, "rb")
        image_response = FileResponse(f)
        image_response.set_headers(f)
        return image_response
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]