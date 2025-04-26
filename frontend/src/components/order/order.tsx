import './order.scss'
import { OrderDto } from '../../types/order'

export interface OrderProps {
    order: OrderDto
}

export const Order: React.FC<OrderProps> = ({ order }) => {
    return (
        <div className="order">
            <div className="order__header">
                <h3 className="order__id">
                    Order <span className="value">#{order.id}</span>
                </h3>
                <div className="order__status">{order.status}</div>
            </div>
            <div className="order__info">
                <p>
                    Delivery Address
                    <span className="value">{order.delivery_address}</span>
                </p>
                <p>
                    Customer Email
                    <span className="value">{order.customer_email}</span>
                </p>
                <p>
                    Phone Number
                    <span className="value">{order.phone_number}</span>
                </p>
                <p>
                    Total
                    <span className="value">${order.total_price}</span>
                </p>
            </div>
        </div>
    )
}
