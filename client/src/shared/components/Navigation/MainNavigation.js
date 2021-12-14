import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import Cart from "./Cart";

function MainNavigation() {
  return (
    <MainHeader>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        My Shop
      </Link>
      <SearchBar />
      <NavLinks />
      <Cart />
    </MainHeader>
  );
}

export default MainNavigation;
