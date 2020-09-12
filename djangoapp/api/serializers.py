from rest_framework import serializers
from .models import InterviewResponse, InterviewQuestion

class InterviewResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewResponse
        fields = "__all__"

class InterviewQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewQuestion
        fields = "__all__"