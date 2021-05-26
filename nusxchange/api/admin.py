from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import UserProfileChangeForm, UserProfileCreationForm
from .models import UserProfile

# Register your models here.
class UserProfileAdmin(UserAdmin):    
    add_form = UserProfileCreationForm
    form = UserProfileChangeForm
    model = UserProfile
    list_display = ['email','phone']
    
admin.site.register(UserProfile, UserProfileAdmin)