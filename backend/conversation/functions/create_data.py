import os
import numpy as np
from collections import Counter
from .keyword_extraction import keyword_extraction
from .emotion_classification import emotion_classification
from .conversation_summary import conversation_summary
from constant.conversation import *

def createModelData(id: str):
    audio_input_wav_path = AUDIO_INPUT_WAV_PATH.format(id)
    audio_input_webm_path = AUDIO_INPUT_WEBM_PATH.format(id)
    audio_output_path = AUDIO_OUTPUT_PATH.format(id)
    text_path = TEXT_PATH.format(id)

    if not os.path.exists(audio_input_wav_path):
        os.remove(audio_output_path)
        raise FileNotFoundError(ERROR_END)
    
    keyword = " ".join([k for k, _ in keyword_extraction(text_path)])
    emotion = emotion_classification(audio_input_wav_path)
    content = conversation_summary(text_path)
    os.remove(text_path)
    os.remove(audio_input_wav_path)
    os.remove(audio_input_webm_path)
    os.remove(audio_output_path)

    if not content or not keyword:
        raise ValueError(ERROR_SHORT)
    
    return {"content": content, "emotion": emotion, "keyword": keyword}

def createResponseData(option: str, id: int, values: list):
    data = {"id": id}

    if option == "variance":
        data["variance"] = values
    elif option == "count" or option == "mean":
        for i in range(len(values)):
            key = f"emotion_{i}_{option}"
            value = values[i]
            data[key] = value

    return data

def createResponseKeywords(keywords: str):
    data = []
    counter = Counter(keywords.split()).most_common(3)

    for i in range(3):
        data.append({"id": i, "keyword": counter[i][0]})

    return data

def createDummyData(date: str):
    emotion = np.random.dirichlet(np.ones(4), size=1)
    keyword = " ".join(np.random.choice(DUMMY_KEYWORD.split(), 3, replace=False))
    content = DUMMY_CONTENT.format(*[k for k in keyword.split()])
    return {"date": date, "emotion": emotion, "keyword": keyword, "content": content}