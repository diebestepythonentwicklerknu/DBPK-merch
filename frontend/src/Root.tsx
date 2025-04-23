import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StorePage } from "./pages/store/storePage";
import { CartPage } from "./pages/cart/cartPage";
import { PaymentPage } from "./pages/payment/paymentPage";
import { SuccessOrderPage } from "./pages/service/successOrderPage";
import { NotFoundPage } from "./pages/service/notFoundPage";
import { LandingPage } from "./pages/landing/landingPage";
import App from "./App";
import { CartContextProvider } from "./context/cartContext";

export const Root = () => {
  return (
    <CartContextProvider> 
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessOrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
    </CartContextProvider>
  );
};
