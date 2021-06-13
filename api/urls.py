from django.contrib import admin
from django.urls import path, include
# from dj_rest_auth.views import PasswordResetConfirmView
from api import views
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

router = DefaultRouter()



urlpatterns = [
    # path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('auth/', include('dj_rest_auth.urls')),
		path('auth/register', include('dj_rest_auth.registration.urls')),
		path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
		path('viewsets/', include(router.urls)),
		path('user/<int:pk>', views.UserProfileView.as_view(), name='UserProfileView')
]

