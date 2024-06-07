BASE_PATH = "backend"

# chatbot.py constant
GPT_MODEL = 'gpt-4o'
GPT_ROLE = 'system'
MAX_TOKENS = 10
TEMPERATURE = 0.8
TTS_MODEL = 'tts-1-hd'
TTS_VOICE = 'alloy'
TTS_SPEED = 1
AUDIO_RESPONSE_FORMAT = 'wav'

# models.py Dayreport Emotion Choice
EMOTION_CHOICES = [
    (0, "angry"),
    (1, "sad"),
    (2, "neutral"),
    (3, "happy")
]

EMOTION_COUNT = len(EMOTION_CHOICES)

# emotion_classification.py constant

EMOTION_MODEL = 'media/Speech-Emotion-Recognition-Model_FINAL.h5'
N_MFCC = 13
N_FFT = 2048
HOP_LENGTH = 512
SAMPLE_RATE = 22050
MAX_LENGTH = 100

# keyword_extraction.py constant
KEYWORD_MODEL = 'skt/kobert-base-v1'
ENCODING = 'utf-8'

# create_wordcloud.py constant
BACKGROUND_COLOR = "white"
MAX_WORDS = 150
WIDTH = 500
HEIGHT = 500
FONT_PATH = "media/AppleGothic.ttf"
WORDCLOUD_PATH = "media/wordcloud.png"

# views.py constant
TEXT_PATH = 'media/text.txt'
AUDIO_INPUT_WAV_PATH = 'media/input.wav'
AUDIO_INPUT_WEBM_PATH = 'media/input.webm'
AUDIO_OUTPUT_PATH = 'media/output.wav'
UPDATE_POST_MESSAGE = "update was successful"
