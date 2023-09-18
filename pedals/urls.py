from django.urls import path
from pedals import views


urlpatterns = [
    path('brands/', views.BrandsList.as_view()),
]
