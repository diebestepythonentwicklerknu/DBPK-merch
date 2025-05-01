import { useEffect, useState } from 'react'
import { Product } from '../../types/products'
import { useCartContext } from '../../context/cartContext'
import classNames from 'classnames'

interface CartButtonProps {
    product: Product
}

export const CartButton: React.FC<CartButtonProps> = ({ product }) => {
    const [isInCart, setIsInCart] = useState(false)
    const { addToCart, removeFromCart, isProductInCart } = useCartContext()

    useEffect(() => {
        setIsInCart(isProductInCart(product.id))
    }, [isProductInCart, product])

    const handleAddToCart = () => {
        if (isInCart) {
            setIsInCart(false)
            removeFromCart(product.id)
            console.log(`Product with ID ${product.id} removed from cart`)
        } else {
            setIsInCart(true)
            addToCart(product)
            console.log(`Product with ID ${product.id} added to cart`)
        }
    }

    return (
        <button
            className={classNames('button button--cart', {
                'button--in-cart': isInCart,
            })}
            onClick={handleAddToCart}
        >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
    )
}
