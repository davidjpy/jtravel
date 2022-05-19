from django.db import models
from django.utils import timezone
from account.models import Account


def thread_image_path(instance, filename):
    return "images/{0}".format(filename)


class Thread(models.Model):

    options = (("active", "Active"), ("deactivated", "Deactivated"))

    author = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='author')
    alt = models.TextField(max_length=255, default="")
    image = models.ImageField(max_length=255, upload_to=thread_image_path, default="images/family.png")
    content = models.TextField(max_length=255, blank=True)
    created = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=11, choices=options, default="active")
