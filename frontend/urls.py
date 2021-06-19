from django.urls import path
from .views import index

urlpatterns = [
	path('', index),
	path('listing', index),
	path('profile', index),
	path('search/<search>', index),
	path('settings', index),
	path('summarizer', index),
	path('create', index),
	path('signup', index),
	path('login', index),

]
