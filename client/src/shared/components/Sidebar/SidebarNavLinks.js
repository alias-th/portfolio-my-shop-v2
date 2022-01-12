import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logoutAction } from "../../store/auth-actions";

import classes from "./SidebarNavLinks.module.css";

function NavLinks() {
  const user = useSelector((state) => state.auth.user);

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
        to="/profile/settings"
        style={({ isActive }) =>
          isActive
            ? { fontWeight: "500", backgroundColor: "#0646631e" }
            : undefined
        }
      >
        <li>Settings</li>
      </NavLink>

      {user.role === "seller" ||
        (user.role === "admin" && (
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
        ))}

      {user.role === "seller" ||
        (user.role === "admin" && (
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
        ))}

      <NavLink
        to="/profile/orders"
        style={({ isActive }) =>
          isActive
            ? { fontWeight: "500", backgroundColor: "#0646631e" }
            : undefined
        }
      >
        <li>Your Order</li>
      </NavLink>

      <NavLink to="/">
        <li onClick={logoutHandler}>Sign out</li>
      </NavLink>
    </ul>
  );
}

export default NavLinks;
