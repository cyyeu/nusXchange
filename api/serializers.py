from rest_framework import serializers
from rest_framework import serializers
from .models import UserProfile, Listing, Transaction, Review
from django.contrib.auth.models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import UserDetailsSerializer

## add first name last name custom sign up
class CustomRegisterSerializer(RegisterSerializer):

  first_name = serializers.CharField(required=False)
  last_name = serializers.CharField(required=False)

  def custom_signup(self, request, user):
    user.first_name = self.validated_data.get('first_name', '')
    user.last_name = self.validated_data.get('last_name', '')
    user.save(update_fields=['first_name', 'last_name'])


# only to GET or PATCH owner's profile. 
# returns id, first_name, last_name, bio, email, avatar_id.
class UserProfileSerializer(serializers.ModelSerializer):
	first_name = serializers.CharField(source='user.first_name')
	last_name = serializers.CharField(source='user.last_name')
	class Meta:
		model = UserProfile
		fields = "__all__"
		read_only_fields = ('xp', 'user')
	
	def update(self, instance, validated_data):
		print("@@@",instance.user.first_name)
		user_data = validated_data.pop('user', None)
		if user_data:
			instance.user.first_name = user_data.get('first_name', instance.user.first_name)
			instance.user.last_name = user_data.get('last_name', instance.user.first_name)	
		instance = super().update(instance, validated_data)
		return instance



# search, create, edit, get, delete
class ListingSerializer(serializers.ModelSerializer):
	avg_rating = serializers.SerializerMethodField()
	is_student = serializers.SerializerMethodField()
	class Meta:
		model = Listing
		fields = "__all__"
		read_only_fields = ("date_created",)
		depth = 1

	def get_avg_rating(self, obj):
		transactions = obj.transaction.all()
		ratings = transactions.ratings.all()
		total_ratings = 0
		for rating in ratings:
			total_ratings += rating.rating
		return total_ratings / len(ratings) #ratings.count()

class ReviewSerializer(serializers.ModelSerializer):
	class Meta:
		model = Review
		fields = "__all__"

# to check if student can leave rating, and request/accept students
class TransactionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Transaction
		fields = "__all__"

