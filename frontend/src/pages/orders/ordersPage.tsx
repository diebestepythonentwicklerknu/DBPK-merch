import { Loader } from '@chakra-ui/react'
import { useOrders } from '../../hooks/useOrders'
import { renderOrderCards } from '../store/service/products'
import './ordersPage.scss'

export const OrdersPage = () => {
    const { orders, isLoading } = useOrders()

    return isLoading ? (
        <Loader />
    ) : (
        <div className="order-page page">
            <div className="page__container">
                <div className="order-page__banner banner">
                    <img
                        src="/icons/dbpk.svg"
                        alt="cat"
                        className="banner__logo"
                    />
                    <h1 className="banner__headline">Your Orders</h1>
                    <p className="banner__text">
                        The list of your recent orders
                    </p>
                </div>
                <div className="order-page__grid">
                    {renderOrderCards(orders)}
                </div>
            </div>
        </div>
    )
}
