from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone
import os

def profile_image_path(instance, filename):
    return os.path.join(
        'images',
        'profile',
        'user_id_' + str(instance.id),
        filename
    )

class AccountManager(BaseUserManager):
    
    def create_superuser(self, email, username, name, password, **other_fields):

        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be a staff.")

        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be a superuser.")

        return self.create_user(email, username, name, password, **other_fields)

    def create_user(self, email, username, name, password, **other_fields):

        if not email:
            raise ValueError("You must provide an email address.")

        if not username:
            raise ValueError("You must provide a user ID.")

        if not name:
            raise ValueError("You must provide your name.")

        if not password:
            raise ValueError("You must provide a password.")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, name=name, **other_fields)
        user.set_password(password)
        user.save()
        
        return user

class Account(AbstractBaseUser, PermissionsMixin):
    
    class Meta:
        verbose_name_plural = "Account List"

    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, default="")
    profile_image = models.ImageField(max_length=255, upload_to=profile_image_path, blank=True, null=True, unique=True)
    about = models.TextField(max_length=255, default='Write something about yourself...', blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "name"]

    def __str__(self):
        return self.username
