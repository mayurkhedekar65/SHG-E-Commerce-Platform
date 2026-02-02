from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated , AllowAny
from groups.models import Shg_Group_Registration
from Products.models import Products
from django.core import serializers
from Products.serializers import UpdateProductSerializer
from rest_framework import status


# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def get_products_data(request, format=None):
    products_list = Products.objects.all().values( "id", "image", "product_name", "price", "stock_quantity","category","description")
    return Response({"products_list": products_list})



@api_view(['GET'])
@permission_classes([AllowAny])
def get_groups_data(request, format=None):
    shg_grp_list = Shg_Group_Registration.objects.values(
        "name_of_shg", "date_of_formation", "registration_number", "contact_number", "village", "taluka", "district", "type_of_shg", "address")
    return Response({"shg_grp_list": shg_grp_list})




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_product(request,id,format=None):
    product_id=id
    Products.objects.filter(id=product_id).delete()
    return Response({"message":"product deleted successfully"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Update_Product(request,id):
    try:
        product_id = Products.objects.get(id=id)
    except Products.DoesNotExist:
        return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UpdateProductSerializer(product_id, data=request.data , partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Product updated successfully"}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
    


