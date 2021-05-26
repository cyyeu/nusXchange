

from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models



# Create your models here.

class UserProfile(AbstractUser):
    username = models.CharField(max_length=50, default='default',unique=True)
    phone = models.CharField(max_length=8)
    def __str__(self):
        return "%s - %s" % (self.first_name,self.last_name)


