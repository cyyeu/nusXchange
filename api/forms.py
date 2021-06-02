from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import UserProfile


class UserProfileCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserProfile
        fields = 'first_name', 'last_name',"email", "password",'user_bio','user_xp'


class UserProfileChangeForm(UserChangeForm):
    class Meta:
        model = UserProfile
        fields = 'first_name', 'last_name',"email", "password",'user_bio','user_xp'