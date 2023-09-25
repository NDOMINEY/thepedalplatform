from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    pedal = serializers.ReadOnlyField(source='pedal.id')

    class Meta:
        model = Review

        fields = [
            'id', 'owner', 'pedal', 'created_at', 'updated_at', 'content',
            'rate',
        ]
