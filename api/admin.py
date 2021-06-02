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
    list_display = ['first_name', 'last_name', 'email','user_bio','user_xp']
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ('first_name', 'last_name',"email", "password",'user_bio','user_xp'),
            },
        ),
    )


admin.site.register(UserProfile, UserProfileAdmin)
