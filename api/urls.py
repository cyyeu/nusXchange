from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import PasswordResetConfirmView
from api import views
from django.conf.urls import url


urlpatterns = [
    path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('auth/', include('dj_rest_auth.urls')),
		path('auth/register', include('dj_rest_auth.registration.urls')),
		# Users can create a listing
		path('create-listing', views.create_listing),
		# For query. Anyone can query via module code
		path('search/', views.query_listing),
		# Get, update, or delete a specific listing
    path('listing/<int:id>/', views.listing),
]

