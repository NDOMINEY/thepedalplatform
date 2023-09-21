from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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


class PedalList(APIView):
    def get(self, request):
        pedal = Pedal.objects.all()
        serializer = PedalSerializer(
            pedal, many=True, context={'request': request})
        return Response(serializer.data)


class PedalDetail(APIView):
    serializer_class = PedalSerializer

    def get_object(self, pk):
        try:
            pedal = Pedal.objects.get(pk=pk)
            self.check_object_permissions(self.request, pedal)
            return pedal
        except Pedal.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        pedal = self.get_object(pk)
        serializer = PedalSerializer(pedal, context={'request': request})

        return Response(serializer.data)
