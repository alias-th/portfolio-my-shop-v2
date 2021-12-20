import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logoutAction } from "../../store/auth-actions";

import classes from "./SidebarNavLinks.module.css";

function NavLinks() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className={classes["nav-links"]}>
      <NavLink
        to="/profile/edit"
        style={({ isActive }) =>
          isActive
            ? { fontWeight: "500", backgroundColor: "#0646631e" }
            : undefined
        }
      >
        <li>Edit Profile</li>
      </NavLink>

      <NavLink
        to="/profile/products"
        style={({ isActive }) =>
          isActive
            ? { fontWeight: "500", backgroundColor: "#0646631e" }
            : undefined
        }
      >
        <li>Your Products</li>
      </NavLink>
      <NavLink
        to="/profile/product/new"
        style={({ isActive }) =>
          isActive
            ? { fontWeight: "500", backgroundColor: "#0646631e" }
            : undefined
        }
      >
        <li>Add Product</li>
      </NavLink>
      <NavLink
        to="/profile/settings"
        style={({ isActive }) =>
          isActive
            ? { fontWeight: "500", backgroundColor: "#0646631e" }
            : undefined
        }
      >
        <li>Settings</li>
      </NavLink>
      <NavLink to="/">
        <li onClick={logoutHandler}>Sign out</li>
      </NavLink>
    </ul>
  );
}

export default NavLinks;
