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
@permission_classes([IsAuthenticated])
def get_products_data(request, format=None):
    shg_group = Shg_Group_Registration.objects.get(shg_id=request.user.id)
    products_list = Products.objects.filter(shg_group_id_id=shg_group.id).values("id",
        "product_name", "category", "description", "image", "price", "stock_quantity")
    return Response({"products_list": products_list, })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_profile_data(request, format=None):
    shg_grp_details = Shg_Group_Registration.objects.filter(shg_id=request.user.id).values(
        "name_of_shg", "date_of_formation", "registration_number", "contact_number", "village", "taluka", "district", "type_of_shg", "address")
    return Response({"shg_grp_details": shg_grp_details})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_product(request,id,format=None):
    product_id=id
    Products.objects.filter(id=product_id).delete()
    return Response({"message":"product deleted successfully"})