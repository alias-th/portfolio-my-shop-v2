import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

function NavLinks() {
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : undefined
          }
        >
          All Products
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to="/u1/products"
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : undefined
          }
        >
          Your Products
        </NavLink>
      </li> */}
      <li>
        <NavLink
          to="/auth"
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : undefined
          }
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
