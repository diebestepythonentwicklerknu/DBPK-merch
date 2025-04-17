import pytest
import datetime
from bson.objectid import ObjectId
from pymongo import MongoClient
from unittest.mock import MagicMock, patch
from inventory.models import (
    create_item,
    get_item,
    update_item,
    delete_item,
    get_all_items,
    create_order,
    get_order,
    get_orders
)


# Fixtures
@pytest.fixture
def mock_mongo(monkeypatch):
    mock_client = MagicMock()
    mock_db = MagicMock()
    mock_items = MagicMock()
    mock_orders = MagicMock()

    mock_client.get_database.return_value = mock_db
    mock_db.items = mock_items
    mock_db.orders = mock_orders

    monkeypatch.setattr("inventory.models.MongoClient", MagicMock(return_value=mock_client))
    monkeypatch.setattr("inventory.models.db", mock_db)
    monkeypatch.setattr("inventory.models.items_collection", mock_items)
    monkeypatch.setattr("inventory.models.orders_collection", mock_orders)

    return {
        "client": mock_client,
        "db": mock_db,
        "items": mock_items,
        "orders": mock_orders
    }


@pytest.fixture
def sample_item():
    return {
        "name": "Test Item",
        "size": "M",
        "quantity": 10,
        "price": 99.99,
        "photos": ["http://example.com/photo.jpg"]
    }


@pytest.fixture
def sample_order():
    return {
        "items": [
            {
                "item_id": ObjectId(),
                "name": "Test Item",
                "size": "M",
                "quantity": 2,
                "price": 99.99
            }
        ],
        "customer_name": "John Doe",
        "customer_email": "john@example.com",
        "phone_number": "+1234567890",
        "delivery_address": "123 Test St",
        "total_price": 199.98,
        "status": "confirmed",
        "created_at": datetime.datetime.utcnow()
    }


# Tests for item-related functions
def test_create_item(mock_mongo, sample_item):
    mock_mongo["items"].insert_one.return_value = MagicMock(inserted_id=ObjectId())

    result = create_item(
        name=sample_item["name"],
        size=sample_item["size"],
        quantity=sample_item["quantity"],
        price=sample_item["price"],
        photos=sample_item["photos"]
    )

    mock_mongo["items"].insert_one.assert_called_once()
    assert isinstance(result.inserted_id, ObjectId)


@pytest.mark.parametrize("photos_input, expected_photos", [
    (None, []),
    (["photo1.jpg"], ["photo1.jpg"]),
    ([], [])
])
def test_create_item_photos(mock_mongo, photos_input, expected_photos):
    mock_mongo["items"].insert_one.return_value = MagicMock(inserted_id=ObjectId())

    create_item(
        name="Test Item",
        size="M",
        quantity=10,
        price=99.99,
        photos=photos_input
    )

    mock_mongo["items"].insert_one.assert_called_once_with({
        "name": "Test Item",
        "size": "M",
        "quantity": 10,
        "price": 99.99,
        "photos": expected_photos
    })


def test_get_item(mock_mongo, sample_item):
    item_id = str(ObjectId())
    mock_mongo["items"].find_one.return_value = sample_item

    result = get_item(item_id)

    mock_mongo["items"].find_one.assert_called_once_with({"_id": ObjectId(item_id)})
    assert result == sample_item


def test_get_item_not_found(mock_mongo):
    item_id = str(ObjectId())
    mock_mongo["items"].find_one.return_value = None

    result = get_item(item_id)

    assert result is None


@pytest.mark.parametrize("update_data, expected_update", [
    ({"name": "New Name"}, {"name": "New Name"}),
    ({"quantity": 20}, {"quantity": 20}),
    ({"photos": ["new_photo.jpg"]}, {"photos": ["new_photo.jpg"]}),
    ({"name": "New Name", "price": 149.99}, {"name": "New Name", "price": 149.99})
])
def test_update_item(mock_mongo, update_data, expected_update):
    item_id = str(ObjectId())
    mock_mongo["items"].update_one.return_value = MagicMock(modified_count=1)

    result = update_item(item_id, **update_data)

    mock_mongo["items"].update_one.assert_called_once_with(
        {"_id": ObjectId(item_id)},
        {"$set": expected_update}
    )
    assert result.modified_count == 1


def test_delete_item(mock_mongo):
    item_id = str(ObjectId())
    mock_mongo["items"].delete_one.return_value = MagicMock(deleted_count=1)

    result = delete_item(item_id)

    mock_mongo["items"].delete_one.assert_called_once_with({"_id": ObjectId(item_id)})
    assert result.deleted_count == 1


def test_get_all_items(mock_mongo, sample_item):
    mock_mongo["items"].find.return_value = [sample_item, sample_item]

    result = get_all_items()

    mock_mongo["items"].find.assert_called_once()
    assert len(result) == 2
    assert all(item == sample_item for item in result)


# Tests for order-related functions
def test_create_order(mock_mongo, sample_item):
    item_id = str(ObjectId())
    mock_mongo["items"].find_one.return_value = sample_item
    mock_mongo["items"].update_one.return_value = MagicMock(modified_count=1)
    mock_mongo["orders"].insert_one.return_value = MagicMock(inserted_id=ObjectId())

    result = create_order(
        items=[{"item_id": item_id, "quantity": 2}],
        customer_name="John Doe",
        customer_email="john@example.com",
        phone_number="+1234567890",
        delivery_address="123 Test St"
    )

    mock_mongo["items"].find_one.assert_called_once()
    mock_mongo["items"].update_one.assert_called_once()
    mock_mongo["orders"].insert_one.assert_called_once()
    assert isinstance(result.inserted_id, ObjectId)


def test_create_order_item_not_found(mock_mongo):
    item_id = str(ObjectId())
    mock_mongo["items"].find_one.return_value = None

    with pytest.raises(ValueError, match=f"Товар {item_id} не знайдено"):
        create_order(
            items=[{"item_id": item_id, "quantity": 2}],
            customer_name="John Doe",
            customer_email="john@example.com",
            phone_number="+1234567890",
            delivery_address="123 Test St"
        )


def test_create_order_insufficient_quantity(mock_mongo, sample_item):
    item_id = str(ObjectId())
    sample_item["quantity"] = 1
    mock_mongo["items"].find_one.return_value = sample_item

    with pytest.raises(ValueError, match=f"Недостатньо товару {sample_item['name']}"):
        create_order(
            items=[{"item_id": item_id, "quantity": 2}],
            customer_name="John Doe",
            customer_email="john@example.com",
            phone_number="+1234567890",
            delivery_address="123 Test St"
        )


def test_get_order(mock_mongo, sample_order):
    order_id = str(ObjectId())
    mock_mongo["orders"].find_one.return_value = sample_order

    result = get_order(order_id)

    mock_mongo["orders"].find_one.assert_called_once_with({"_id": ObjectId(order_id)})
    assert result == sample_order


def test_get_orders(mock_mongo, sample_order):
    mock_mongo["orders"].find.return_value = [sample_order, sample_order]

    result = get_orders()

    mock_mongo["orders"].find.assert_called_once()
    assert len(result) == 2
    assert all(order == sample_order for order in result)