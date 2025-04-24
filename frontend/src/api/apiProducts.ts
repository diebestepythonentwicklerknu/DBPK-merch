import { UpdatedProduct } from "../types/products";
import { PRODUCTS } from "./api";

export const getProducts = () => {
    return fetch(PRODUCTS)
    .then(response => response.json());
};

export const updateProductById = (productId: string, updatedProduct: UpdatedProduct) => {
    return fetch(`${PRODUCTS}${productId}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct) 
    })
    .then(response => response.json());
}
export const deleteProductById = (productId: string) => {
    return fetch(`${PRODUCTS}${productId}`, { method: 'DELETE' })
    .then(response => response.json());
}
