from django.urls import path
from .views import ProductList, ProductDetail, BlackListTokenUpdateView

app_name='inventory'

urlpatterns = [
    path('product/<int:pk>/', ProductDetail.as_view(), name='detailcreate'),
    path('', ProductList.as_view(), name='productlistcreate'),
    path('logout/blacklist/', BlackListTokenUpdateView.as_view(), name='blacklist')
]
