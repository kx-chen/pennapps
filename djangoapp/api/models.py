from django.db import models

# Create your models here.
class Response(models.Model):
    response = models.TextField()

    def __str__(self):
        return self.response