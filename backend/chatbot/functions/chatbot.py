from openai import OpenAI
from django.conf import settings
from constant.chatbot import *

client = OpenAI(
    api_key=settings.OPENAI_API_KEY,
)

def update_list(message, prompt_list):
    prompt_list.append(message)

def create_prompt(user_input, prompt_list):
    p_message = f'\nHuman: {user_input}'
    update_list(p_message, prompt_list)
    prompt = ''.join(prompt_list)
    return prompt

def get_ai_response(prompt):
    try:
        response = client.chat.completions.create(
        model=GPT_MODEL,
        messages = [
            {
                "role": GPT_ROLE,
                "content": prompt
            },
        ],
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        stop=[' Human:', ' AI:']
        )
        return response.choices[0].message.content
    except Exception as e:
        print('error', e)

def text_to_speech(response):
    try:
        response = client.audio.speech.create(
        model=TTS_MODEL,
        voice=TTS_VOICE,
        input=response,
        speed=TTS_SPEED,
        response_format = AUDIO_RESPONSE_FORMAT
        )
        return response.stream_to_file(AUDIO_OUTPUT_PATH)
    except Exception as e:
        print('error', e)