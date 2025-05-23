import { useEffect, useState } from 'react'
import {
    getSessionItems,
    updateSessionItems,
} from '../sessionStorage/sessionStorageService'
import { ProductCart } from '../types/products'

const CART_STORAGE = 'dbpk-cart'

export const useCart = () => {
    const [cart, setCart] = useState<ProductCart[]>(() => {
        const storedCart = getSessionItems<ProductCart>(CART_STORAGE)

        return storedCart || []
    })

    useEffect(() => {
        updateSessionItems<ProductCart>(CART_STORAGE, cart)
    }, [cart])

    return {
        cart,
        setCart,
    }
}
