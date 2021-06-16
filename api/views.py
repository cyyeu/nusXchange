from re import I
from django.shortcuts import render
from .models import Listing, UserProfile
from .serializers import ListingSerializer, UserProfileSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import serializers, viewsets, mixins, generics
from api.permissions import ProfilePermission, ListingPermission
from django.shortcuts import get_object_or_404
# Create your views here.



class UserProfileAPIView(generics.RetrieveUpdateAPIView):
	serializer_class = UserProfileSerializer
	permission_classes = [ProfilePermission]

	def get_queryset(self):
			return UserProfile.objects.all()

class ListingViewSet(viewsets.ModelViewSet):
	serializer_class = ListingSerializer
	permission_classes = [ListingPermission, IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		user = self.request.GET.get('user')
		mod_code = self.request.GET.get('mod_code')
		if user:
			return Listing.objects.filter(owner=user)
		elif mod_code:
			return Listing.objects.filter(mod_code__icontains=mod_code)
		else:
			return Listing.objects.all()
	

