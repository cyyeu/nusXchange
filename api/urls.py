from django.contrib import admin
from django.urls import path, include, re_path
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from api import views
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView

router = DefaultRouter()
router.register(r'listings', views.ListingViewSet, basename='listing')
router.register(r'tx', views.TransactionViewSet, basename='transaction')
router.register(r'reviews', views.ReviewVewSet, basename='review')

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
		path('auth/register', include('dj_rest_auth.registration.urls')),
		path('password-reset-confirm', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
		path('password-reset', PasswordResetView.as_view()),
		path('user/<int:pk>', views.UserProfileAPIView.as_view(), name='UserProfileView'),
		path('', include(router.urls)),
		path('verify-email',
         VerifyEmailView.as_view(), name='rest_verify_email'),
		path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
		re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
		path('resend-verification-email', views.NewEmailConfirmation.as_view(), name='resend-email-confirmation'),
]

