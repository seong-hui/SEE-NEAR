from wordcloud import WordCloud
from constant.conversation import *

def createWordCloud(text):
    wordcloud = WordCloud(
            background_color=BACKGROUND_COLOR,
            max_words=MAX_WORDS,
            width=WIDTH,
            height=HEIGHT,
            font_path=FONT_PATH
        ).generate(text)
    wordcloud.to_file(filename= WORDCLOUD_PATH)