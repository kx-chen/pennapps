from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('response-list/', views.interviewResponseList, name="response-list"),
    path('question-list/', views.interviewQuestionList, name="question-list")
]