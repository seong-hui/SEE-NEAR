from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User, Family, Routine
from .serializers import UserSerializer, FamilySerializer, MemberSerializer, RoutineSerializer
from constant.authentication import *

@api_view(['POST'])
def signup(request):
    try:
        userSerializer = UserSerializer(data=request.data)
        username = request.data.get('username')

        if userSerializer.is_valid():
            userSerializer.save()
            user = User.objects.get(username=username)
            token = Token.objects.get(user=user)
            response_data = {'user': userSerializer.data, 'token': token.key}
            if user.is_senior:
                familySerializer = FamilySerializer()
                familySerializer.create(user=user)
                family = Family.objects.get(senior_id=user.id)
                data={"family_id": family.id, "role": DEFAULT_ROLE}
                userSerializer.join(user=user, data=data)
                response_data['family_id'] = family.id
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        response_data = {'error': userSerializer.errors}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        authenticate_user = authenticate(username=username, password=password)

        if authenticate_user is not None:
            user = User.objects.get(username=username)
            token, created_token = Token.objects.get_or_create(user=user)
            if token:
                response_data = {'token': token.key}
            elif created_token: 
                response_data = {'token': created_token.key}

            response_data['is_senior'] = user.is_senior

            if user.is_senior:
                family = Family.objects.get(senior_id=user.id)
                response_data['family_id'] = family.id
            return Response(response_data, status=status.HTTP_202_ACCEPTED)
        
        response_data = {'error': USER_ERROR_MESSAGE}
        return Response(response_data, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        response_data = {'message': LOGOUT_SUCCESS_MESSAGE}
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def join_family(request):
    try:
        serializer = UserSerializer()
        serializer.join(user=request.user, data=request.data)
        response_data = {'message': JOIN_SUCCESS_MESSAGE}
        return Response(response_data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_family(request):
    try:
        serializer = FamilySerializer(request.user.family_id)
        family = Family.objects.get(id=request.user.family_id)
        response_data = serializer.data
        response_data["last_nane"] = family.senior_id.last_name
        response_data["first_name"] = family.senior_id.first_name
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_family(request):
    try:
        family = Family.objects.get(id=request.user.family_id)
        serializer = FamilySerializer()
        serializer.update(family=family, data=request.data)
        response_data = {"message": UPDATE_SUCCESS_MESSAGE}
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_members(request):
    try:
        family = Family.objects.get(id=request.user.family_id)
        queryset = User.objects.filter(~Q(id=family.senior_id.id) & Q(family_id=request.user.family_id))
        serializer = MemberSerializer(queryset, many=True)
        response_data = serializer.data
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_routines(request):
    try:
        queryset = Routine.objects.filter(family_id=request.user.family_id)
        serializer = RoutineSerializer(queryset, many=True)
        response_data = serializer.data
        return Response(response_data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_routine(request):
    try:
        serializer = RoutineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.user.family_id)
            response_data = {'message': CREATE_SUCCESS_MESSAGE}
            return Response(response_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_routine(request, pk):
    try:
        routine = Routine.objects.get(pk=pk)
        serializer = RoutineSerializer()
        serializer.update(routinee=routine, data=request.data)
        response_data = {"message": UPDATE_SUCCESS_MESSAGE}
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class FamilyViewSet(viewsets.ModelViewSet):
    queryset = Family.objects.all()
    serializer_class = FamilySerializer
    permission_classes = [IsAuthenticated]

class RoutineViewSet(viewsets.ModelViewSet):
    queryset = Routine.objects.all()
    serializer_class = RoutineSerializer
    permission_classes = [IsAuthenticated]