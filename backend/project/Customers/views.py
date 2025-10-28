from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from Customers.serializers import UserFormSerializer
from Customers.models import CustomerForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
# Create your views here.


class SubmitUserRegistrationForm(APIView):
    def post(self, request, format=None):
        serializer = UserFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'form submitted successfully'}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    def post(self, request, format=None):
        user_email = request.data.get("email")
        password = request.data.get("password")

        try:
            if '@' not in user_email:
                return Response({'message': 'invalid email id'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user_obj = CustomerForm.objects.get(email=user_email)
                if not user_obj:
                    return Response({'message': 'email id not registered'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    user = authenticate(
                        email=user_email, password=password)
                    if user:
                        login(user_email, password)
                        return Response({'message': 'user logged in successfully'}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'message': 'invalid creditials'}, status=status.HTTP_400_BAD_REQUEST)
        except user.DoesNotExist:
            return Response({'message': 'user not registered'}, status=status.HTTP_400_BAD_REQUEST)
