import { useEffect, useMemo, useState } from "react";
import { Product } from "../types/products";
import { useCartContext } from "../context/cartContext";

export const useCartItem = (product: Product) => {
    const { updateProductQuantity } = useCartContext();
    const [quantity, setQuantity] = useState(1);

    const calculatePrice = useMemo(() => product.price * quantity, [product, quantity]);

    const incrementQuantity = () => {
        if (product.quantity > 0) {
            setQuantity((prevQuantity) => Math.min(prevQuantity + 1, product.quantity));
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
        }
    };

    useEffect(() => {
        updateProductQuantity(product.id, quantity);
    }, [quantity]);

    return {
        price: calculatePrice,
        quantity: quantity,
        setQuantity,
        incrementQuantity,
        decrementQuantity
    }
};