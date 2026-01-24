from django.urls import path
from Customers.views import SubmitUserRegistrationForm,UserLogin,add_to_cart,view_cart

urlpatterns = [
    path('user_registration_form/',SubmitUserRegistrationForm.as_view(),name='user_registration_form'),
    path('user_login/',UserLogin.as_view(),name='user_login'),
    path('add_to_cart/',add_to_cart),
    path('cart/',view_cart),
    
]
