from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from .models import Listing, UserProfile
from .serializers import ListingSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.



## Start of Listing views

# Users can create a listing
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def create_listing(request):
	# create a new listing
	if request.method == 'POST':
		listing_data = JSONParser().parse(request)
		listing_serialized = ListingSerializer(data = listing_data)
		print(listing_serialized)
		
		if listing_serialized.is_valid():
			listing_serialized["user"] = UserProfile.objects.get(email=listing_serialized["user"])
			listing_serialized.save()
			return JsonResponse(listing_serialized.data, status=status.HTTP_201_CREATED)
		return JsonResponse(listing_serialized.errors, status=status.HTTP_400_BAD_REQUEST)


# For query. Anyone can query via module code
@api_view(['GET'])
def query_listing(request):
	if request.method == "GET":
		listings = Listing.objects.all()
		query = request.GET.get('q', None)
		if query is not None:
			listings = listings.filter(modCode__icontains=query)
		tutorials_serialized = ListingSerializer(listings, many=True)
		return JsonResponse(tutorials_serialized.data, safe=False)

# Get, update, or delete a specific listing
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def listing(request, id):
	pass

## End of Listing views




