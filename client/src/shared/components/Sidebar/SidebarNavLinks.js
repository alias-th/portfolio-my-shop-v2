import { NavLink } from "react-router-dom";
import classes from "./SidebarNavLinks.module.css";

function NavLinks() {
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink
          to="edit"
          style={({ isActive }) =>
            isActive ? { fontWeight: "500" } : undefined
          }
        >
          Edit Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          to="products"
          style={({ isActive }) =>
            isActive ? { fontWeight: "500" } : undefined
          }
        >
          Your Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="product/new"
          style={({ isActive }) =>
            isActive ? { fontWeight: "500" } : undefined
          }
        >
          Add Product
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { fontWeight: "500" } : undefined
          }
        >
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { fontWeight: "500" } : undefined
          }
        >
          Sign out
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
