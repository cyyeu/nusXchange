from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin

# from .forms import UserProfileChangeForm, UserProfileCreationForm
from .models import UserProfile, Listing, Transaction, Review

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Listing)
admin.site.register(Transaction)
admin.site.register(Review)