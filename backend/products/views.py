from rest_framework import generics, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class ProductList(generics.ListAPIView): 
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer