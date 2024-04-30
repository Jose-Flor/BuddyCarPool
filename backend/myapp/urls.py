from django.urls import path, include
from . import views

urlpatterns = [
    path('register/', views.register_user),
    path('submit-form/', views.submit_form, name='submit_form'),
      path('endpoint/', views.endpoint_view),
     
]
