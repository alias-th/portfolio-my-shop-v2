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
      <li>
        <NavLink
          to="/profile/products"
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : undefined
          }
        >
          Your Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/product/new"
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : undefined
          }
        >
          Add Product
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/edit"
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : undefined
          }
        >
          My Profile
        </NavLink>
      </li>
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
