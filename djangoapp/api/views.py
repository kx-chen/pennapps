from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import InterviewResponseSerializer, InterviewQuestionSerializer
from .models import InterviewResponse, InterviewQuestion

@api_view(["GET"])
def apiOverview(request):
    api_urls = {
        "Question List": "/question-list/",
        "Response List": "/response-list/",
        "Detail": "/response-detail/<str:pk>",
        "Create": "/create-response/",
        "Delete": "/delete-reponse/<str:pk>",
        "Update": "/update-response/<str:pk>",
    }

    return Response(api_urls)

@api_view(["GET"])
def interviewResponseList(request):
    responses = InterviewResponse.objects.all()
    serializer = InterviewResponseSerializer(responses, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def interviewQuestionList(request):
    questions = InterviewQuestion.objects.all()
    serializer = InterviewQuestionSerializer(questions, many=True)
    return Response(serializer.data)
