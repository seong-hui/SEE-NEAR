import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration
from constant.conversation import *

tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')

# sents = """
# 응, 괜찮아. 그래도 허리가 좀 아파. 그냥 오래 서서 기다리다 보니까 그래. 나이도 있고 해서 더 그러나봐. 
# 그렇지, 아무래도 나이가 들면 이런 거 많이 생기지. 그래야겠지. 요즘은 운동도 해야되는데, 그게 너무 힘드네. 고마워, 괜찮아.
# 그냥 좀 쉬다가 하루가 지나면 괜찮아질 거야.
# """

def conversation_summary():
    with open(TEXT_PATH, "r", encoding=ENCODING) as f:
        sents = f.read()
    sents = sents.replace('\n', ' ')
    raw_input_ids = tokenizer.encode(sents)
    input_ids = [tokenizer.bos_token_id] + raw_input_ids + [tokenizer.eos_token_id]
    summary_ids = model.generate(torch.tensor([input_ids]),  num_beams=4,  max_length=512,  eos_token_id=1)

    text = tokenizer.decode(summary_ids.squeeze().tolist(), skip_special_tokens=True)
    words = text.split()
    seen_words = set()
    result_words = []

    for word in words:
        if word not in seen_words:
            seen_words.add(word)
            result_words.append(word)

    unique_text = " ".join(result_words)

    return unique_text

    # flag = 0
    # list = []

    # for i in range(1, len(summary_ids[0])) :
    #     j = 0
    #     for j in range(0, i) :
    #         if tokenizer.decode(summary_ids[0][i]) == tokenizer.decode(summary_ids[0][j]) :
    #             flag = 1
    #             break
    #     if flag == 0 :
    #         list.append(tokenizer.decode(summary_ids[0][i]))
    #     flag = 0
    # return ''.join(list)

# print(conversation_summary(sents))