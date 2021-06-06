from django.shortcuts import render
from .models import Listing, UserProfile
from .serializers import ListingSerializer, UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers, viewsets
# Create your views here.



class UserProfileViewSet(viewsets.ModelViewSet):
	serializer_class = UserProfileSerializer
	queryset = UserProfile.objects.all()

class ListingViewSet(viewsets.ModelViewSet):
	serializer_class = ListingSerializer
	queryset = Listing.objects.all()



