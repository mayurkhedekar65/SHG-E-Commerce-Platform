from django.db import models
from Customers.models import Customer , Customer_Orders
from Products.models import Products
from django.contrib.auth.models import User

# Create your models here.

# SHG registration model


class Shg_Group_Registration(models.Model):
    class ShgType(models.TextChoices):
        WOMEN = 'WOMEN', 'Women'
        MEN = 'MEN', 'Men'
        MIXED = 'MIXED', 'Mixed'
    class District(models.TextChoices):
        NORTH_GOA = 'NORTH_GOA', 'North Goa'
        SOUTH_GOA = 'SOUTH_GOA', 'South Goa'
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name_of_shg = models.CharField(max_length=50, null=False, blank=False)
    date_of_formation = models.DateField(null=False, blank=False)
    registration_number = models.CharField(max_length=20, null=False, blank=False, unique=True)
    contact_number = models.CharField(max_length=10, null=False, blank=False)
    village = models.CharField(max_length=15, null=False, blank=False)
    taluka = models.CharField(max_length=15, null=False, blank=False)
    district = models.CharField(max_length=20, choices=District.choices, default=District.NORTH_GOA)
    type_of_shg = models.CharField(max_length=10, choices=ShgType.choices, default=ShgType.WOMEN)
    address = models.CharField(max_length=50, null=False, blank=False)


class Order_Items(models.Model):
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)
    order_id = models.ForeignKey(Customer_Orders, on_delete=models.CASCADE)
    shg_groups_id = models.ForeignKey(Shg_Group_Registration, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_at_time_of_order = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)

