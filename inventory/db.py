# inventory/db.py
from decouple import config
from pymongo import MongoClient

def get_db():
    client = MongoClient(config('MONGO_URI'))  # Remove default - force using .env
    return client[config('MONGO_DB_NAME', default='DBPK-Merch')]

db = get_db()
items_collection = db.items
orders_collection = db.orders 