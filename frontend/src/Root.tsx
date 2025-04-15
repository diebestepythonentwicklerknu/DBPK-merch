import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { StorePage } from './pages/store/storePage'
import { CartPage } from './pages/cart/cartPage'
import { OrdersPage } from './pages/orders/ordersPage'
import { SuccessOrderPage } from './pages/service/successOrderPage'
import { NotFoundPage } from './pages/service/notFoundPage'
import { LandingPage } from './pages/landing/landingPage'
import App from './App'
import { CartContextProvider } from './context/cartContext'
import { ErrorPage } from './pages/service/errorPage'

export const Root = () => {
    return (
        <CartContextProvider>
            <Router>
                <Routes>
                    <Route element={<App />}>
                        <Route index element={<LandingPage />} />
                        <Route path="/store" element={<StorePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/success" element={<SuccessOrderPage />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </Router>
        </CartContextProvider>
    )
}
