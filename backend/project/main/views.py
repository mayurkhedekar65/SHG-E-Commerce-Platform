from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from Products.models import Products
from groups.models import Shg_Group_Registration
from rest_framework.permissions import IsAuthenticated , AllowAny

# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    # data = [
    #     {
    #         "ProductName": "Premium Coconut Oil",
    #         "GroupName": "by Mapusa Women's Collective",
    #         "Amount": "350",
    #         "Quantity": "500",
    #         "Location": "Mapusa, Bardez"
    #     },
    #     {
    #         "ProductName": "Premium Coconut Oil",
    #         "GroupName": "by Mapusa Women's Collective",
    #         "Amount": "350",
    #         "Quantity": "500",
    #         "Location": "Mapusa, Bardez"
    #     },
    #     {
    #         "ProductName": "Organic Cashew Nuts",
    #         "GroupName": "by Anjuna Farmers Association",
    #         "Amount": "600",
    #         "Quantity": "300",
    #         "Location": "Anjuna, Bardez"
    #     },
    #     {
    #         "ProductName": "Homemade Spices Pack",
    #         "GroupName": "by Calangute Spice Makers",
    #         "Amount": "250",
    #         "Quantity": "200",
    #         "Location": "Calangute, Bardez"
    #     },
    #     {
    #         "ProductName": "Handwoven Cotton Saree",
    #         "GroupName": "by Panaji Artisans",
    #         "Amount": "1200",
    #         "Quantity": "50",
    #         "Location": "Panaji, North Goa"
    #     },
    #     {
    #         "ProductName": "Fresh Mango Pickle",
    #         "GroupName": "by Ponda Home Foods",
    #         "Amount": "180",
    #         "Quantity": "150",
    #         "Location": "Ponda, South Goa"
    #     },
    #     {
    #         "ProductName": "Goan Feni (Local Spirit)",
    #         "GroupName": "by Mapusa Distillers",
    #         "Amount": "500",
    #         "Quantity": "100",
    #         "Location": "Mapusa, Bardez"
    #     },
    #     {
    #         "ProductName": "Handmade Beeswax Candles",
    #         "GroupName": "by Vagator Crafts",
    #         "Amount": "150",
    #         "Quantity": "250",
    #         "Location": "Vagator, Bardez"
    #     },
    #     {
    #         "ProductName": "Cashew Nut Brittle",
    #         "GroupName": "by Anjuna Farmers Association",
    #         "Amount": "220",
    #         "Quantity": "180",
    #         "Location": "Anjuna, Bardez"
    #     },
    #     {
    #         "ProductName": "Organic Coconut Scrub",
    #         "GroupName": "by Mapusa Women's Collective",
    #         "Amount": "300",
    #         "Quantity": "200",
    #         "Location": "Mapusa, Bardez"
    #     },
    #     {
    #         "ProductName": "Goan Chili Sauce",
    #         "GroupName": "by Calangute Spice Makers",
    #         "Amount": "200",
    #         "Quantity": "150",
    #         "Location": "Calangute, Bardez"
    #     },
    #     {
    #         "ProductName": "Handmade Jute Bags",
    #         "GroupName": "by Panaji Artisans",
    #         "Amount": "400",
    #         "Quantity": "120",
    #         "Location": "Panaji, North Goa"
    #     },
    #     {
    #         "ProductName": "Goan Cashew Feni Gift Pack",
    #         "GroupName": "by Mapusa Distillers",
    #         "Amount": "1500",
    #         "Quantity": "60",
    #         "Location": "Mapusa, Bardez"
    #     },
    #     {
    #         "ProductName": "Organic Coconut Soap",
    #         "GroupName": "by Vagator Crafts",
    #         "Amount": "180",
    #         "Quantity": "200",
    #         "Location": "Vagator, Bardez"
    #     },
    #     {
    #         "ProductName": "Local Honey",
    #         "GroupName": "by Ponda Home Foods",
    #         "Amount": "350",
    #         "Quantity": "100",
    #         "Location": "Ponda, South Goa"
    #     },
    #     {
    #         "ProductName": "Handwoven Table Mats",
    #         "GroupName": "by Panaji Artisans",
    #         "Amount": "250",
    #         "Quantity": "150",
    #         "Location": "Panaji, North Goa"
    #     },
    #     {
    #         "ProductName": "Spiced Cashew Nuts",
    #         "GroupName": "by Anjuna Farmers Association",
    #         "Amount": "300",
    #         "Quantity": "200",
    #         "Location": "Anjuna, Bardez"
    #     },
    #     {
    #         "ProductName": "Goan Pickled Fish",
    #         "GroupName": "by Calangute Spice Makers",
    #         "Amount": "450",
    #         "Quantity": "80",
    #         "Location": "Calangute, Bardez"
    #     },
    #     {
    #         "ProductName": "Beeswax Lip Balm",
    #         "GroupName": "by Vagator Crafts",
    #         "Amount": "120",
    #         "Quantity": "300",
    #         "Location": "Vagator, Bardez"
    #     },
    #     {
    #         "ProductName": "Organic Tamarind Paste",
    #         "GroupName": "by Ponda Home Foods",
    #         "Amount": "200",
    #         "Quantity": "180",
    #         "Location": "Ponda, South Goa"
    #     }
    # ]
    products_list = Products.objects.all().values(
        "image", "product_name", "price", "stock_quantity")
    return Response({"products_list": products_list})


@api_view(['GET'])
@permission_classes([AllowAny])
def group_data(request):
    # data = [
    #     {
    #         "group_name": "Mapusa Women's Collective",
    #         "description": "Specializing in organic food products and traditional preserves since 2018",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 24,
    #         "total_members": 15
    #     },
    #     {
    #         "group_name": "Bardez Organic Sisters",
    #         "description": "Homemade pickles and jams with organic ingredients",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 18,
    #         "total_members": 12
    #     },
    #     {
    #         "group_name": "Goan Green Harvest",
    #         "description": "Organic fruits and vegetables, farm-to-table",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 30,
    #         "total_members": 20
    #     },
    #     {
    #         "group_name": "Traditional Taste Makers",
    #         "description": "Preserving Goan culinary heritage",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 22,
    #         "total_members": 14
    #     },
    #     {
    #         "group_name": "Bardez Natural Foods",
    #         "description": "Organic spices and snacks made with love",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 25,
    #         "total_members": 16
    #     },
    #     {
    #         "group_name": "Mapusa Culinary Sisters",
    #         "description": "Artisanal preserves and organic condiments",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 20,
    #         "total_members": 13
    #     },
    #     {
    #         "group_name": "Goan Spice Collective",
    #         "description": "Handmade spice mixes and traditional recipes",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 28,
    #         "total_members": 18
    #     },
    #     {
    #         "group_name": "Organic Heritage Goans",
    #         "description": "Organic grains, pulses, and traditional foods",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 26,
    #         "total_members": 15
    #     },
    #     {
    #         "group_name": "Preserve & Prosper",
    #         "description": "Homemade jams, pickles, and chutneys",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 24,
    #         "total_members": 17
    #     },
    #     {
    #         "group_name": "Goa Green Sisters",
    #         "description": "Sustainable and organic farming collective",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 19,
    #         "total_members": 14
    #     },
    #     {
    #         "group_name": "Bardez Food Artisans",
    #         "description": "Traditional recipes with organic ingredients",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 23,
    #         "total_members": 16
    #     },
    #     {
    #         "group_name": "The Organic Pantry",
    #         "description": "Locally sourced organic foods and preserves",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 21,
    #         "total_members": 13
    #     },
    #     {
    #         "group_name": "Goan Women’s Food Hub",
    #         "description": "Empowering women through organic food products",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 27,
    #         "total_members": 19
    #     },
    #     {
    #         "group_name": "Mapusa Homemade Delights",
    #         "description": "Traditional Goan sweets and preserves",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 22,
    #         "total_members": 15
    #     },
    #     {
    #         "group_name": "Bardez Eco Eats",
    #         "description": "Organic and sustainable food collective",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 20,
    #         "total_members": 14
    #     },
    #     {
    #         "group_name": "Goa Traditional Preservers",
    #         "description": "Handcrafted preserves and pickles",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 25,
    #         "total_members": 16
    #     },
    #     {
    #         "group_name": "Organic Goan Bites",
    #         "description": "Healthy snacks and preserves made organically",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 24,
    #         "total_members": 15
    #     },
    #     {
    #         "group_name": "Bardez Women’s Food Circle",
    #         "description": "Traditional recipes with organic approach",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 18,
    #         "total_members": 12
    #     },
    #     {
    #         "group_name": "Mapusa Eco Preservers",
    #         "description": "Sustainable homemade preserves and sauces",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 26,
    #         "total_members": 17
    #     },
    #     {
    #         "group_name": "Goan Organic Artisans",
    #         "description": "Preserving Goan flavors with organic ingredients",
    #         "location": "Mapusa, Bardez",
    #         "total_products": 28,
    #         "total_members": 18
    #     }
    # ]
    shg_groups_list = Shg_Group_Registration.objects.all().values("name_of_shg",
                                                                  "date_of_formation",
                                                                  "registration_number",
                                                                  "contact_number",
                                                                  "village",
                                                                  "taluka",
                                                                  "district",
                                                                  "type_of_shg",
                                                                  "address")

    return Response({"shg_groups_list": shg_groups_list})
