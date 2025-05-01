import { Product } from '../../types/products'
import { useCartItem } from '../../hooks/useCartItem'
import { CartButton } from '../cart-button/cart-button'

import './cart-card.scss'

interface CardProps {
    product: Product
}

export const CartCard: React.FC<CardProps> = ({ product }) => {
    const { quantity, price, incrementQuantity, decrementQuantity } =
        useCartItem(product)

    return (
        <div className="card">
            <img
                src={product.photos[0]}
                alt={product.name}
                className="card__image"
            />
            <div className="card__info">
                <h2 className="card__title">{product.name}</h2>
                <p className="card__size">
                    Size <span className="value">{product.size}</span>
                </p>
                <p className="card__quantity">
                    Quantity <span className="value">{quantity}</span>
                </p>
                <p className="card__price">
                    Price{' '}
                    <span className="value value--price">
                        $ {price.toFixed(2)}
                    </span>
                </p>
            </div>
            <div className="card__quantity-buttons">
                <button
                    className="button button--increase"
                    onClick={incrementQuantity}
                >
                    +
                </button>
                <button
                    className="button button--decrease"
                    onClick={decrementQuantity}
                >
                    -
                </button>
            </div>

            <CartButton product={product} />
        </div>
    )
}
