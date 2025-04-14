# inventory/cart.py
import uuid
from django.http import JsonResponse
from . import models
import json

def get_or_create_cart_id(request):
    """Get existing cart ID from session or create a new one"""
    if 'cart_id' not in request.session:
        request.session['cart_id'] = str(uuid.uuid4())
    return request.session['cart_id']

def get_cart_view(request):
    """View function to get cart contents"""
    cart_id = get_or_create_cart_id(request)
    cart = models.get_cart(cart_id)
    return JsonResponse(cart)

def add_to_cart_view(request):
    """View function to add item to cart"""
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        cart_id = get_or_create_cart_id(request)
        item_id = data.get('item_id')
        quantity = int(data.get('quantity', 1))
        
        if not item_id:
            return JsonResponse({'error': 'Item ID is required'}, status=400)
        
        cart = models.add_to_cart(cart_id, item_id, quantity)
        return JsonResponse(cart)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def remove_from_cart_view(request):
    """View function to remove item from cart"""
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        cart_id = get_or_create_cart_id(request)
        item_id = data.get('item_id')
        
        if not item_id:
            return JsonResponse({'error': 'Item ID is required'}, status=400)
        
        cart = models.remove_from_cart(cart_id, item_id)
        return JsonResponse(cart)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def clear_cart_view(request):
    """View function to clear entire cart"""
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        cart_id = get_or_create_cart_id(request)
        cart = models.clear_cart(cart_id)
        return JsonResponse(cart)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def checkout_view(request):
    """View function to create order from cart"""
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        cart_id = get_or_create_cart_id(request)
        
        customer_name = data.get('customer_name')
        customer_email = data.get('customer_email')
        phone_number = data.get('phone_number')
        delivery_address = data.get('delivery_address')
        
        if not all([customer_name, customer_email, phone_number, delivery_address]):
            return JsonResponse({'error': 'Missing required customer information'}, status=400)
        
        order = models.create_order_from_cart(
            cart_id,
            customer_name,
            customer_email,
            phone_number,
            delivery_address
        )
        
        return JsonResponse({
            'success': True,
            'order_id': str(order.inserted_id)
        })
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)