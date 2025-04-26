import { NavLink } from 'react-router-dom'
import './header.scss'
import classNames from 'classnames'
import { CartCounter } from '../cart-counter/cart-counter'

export const Header = () => {
    const getActiveClassName = ({ isActive }: { isActive: boolean }) => {
        return classNames('nav__link', { 'nav__link--active': isActive })
    }

    return (
        <header className="header">
            <div className="header__tab"></div>
            <nav className="header__nav nav">
                <ul className="nav__list">
                    <NavLink to="/" className="logo">
                        DBPK
                    </NavLink>
                </ul>
                <ul className="nav__list">
                    <NavLink to="/" className={getActiveClassName}>
                        Home
                    </NavLink>
                    <NavLink to="store" className={getActiveClassName}>
                        Merch
                    </NavLink>
                    <NavLink to="cart" className={getActiveClassName}>
                        Cart
                        <CartCounter />
                    </NavLink>
                    <NavLink to="orders" className={getActiveClassName}>
                        Orders
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}
