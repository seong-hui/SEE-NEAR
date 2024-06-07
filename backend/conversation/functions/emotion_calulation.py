from constant.conversation import *

def updateEmotionMean(mean, emotion, count):
    sum_emotion = mean * count 
    sum_emotion += emotion
    return sum_emotion / (count + 1)