from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Brands
from .serializers import BrandsSerializer
from tpp.permissions import IsOwnerOrReadOnly

# Create your views here.


class BrandsList(APIView):
    def get(self, request):
        brands = Brands.objects.all()
        serializer = BrandsSerializer(
            brands, many=True, context={'request': request})
        return Response(serializer.data)
