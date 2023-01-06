from django.urls import path

from .views import CategoryList, ProductList
urlpatterns = [
    path('products/', ProductList.as_view()),
    path('categories/', CategoryList.as_view()),
    
] 
