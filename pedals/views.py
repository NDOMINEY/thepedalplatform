from django.db.models import Count, Avg
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status, filters, permissions
from tpp.permissions import IsOwnerOrReadOnly
from django.db import models
from .models import Brands, Pedal
from .serializers import BrandsSerializer, PedalSerializer

# Create your views here.


class BrandsList(APIView):
    def get(self, request):
        brands = Brands.objects.all()
        serializer = BrandsSerializer(
            brands, many=True, context={'request': request})
        return Response(serializer.data)


class BrandsDetail(APIView):
    serializer_class = BrandsSerializer

    def get_object(self, pk):
        try:
            brand = Brands.objects.get(pk=pk)
            self.check_object_permissions(self.request, brand)
            return brand
        except Brands.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        brand = self.get_object(pk)
        serializer = BrandsSerializer(brand, context={'request': request})

        return Response(serializer.data)


class PedalList(generics.ListAPIView):
    """
    List all pedals.
    """
    serializer_class = PedalSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Pedal.objects.annotate(
        review_count=Count('review', distinct=True),
        review_average=Avg('review__rate', distinct=True))

    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    # search fields
    search_fields = ['brand__brand', 'name']


class PedalDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PedalSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Pedal.objects.annotate(
        review_count=Count('review', distinct=True),
        review_average=Avg('review__rate', distinct=True))
