# inventory/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path("items/", views.ItemListView.as_view(), name="item-list"),
    path("items/<str:item_id>/", views.ItemDetailView.as_view(), name="item-detail"),
    path("orders/", views.OrderView.as_view(), name="order-create"),
    path('orders/<str:order_id>/', views.OrderDetailView.as_view(), name='order-detail'),
]