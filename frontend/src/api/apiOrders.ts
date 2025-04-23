import { CreateOrderDto } from "../types/order";
import { ORDERS } from "./api";

export const addOrder = (order: CreateOrderDto) => {
    console.log(order);
    return fetch(ORDERS, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json();
    });
};

export const getOrders = () => {
    return fetch(ORDERS)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            return response.json();
        });
};