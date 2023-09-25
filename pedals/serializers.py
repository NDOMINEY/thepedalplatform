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
    review_count = serializers.ReadOnlyField()
    review_average = serializers.ReadOnlyField()

    class Meta:
        model = Pedal
        fields = [
            'id', 'brand', 'name', 'category', 'price', 'created', 'updated',
            'review_count','review_average',
        ]
