import { createContext, useContext, useMemo } from 'react'
import { Product, ProductCart } from '../types/products'
import { useCart } from '../hooks/useCart'

interface CartContextProviderProps {
    children: React.ReactNode
}
interface CartContextProps {
    cartAmount: number
    cart: ProductCart[]
    setCart: React.Dispatch<React.SetStateAction<ProductCart[]>>
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    isProductInCart: (productId: string) => boolean
    updateProductQuantity: (productId: string, quantity: number) => void
}

export const CartContext = createContext({} as CartContextProps)

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
    children,
}) => {
    const { cart, setCart } = useCart()

    const cartAmount = useMemo(() => cart.length, [cart])

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, { ...product, currentQuantity: 1 }])
    }

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    const updateProductQuantity = (productId: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, currentQuantity: quantity }
                    : item
            )
        )
    }

    const isProductInCart = (productId: string) => {
        return cart.some((item) => item.id === productId)
    }

    return (
        <CartContext.Provider
            value={{
                cartAmount,
                cart,
                setCart,
                addToCart,
                removeFromCart,
                isProductInCart,
                updateProductQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
