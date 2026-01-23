from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from groups.models import Shg_Group_Registration
from Products.models import Products
from groups.serializers import ShgFormSerializer, AdminPanelSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated,AllowAny
# --- FIX 1: CORRECTED TYPO AND IMPORTED PARSERS/AUTH ---
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from groups.models import Order_Items
from Customers.models import CustomerForm
from rest_framework.decorators import api_view, permission_classes

# Create your views here.


class SubmitRegistrationForm(APIView):
    permission_classes=[AllowAny]
    def post(self, request, format=None):
        serializer = ShgFormSerializer(data=request.data)

        if serializer.is_valid():
            shg_username = serializer.validated_data['email']
            shg_password = serializer.validated_data['password']

            shg_user = User.objects.create(
                username=shg_username,
                email=shg_username,
                is_staff=True
            )
            shg_user.set_password(shg_password)
            shg_user.save()

            Shg_Group_Registration.objects.create(
                shg=shg_user,
                name_of_shg=serializer.validated_data['name_of_shg'],
                date_of_formation=serializer.validated_data['date_of_formation'],
                registration_number=serializer.validated_data['registration_number'],
                contact_number=serializer.validated_data['contact_number'],
                village=serializer.validated_data['village'],
                taluka=serializer.validated_data['taluka'],
                district=serializer.validated_data['district'],
                type_of_shg=serializer.validated_data['type_of_shg'],
                address=serializer.validated_data['address']
            )

            # 🔑 JWT generation
            refresh = RefreshToken.for_user(shg_user)

            return Response({
                "message": "Group registered & logged in successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminLogin(APIView):   
    permission_classes = [] 
    authentication_classes = []  
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
                        refresh=RefreshToken.for_user(user)
                        return Response({'message': 'shg logged in successfully',  'access': str(refresh.access_token),'refresh': str(refresh)}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'message': 'invalid creditials'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'user not registered'}, status=status.HTTP_400_BAD_REQUEST)


class AdminPanelView(APIView):
    # --- FIX 2: ADD AUTH, PERMISSIONS, AND PARSERS ---
    authentication_classes = [JWTAuthentication] 
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
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_or_reject_order(request):
    user_id = CustomerForm.objects.get(customer_id=request.user.id)
    Shg_id =  Shg_Group_Registration.objects.get(shg_id=request.user.id)
    order_id = request.data.get("order_id")
    action = request.data.get("action") 
    try:
        order_item = Order_Items.objects.get(id=order_id, shg_groups_id=Shg_id, user_id=user_id)
        if action in ['APPROVED', 'REJECTED']:
            order_item.action = action
            order_item.save()
            if action == 'APPROVED':
                product = order_item.product_id
                product.stock_quantity -= order_item.quantity
                product.save()
            return Response({"message": f"Order {action.lower()} successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
    except Order_Items.DoesNotExist:
        return Response({"message": "Order item not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_shipped(request):
    order_id = request.data.get("order_id")
    try:
        order_item = Order_Items.objects.get(order_id=order_id)   
        order_item.order_status = 'SHIPPED'
        order_item.save() 
        return Response({"message": "Order marked as shipped successfully"}, status=status.HTTP_200_OK)
    except Order_Items.DoesNotExist:
        return Response({"message": "Order item not found"}, status=status.HTTP_404_NOT_FOUND)