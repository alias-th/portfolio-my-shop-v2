import { Link } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";

import MainHeader from "./MainHeader";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import Cart from "./Cart";

import classes from "./MainNavigation.module.css";
import { useState } from "react";
function MainNavigation(props) {
  const [isNotActive, setIsNotActive] = useState(true);

  const onClickSetActive = () => {
    setIsNotActive((prev) => !prev);
  };
  return (
    <MainHeader>
      <div className={classes["logo-container"]}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <img src="/logo.png" className={classes["logo"]} alt="logo" />
        </Link>
        <button
          className={classes["berger-button"]}
          type="button"
          onClick={onClickSetActive}
        >
          <GiHamburgerMenu className={classes["berger-icon"]} />
        </button>
      </div>

      <SearchBar isNotActive={isNotActive} />
      <NavLinks isNotActive={isNotActive} />
      <Cart onShowCart={props.onShowCart} isNotActive={isNotActive} />
    </MainHeader>
  );
}

export default MainNavigation;
