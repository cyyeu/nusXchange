from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import PasswordResetConfirmView
from api import views
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'listings', views.ListingViewSet, basename='listing')
router.register(r'transactions', views.TransactionViewSet, basename='viewset')
router.register(r'reviews', views.ReviewVewSet, basename='review')

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
		path('auth/register', include('dj_rest_auth.registration.urls')),
		path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
		path('user/<int:pk>', views.UserProfileAPIView.as_view(), name='UserProfileView'),
		path('', include(router.urls)),
]

