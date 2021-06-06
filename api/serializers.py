
from django.db.models import fields
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import UserProfile, Listing 
from django.contrib.auth.models import User
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer


class UserProfileSerializer(serializers.ModelSerializer):
	user = serializers.SlugRelatedField(
        queryset= User.objects.all(),
        slug_field='email')
	class Meta:
		model = UserProfile
		fields = "__all__"
		read_only_fields = ('user_xp',)

class CustomRegisterSerializer(RegisterSerializer):

  first_name = serializers.CharField(required=False)
  last_name = serializers.CharField(required=False)

  def custom_signup(self, request, user):
    user.first_name = self.validated_data.get('first_name', '')
    user.last_name = self.validated_data.get('last_name', '')
    user.save(update_fields=['first_name', 'last_name'])

class UserSerializer(UserDetailsSerializer):

	profile = UserProfileSerializer(source="userprofile")

	class Meta(UserDetailsSerializer.Meta):
		fields = UserDetailsSerializer.Meta.fields + ('profile',)



class ListingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Listing
		fields = "__all__"
		read_only_fields = ("date_created",)

