import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav>
        <ul className="">
          <NavLink to="/" className="logo">
            <img src="" alt="logo" />
          </NavLink>
        </ul>
        <ul>
          <NavLink to="/" className="logo">
            Home
          </NavLink>
          <NavLink to="store">Catalog</NavLink>
          <NavLink to="cart">Cart</NavLink>
        </ul>
      </nav>
    </header>
  );
};
