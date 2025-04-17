from rest_framework import serializers


class ItemSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField()
    size = serializers.CharField()
    quantity = serializers.IntegerField()
    price = serializers.FloatField()
    photos = serializers.ListField(child=serializers.URLField(), required=False, default=[])  # Список URL фото


class OrderItemSerializer(serializers.Serializer):
    item_id = serializers.CharField()
    quantity = serializers.IntegerField()


class OrderSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)  # Add this
    items = OrderItemSerializer(many=True)
    customer_name = serializers.CharField()
    customer_email = serializers.EmailField()
    phone_number = serializers.CharField()
    delivery_address = serializers.CharField()
    total_price = serializers.FloatField(read_only=True)
    status = serializers.CharField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
