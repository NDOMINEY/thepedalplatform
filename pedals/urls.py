from django.urls import path
from pedals import views


urlpatterns = [
    path('brands/', views.BrandsList.as_view()),
    path('brands/<int:pk>', views.BrandsDetail.as_view()),

]
