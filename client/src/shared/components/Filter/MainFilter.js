// import Offers from "./Offers";
import Brands from "./Brands";
import Price from "./Price";

import classes from "./MainFilter.module.css";
import Button from "../FormElements/Button";
import { useNavigate } from "react-router-dom";

function MainFilter() {
  const navigate = useNavigate();

  const onClickResetFilter = () => {
    navigate("/");
  };

  return (
    <form className={classes["form-filter"]}>
      {/* <Offers /> */}
      <div className={classes["filter-container"]}>
        <Brands />
        <Price />
      </div>
      <Button type="reset" onClick={onClickResetFilter}>
        Reset all filters
      </Button>
    </form>
  );
}

export default MainFilter;
