from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from Customers.serializers import UserFormSerializer
from Customers.models import CustomerForm
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


class SubmitUserRegistrationForm(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserFormSerializer(data=request.data)

        if serializer.is_valid():
            customer_name = request.data.get("customer_name")
            customer_email = request.data.get("email")
            customer_phoneno = request.data.get("phone_number")
            password = request.data.get("password")

            if User.objects.filter(email=customer_email).exists():
                return Response(
                    {'message': 'email id already registered'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = User.objects.create(
                username=customer_email,
                email=customer_email
            )
            user.set_password(password)
            user.save()

            CustomerForm.objects.create(
                customer=user,
                customer_name=customer_name,
                phone_number=customer_phoneno,
                customer_email=customer_email,
            )

            return Response(
                {'message': 'form submitted successfully'},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = []

    def post(self, request, format=None):
        user_email = request.data.get("email")
        password = request.data.get("password")

        try:
            user_obj = User.objects.get(email=user_email)
        except User.DoesNotExist:
            return Response(
                {'message': 'user not registered'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=user_obj.username, password=password)

        if user is None:
            return Response(
                {'message': 'invalid credentials'},
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                'message': 'user logged in successfully',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            },
            status=status.HTTP_200_OK
        )
