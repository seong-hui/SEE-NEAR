def calculateEmotionRate(rate, emotion, count):
    now_emotion_score = 0
    sum_emotion_score = rate * count
    
    if emotion == 1:
        now_emotion_score = 1.0
    elif emotion == 2:
        now_emotion_score = 0.5
    elif emotion == 3:
        now_emotion_score = 0.2
    elif emotion == 4:
        now_emotion_score = 0.1
    
    sum_emotion_score += now_emotion_score
    emotion_rate = sum_emotion_score / (count + 1)
    return emotion_rate

def calculateBadRate(rate, emotion, count):
    now_bad_score = 0
    sum_bad_score = rate * count

    if emotion == 3:
        now_bad_score = 1.0
    elif emotion == 4:
        now_bad_score = 1.0
    
    sum_bad_score += now_bad_score
    bad_rate = sum_bad_score / (count + 1)
    return bad_rate
