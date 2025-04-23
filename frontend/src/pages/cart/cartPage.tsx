import { useCartContext } from "../../context/cartContext";
import { useCart } from "../../hooks/useCart";
import { renderProducts } from "../store/service/products";

export const CartPage = () => {
  // const { cart } = useCart();
  const { cart } = useCartContext();

  return (
    <div>
      <h1>Cart Page</h1>
      <p>This is the cart page.</p>
      <div className="cart__grid">
        {renderProducts(cart)}
      </div>
    </div>
  );
};
