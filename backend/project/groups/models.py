from django.db import models

# Create your models here.

# SHG registration model


class Shg_Group_Registration(models.Model):
    name_of_sng = models.CharField(max_length=50, null=False, blank=False)
    date_of_formation = models.CharField(null=False, blank=False)
    registration_number = models.CharField(
        max_length=10, null=False, blank=False)
    contact_number = models.CharField(max_length=10, null=False, blank=False)
    village = models.CharField(max_length=15, null=False, blank=False)
    taluka = models.CharField(max_length=15, null=False, blank=False)
    district = models.CharField( null=False, blank=False)
    type_of_shg = models.CharField(null=False, blank=False)
    Address = models.CharField(max_length=50, null=False, blank=False)
