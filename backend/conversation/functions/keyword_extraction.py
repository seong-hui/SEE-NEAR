from keybert import KeyBERT
from kiwipiepy import Kiwi
from transformers import BertModel
from constant.conversation import *

def noun_extractor(text):
    kiwi = Kiwi()
    results = []
    result = kiwi.analyze(text)
    for token, pos, _, _ in result[0][0]:
        if len(token) != 1 and pos.startswith('N') or pos == ('MM') or pos == ('SL') or pos == 'VV' or (pos == 'VA'):
            results.append(token)
    return results

def keyword_extraction(input_path):
    with open(input_path, "r", encoding=ENCODING) as f:
        sents = f.read()
    model = BertModel.from_pretrained(KEYWORD_MODEL)
    kw_model = KeyBERT(model)
    nouns = noun_extractor(sents)
    text = ' '.join(nouns)
    keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, use_mmr = 1, use_maxsum = 1, top_n=3)

    return keywords