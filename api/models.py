

from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractUser, User
from django.db import models



# Create your models here.

class UserProfile(AbstractUser):
    user_bio = models.CharField(max_length = 255, null = True)
    user_xp = models.IntegerField(default = 0,null = True)
    def __str__(self):
        return "%s - %s" % (self.first_name,self.last_name)


