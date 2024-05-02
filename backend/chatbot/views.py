from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.http import FileResponse
from django.conf import settings
from .chatbotFunc.chatbotFunc import *
from .chatbotFunc.keyword_extraction import *
from .chatbotFunc.emotion_classification import *
from os import remove
from pydub import AudioSegment


import os

@api_view(['GET'])
def startConversation(request):
    print("대화 시작")
    
    return Response({'message': '대화가 시작되었습니다.'})

@api_view(['GET'])
def endConversation(request):
    print("대화 종료")
    
    with open('media/text.txt', "r", encoding='utf-8') as f:
        text = f.readlines()
    
    print(text)
    keyword = keyword_extraction(text)
    print("keyword:", keyword[0])
    emotion = emotion_classification('media/input.wav')
    print("Predicted emotion:", emotion)
    
    
    text_path = 'media/text.txt'
    audio_path = 'media/input.wav'
    audio_path2 = 'media/input.webm'
    audio_path3 = 'media/output.wav'

    remove(text_path)
    remove(audio_path)
    remove(audio_path2)
    remove(audio_path3)
    print('파일 삭제')
    
    return Response({'message': '대화가 종료되었습니다.'})

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


name = '김숙자'
sex = 'female'
age = 60
interest = '임영웅', '봄', '강아지'
diasease = '당뇨'
prompt_list = [
                '너는 혼자계신 시니어분의 말동무 역할을 수행하게 될거야. 사용자의 정보를 알려줄게',
                f'시니어 분의 성별은 {sex}이고 나이는 {age}세 이시며 {diasease}와 같은 질병을 앓고 계셔',
                '위 정보를 참고해서 이 분이 심심하지 않으시게 일상생활의 간단한 질문이나 대답을 해주면 되',
                '너무 자세하게 질문과 대답을 하기보단 호응해주고 맞춰주는 식으로 대화를 해줘',
                '무조건 존댓말로 대답해줘','대답은 짧고 간결하게 한두문장으로 해줘',
                '대화가 이어갈수 있도록 질문을 해줘도 좋아'
                ]

@api_view(['POST'])
def chatbot(request):
    if request.method == 'POST':
        # GET speech-recognition user_input text from frontend and print
        user_input = request.POST.get('text', '')
        print(f'Input: {user_input}')
        
        audio = request.FILES.get('audio')
        print(audio)

        # Append new user_input text data, if not exits, create new file and append
        audio_path = os.path.join(settings.MEDIA_ROOT, 'input.webm')
        input_audio_path = os.path.join(settings.MEDIA_ROOT, 'input.wav')
        text_path = os.path.join(settings.MEDIA_ROOT, 'text.txt')
        if not os.path.exists(text_path):
            open(text_path, 'w', encoding='utf-8').close()

        with open(text_path, 'a', encoding='utf-8') as f:
            f.write(user_input + '\n')
            
        with open(audio_path, 'ab') as f:
            for chunk in audio.chunks():
                f.write(chunk)
                
        sound = AudioSegment.from_file(audio_path, format="webm")
        
        if sound.frame_rate != 44100:
            sound = sound.set_frame_rate(44100)

        sound.export(input_audio_path, format="wav")
        
        # Create prompt & Get response
        prompt = create_prompt(user_input, prompt_list)
        response = get_ai_response(prompt)

        # print(f'Response data: {response}')

        # If response exist update_list & Get response reply
        if response:
            update_list(response, prompt_list)
            pos = response.find("\nAI: ")
            response = response[pos + 4:]
        else:
            response = "response message not exist"
        print(f'Reply: {response}')
        
        # Create output.wav file with response reply through text_to_speech func
        text_to_speech(response)

        # Set output.wav to FileResponse format
        f = open('media/output.wav', "rb")
        audio_response = FileResponse(f)
        audio_response.set_headers(f)

        return audio_response
    else:
        return JsonResponse({'error': 'POST request required'})