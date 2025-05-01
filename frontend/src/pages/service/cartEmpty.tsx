import './service.scss'

export const CartEmptyPage = () => {
    return (
        <div className="service">
            <img
                src="/icons/empty_cart.svg"
                alt="empty cart"
                className="service__image"
            />
            <div className="service__text-block">
                <h2 className="service__headline">Nothing here yet... 🦗</h2>
                <p className="service__text">This is the cart empty page.</p>
            </div>
        </div>
    )
}
