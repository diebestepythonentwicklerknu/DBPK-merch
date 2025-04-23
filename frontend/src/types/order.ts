export type OrderProduct = {
    item_id: string,
    quantity: number,
}

export type CreateOrderDto = {
    items: OrderProduct[],
    customer_name: string,
    customer_email: string,
    phone_number: string,
    delivery_address: string,
}

export type OrderDto = {
    id: string,
    items: OrderProduct[],
    customer_name: string,
    customer_email: string,
    phone_number: string,
    delivery_address: string,
    total_price: number,
    status: string,
}

export type OrderInfo = {
    customer_name: string,
    delivery_address: string,
    customer_email: string,
    phone_number: string,
}