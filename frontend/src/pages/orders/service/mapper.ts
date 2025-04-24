import {CreateOrderDto, OrderInfo, OrderProduct } from "../../../types/order";
import {ProductCart } from "../../../types/products";

export const mapCartToOrderProduct = (cart: ProductCart[]): OrderProduct[] => {
    return cart.map((product: ProductCart) => ({
        item_id: product.id,
        quantity: product.currentQuantity || 1,
    } as OrderProduct));
}

export const createOrder = (cart: ProductCart[], orderInfo: OrderInfo): CreateOrderDto => {
    const orderProducts = mapCartToOrderProduct(cart);

    const order = {
        items: orderProducts,
        ...orderInfo,
    }

    return order;
}