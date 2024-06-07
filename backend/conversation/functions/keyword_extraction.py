from keybert import KeyBERT
from kiwipiepy import Kiwi
from transformers import BertModel
from constant.conversation import *

# sents="""오늘 허리가 많이 아팠어 잠을 좀 잘 못 잤나봐.
# 찜질이랑 스트레칭을 해야 되는데, 찜질팩이 집에 없어
# 따뜻한 물수건으로 팩을 해야겠다 머리도 조금 아파
# 머리 아픈지는 좀 오래됐어 나이가 들었나봐
# 밥은 그냥 간단하게 나물해서 먹어야지
# 두통약을 밥 먹고 먹어야겠어
# 알겠어 병원 가볼게
# """

# 명사 추출
def noun_extractor(text):
    kiwi = Kiwi()
    results = []
    result = kiwi.analyze(text)
    for token, pos, _, _ in result[0][0]: #토큰, 품사 갖고오기
        if len(token) != 1 and pos.startswith('N') or pos == ('MM') or pos == ('SL') or pos == 'VV' or (pos == 'VA'): #토큰 길이 1아니고,명사거나 외래어, 관형사일 때 갖고오기 (동사,형용사)
            results.append(token)
    return results

def keyword_extraction():
    with open(TEXT_PATH, "r", encoding=ENCODING) as f:
        sents = f.read()
    model = BertModel.from_pretrained(KEYWORD_MODEL) #한국어 특화 kobert 모델로 단어 임베딩하기
    kw_model = KeyBERT(model)
    nouns = noun_extractor(sents)
    text = ' '.join(nouns)
    keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, use_mmr = 1, use_maxsum = 1, top_n=3) #중복방지 mmr, 코사인유사도 다르게 표현
    return keywords

# print(keyword_extraction(sents))