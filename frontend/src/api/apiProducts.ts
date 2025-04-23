import { UpdatedProduct } from "../types/products";
import { PRODUCTS } from "./api";

export const getProducts = async () => {
    return fetch(PRODUCTS)
    .then(response => response.json());
};

export const updateProductById =  async (productId: string, updatedProduct: UpdatedProduct) => {
    return fetch(`${PRODUCTS}${productId}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct) 
    })
    .then(response => response.json());
}
export const deleteProductById = async (productId: string) => {
    return fetch(`${PRODUCTS}${productId}`, { method: 'DELETE' })
    .then(response => response.json());
}
