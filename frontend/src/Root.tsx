import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import { StorePage } from './pages/store/storePage'
// import { CartPage } from './pages/cart/cartPage'
// import { OrdersPage } from './pages/orders/ordersPage'
// import { SuccessOrderPage } from './pages/service/successOrderPage'
// import { NotFoundPage } from './pages/service/notFoundPage'
// import { LandingPage } from './pages/landing/landingPage'
import App from './App'
import { CartContextProvider } from './context/cartContext'
// import { ErrorPage } from './pages/service/errorPage'
import { lazy, Suspense } from 'react'
import { Loader } from './pages/service/loader'
import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
} from '@chakra-ui/react'

const StorePage = lazy(() =>
    import('./pages/store/storePage').then((module) => ({
        default: module.StorePage,
    }))
)
const CartPage = lazy(() =>
    import('./pages/cart/cartPage').then((module) => ({
        default: module.CartPage,
    }))
)
const OrdersPage = lazy(() =>
    import('./pages/orders/ordersPage').then((module) => ({
        default: module.OrdersPage,
    }))
)
const SuccessOrderPage = lazy(() =>
    import('./pages/service/successOrderPage').then((module) => ({
        default: module.SuccessOrderPage,
    }))
)
const NotFoundPage = lazy(() =>
    import('./pages/service/notFoundPage').then((module) => ({
        default: module.NotFoundPage,
    }))
)
const LandingPage = lazy(() =>
    import('./pages/landing/landingPage').then((module) => ({
        default: module.LandingPage,
    }))
)
const ErrorPage = lazy(() =>
    import('./pages/service/errorPage').then((module) => ({
        default: module.ErrorPage,
    }))
)

const config = defineConfig({
    theme: {
        tokens: {
            colors: {},
        },
    },
})

const system = createSystem(defaultConfig, config)

export const Root = () => {
    return (
        <ChakraProvider value={system}>
            <CartContextProvider>
                <Suspense fallback={<Loader />}>
                    <Router>
                        <Routes>
                            <Route element={<App />}>
                                <Route index element={<LandingPage />} />
                                <Route path="/store" element={<StorePage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route
                                    path="/orders"
                                    element={<OrdersPage />}
                                />
                                <Route
                                    path="/success"
                                    element={<SuccessOrderPage />}
                                />
                                <Route path="/error" element={<ErrorPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Route>
                        </Routes>
                    </Router>
                </Suspense>
            </CartContextProvider>
        </ChakraProvider>
    )
}
