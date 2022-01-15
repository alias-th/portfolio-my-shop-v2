import { useNavigate } from "react-router-dom";
import classes from "./Price.module.css";

function Price() {
  const navigate = useNavigate();
  const onChangePriceHandler = (e) => {
    const url = new URL(window.location.href);
    // console.log(url);
    if (`${e.target.id}`.startsWith("under")) {
      url.searchParams.delete("price[gte]");
      url.searchParams.set(`price[lte]`, e.target.value);
    } else if (`${e.target.id}`.startsWith("over")) {
      url.searchParams.delete("price[lte]");
      url.searchParams.set("price[gte]", e.target.value);
    }

    // console.log(url.search);
    navigate({
      search: url.search,
    });
  };
  return (
    <fieldset
      className={classes.fieldset}
      id="price"
      onChange={onChangePriceHandler}
    >
      <legend>Price</legend>
      <hr />

      <div className={classes.input}>
        <input type="radio" id="under 1500" name="price" value="1500" />
        <label htmlFor="under 1500">Under 1,500 THB</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="under 2000" name="price" value="2000" />
        <label htmlFor="under 2000">Under 2,000 THB</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="under 3000" name="price" value="3000" />
        <label htmlFor="under 3000">Under 3,000 THB</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="over 3000" name="price" value="3000" />
        <label htmlFor="over 3000">Over 3,000 THB</label>
      </div>
    </fieldset>
  );
}

export default Price;
