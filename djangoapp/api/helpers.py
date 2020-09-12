from textblob import TextBlob
import nltk

def analyze(data):
    minutes = int(data["time"]) / 60
    words = data["response"].split()
    wpm = len(words) // minutes
    data["wpm"] = wpm

    filler = {
        "um": 0, 
        "like": 0, 
        "yeah": 0
    }
    for i in range(len(words)):
        if words[i] in filler:
            filler[words[i]] += 1
    data["um"] = ":".join("{};{}".format(k,v) for k,v in filler.items())

    blob = TextBlob(data["response"])
    phrases = blob.noun_phrases
    data["keyphrases"] = ",".join(phrases)

    data["q"] = int(data["q"])

    return data
