from django.db import models
from django.utils import timezone
import os

from account.models import Account

def thread_image_path(instance, filename):
    path = 'images/threads/thread_username_%s' % instance.username
    format = filename
    return os.path.join(path, format)
    

class Thread(models.Model):
  
    options = (('active', 'Active'), ('deactivated', 'Deactivated'))

    username = models.ForeignKey(Account, on_delete=models.CASCADE, blank=True, null=True)
    alt = models.TextField(max_length=255, blank=True)
    image = models.ImageField(max_length=255, upload_to=thread_image_path, blank=True)
    content = models.TextField(blank=True)
    liked = models.ManyToManyField(Account, related_name='liked', blank=True, null=True)
    created = models.DateTimeField(default=timezone.now, blank=True, null=True)
    status = models.CharField(max_length=11, choices=options, default='active')