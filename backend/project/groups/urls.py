from django.urls import path
from groups.views import SubmitRegistrationForm


urlpatterns = [
    path('submit_registration_form/',SubmitRegistrationForm.as_view(),name='submit_registration_form'),
]
