"""

Old one:

from rest_framework import status
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import create_item, get_item, update_item, delete_item, get_all_items, create_order, \
    get_order, get_orders
from .serializers import ItemSerializer, OrderSerializer


class ItemListView(APIView):
    parser_classes = (JSONParser, FormParser)

    def get(self, request, *args, **kwargs):
        items = get_all_items()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            # Обробка фото
            photos = serializer.validated_data.get('photos', [])

            item = create_item(
                name=serializer.validated_data['name'],
                size=serializer.validated_data['size'],
                quantity=serializer.validated_data['quantity'],
                price=serializer.validated_data['price'],
                photos=photos
            )

            return Response({'id': str(item.inserted_id)}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemDetailView(APIView):
    parser_classes = (JSONParser, FormParser)

    def get(self, request, item_id):
        item = get_item(item_id)
        if not item:
            return Response({'error': 'Товар не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, item_id):
        serializer = ItemSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            # Обробка фото при оновленні
            photos = serializer.validated_data.get('photos', [])

            result = update_item(
                item_id,
                name=serializer.validated_data.get('name'),
                size=serializer.validated_data.get('size'),
                quantity=serializer.validated_data.get('quantity'),
                price=serializer.validated_data.get('price'),
                photos=photos if photos is not None else None  # Оновлюємо фото, якщо є
            )
            if result.matched_count == 0:
                return Response({'error': 'Товар не знайдено'}, status=status.HTTP_404_NOT_FOUND)
            return Response({'message': 'Товар оновлено'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, item_id):
        result = delete_item(item_id)
        if result.deleted_count == 0:
            return Response({'error': 'Товар не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': 'Товар видалено'}, status=status.HTTP_204_NO_CONTENT)


class OrderView(APIView):
    def get(self, request, *args, **kwargs):
        orders = get_orders()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            try:
                order = create_order(
                    items=serializer.validated_data['items'],
                    customer_name=serializer.validated_data['customer_name'],
                    customer_email=serializer.validated_data['customer_email'],
                    phone_number=serializer.validated_data['phone_number'],
                    delivery_address=serializer.validated_data['delivery_address']
                )
                return Response({'order_id': str(order.inserted_id)}, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(APIView):
    parser_classes = (JSONParser, FormParser)

    def get(self, request, order_id):
        order = get_order(order_id)
        if not order:
            return Response({'error': 'Замовлення не знайдено'}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

        """

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (
    get_all_items, get_item, create_item, update_item, delete_item,
    get_orders, get_order, create_order_from_cart, 
    get_or_create_cart_id, get_cart_view, add_to_cart_view, 
    remove_from_cart_view, clear_cart_view
)

class ProductViewSet(viewsets.ViewSet):
    """
    A ViewSet for Products in MongoDB
    """
    def list(self, request):
        """Get all products"""
        products = get_all_items()
        # Convert ObjectId to string for JSON serialization
        for product in products:
            product['_id'] = str(product['_id'])
        return Response(products)
    
    def retrieve(self, request, pk=None):
        """Get a single product"""
        product = get_item(pk)
        if not product:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        product['_id'] = str(product['_id'])
        return Response(product)
    
    def create(self, request):
        """Create a new product"""
        name = request.data.get('name')
        size = request.data.get('size')
        quantity = request.data.get('quantity')
        price = request.data.get('price')
        photos = request.data.get('photos', [])
        
        if not all([name, size, quantity, price]):
            return Response(
                {"error": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        result = create_item(name, size, int(quantity), float(price), photos)
        return Response(
            {"id": str(result.inserted_id)},
            status=status.HTTP_201_CREATED
        )
    
    def update(self, request, pk=None):
        """Update a product"""
        name = request.data.get('name')
        size = request.data.get('size')
        quantity = request.data.get('quantity')
        price = request.data.get('price')
        photos = request.data.get('photos')
        
        try:
            update_item(pk, name, size, quantity, price, photos)
            return Response({"status": "updated"})
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def destroy(self, request, pk=None):
        """Delete a product"""
        result = delete_item(pk)
        if result and result.deleted_count:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

class OrderViewSet(viewsets.ViewSet):
    """
    A ViewSet for Orders in MongoDB
    """
    def list(self, request):
        """Get all orders"""
        orders = get_orders()
        # Convert ObjectId to string for JSON serialization
        for order in orders:
            order['_id'] = str(order['_id'])
            for item in order['items']:
                item['item_id'] = str(item['item_id'])
        return Response(orders)
    
    def retrieve(self, request, pk=None):
        """Get a single order"""
        order = get_order(pk)
        if not order:
            return Response(
                {"error": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Convert ObjectId to string for JSON serialization
        order['_id'] = str(order['_id'])
        for item in order['items']:
            item['item_id'] = str(item['item_id'])
            
        return Response(order)
    
    def create(self, request):
        """Create an order from cart"""
        cart_id = get_or_create_cart_id(request)
            
        customer_name = request.data.get('customer_name')
        customer_email = request.data.get('customer_email')
        phone_number = request.data.get('phone_number')
        shipping_address = request.data.get('shipping_address')
        
        if not all([customer_name, customer_email, phone_number, shipping_address]):
            return Response(
                {"error": "Missing required customer information"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            order_result = create_order_from_cart(
                cart_id,
                customer_name,
                customer_email,
                phone_number,
                shipping_address
            )
            
            if order_result:
                order = get_order(order_result.inserted_id)
                if order:
                    order['_id'] = str(order['_id'])
                    for item in order['items']:
                        item['item_id'] = str(item['item_id'])
                    return Response(order, status=status.HTTP_201_CREATED)
            
            return Response(
                {"error": "Failed to create order"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class CartViewSet(viewsets.ViewSet):
    """
    A ViewSet for cart actions using Vercel KV
    """
    
    def list(self, request):
        """Get cart contents"""
        cart_id = get_or_create_cart_id(request)
        cart = get_cart_view(cart_id)
        
        response = Response(cart)
        
        # Set cart_id cookie if it doesn't exist
        if not request.COOKIES.get('cart_id'):
            response.set_cookie('cart_id', cart_id, max_age=86400)
            
        return response
    
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        """Add item to cart"""
        cart_id = get_or_create_cart_id(request)
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')
        quantity = int(request.data.get('quantity', 1))
        
        if not product_id:
            return Response(
                {"error": "Product ID is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = add_to_cart_view(cart_id, product_id, quantity, variant_id)
        
        if 'error' in cart:
            return Response(cart, status=status.HTTP_400_BAD_REQUEST)
        
        response = Response(cart)
        
        # Set cart_id cookie if it doesn't exist
        if not request.COOKIES.get('cart_id'):
            response.set_cookie('cart_id', cart_id, max_age=86400)
            
        return response
    
    @action(detail=False, methods=['post'])
    def remove_item(self, request):
        """Remove item from cart"""
        cart_id = get_or_create_cart_id(request)
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')
        
        if not product_id:
            return Response(
                {"error": "Product ID is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = remove_from_cart_view(cart_id, product_id, variant_id)
        return Response(cart)
    
    @action(detail=False, methods=['post'])
    def clear(self, request):
        """Clear cart"""
        cart_id = get_or_create_cart_id(request)
        cart = clear_cart_view(cart_id)
        return Response(cart)