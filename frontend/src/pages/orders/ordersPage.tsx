import { useOrders } from "../../hooks/useOrders";
import { renderOrderCards } from "../store/service/products";

export const OrdersPage = () => {
  const { orders } = useOrders();

  return (
    <div>
      <h1>Orders Page</h1>
      <p>This is the orders page.</p>
      <div className="order__grid">
        {renderOrderCards(orders)}
      </div>
    </div>
  );
};
