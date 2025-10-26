from django.db import models

# Create your models here.

class Customer(models.Model):
    customer_name= models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(max_length=50, null=False, blank=False)
    phone_number = models.CharField(max_length=15, null=False, blank=False)
    address = models.CharField(max_length=100, null=True, blank=True)

class Customer_Orders(models.Model):
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    shipping_address = models.CharField(max_length=100, null=False, blank=False)
    order_status = models.CharField(choices=[('PENDING', 'Pending'), ('SHIPPED', 'Shipped'), ('DELIVERED', 'Delivered')], max_length=10, default='PENDING')