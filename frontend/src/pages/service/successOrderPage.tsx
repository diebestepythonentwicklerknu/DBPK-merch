import { useNavigate } from 'react-router-dom'
import './service.scss'

export const SuccessOrderPage = () => {
    const navigate = useNavigate()

    return (
        <div className="service">
            <img
                src="/icons/order.svg"
                alt="success"
                className="service__image"
            />
            <div className="service__text-block">
                <h2 className="service__headline">Yeppie! New order! 🛍️</h2>
                <p className="service__text">
                    While we're working on shipping, you can check the status on
                    the Order Page
                </p>
            </div>
            <button className="button" onClick={() => navigate('/orders')}>
                See your order
                <img
                    src="/icons/arrow.svg"
                    alt="arrow"
                    className="button__icon"
                />
            </button>
        </div>
    )
}
