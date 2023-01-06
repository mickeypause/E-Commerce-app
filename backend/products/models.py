from django.db import models

class Category(models.Model): 
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    
    class Meta: 
        verbose_name_plural = 'Categories'


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    image = models.ImageField(upload_to='media/', blank=False,)
    def __str__(self):
        return self.name
    