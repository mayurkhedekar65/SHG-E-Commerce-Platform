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

class AdminPanelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        
   
        read_only_fields = ('shg_group_id',)
        
        fields = [
            'shg_group_id', 
            'product_name',
            'price',
            'stock_quantity',
            'description',
            'category',
            'image'
        ]
        

        extra_kwargs = {
            'image': {'required': False, 'allow_null': True}
        }
        # jldm;mmdd