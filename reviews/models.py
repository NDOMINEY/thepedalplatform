from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from pedals.models import Pedal

# Create your models here.


class Review(models.Model):
    """
    Review model
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    pedal = models.ForeignKey(
        Pedal, related_name="review", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    rate = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content
