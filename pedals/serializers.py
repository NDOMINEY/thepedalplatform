from rest_framework import serializers
from .models import Brands, Pedal


class BrandsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brands
        fields = [
            'id', 'brand', 'created', 'updated'
        ]


class PedalSerializer(serializers.ModelSerializer):
    brand = serializers.ReadOnlyField(source='brand.brand')

    class Meta:
        model = Pedal
        fields = [
            'id', 'brand', 'name', 'category', 'price', 'created', 'updated'
        ]
