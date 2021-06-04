from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import PasswordResetConfirmView


urlpatterns = [
    path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('auth/', include('dj_rest_auth.urls')),
		path('auth/register', include('dj_rest_auth.registration.urls'))
]

