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
        "yeah": 0,
        "okay": 0,
        "right": 0,
        "uh": 0,
        "er": 0,
        "ah": 0,
    }
    for i in range(len(words)):
        word = words[i].lower()
        if word in filler:
            filler[word] += 1
    data["um"] = ":".join("{};{}".format(k,v) for k,v in filler.items())

    blob = TextBlob(data["response"])
    phrases = blob.noun_phrases
    data["keyphrases"] = ",".join(phrases)

    data["q"] = int(data["q"])

    return data
