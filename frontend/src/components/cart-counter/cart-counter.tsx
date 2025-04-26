import { useCartContext } from '../../context/cartContext'
import './cart-counter.scss'

export const CartCounter = () => {
    const { cartAmount } = useCartContext()

    return (
        cartAmount > 0 && (
            <div className="cart-counter">
                <span className="cart-counter__number">{cartAmount}</span>
            </div>
        )
    )
}
