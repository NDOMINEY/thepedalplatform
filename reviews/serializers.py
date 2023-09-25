from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    pedal = serializers.ReadOnlyField(source='pedal.id')
    owner = serializers.ReadOnlyField(source='owner.username')
    created_at = serializers.DateTimeField(read_only=True, format="%d-%m-%Y")

    class Meta:
        model = Review

        fields = [
            'id', 'owner', 'pedal', 'created_at', 'updated_at', 'content',
            'rate',
        ]
