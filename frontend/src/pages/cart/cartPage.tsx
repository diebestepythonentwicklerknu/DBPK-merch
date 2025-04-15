import { BuyForm } from '../../components/buy-form/buy-form'
import { useCartContext } from '../../context/cartContext'
import { renderCartProducts } from '../store/service/products'
import { CartEmptyPage } from '../service/cartEmpty'

export const CartPage = () => {
    const { cart } = useCartContext()

    return (
        <div>
            <h1>Cart Page</h1>
            <p>This is the cart page.</p>

            {cart.length > 0 ? (
                <>
                    <div className="cart__grid">{renderCartProducts(cart)}</div>
                    <div className="cart__order">
                        <BuyForm />
                    </div>
                </>
            ) : (
                <CartEmptyPage />
            )}
        </div>
    )
}
