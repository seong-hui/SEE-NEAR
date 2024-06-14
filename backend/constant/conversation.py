# chatbot.py
GPT_MODEL = 'gpt-4o'
GPT_ROLE = 'system'
MAX_TOKENS = 10
TEMPERATURE = 0.8
TTS_MODEL = 'tts-1-hd'
TTS_VOICE = 'alloy'
TTS_SPEED = 1
AUDIO_RESPONSE_FORMAT = 'wav'

# models.py
EMOTION_CHOICES = [
    (0, "angry"),
    (1, "sad"),
    (2, "neutral"),
    (3, "happy")
]
EMOTION_COUNT = len(EMOTION_CHOICES)

# emotion_classification.py
EMOTION_MODEL = 'media/Speech-Emotion-Recognition-Model_FINAL.h5'
N_MFCC = 13
N_FFT = 2048
HOP_LENGTH = 512
SAMPLE_RATE = 22050
MAX_LENGTH = 100

# keyword_extraction.py
KEYWORD_MODEL = 'skt/kobert-base-v1'
ENCODING = 'utf-8'

# create_wordcloud.py
BACKGROUND_COLOR = "white"
MAX_WORDS = 150
WIDTH = 500
HEIGHT = 500
FONT_PATH = "media/AppleGothic.ttf"
WORDCLOUD_PATH = "media/wordcloud.png"

# views.py
TEXT_PATH = 'media/{}_text.txt'
AUDIO_INPUT_WAV_PATH = 'media/{}_input.wav'
AUDIO_INPUT_WEBM_PATH = 'media/{}_input.webm'
AUDIO_OUTPUT_PATH = 'media/{}_output.wav'
UPDATE_POST_MESSAGE = "update was successful"
ERROR_END = "conversation ended unexpectedly"
ERROR_SHORT = "conversation is too short"
DUMMY_KEYWORD = "물리치료 건강식품 병원 약국 산책 운동 건강검진 혈압 혈당 관절염 골다공증 치매 예방 요가 명상 취미 독서 여행 인터넷 사용 스마트폰 사진찍기 영상통화 가족 모임 노인정 동호회 봉사활동 손자손녀 요리 원예 가벼운체조 뉴스 시사 음악감상 라디오 듣기 영화 감상 예술 활동 글쓰기 그림 그리기 전통놀이 낚시 바둑 장기 체스 뜨개질 바느질 자원봉사 종교활동 요양원 이용 건강 상담 웃음 치료"
DUMMY_CONTENT = "오늘은 {}, {}, {} 하면서 하루를 보냈다"