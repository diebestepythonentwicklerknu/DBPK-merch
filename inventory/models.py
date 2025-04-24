import datetime

from decouple import config
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient(config('MONGO_URI', default='mongodb://localhost:27017/store'))
db = client.get_database()

# Collections
items_collection = db.items
orders_collection = db.orders


def create_item(name, size, quantity, price, photos=None):
    """Create item with photo(URL list)"""
    item = {
        'name': name,
        'size': size,
        'quantity': quantity,
        'price': price,
        'photos': photos or []  # Список URL фото, за замовчуванням порожній
    }
    return items_collection.insert_one(item)


def get_item(item_id):
    """Get item by ID"""
    from bson.objectid import ObjectId
    return items_collection.find_one({'_id': ObjectId(item_id)})


def update_item(item_id, name=None, size=None, quantity=None, price=None, photos=None):
    """Update item including photos"""
    from bson.objectid import ObjectId
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
        update_data['photos'] = photos  # Оновлюємо список фото
    return items_collection.update_one(
        {'_id': ObjectId(item_id)},
        {'$set': update_data}
    )


def delete_item(item_id):
    """Delete item by ID"""
    from bson.objectid import ObjectId
    return items_collection.delete_one({'_id': ObjectId(item_id)})


def get_all_items():
    """Get all items"""
    return list(items_collection.find())


def create_order(items, customer_name, customer_email, phone_number, delivery_address):
    """Create order with quantity check"""
    from bson.objectid import ObjectId
    order_items = []
    total_price = 0

    # Check item's quantity
    for item in items:
        item_id = item['item_id']
        requested_quantity = item['quantity']
        db_item = items_collection.find_one({'_id': ObjectId(item_id)})
        if not db_item:
            raise ValueError(f"Товар {item_id} не знайдено")
        if db_item['quantity'] < requested_quantity:
            raise ValueError(f"Недостатньо товару {db_item['name']} ({db_item['size']})")

        order_items.append({
            'item_id': ObjectId(item_id),
            'name': db_item['name'],
            'size': db_item['size'],
            'quantity': requested_quantity,
            'price': db_item['price']
        })
        total_price += db_item['price'] * requested_quantity

    # Reduce quantity of item
    for item in items:
        item_id = item['item_id']
        requested_quantity = item['quantity']
        items_collection.update_one(
            {'_id': ObjectId(item_id)},
            {'$inc': {'quantity': -requested_quantity}}
        )

    # Create order
    order = {
        'items': order_items,
        'customer_name': customer_name,
        'customer_email': customer_email,
        'phone_number': phone_number,
        'delivery_address': delivery_address,
        'total_price': total_price,
        'status': 'confirmed',
        'created_at': datetime.datetime.utcnow()
    }
    return orders_collection.insert_one(order)


def get_order(order_id):
    """Get order by ID"""
    from bson.objectid import ObjectId
    return orders_collection.find_one({'_id': ObjectId(order_id)})


def get_orders():
    """Get all orders"""
    return list(orders_collection.find())