from django.urls import path
from reviews import views


urlpatterns = [
    path('review/', views.ReviewList.as_view()),
    path('review/<int:pk>', views.ReviewDetail.as_view()),
]
