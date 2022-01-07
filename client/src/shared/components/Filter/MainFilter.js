// import Offers from "./Offers";
import Brands from "./Brands";
import Price from "./Price";

import classes from "./MainFilter.module.css";

function filter() {
  return (
    <form className={classes["form-filter"]}>
      {/* <Offers /> */}
      <Brands />
      <Price />
    </form>
  );
}

export default filter;
