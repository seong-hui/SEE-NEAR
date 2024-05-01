from openai import OpenAI
from django.conf import settings

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
        model="gpt-4",
        messages = [
            {
                "role": "system",
                "content": prompt
            },
        ],
        max_tokens=10,
        temperature=0.8,
        stop=[' Human:', ' AI:']
        )
        return response.choices[0].message.content
    except Exception as e:
        print('error', e)

def text_to_speech(response):
    try:
        response = client.audio.speech.create(
        model='tts-1-hd',
        voice="alloy",
        input=response,
        speed=1,
        response_format = 'wav'
        )
        return response.stream_to_file("media/output.wav")
    except Exception as e:
        print('error', e)