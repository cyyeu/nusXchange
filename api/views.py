from re import I
from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView
from .models import Listing, User, UserProfile
from .serializers import ListingSerializer, UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers, viewsets, mixins, generics
from api.permissions import IsOwnerOrReadOnly
from django.shortcuts import get_object_or_404
# Create your views here.



class UserProfileView(generics.RetrieveUpdateAPIView):
	serializer_class = UserProfileSerializer
	permission_classes = [IsOwnerOrReadOnly]

	def get_queryset(self):
			return UserProfile.objects.all()



