import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration
from constant.conversation import *

tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')

def conversation_summary(text_path):
    with open(text_path, "r", encoding=ENCODING) as f:
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