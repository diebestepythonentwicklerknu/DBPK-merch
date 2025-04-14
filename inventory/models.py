import datetime
import uuid
import json
from decouple import config
from pymongo import MongoClient
from bson.objectid import ObjectId
from django.conf import settings

# Connect to MongoDB
client = MongoClient(config('MONGO_URI', default='mongodb://localhost:27017/store'))
db = client.get_database()

# Collections
products_collection = db.items  # renamed for clarity
orders_collection = db.orders

# Product functions
def get_all_items():
    """Get all products"""
    return list(products_collection.find())

def get_item(item_id):
    """Get product by ID"""
    try:
        return products_collection.find_one({'_id': ObjectId(item_id)})
    except:
        return None

def create_item(name, size, quantity, price, photos=None):
    """Create product with photo(URL list)"""
    item = {
        'name': name,
        'size': size,
        'quantity': quantity,
        'price': price,
        'photos': photos or []
    }
    return products_collection.insert_one(item)

def update_item(item_id, name=None, size=None, quantity=None, price=None, photos=None):
    """Update product including photos"""
    update_data = {}
    if name:
        update_data['name'] = name
    if size:
        update_data['size'] = size
    if quantity is not None:
        update_data['quantity'] = quantity
    if price:
        update_data['price'] = price
    if photos is not None:
        update_data['photos'] = photos
    
    try:
        return products_collection.update_one(
            {'_id': ObjectId(item_id)},
            {'$set': update_data}
        )
    except:
        return None

def delete_item(item_id):
    """Delete product by ID"""
    try:
        return products_collection.delete_one({'_id': ObjectId(item_id)})
    except:
        return None

# Order functions
def get_orders():
    """Get all orders"""
    return list(orders_collection.find())

def get_order(order_id):
    """Get order by ID"""
    try:
        return orders_collection.find_one({'_id': ObjectId(order_id)})
    except:
        return None

def create_order(items, customer_name, customer_email, phone_number, delivery_address):
    """Create order with quantity check"""
    order_items = []
    total_price = 0

    # Check product's quantity
    for item in items:
        item_id = item['item_id']
        requested_quantity = item['quantity']
        
        try:
            db_item = products_collection.find_one({'_id': ObjectId(item_id)})
        except:
            db_item = None
            
        if not db_item:
            raise ValueError(f"Product {item_id} not found")
        if db_item['quantity'] < requested_quantity:
            raise ValueError(f"Insufficient quantity for product {db_item['name']} ({db_item['size']})")

        order_items.append({
            'item_id': ObjectId(item_id),
            'name': db_item['name'],
            'size': db_item['size'],
            'quantity': requested_quantity,
            'price': db_item['price']
        })
        total_price += db_item['price'] * requested_quantity

    # Reduce quantity of product
    for item in items:
        item_id = item['item_id']
        requested_quantity = item['quantity']
        products_collection.update_one(
            {'_id': ObjectId(item_id)},
            {'$inc': {'quantity': -requested_quantity}}
        )

    # Create order
    order = {
        'items': order_items,
        'customer_name': customer_name,
        'customer_email': customer_email,
        'phone_number': phone_number,
        'shipping_address': delivery_address,  # Renamed to match views
        'total_amount': total_price,  # Renamed to match views
        'status': 'confirmed',
        'created_at': datetime.datetime.utcnow()
    }
    return orders_collection.insert_one(order)

# Cart functions with Vercel KV
def get_or_create_cart_id(request):
    """Get cart ID from cookie or create a new one"""
    cart_id = request.COOKIES.get('cart_id')
    if not cart_id:
        cart_id = str(uuid.uuid4())
    return cart_id

def get_cart_view(cart_id):
    """Get cart from Vercel KV - renamed to match views"""
    return get_cart(cart_id)

def get_cart(cart_id):
    """Get cart from Vercel KV"""
    if not settings.VERCEL_KV:
        return {'items': {}, 'total': 0}
    
    cart_key = f"cart:{cart_id}"
    cart_data = settings.VERCEL_KV.get(cart_key)
    
    if cart_data:
        return json.loads(cart_data)
    return {'items': {}, 'total': 0}

def add_to_cart_view(cart_id, product_id, quantity=1, variant_id=None):
    """Add an item to cart in Vercel KV - renamed to match views"""
    # Handle variant_id by creating a unique key
    item_id = product_id
    return add_to_cart(cart_id, item_id, quantity)

def add_to_cart(cart_id, item_id, quantity=1):
    """Add an item to cart in Vercel KV"""
    if not settings.VERCEL_KV:
        return {'error': 'Vercel KV not configured'}
    
    cart_key = f"cart:{cart_id}"
    cart = get_cart(cart_id)
    
    # Get item details from MongoDB
    try:
        item = products_collection.find_one({'_id': ObjectId(item_id)})
    except:
        item = None
    
    if not item:
        return {'error': f'Product {item_id} not found'}
    
    if str(item_id) in cart['items']:
        cart['items'][str(item_id)]['quantity'] += quantity
    else:
        cart['items'][str(item_id)] = {
            'product_id': str(item_id),  # Changed from item_id to product_id to match views
            'name': item['name'],
            'size': item['size'],
            'price': item['price'],
            'quantity': quantity
        }
    
    # Calculate total
    total = 0
    for item_key, item_data in cart['items'].items():
        total += item_data['price'] * item_data['quantity']
    
    cart['total'] = total
    
    # Store cart in Vercel KV with 24-hour expiration
    settings.VERCEL_KV.set(cart_key, json.dumps(cart), ex=86400)
    return cart

def remove_from_cart_view(cart_id, product_id, variant_id=None):
    """Remove an item from cart in Vercel KV - renamed to match views"""
    item_id = product_id
    return remove_from_cart(cart_id, item_id)

def remove_from_cart(cart_id, item_id):
    """Remove an item from cart in Vercel KV"""
    if not settings.VERCEL_KV:
        return {'error': 'Vercel KV not configured'}
    
    cart_key = f"cart:{cart_id}"
    cart = get_cart(cart_id)
    
    if str(item_id) in cart['items']:
        del cart['items'][str(item_id)]
        
        # Recalculate total
        total = 0
        for item_key, item_data in cart['items'].items():
            total += item_data['price'] * item_data['quantity']
        
        cart['total'] = total
        
        # Update cart in Vercel KV
        settings.VERCEL_KV.set(cart_key, json.dumps(cart), ex=86400)
    
    return cart

def clear_cart_view(cart_id):
    """Clear entire cart in Vercel KV - renamed to match views"""
    return clear_cart(cart_id)

def clear_cart(cart_id):
    """Clear entire cart in Vercel KV"""
    if not settings.VERCEL_KV:
        return {'error': 'Vercel KV not configured'}
    
    cart_key = f"cart:{cart_id}"
    settings.VERCEL_KV.delete(cart_key)
    return {'items': {}, 'total': 0}

def create_order_from_cart(cart_id, customer_name, customer_email, phone_number, delivery_address):
    """Create order from cart items"""
    cart = get_cart(cart_id)
    
    if not cart['items']:
        raise ValueError("Cart is empty")
    
    # Convert cart items to order items format
    order_items = []
    for item_id, item_data in cart['items'].items():
        order_items.append({
            'item_id': item_id,
            'quantity': item_data['quantity']
        })
    
    # Create order using existing function
    order = create_order(
        order_items, 
        customer_name, 
        customer_email, 
        phone_number, 
        delivery_address
    )
    
    # Clear cart after order creation
    clear_cart(cart_id)
    
    return order