from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from groups.models import Shg_Group_Registration
from Products.models import Products
from groups.serializers import ShgFormSerializer, AdminPanelSerializer
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
# --- FIX 1: CORRECTED TYPO AND IMPORTED PARSERS/AUTH ---
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import SessionAuthentication

# Create your views here.


class SubmitRegistrationForm(APIView):
    # (This class is fine)
    def post(self, request, format=None):
        serializer = ShgFormSerializer(data=request.data)

        if serializer.is_valid():
            shg_username = request.data.get('email')
            shg_password = request.data.get('password')
            name_of_shg = request.data.get('name_of_shg')
            date_of_formation = request.data.get('date_of_formation')
            registration_number = request.data.get('registration_number')
            contact_number = request.data.get('contact_number')
            village = request.data.get('village')
            taluka = request.data.get('taluka')
            district = request.data.get('district')
            type_of_shg = request.data.get('type_of_shg')
            address = request.data.get('address')

            shg_user = User.objects.create(
                username=shg_username, email=shg_username, is_staff=True)
            shg_user.set_password(shg_password)
            shg_user.save()
            Shg_Group_Registration.objects.create(shg=shg_user,
                                                  name_of_shg=name_of_shg,
                                                  date_of_formation=date_of_formation,
                                                  registration_number=registration_number,
                                                  contact_number=contact_number,
                                                  village=village,
                                                  taluka=taluka,
                                                  district=district,
                                                  type_of_shg=type_of_shg,
                                                  address=address)
            
            # Auto-login the user after registration
            user = authenticate(username=shg_username, password=shg_password)
            if user is not None:
                login(request, user)
                return Response({"message": "Group Registered successfully! You are now logged in."}, status=status.HTTP_201_CREATED)
            
            return Response({"message": "Group Registered successfully! Please log in."}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminLogin(APIView):
    # (This class is fine)
    def post(self, request, format=None):
        username = request.data.get('email')
        password = request.data.get('password')
        try:
            if '@' not in username:
                return Response({'message': 'invalid email id'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user_obj = User.objects.get(email=username)
                if not user_obj:
                    return Response({'message': 'email id not registered'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    user = authenticate(
                        username=user_obj.username, password=password)
                    if user is not None:
                        login(request, user)
                        return Response({'message': 'shg logged in successfully'}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'message': 'invalid creditials'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'user not registered'}, status=status.HTTP_400_BAD_REQUEST)


class AdminPanelView(APIView):
    # --- FIX 2: ADD AUTH, PERMISSIONS, AND PARSERS ---
    authentication_classes = [SessionAuthentication] 
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = request.user
        serializer = AdminPanelSerializer(data=request.data)

        try:
            # Get the SHG profile linked to the user
            shg_group = Shg_Group_Registration.objects.get(shg=user)
        except Shg_Group_Registration.DoesNotExist:
            return Response({'message': 'No SHG profile found for this user.'}, status=status.HTTP_400_BAD_REQUEST)

        # --- FIX 3: USE SERIALIZER TO VALIDATE AND SAVE ---
        if serializer.is_valid():
            # Pass the shg_group object to the save() method
            serializer.save(shg_group_id=shg_group)
            return Response({'message': 'Product added Successfully'}, status=status.HTTP_201_CREATED)
        else:
            # If the form is invalid, print the errors
            print("Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)