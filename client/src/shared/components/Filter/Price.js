import classes from "./Price.module.css";

function Price() {
  return (
    <fieldset className={classes.fieldset} id="price">
      <legend>Price</legend>
      <hr />
      <div className={classes.input}>
        <input type="radio" id="any" name="price" />
        <label htmlFor="any">Any price</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="price-input-one" name="price" />
        <label htmlFor="price-input-one">Under 750 THB</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="price-input-two" name="price" />
        <label htmlFor="price-input-two">750 THB to 1,500 THB</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="price-input-three" name="price" />
        <label htmlFor="price-input-three">1,500 THB to 3,000 THB</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="price-input-four" name="price" />
        <label htmlFor="price-input-four">Over 3,000 THB</label>
      </div>
      <div className={`${classes["search-filter"]}`}>
        <input type="number" id="search-filter-min-price" name="price" />
        <p>to</p>
        <input type="number" id="search-filter-max-price" name="price" />
      </div>
    </fieldset>
  );
}

export default Price;
