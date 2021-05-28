
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import UserProfile

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.conf import settings
from dj_rest_auth.serializers import UserDetailsSerializer

class UserProfileSerializer(RegisterSerializer):
	first_name = serializers.CharField(max_length=30)
	last_name = serializers.CharField(max_length=30)

	def get_cleaned_data(self):
		data_dict = super().get_cleaned_data()
		data_dict['first_name'] = self.validated_data.get('first_name', '')
		data_dict['last_name'] = self.validated_data.get('last_name', '')
		return data_dict
    

class CustomUserDetailsSerializer(UserDetailsSerializer):
	class Meta(UserDetailsSerializer.Meta):
			fields = UserDetailsSerializer.Meta.fields + \
					('first_name', 'last_name')