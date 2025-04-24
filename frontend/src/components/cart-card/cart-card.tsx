import { Product } from "../../types/products";
import { useCartItem } from "../../hooks/useCartItem";
import { CartButton } from "../cart-button/cart-button";

interface CardProps {
    product: Product;
}

export const CartCard: React.FC<CardProps> = ({ product }) => {
    const { quantity, price, incrementQuantity, decrementQuantity} = useCartItem(product);

    return (
        <div className="card">
                   <img src={product.photos[0]} alt={product.name} className="card__image" />
                   <div className="card__info">
                       <h2 className="card__title">{product.name}</h2>
                       <p className="card__size">Size: {product.size}</p>
                       <p className="card__quantity">Quantity: {quantity}</p>
                       <p className="card__price">Price: ${price.toFixed(2)}</p>
                   </div>
                   <button className="button button--increase" onClick={incrementQuantity}>+</button>
                   <button className="button button--decrease" onClick={decrementQuantity}>-</button>
                    <CartButton product={product}/>
               </div>
    );
};