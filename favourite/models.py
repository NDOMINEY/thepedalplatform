from django.db import models
from django.contrib.auth.models import User
from pedals.models import Pedal


# Create your models here.


class Favourite(models.Model):
    """
    Favourite model
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    pedal = models.ForeignKey(
        Pedal, related_name="favourite", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.pedal
