import { useState } from "react";

import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import { AiOutlineCaretDown } from "react-icons/ai";

import ProfileMenu from "./ProfileMenu";

import classes from "./NavLinks.module.css";

function NavLinks() {
  const user = useSelector((state) => state.auth.user);

  const [profileIsTouched, setProfileIsTouched] = useState(false);

  const mouseOverHandler = (e) => {
    setProfileIsTouched(true);
  };

  const mouseOutHandler = (e) => {
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

      {user && (
        <li onMouseOver={mouseOverHandler} onMouseLeave={mouseOutHandler}>
          <NavLink
            to="/profile"
            style={({ isActive }) =>
              isActive ? { textDecoration: "underline" } : undefined
            }
          >
            <img
              src={`/uploads/images/${user ? user.photo : "default.png"}`}
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
      )}

      {!user && (
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
      )}
    </ul>
  );
}

export default NavLinks;
