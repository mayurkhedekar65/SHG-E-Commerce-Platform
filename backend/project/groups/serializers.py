from rest_framework import serializers
from groups.models import Shg_Group_Registration


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shg_Group_Registration
        fields = ['name_of_sng',
                  'date_of_formation',
                 'registration_number',
                 'contact_number',
                  'village',
                 'taluka',
                  'district',
                  'type_of_shg',
                  'Address']
