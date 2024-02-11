from django.db.models import Count, Avg
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, filters, permissions
from tpp.permissions import IsOwnerOrReadOnly
from django.db import models
from .models import Favourite
from .serializers import FavouriteSerializer

# Create your views here.


class FavouriteList(generics.ListCreateAPIView):
    """
    List all favourites.
    """
    serializer_class = FavouriteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Favourite.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['pedal']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FavouriteDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FavouriteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Review.objects.all()
