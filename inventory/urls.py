"""
Prev. version:

# inventory/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path("items/", views.ItemListView.as_view(), name="item-list"),
    path("items/<str:item_id>/", views.ItemDetailView.as_view(), name="item-detail"),
    path("orders/", views.OrderView.as_view(), name="order-create"),
    path('orders/<str:order_id>/', views.OrderDetailView.as_view(), name='order-detail'),
]



from django.urls import path
from . import views
from . import cart

urlpatterns = [
    # Existing item routes
    path('items/', views.get_items_view, name='get_items'),
    path('items/<str:item_id>/', views.get_item_view, name='get_item'),
    path('items/create/', views.create_item_view, name='create_item'),
    path('items/<str:item_id>/update/', views.update_item_view, name='update_item'),
    path('items/<str:item_id>/delete/', views.delete_item_view, name='delete_item'),
    
    # Existing order routes
    path('orders/', views.get_orders_view, name='get_orders'),
    path('orders/<str:order_id>/', views.get_order_view, name='get_order'),
    path('orders/create/', views.create_order_view, name='create_order'),
    
    # New cart routes using Vercel KV
    path('cart/', cart.get_cart_view, name='get_cart'),
    path('cart/add/', cart.add_to_cart_view, name='add_to_cart'),
    path('cart/remove/', cart.remove_from_cart_view, name='remove_from_cart'),
    path('cart/clear/', cart.clear_cart_view, name='clear_cart'),
    path('cart/checkout/', cart.checkout_view, name='checkout'),
]

"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'orders', views.OrderViewSet, basename='order')
router.register(r'cart', views.CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    # If you need to keep the old URL pattern for backward compatibility:
    path('items/', views.ProductViewSet.as_view({'get': 'list'}), name='get_items'),
]