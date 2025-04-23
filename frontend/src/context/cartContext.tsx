import { createContext, useContext } from "react";
import { Product } from "../types/products";
import { useCart } from "../hooks/useCart";

interface CartContextProviderProps {
    children: React.ReactNode;
}
interface CartContxtProps {
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    isProductInCart: (productId: string) => boolean;
}

export const CartContext = createContext({} as CartContxtProps);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
    const { cart, setCart } = useCart();

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const isProductInCart = (productId: string) => {
        return cart.some((item) => item.id === productId);
    };

    return (
        <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, isProductInCart}}>
            {children}
        </CartContext.Provider>
    );
};