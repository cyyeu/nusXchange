from rest_framework.serializers import ModelSerializer
from .models import UserProfile

class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('email', 'last_login', 'date_joined',)