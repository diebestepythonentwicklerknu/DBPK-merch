import { useStore } from "../../hooks/useStore";
import { renderProducts } from "./service/products";

export const StorePage = () => {
  const { products } = useStore();

  return (
    <div>
      <div className="store-page__banner banner">
        <h1>Welcome to the Store</h1>
        <p>Find the best products here!</p>
      </div>
      <div className="store-page__catalog catalog">
        {renderProducts(products)}
      </div>
    </div>
  );
};
