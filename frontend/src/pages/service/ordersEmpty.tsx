import './service.scss'

export const OrdersEmptyPage = () => {
    return (
        <div className="service">
            <img
                src="/icons/empty_orders.svg"
                alt="empty orders"
                className="service__image"
            />
            <div className="service__text-block">
                <h2 className="service__headline">Nothing here yet... 🦗</h2>
                <p className="service__text">
                    Go to the store and grab some funny stuff!
                </p>
            </div>
        </div>
    )
}
