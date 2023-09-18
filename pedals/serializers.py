from rest_framework import serializers
from .models import Brands


class BrandsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brands
        fields = [
            'id', 'brand', 'created', 'updated'
        ]
