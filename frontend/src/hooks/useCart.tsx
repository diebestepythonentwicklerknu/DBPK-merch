import { useEffect, useState } from "react"
import { getSessionItems, updateSessionItems } from "../sessionStorage/sessionStorageService";
import { Product } from "../types/products";

const CART_STORAGE = 'dbpk-cart';

export const useCart = () => {
    const [cart, setCart] = useState<Product[]>(() => {
        const storedCart = getSessionItems<Product>(CART_STORAGE);

        console.log('Stored cart:', storedCart);
        
        return storedCart || [];
    });

    console.log(cart);

    useEffect(() => {
       updateSessionItems<Product>(CART_STORAGE, cart);
    }, [cart]);

    return {
        cart,
        setCart,
    }
}