from django.db import models

DEFAULT_QUESTION_ID = 1
DEFAULT_NULL_VALUE = -1
DEFAULT_TEXT = ""

class InterviewQuestion(models.Model):
    question = models.TextField()

    CATEGORY_CHOICES = [
        ("experience", "experience"),
        ("company", "company"),
        ("career", "career"),
        ("personal", "personal")
    ]
    category = models.CharField(max_length=200, choices=CATEGORY_CHOICES, default="personal")

    def __str__(self):
        return self.question

class InterviewResponse(models.Model):
    response = models.TextField()
    time = models.IntegerField()
    wpm = models.IntegerField(default=DEFAULT_NULL_VALUE)
    gradelevel = models.IntegerField(default=DEFAULT_NULL_VALUE)
    keyphrases = models.TextField(default=DEFAULT_TEXT)

    q = models.ForeignKey(InterviewQuestion, on_delete=models.CASCADE, default=DEFAULT_QUESTION_ID)

    def __str__(self):
        return self.response


