from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from groups.models import Shg_Group_Registration
from groups.serializers import ContactFormSerializer

# Create your views here.


class SubmitRegistrationForm(APIView):
    def post(self, request, format=None):
        serializer = ContactFormSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "form submitted successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
