from django.db import models

# Create your models here.

CATEGORY = (
    ("Chorus", "Chorus"),
    ("Looper", "Looper"),
    ("Octave", "Octave"),
    ("Fuzz", "Fuzz"),
    ("Overdrive and Distortion", "Overdrive and Distortion"),
    ("Compressor", "Compressor")
)


PRICE = (
    ("£", "£"),
    ("££", "££"),
    ("£££", "£££"),
    ("££££", "££££"),
    ("£££££", "£££££")
)


class Brands(models.Model):
    brand = models.CharField(max_length=250, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-brand']

    def __str__(self):
        return f"{self.brand}"


class Pedal(models.Model):
    brand = models.ForeignKey(
        Brands, on_delete=models.CASCADE, related_name='pedals')
    name = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY, default='£')
    price = models.CharField(max_length=5, choices=PRICE, default='£')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-name']

    def __str__(self):
        return f"{self.name}"
