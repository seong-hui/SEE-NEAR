from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.http import FileResponse
from django.conf import settings
from pydub import AudioSegment
from .functions.chatbot import *
from constant.chatbot import *
from prompt.prompt import *
from os import remove
import os

# @api_view(['GET'])
# def startConversation(request):
#     print("대화 시작") # 주석 처리
    
#     return Response({'message': CONVERSATION_START_MESSAGE})

# @api_view(['GET'])
# def endConversation(request):
#     print("대화 종료") # 주석 처리
    
#     with open(TEXT_PATH, "r", encoding=ENCODING) as f:
#         text = f.readlines()
        
#     keyword = keyword_extraction(text)
#     print("keyword:", keyword[0]) # 주석 처리
#     emotion = emotion_classification(AUDIO_INPUT_WAV_PATH)
#     print("Predicted emotion:", emotion) # 주석 처리
    
    
#     # text_path = TEXT_PATH
#     # audio_path = AUDIO_INPUT_WAV_PATH
#     # audio_path2 = AUDIO_INPUT_WEBM_PATH
#     # audio_path3 = AUDIO_OUTPUT_PATH

#     remove(TEXT_PATH)
#     remove(AUDIO_INPUT_WAV_PATH)
#     remove(AUDIO_INPUT_WEBM_PATH)
#     remove(AUDIO_OUTPUT_PATH)
#     print('파일 삭제') # 주석 처리
    
#     return Response({'message': CONVERSATION_END_MESSAGE})

# @api_view(['GET'])
# def getSummary(request):
#     print("대화 요약")
#     with open('media/text.txt', "r", encoding='utf-8') as f:
#         conversation = f.read()
#     print(conversation)
    
#     command = ['다음 내용은 혼자 계신 시니어와 말동무 역할인 음성 챗봇간의 일상 생활',
#                 '관련 대화 답변 내용이야. 이를 참고해서 혼자 계신 시니어의 일상 활동을',
#                 '간략하게 한줄정도로 요약해줘']
    
#     prompt = create_prompt(conversation, command)
#     print(prompt)
#     response = client.chat.completions.create(
#     model="gpt-4",
#     messages = [
#     {
#         "role": "system",
#         "content": prompt
#     },
#     ],
#     max_tokens=100,
#     temperature=0.8,
#     stop=[' Human:', ' AI:']
#     )
#     print(response)
#     if response.choices:
#         bot_response = response.choices[0].message.content 
#     else:
#         bot_response = "No response from the model."
    
#     print(f'요약: {bot_response}')
#     summary_path = os.path.join(settings.MEDIA_ROOT, 'summary.txt')
#     with open(summary_path, 'a', encoding='utf-8') as f:
#             f.write(bot_response)
            
#     return Response({'message': '대화가 요약 완료.'})

@api_view(['POST'])
def chatbot(request):
    if request.method == 'POST':
        # GET speech-recognition user_input text from frontend and print
        audio = request.FILES.get('audio')
        user_input = request.POST.get('text', '')
        print(f'Input: {user_input}')

        # Append new user_input text data, if not exits, create new file and append
        # text_path = os.path.join(settings.MEDIA_ROOT, TEXT_PATH_2)
        # audio_path = os.path.join(settings.MEDIA_ROOT, 'input.webm')
        # input_audio_path = os.path.join(settings.MEDIA_ROOT, 'input.wav')
        
        if not os.path.exists(AUDIO_INPUT_WEBM_PATH):
            open(AUDIO_INPUT_WEBM_PATH, 'wb').close()
            
        with open(AUDIO_INPUT_WEBM_PATH, 'ab') as f:
            for chunk in audio.chunks():
                f.write(chunk)
        
        sound = AudioSegment.from_file(AUDIO_INPUT_WEBM_PATH, format=AUDIO_INPUT_WEBM_FORMAT)
        if sound.frame_rate != FRAME_RATE:
            sound = sound.set_frame_rate(FRAME_RATE)
        sound.export(AUDIO_INPUT_WAV_PATH, format=AUDIO_INPUT_WAV_FORMAT)
        
        if not os.path.exists(TEXT_PATH):
            open(TEXT_PATH, 'w').close()

        with open(TEXT_PATH, 'a', encoding=ENCODING) as f:
            f.write(user_input + '.\n')
        
        # Create prompt & Get response
        prompt = create_prompt(user_input, PROMPT_DEFAULT)
        response = get_ai_response(prompt)

        # print(f'Response data: {response}') 

        # If response exist update_list & Get response reply
        if response:
            update_list(response, PROMPT_DEFAULT)
            # pos = response.find("\nAI: ")
            # response = response[pos + 4:]
        else:
            response = NONE_RESPONSE_MESSAGE
        print(f'Reply: {response}')
        
        # Create output.wav file with response reply through text_to_speech func
        text_to_speech(response)

        # Set output.wav to FileResponse format
        f = open(AUDIO_OUTPUT_PATH, "rb")
        audio_response = FileResponse(f)
        audio_response.set_headers(f)

        return audio_response
    else:
        return JsonResponse({'error': POST_REQUEST_ERROR_MESSAGE})
    
# 프론트에서 routine text 주면 프롬프트 생성해서 답변 받아와 읽어줌
# 그 답변 재생 이후 chatbot api 실행되게 함(conversation start 자동)
@api_view(['POST'])
def routine(request):
    if request.method == 'POST':
        routine = request.POST.get('text', '')
        print(f'Input: {routine}') # 주석처리
        
        # Create prompt & Get response
        prompt = routine.append(PROMPT_ROUTINE)
        response = get_ai_response(prompt)

        # print(f'Response data: {response}')

        # If response exist update_list & Get response reply
        if response:
            update_list(response, PROMPT_ROUTINE)
            # pos = response.find("\nAI: ")
            # response = response[pos + 4:]
        else:
            response = NONE_RESPONSE_MESSAGE
        print(f'Reply: {response}')
        
        # Create output.wav file with response reply through text_to_speech func
        text_to_speech(response)

        # Set output.wav to FileResponse format
        f = open(AUDIO_OUTPUT_PATH, "rb")
        audio_response = FileResponse(f)
        audio_response.set_headers(f)

        return audio_response
    else:
        return JsonResponse({'error': POST_REQUEST_ERROR_MESSAGE})
    
@api_view(['POST'])
def events(request):
    if request.method == 'POST':
        events_input = request.POST.get('text', '')
        print(f'Events: {events_input}') # 주석 처리
        
        # Create prompt & Get response
        PROMPT_EVENTS.append(events_input)
        response = get_ai_response(PROMPT_EVENTS)
        
        if response:
            text_to_speech(response)
        else:
            response = NONE_RESPONSE_MESSAGE
        print(f'Reply: {response}')
        
        f = open(AUDIO_OUTPUT_PATH, "rb")
        audio_response = FileResponse(f)
        audio_response.set_headers(f)

        return audio_response
    else:
        return JsonResponse({'error': POST_REQUEST_ERROR_MESSAGE})