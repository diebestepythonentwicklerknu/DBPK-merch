import { OrderDto } from "../../types/order";

export interface OrderProps {
    order: OrderDto;
}

export const Order: React.FC<OrderProps> = ({ order }) => {
    return (
        <div className="order">
            <h3 className="order__id">{order.id}</h3>
            <div className="order__info">
                <p>Delivery Address: {order.delivery_address}</p>
                <p>Customer Email: {order.customer_email}</p>
                <p>Phone Number: {order.phone_number}</p>
            </div>
            <h3 className="order__price">{order.total_price}</h3>
            <div className="order__status">{order.status}</div>
        </div>
    );
}