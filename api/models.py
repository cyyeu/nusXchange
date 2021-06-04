from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class UserProfile(AbstractUser):
    user_bio = models.CharField(max_length = 255, null = True)
    user_xp = models.IntegerField(default = 0,null = True)
    def __str__(self):
        return "%s - %s" % (self.first_name,self.last_name)

class Listing(models.Model):
	user = models.ForeignKey(UserProfile, related_name='listings', on_delete=models.CASCADE) 
	modCode = models.CharField(max_length=8, blank=False) 
	description = models.CharField(max_length=500)
	date_created = models.DateTimeField(default=timezone.now)
	availDates = ArrayField(models.DateField(), default=list, null=True, blank=True )
	price =  models.PositiveIntegerField()

	def __str__(self):
		return "%s - %s - %s" % (self.user,self.modCode,self.description)


