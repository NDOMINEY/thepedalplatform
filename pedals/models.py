from django.db import models

# Create your models here.


class Brands(models.Model):
    brand = models.CharField(max_length=250, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-brand']

    def __str__(self):
        return f"{self.brand}"
