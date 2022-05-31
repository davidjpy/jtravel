from django.db import models
from django.utils import timezone
from account.models import Account
import os

def thread_image_path(instance, filename):
    return os.path.join(
        'images',
        'threads',
        'thread_username_' + str(instance.username),
        filename
    )

class Thread(models.Model):

    options = (('active', 'Active'), ('deactivated', 'Deactivated'))

    username = models.ForeignKey(Account, on_delete=models.CASCADE, to_field='username', related_name='user')
    alt = models.TextField(max_length=255, blank=True)
    image = models.ImageField(max_length=255, upload_to=thread_image_path, blank=True)
    content = models.TextField(blank=True)
    created = models.DateTimeField(blank=True, null=True, default=timezone.now)
    status = models.CharField(max_length=11, choices=options, default='active')
    
    
