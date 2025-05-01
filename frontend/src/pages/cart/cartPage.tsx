import { BuyForm } from '../../components/buy-form/buy-form'
import { useCartContext } from '../../context/cartContext'
import { renderCartProducts } from '../store/service/products'
import { CartEmptyPage } from '../service/cartEmpty'
import './cartPage.scss'

export const CartPage = () => {
    const { cart } = useCartContext()

    return (
        <div className="cart-page page">
            <div className="page__container">
                <div className="cart-page__banner banner">
                    <img
                        src="/icons/dbpk.svg"
                        alt="cat"
                        className="banner__logo"
                    />
                    <h1 className="banner__headline">Your Cart</h1>
                    <p className="banner__text">
                        Recent items added to the cart
                    </p>
                </div>

                {cart.length > 0 ? (
                    <div className="cart-page__content">
                        <div className="cart-page__grid">
                            {renderCartProducts(cart)}
                        </div>
                        <div className="cart-page__order">
                            <BuyForm />
                        </div>
                    </div>
                ) : (
                    <CartEmptyPage />
                )}
            </div>
        </div>
    )
}
