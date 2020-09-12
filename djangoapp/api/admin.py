from django.contrib import admin
from .models import InterviewResponse, InterviewQuestion

# Register your models here.
admin.site.register(InterviewResponse)
admin.site.register(InterviewQuestion)