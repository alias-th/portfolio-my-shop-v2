import MainHeader from "./MainHeader";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import Cart from "./Cart";

function MainNavigation() {
  return (
    <MainHeader>
      <p>My Shop</p>
      <SearchBar />
      <NavLinks />
      <Cart />
    </MainHeader>
  );
}

export default MainNavigation;
