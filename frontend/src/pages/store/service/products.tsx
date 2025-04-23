import { Card } from "../../../components/card/card";
import { CartCard } from "../../../components/cart-card/cart-card";
import { Order } from "../../../components/order/order";
import { OrderDto } from "../../../types/order";
import { Product } from "../../../types/products";

export const renderProducts = (products: Product[]) => {
    return products.map((product) => (
        <Card product={product} key={`card_${product.id}`}/>
    ));
};

export const renderCartProducts = (products: Product[]) => {
    return products.map((product) => (
        <CartCard product={product} key={`card-in-cart_${product.id}`}/>
    ));
};

export const renderOrderCards = (orders: OrderDto[]) => {
    return orders.map((order) => (<Order order={order} key={`card-order__${order.id}`}/>));
}