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
