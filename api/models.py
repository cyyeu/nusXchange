from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver
from django.db.models.signals import post_save

# default django model
User = get_user_model()

# related fields: 
# From listing model: listings
# From transaction model: students
# From review mode: tutorReviews, studentReviews
class UserProfile(models.Model):
	user = models.OneToOneField(
		User, 
		related_name='userprofile', 
		on_delete=models.CASCADE, 
		primary_key=True
	)
	bio = models.CharField(max_length = 255, blank=True, default='')
	xp = models.IntegerField(default = 0, blank=True)
	avatar_id = models.CharField(max_length = 255, default='', blank=True )
	def __str__(self):
		return self.user.email
# auto create user profile upon registering with dj-rest-auth
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		UserProfile.objects.create(user=instance)

# auto create user profile upon registering with dj-rest-auth
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
	instance.userprofile.save()
    

#related fields: 
# From transaction model: transactions
# From review model: reviews

class Listing(models.Model):
	owner = models.ForeignKey(
		UserProfile, 
		related_name='listings', 
		on_delete=models.CASCADE
	) 
	mod_code = models.CharField(max_length=8, blank=False) 
	description = models.CharField(max_length=500, default='', blank=True)
	date_created = models.DateTimeField(default=timezone.now)
	avail_dates = ArrayField(models.DateField(), default=list, blank=True )
	price =  models.PositiveIntegerField(default=0, blank=True)

	def __str__(self):
		return "%s - %s - %s" % (self.pk, self.owner,self.mod_code)

class Transaction(models.Model):
	student = models.ForeignKey(
		UserProfile, 
		related_name="student",
		on_delete=models.CASCADE
	)
	
	listing = models.ForeignKey(
		Listing, 
		related_name='transactions', 
		on_delete=models.CASCADE
	)
	is_accepted = models.BooleanField(default=False, blank=True)
	gave_review = models.BooleanField(default=False, blank=True)
	def __str__(self):
		return "Student: %s - Listing:  %s - %s - Accepted: %s" % (self.student,self.listing.pk, self.listing.mod_code, self.is_accepted)

class Review(models.Model):
	tutor = models.ForeignKey(
		UserProfile, 
		related_name="tutorReviews",
		on_delete=models.CASCADE
	)

	student = models.ForeignKey(
		UserProfile,
		related_name='studentReviews',
		on_delete=models.CASCADE
	)

	listing = models.ForeignKey(
		Listing, 
		related_name='reviews',
		on_delete=models.SET_NULL, 
		null=True
	)

	date = models.DateTimeField(default=timezone.now)
	description = models.CharField(blank=True, default='', max_length=400)
	rating = models.PositiveSmallIntegerField(
		validators=[
			MaxValueValidator(5),
			MinValueValidator(1)
		]
	)
	exp_gained = models.IntegerField(default=0, blank=True )

	def __str__(self):
		return "Tutor:  %s\n - Student: %s - Rating: %s" % (self.tutor, self.student, self.rating)