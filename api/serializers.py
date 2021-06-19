from api.utils import calculate_xp
from api.permissions import ListingPermission
from rest_framework import serializers
from rest_auth.models import TokenModel
from .models import UserProfile, Listing, Transaction, Review
from django.contrib.auth.models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import UserDetailsSerializer
from django.db.models import F


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
	first_name = serializers.CharField(source='user.first_name',allow_blank=True)
	last_name = serializers.CharField(source='user.last_name',allow_blank=True)
	class Meta:
		model = UserProfile
		fields = "__all__"
		read_only_fields = ('xp', 'user')
		extra_kwargs = {
			'bio': {"required": False , "allow_blank": True},
			'first_name': {"required": False , "allow_blank": True},
			'last_name': {"required": False , "allow_blank": True}
		}
	
	def update(self, instance, validated_data):
		user_data = validated_data.pop('user', None)
		if user_data:
			instance.user.first_name = user_data.get('first_name', instance.user.first_name)
			instance.user.last_name = user_data.get('last_name', instance.user.last_name)	
			instance.user.save(update_fields=['first_name', 'last_name'])
		instance = super().update(instance, validated_data)
		return instance



# search, create, edit, get, delete
class ListingSerializer(serializers.ModelSerializer):
	avg_rating = serializers.SerializerMethodField()
	owner = UserProfileSerializer(read_only=True)
	class Meta:
		model = Listing
		fields = "__all__"
		read_only_fields = ("date_created",)
		extra_kwargs = {
			'description': {"required": False , "allow_blank": True},
		}

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
		listing = Listing.objects.create(owner=user.userprofile, **validated_data)
		return listing


class TransactionSerializer(serializers.ModelSerializer):
	student = UserProfileSerializer(read_only=True)
	class Meta:
		model = Transaction
		fields = "__all__"
		read_only_fields = ('student', 'gave_review', 'is_accepted')

	def create(self, validated_data):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
				user = request.user
		if user.id == validated_data.get('listing').owner.pk:
			raise serializers.ValidationError({"message": "cant create transaction with yourself!"})
		try:
			transaction = Transaction.objects.filter(listing=validated_data.get('listing', None)).filter(student=user.id)
			if transaction.exists():
				raise serializers.ValidationError({"message": "cant create duplicate transaction!"})
		except Transaction.DoesNotExist:
			pass
		tx = Transaction.objects.create(student=user.userprofile, **validated_data)
		return tx

	

class TutorSerializer(serializers.ModelSerializer):
	tutor = UserProfileSerializer(source='listing.owner', read_only=True)
	class Meta:
		model = Transaction
		fields = ('tutor', 'listing', 'gave_review', 'is_accepted')


class ReviewSerializer(serializers.ModelSerializer):
	class Meta:
		model = Review
		fields = "__all__"
		read_only_fields = ('id', 'tutor', 'date', 'exp_gained')

	def create(self, validated_data):
		listing = validated_data.get('listing')
		print(validated_data)
		if not listing:
			raise serializers.ValidationError({"message": "please provide a listing id!"})
		if listing.owner.pk == validated_data.get('student').pk:
			raise serializers.ValidationError({"message": "cant give yourself review!"})
		try: 
			tx = listing.transactions.get(student=validated_data.get('student'))
		except Transaction.DoesNotExist:
			raise serializers.ValidationError({"message": "transaction not found!"})
		if tx.gave_review:
			raise serializers.ValidationError({"message": "review has already been given before!"})
		if not tx.is_accepted:
			raise serializers.ValidationError({"message": "you are not accepted to be a student yet!"})

		xp = calculate_xp(listing.mod_code, validated_data.get('rating'))
		listing.owner.xp = F('xp') + xp
		listing.owner.save()
		tx.gave_review = True
		tx.save(update_fields=['gave_review'])
		review = Review.objects.create(tutor=listing.owner, exp_gained=xp, **validated_data)
		return review

	def to_representation(self, instance):
			ret = super().to_representation(instance)
			ret['student'] = UserProfileSerializer(instance.student).data
			return ret