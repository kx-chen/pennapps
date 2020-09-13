from django.test import TestCase
from textblob import TextBlob

def testTextBlob():
    text = "my name is jonathan zhang and i am a current google software engineer working on the cloud computing platform and i leverage machine learning to arrive at company solutions"

    blob = TextBlob(text)
    print(blob.noun_phrases)
