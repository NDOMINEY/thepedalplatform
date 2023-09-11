from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=200, blank=True)
    about = models.CharField(max_length=500, blank=True)
    picture = models.ImageField(
        upload_to='profile_images/',
        default='../default_profile_igf8vw')

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f"{self.name}'s profile"


def create_profile(sender, instance, created, **Kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
