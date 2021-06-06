from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver
from django.db.models.signals import post_save


# Create your models here.

class UserProfile(models.Model):
	user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
	user_bio = models.CharField(max_length = 255, null = True, default='')
	user_xp = models.IntegerField(default = 0,null = True)
	def __str__(self):
		return self.user.email

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
	instance.userprofile.save()
    

class Listing(models.Model):
	user = models.ForeignKey(UserProfile, related_name='listings', on_delete=models.CASCADE) 
	modCode = models.CharField(max_length=8, blank=False) 
	description = models.CharField(max_length=500)
	date_created = models.DateTimeField(default=timezone.now)
	availDates = ArrayField(models.DateField(), default=list, null=True, blank=True )
	price =  models.PositiveIntegerField()

	def __str__(self):
		return "%s - %s - %s" % (self.user,self.modCode,self.description)


