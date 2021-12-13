import classes from "./Offers.module.css";

function Offers() {
  return (
    <fieldset className={classes.fieldset}>
      <legend>Special offers</legend>
      <hr />
      <div className={classes.input}>
        <input type="checkbox" id="free" />
        <label htmlFor="free">Free shipping</label>
      </div>
      <div className={classes.input}>
        <input type="checkbox" id="sale" />
        <label htmlFor="sale">On sale</label>
      </div>
    </fieldset>
  );
}

export default Offers;
