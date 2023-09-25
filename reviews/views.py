from django.db.models import Count, Avg
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, filters, permissions
from tpp.permissions import IsOwnerOrReadOnly
from django.db import models
from .models import Review
from .serializers import ReviewSerializer

# Create your views here.


class ReviewList(generics.ListAPIView):
    """
    List all reviews.
    """
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Review.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['pedal']


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Review.objects.all()
