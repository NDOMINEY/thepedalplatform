from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    created_at = serializers.DateTimeField(read_only=True, format="%d-%m-%Y")
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Review

        fields = [
            'id', 'owner', 'pedal', 'created_at', 'updated_at', 'content',
            'rate', 'is_owner',
        ]
