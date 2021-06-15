from api.permissions import ListingPermission
from rest_framework import serializers
from rest_auth.models import TokenModel
from .models import UserProfile, Listing, Transaction, Review
from django.contrib.auth.models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import UserDetailsSerializer


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenModel
        fields = ('key', 'user_id')  
	
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
		user_data = validated_data.pop('user', None)
		if user_data:
			instance.user.first_name = user_data.get('first_name', instance.user.first_name)
			instance.user.last_name = user_data.get('last_name', instance.user.first_name)	
		instance = super().update(instance, validated_data)
		return instance



# search, create, edit, get, delete
class ListingSerializer(serializers.ModelSerializer):
	avg_rating = serializers.SerializerMethodField()
	class Meta:
		model = Listing
		fields = "__all__"
		read_only_fields = ("date_created", "owner")

	def get_avg_rating(self, obj):
		reviews = obj.reviews.all()
		num_reviews = reviews.count()
		if num_reviews == 0:
			return 0 
		total_ratings = 0
		for review in reviews:
			total_ratings += review.rating
		return total_ratings / num_reviews

	def create(self, validated_data):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
				user = request.user
		print("@@@@@@@@@@@", user.id)
		user_profile = UserProfile.objects.get(user=user.id)
		listing = Listing.objects.create(owner=user_profile, **validated_data)
		return listing

class ReviewSerializer(serializers.ModelSerializer):
	class Meta:
		model = Review
		fields = "__all__"

# to check if student can leave rating, and request/accept students
class TransactionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Transaction
		fields = "__all__"

