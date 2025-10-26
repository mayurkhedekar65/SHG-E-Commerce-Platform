from django.db import models

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
    name_of_sng = models.CharField(max_length=50, null=False, blank=False)
    date_of_formation = models.DateField(null=False, blank=False)
    registration_number = models.CharField(max_length=20, null=False, blank=False, unique=True)
    contact_number = models.CharField(max_length=10, null=False, blank=False)
    email = models.EmailField(max_length=50, null=False, blank=False)
    village = models.CharField(max_length=15, null=False, blank=False)
    taluka = models.CharField(max_length=15, null=False, blank=False)
    district = models.CharField(max_length=20, choices=District.choices, default=District.NORTH_GO)
    type_of_shg = models.CharField(max_length=10, choices=ShgType.choices, default=ShgType.WOMEN,)
    address = models.CharField(max_length=50, null=False, blank=False)



class Order_Items(models.Model):
    customer_id = models.ForeignKey('Customers.Customer', on_delete=models.CASCADE)
    product_id = models.ForeignKey('Products.Products', on_delete=models.CASCADE)
    order_id = models.ForeignKey('Customers.customer_orders', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_at_time_of_order = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
