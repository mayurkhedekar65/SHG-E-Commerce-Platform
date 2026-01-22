from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from Customers.serializers import UserFormSerializer
from Customers.models import CustomerForm
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from Customers.models import CustomerForm
from Products.models import Cart_Items, Products
from groups.models import *

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    username = User.objects.filter(id=request.user.id).values("email")
    return Response({"username": username})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile_data(request):
    # username = User.objects.filter(id=request.user.id).values("email")
    user_details=CustomerForm.objects.filter(customer_id=request.user.id).values("customer_name","customer_email","phone_number",
"address")
    return Response({"user_details": user_details})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity")
    user_id = CustomerForm.objects.get(customer_id=request.user.id)
    if not Products.objects.filter(id=product_id).exists():
        return Response({"message": "Products does not exists"} , status=status.HTTP_400_BAD_REQUEST)
    else:
        if Products.objects.get(id=product_id).stock_quantity >= quantity:
            if Cart_Items.objects.filter(product_id = product_id , user_id = user_id).exists():
                cart_item = Cart_Items.objects.get(product_id=product_id , user_id = user_id)
                cart_item.quantity += quantity
                cart_item.save()
                return Response({"message": " Product quantity updated in the Cart Successfully"}, status = status.HTTP_200_OK)
            else: 
                Cart_Items.objects.create(user_id=user_id,product_id=Products.objects.get(id=product_id),quantity=quantity)
                return Response({"message": " Product added to the Cart Successfully"}, status = status.HTTP_201_CREATED)
        else:
            return Response({"message": " Insufficient stock for the product"}, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    product_id = request.data.get("product_id")
    user_id = CustomerForm.objects.get(customer_id=request.user.id)
    if not Products.objects.filter(id=product_id).exists():
        return Response({"message": "Products does not exists"} , status=status.HTTP_400_BAD_REQUEST)
    else:
        if Cart_Items.objects.filter(product_id = product_id, user_id = user_id).exists():
            cart_item = Cart_Items.objects.get(product_id=product_id , user_id = user_id)
            cart_item.delete()
            return Response({"message": " Product removed from the Cart Successfully"}, status = status.HTTP_200_OK)
        else:
            return Response({"message": " Product not found in the Cart"}, status = status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user_id = CustomerForm.objects.get(costomer_id=request.user.id)
    cart_items = Cart_Items.objects.filter(user_id=user_id).values("product_name","product_id__price","quantity")
    return Response({"cart_items": cart_items}, status = status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def purchase_from_cart(request):
    user_id = CustomerForm.objects.get(customer_id=request.user.id)
    product_id = request.data.get("product_id")
    if Cart_Items.objects.filter(user_id=user_id, product_id=product_id).exists():
        cart_item = Cart_Items.objects.get(user_id=user_id, product_id=product_id)
        product = Products.objects.get(id=product_id)
        if product.stock_quantity >= cart_item.quantity:
            product.stock_quantity -= cart_item.quantity
            product.save()
            Order_Items.objects.create(
                customer_id = user_id,
                product_id = product,
                quantity = cart_item.quantity,
                price_at_time_of_order = product.price,
                shg_groups_id = product.shg_group_id
            )
            cart_item.delete()
            return Response({"message": " Purchase successful"}, status = status.HTTP_200_OK)
        else:
            return Response({"message": " Insufficient stock for the product"}, status = status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": " Product not found in the Cart"}, status = status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def purchase_now(request):
    user_id = CustomerForm.objects.get(customer_id=request.user.id)
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity")
    if Products.objects.filter(id=product_id).exists():
        product = Products.objects.get(id=product_id)
        if product.stock_quantity >= quantity:
            product.stock_quantity -= quantity
            product.save()
            Order_Items.objects.create(
                customer_id = user_id,
                product_id = product,
                quantity = quantity,
                price_at_time_of_order = product.price,
                shg_groups_id = product.shg_group_id
            )
            return Response({"message": " Purchase successful"}, status = status.HTTP_200_OK)
        else:
            return Response({"message": " Insufficient stock for the product"}, status = status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": " Products does not exists"}, status = status.HTTP_400_BAD_REQUEST)