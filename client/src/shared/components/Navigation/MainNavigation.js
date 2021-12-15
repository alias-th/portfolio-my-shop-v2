import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import Cart from "./Cart";

function MainNavigation(props) {
  return (
    <MainHeader>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        My Shop
      </Link>
      <SearchBar />
      <NavLinks />
      <Cart onShowCart={props.onShowCart} />
    </MainHeader>
  );
}

export default MainNavigation;
