
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(RegisterSerializer):
    first_name = serializers.CharField(required = True, max_length = 30)
    last_name = serializers.CharField(required = True, max_length = 30)
    def save(self, request):
        user = super().save(request)
        user.save()
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        return user
    