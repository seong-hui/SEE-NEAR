import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.layers import Dense, LSTM, Dropout
from tensorflow.python.keras.models import load_model

num_mfcc = 13
n_fft = 2048
hop_length = 512
SAMPLE_RATE = 22050
max_len = 100

# def build_model(input_shape):
#     model = tf.keras.Sequential()

#     model.add(LSTM(128, input_shape=input_shape, return_sequences=True))
#     model.add(LSTM(64))
    
#     model.add(Dense(64, activation='relu'))
#     model.add(Dropout(0.3))

#     model.add(Dense(6, activation='softmax'))

#     return model

model = load_model('media/Speech-Emotion-Recognition-Model (2).h5')

def emotion_classification(input_path):
    signal, sample_rate = librosa.load(input_path, sr=SAMPLE_RATE)
    mfccs = librosa.feature.mfcc(y=signal, sr=sample_rate, n_mfcc=num_mfcc, n_fft=n_fft, hop_length=hop_length)

    # Transpose mfccs to have time steps as the first dimension
    mfccs = mfccs.T

    # Pad the sequence to a fixed length
    data = tf.keras.preprocessing.sequence.pad_sequences([mfccs], maxlen=max_len, padding='post', truncating='post')

    # Load the pre-trained model
    # model.summary()
    # print(tf.__version__)
    # Predict emotion
    predicted_probabilities = model.predict(data)
    predicted_class = np.argmax(predicted_probabilities)
    # print("Predicted emotion class:", predicted_class)
    return predicted_class

# print(emotion_classification('backend/media/input.wav'))