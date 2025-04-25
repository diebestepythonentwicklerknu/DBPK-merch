import { NavLink } from "react-router-dom";
import './header.scss';

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav nav">
        <ul className="nav__list">
          <NavLink to="/" className="logo">
            DBPK
          </NavLink>
        </ul>
        <ul className="nav__list">
          <NavLink to="/" className="nav__link">
            Home
          </NavLink>
          <NavLink to="store" className="nav__link">Catalog</NavLink>
          <NavLink to="cart" className="nav__link">Cart</NavLink>
          <NavLink to="orders" className="nav__link">Orders</NavLink>
        </ul>
      </nav>
    </header>
  );
};
