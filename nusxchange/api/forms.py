from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import UserProfile


class UserProfileCreationForm(UserCreationForm):
    class Meta:
        model = UserProfile
        fields = ('email','phone' )


class UserProfileChangeForm(UserChangeForm):
    class Meta:
        model = UserProfile
        fields = UserChangeForm.Meta.fields