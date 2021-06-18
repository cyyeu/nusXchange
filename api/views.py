from re import I
from django.shortcuts import render
from rest_framework.decorators import action
from .models import Listing, Transaction, UserProfile, Review
from .serializers import ListingSerializer, TransactionSerializer, TutorSerializer, UserProfileSerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import serializers, viewsets, mixins, generics, status
from rest_framework.response import Response
from api.permissions import ProfilePermission, ListingPermission, TransactionPermission
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


class TransactionViewSet(viewsets.ModelViewSet):
	serializer_class = TransactionSerializer
	permission_classes = [TransactionPermission, IsAuthenticatedOrReadOnly]

	def get_queryset(self):
			return Transaction.objects.all()

	@action(detail=False)
	def approve(self, request):
		# pk here is the student id
		listing_id = self.request.GET.get('listing')
		student = self.request.GET.get('student')
		if not student or not listing_id:
			return Response({"message": "please provide valid listing and student id"}, status=status.HTTP_400_BAD_REQUEST)
		listing = get_object_or_404(Listing, id=listing_id)
		if listing.owner.pk != request.user.id:
			return Response({"message": "you are not the owner of this listing!"}, status=status.HTTP_401_UNAUTHORIZED)
		try:
			transaction = listing.transactions.get(student=student)
		except Transaction.DoesNotExist:
			return Response({"message": "transaction does not exist"}, status=status.HTTP_400_BAD_REQUEST)

		transaction.is_approved = True
		transaction.save(update_fields=['is_approved'])
		return Response({"message": "approved student (" + str(transaction.student) + ")"}, status=status.HTTP_200_OK)
		

	@action(detail=False)
	def students(self, request):
		pk = request.user.id
		if not pk:
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		#listings = Listing.objects.filter(owner=pk)
		#print(listings)
		transactions = Transaction.objects.filter(listing__owner=pk)
		requested = transactions.filter(is_accepted=False)
		accepted = transactions.filter(is_accepted=True)
		requested_serializer = TransactionSerializer(requested, many=True)
		accepted_serializer = TransactionSerializer(accepted, many=True)
		return Response({
			"requested": requested_serializer.data,
			"accepted": accepted_serializer.data
		})
	

	@action(detail=False)
	def tutors(self, request):
		pk = request.user.id
		if not pk:
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		transactions = Transaction.objects.filter(student=pk)
		requested = transactions.filter(is_accepted=False)
		accepted = transactions.filter(is_accepted=True)
		requested_serializer = TutorSerializer(requested,many=True)
		accepted_serializer = TutorSerializer(accepted,many=True)
		return Response({
			"requested": requested_serializer.data,
			"accepted": accepted_serializer.data
		})

	@action(detail=True)
	def status(self, request, pk=None):
		# pk here is listing id
		listing = get_object_or_404(Listing, id=pk)
		user = request.user.id
		if listing.owner.pk == user:
			return Response ({
				"user_type": "owner"
			})

		try:
			transaction = listing.transactions.get(student=pk)
		except Transaction.DoesNotExist:
			return Response({"user_type": ""})

		is_accepted = transaction.is_accepted
		gave_review = transaction.gave_review
		return Response({
			"user_type": "student",
			"is_accepted": is_accepted,
			"gave_review": gave_review
		})
		


class ReviewVewSet(viewsets.ViewSet):
	permission_classes = [IsAuthenticatedOrReadOnly]

	def retrieve(self, request, pk=None):
		queryset = Review.objects.filter(tutor=pk)
		serializer = ReviewSerializer(queryset, many=True)
		return Response(serializer.data)

	def create(self, request):
		request.data["student"] = request.user.id
		serializer = ReviewSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		
