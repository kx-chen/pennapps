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
        "Question Detail": "/question-detail/<str:pk>",
        "Response Detail": "/response-detail/<str:pk>",
        "Create": "/create-response/",
        "Delete": "/delete-reponse/<str:pk>",
        "Update": "/update-response/<str:pk>",
    }

    return Response(api_urls)

@api_view(["GET"])
def interviewQuestionList(request):
    questions = InterviewQuestion.objects.all()
    serializer = InterviewQuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def interviewQuestionDetail(request, pk):
    question = InterviewQuestion.objects.get(id=pk)
    serializer = InterviewQuestionSerializer(question, many=False)
    return Response(serializer.data)

@api_view(["GET"])
def interviewResponseList(request):
    responses = InterviewResponse.objects.all()
    serializer = InterviewResponseSerializer(responses, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def interviewResponseDetail(request, pk):
    response = InterviewResponse.objects.get(id=pk)
    serializer = InterviewResponseSerializer(response, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def interviewResponseCreate(request):
    serializer = InterviewResponseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(["POST"])
def interviewResponseUpdate(request, pk):
    response = InterviewResponse.objects.get(id=pk)
    serializer = InterviewResponseSerializer(instance=response, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(["DELETE"])
def interviewResponseDelete(request, pk):
    response = InterviewResponse.objects.get(id=pk)
    response.delete()
    return Response("successfully deleted")
