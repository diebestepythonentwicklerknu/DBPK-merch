import classNames from "classnames";
import { Product } from "../../types/products";
import { CartButton } from "../cart-button/cart-button";
import './card.scss';

interface CardProps {
    product: Product;
}

export const Card: React.FC<CardProps> = ({ product }) => {
    return (
        <div className={classNames("card", {
            "card--sold-out": product.quantity === 0})}>
            <img src={product.photos[0]} alt={product.name} className="card__image" />
            <div className="card__info">
                <h2 className="card__title">{product.name}</h2>
                <p className="card__size">Size <span className="value">{product.size}</span></p>
                <p className="card__quantity">Quantity <span className="value">{product.quantity}</span></p>
                <p className="card__price">Price <span className="value value--price">$ {product.price.toFixed(2)}</span></p>
            </div>
            <CartButton product={product}/>
        </div>
    );
}