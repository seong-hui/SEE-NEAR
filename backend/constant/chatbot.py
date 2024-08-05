# chatbot.py constant
GPT_MODEL = 'gpt-4o'
GPT_ROLE = 'system'
MAX_TOKENS = 100
TEMPERATURE = 0.8
TTS_MODEL = 'tts-1-hd'
TTS_VOICE = 'nova'
TTS_SPEED = 1
AUDIO_RESPONSE_FORMAT = 'wav'

# views.py constant
TEXT_PATH = 'media/text.txt'
AUDIO_INPUT_WAV_PATH = 'media/input.wav'
AUDIO_INPUT_WAV_FORMAT = 'wav'
AUDIO_INPUT_WEBM_PATH = 'media/input.webm'
AUDIO_INPUT_WEBM_FORMAT = 'webm'
AUDIO_OUTPUT_PATH = 'media/output.wav'
ENCODING = 'utf-8'
FRAME_RATE = 44100

# CONVERSATION_START_MESSAGE = 'Conversation Started!!'
# CONVERSATION_END_MESSAGE = 'Conversation Ended!!'
NONE_RESPONSE_MESSAGE = 'response message does not exist'
POST_REQUEST_ERROR_MESSAGE = 'POST request required'