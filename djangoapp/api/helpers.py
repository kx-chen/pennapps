from textblob import TextBlob
from nltk.corpus import words
import nltk
import re

def analyze(data):
    # WORDS PER MINUTE (WPM)
    response = re.sub(r"[^\w\d'\s]", '', data["response"])
    # print(response)
    minutes = int(data["time"]) / 60
    responsewords = response.split()
    wpm = len(responsewords) // minutes
    data["wpm"] = wpm

    # HESITATION FORMS ("um"s)
    filler = {
        "um": 0, 
        "like": 0, 
        "yeah": 0,
        "okay": 0,
        "right": 0,
        "uh": 0,
        "er": 0,
        "ah": 0,
    }
    for i in range(len(responsewords)):
        word = responsewords[i].lower()
        if word in filler:
            filler[word] += 1
    data["um"] = ":".join("{};{}".format(k,v) for k,v in filler.items())

    # NLP KEY PHRASES (noun-phrases)
    blob = TextBlob(data["response"])
    phrases = blob.noun_phrases
    # print(phrases)
    i = 0
    nltk.download('words')
    wordlist = set(words.words())
    while i < len(phrases):
        phrase = str(phrases[i]).split()
        for j in range(len(phrase)):
            if phrase[j] in wordlist:
                continue
            else:
                phrases.pop(i)
                i -= 1
        i += 1
    if phrases:
        data["keyphrases"] = ",".join(phrases)
    else:
        data["keyphrases"] = "No key phrases were detected."

    # QUESTION ID KEY
    data["q"] = int(data["q"])

    return data
