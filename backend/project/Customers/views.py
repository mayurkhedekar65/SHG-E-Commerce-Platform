from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from Customers.serializers import UserFormSerializer
from Customers.models import CustomerForm
# Create your views here.

class SubmitUserRegistrationForm(APIView):
    def post(self,request,format=None):
        serializer=UserFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'form submitted successfully'},status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
