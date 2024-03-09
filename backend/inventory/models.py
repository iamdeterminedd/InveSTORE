from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from djmoney.models.fields import MoneyField

class Product(models.Model):
    product_name = models.CharField(max_length=100)
    price = MoneyField(max_digits=14, decimal_places=2, default=0.00, default_currency='PHP')
    quantity = models.PositiveIntegerField(null=True)
    description = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.product_name