from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import FileResponse
from pydub import AudioSegment
from .functions.chatbot import *
from constant.chatbot import *
from prompt.prompt import *
import os

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def chatbot_default(request):
    try:
        audio = request.FILES.get('audio')
        user_input = request.data.get('text', '')
        id = str(request.user.family_id)

        audio_input_webm = AUDIO_INPUT_WEBM_PATH.format(id)
        audio_input_wav = AUDIO_INPUT_WAV_PATH.format(id)
        text_path = TEXT_PATH.format(id)
        
        if not os.path.exists(audio_input_webm):
            open(audio_input_webm, 'wb').close()
        with open(audio_input_webm, 'ab') as f:
            for chunk in audio.chunks():
                f.write(chunk)
        
        sound = AudioSegment.from_file(audio_input_webm, format=AUDIO_INPUT_WEBM_FORMAT)
        if sound.frame_rate != FRAME_RATE:
            sound = sound.set_frame_rate(FRAME_RATE)
        sound.export(audio_input_wav, format=AUDIO_INPUT_WAV_FORMAT)
        
        if not os.path.exists(text_path):
            open(text_path, 'w').close()

        with open(text_path, 'a', encoding=ENCODING) as f:
            f.write(user_input + '.\n')
        prompt = create_prompt(user_input, PROMPT_DEFAULT)
        response = get_ai_response(prompt)

        if response:
            update_list(response, PROMPT_DEFAULT)
        else:
            response = NONE_RESPONSE_MESSAGE      
        text_to_speech(id, response)

        response_data = {"text": response}
        return Response(response_data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def chatbot_audio(request):
    try:
        id = str(request.user.family_id)
        audio_output_path = AUDIO_OUTPUT_PATH.format(id)
        
        f = open(audio_output_path, "rb")
        audio_response = FileResponse(f)
        audio_response.set_headers(f)
        return audio_response
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def chatbot_event(request):
    try:
        events_input = request.data.get('text', '')
        PROMPT_EVENTS.append(events_input)
        prompts = ''.join(PROMPT_EVENTS)
        response = get_ai_response(prompts)
        
        if response:
            text_to_speech(str(request.user.family_id), response)
        else:
            response = NONE_RESPONSE_MESSAGE

        response_data = {"text": response}
        return Response(response_data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        response_data = {'error': str(e)}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)