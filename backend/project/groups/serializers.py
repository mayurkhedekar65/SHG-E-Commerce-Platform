from rest_framework import serializers
from groups.models import Shg_Group_Registration
from Products.models import Products


class ShgFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shg_Group_Registration
        fields = ['name_of_shg',
                  'date_of_formation',
                  'registration_number',
                  'contact_number',
                  'village',
                  'taluka',
                  'district',
                  'type_of_shg',
                  'address']

class AdminPanelSerializer(serializers.Serializer):
    class Meta:
        model = Products
        fields = [
            'product_name',
            'price',
            'stock_quantity',
            'description',
            'category',
            'image']