import numpy as np
import librosa
import tensorflow as tf
from tensorflow.python.keras.models import load_model
from constant.conversation import *

model = load_model(EMOTION_MODEL)

def emotion_classification(input_path):
    signal, sample_rate = librosa.load(input_path, sr=SAMPLE_RATE)
    mfccs = librosa.feature.mfcc(y=signal, sr=sample_rate, n_mfcc=N_MFCC, n_fft=N_FFT, hop_length=HOP_LENGTH)
    mfccs = mfccs.T
    data = tf.keras.preprocessing.sequence.pad_sequences([mfccs], maxlen=MAX_LENGTH, padding='post', truncating='post')
    predicted_probabilities = model.predict(data)
    # predicted_class = np.argmax(predicted_probabilities)
    # print("Predicted emotion class:", predicted_class)
    return predicted_probabilities

# print(emotion_classification('backend/media/input.wav'))