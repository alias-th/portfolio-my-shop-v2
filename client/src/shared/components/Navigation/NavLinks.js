import { useState } from "react";
import { NavLink } from "react-router-dom";

import { AiOutlineCaretDown } from "react-icons/ai";
import ProfileMenu from "./ProfileMenu";
import classes from "./NavLinks.module.css";

function NavLinks() {
  const [profileIsTouched, setProfileIsTouched] = useState(false);

  const mouseOverHandler = (e) => {
    console.log("t");
    setProfileIsTouched(true);
  };
  const mouseOutHandler = (e) => {
    console.log("f");
    setProfileIsTouched(false);
  };
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

      <li onMouseOver={mouseOverHandler} onMouseLeave={mouseOutHandler}>
        <NavLink
          to="/profile"
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : undefined
          }
        >
          <img
            src="https://images.unsplash.com/photo-1612430518035-48d8d4e6bc3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="user-1"
            className={classes["user-img"]}
          />
          <AiOutlineCaretDown />
        </NavLink>
        {profileIsTouched && (
          <ProfileMenu
            className={classes["menu-profile"]}
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseOutHandler}
          ></ProfileMenu>
        )}
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
