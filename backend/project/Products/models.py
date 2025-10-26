from django.db import models

# Create your models here.
class Products(models.Model):
    product_name = models.CharField(max_length=100, null=False, blank=False)
    shg_group = models.ForeignKey('groups.Shg_Group_Registration', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    Description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, null=False, blank=False)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    

class Category(models.Model):
    category_name = models.CharField(max_length=50, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)