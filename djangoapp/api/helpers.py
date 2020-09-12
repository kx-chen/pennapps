from textblob import TextBlob
import nltk

def analyze(data):
    minutes = data["time"] / 60
    words = data["response"].split()
    wpm = len(words) // minutes
    data["wpm"] = wpm

    # TODO
    FILLER_WORDS = {
        "um": 0, 
        "like": 0, 
        "yeah": 0
    }
    # for i in range(len(words)):
    #     if True:
    #         continue

    data["um"] = 0

    blob = TextBlob(data["response"])
    phrases = blob.noun_phrases
    data["keyphrases"] = ",".join(phrases)

    return data
