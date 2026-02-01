import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from groups.models import Order_Items
from Products.models import Cart_Items, Products
from Customers.models import CustomerForm, Customer_Orders

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['POST'])
@permission_classes([AllowAny])
def create_payment_intent(request):
    amount = request.data.get('amount')

    intent = stripe.PaymentIntent.create(
        amount=int(amount) * 100,
        currency='inr',
        payment_method_types=['card'],
    )

    return Response({
        "client_secret": intent.client_secret,
        "publishable_key": settings.STRIPE_PUBLISHABLE_KEY
    })


import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from Customers.models import CustomerForm, Customer_Orders
from Products.models import Cart_Items, Products
from groups.models import Order_Items

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['POST'])
@permission_classes([AllowAny])
def create_payment_intent(request):
    amount = request.data.get("amount")

    intent = stripe.PaymentIntent.create(
        amount=int(amount) * 100,
        currency="inr",
        payment_method_types=["card"],
    )

    return Response({
        "client_secret": intent.client_secret,
        "publishable_key": settings.STRIPE_PUBLISHABLE_KEY
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    payment_intent_id = request.data.get("payment_intent_id")
    user_id = request.user.id

    intent = stripe.PaymentIntent.retrieve(payment_intent_id)

    if intent.status != "succeeded":
        return Response({"error": "Payment not successful"}, status=400)

    customer = CustomerForm.objects.get(customer_id=user_id)
    cart_items = Cart_Items.objects.filter(user_id=customer)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total_amount = 0

    for item in cart_items:
        total_amount += item.quantity * item.product_id.price

    shipping_address = (
        customer.address
        if hasattr(customer, "address") and customer.address
        else "Address not provided"
    )

    order = Customer_Orders.objects.create(
        customer_id=customer,
        total_amount=total_amount,
        shipping_address=shipping_address,
        order_status="PENDING"
    )

    for item in cart_items:
        product = item.product_id

        if product.stock_quantity < item.quantity:
            return Response({"error": "Insufficient stock"}, status=400)

        Order_Items.objects.create(
            order_id=order,
            customer_id=customer,
            product_id=product,
            quantity=item.quantity,
            price_at_time_of_order=product.price,
            shg_groups_id=product.shg_group_id
        )

        product.stock_quantity -= item.quantity
        product.save()

    cart_items.delete()

    return Response({"status": "order_created"})
