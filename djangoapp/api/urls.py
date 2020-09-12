from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('question-list/', views.interviewQuestionList, name="question-list"),
    path('response-list/', views.interviewResponseList, name="response-list"),
    path('question-detail/<str:pk>', views.interviewQuestionDetail, name="question-detail"),
    path('response-detail/<str:pk>', views.interviewResponseDetail, name="response-detail"),
]