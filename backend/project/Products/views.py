from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from groups.models import Shg_Group_Registration
from Products.models import Products
from django.core import serializers
# Create your views here.
@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_products_data(request, format=None):
    user = request.user
    user_id = user.id
    shg_group=Shg_Group_Registration.objects.get(shg_id=user_id)
    print(user_id,shg_group.id)
    products_list=Products.objects.filter(shg_group_id_id=shg_group.id).values("product_name","category", "description", "image", "price", "stock_quantity")
    return Response({"products_list":products_list,})
