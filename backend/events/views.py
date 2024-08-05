from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from constant.events import *

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_events(request, date):
    try:
        queryset = Event.objects.filter(
            Q(family_id=request.user.family_id) &
            Q(datetime__date=date)
        )
        serializer = EventSerializer(queryset, many=True)
        response_data = serializer.data
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_event(request):
    try:
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.user.family_id)
            response_data = {'message': CREATE_SUCCESS_MESSAGE}
            return Response(response_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]