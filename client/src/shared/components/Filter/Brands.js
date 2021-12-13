import classes from "./Brands.module.css";
function Brands() {
  return (
    <fieldset className={classes.fieldset}>
      <legend>Brands</legend>
      <hr />
      <div className={classes.input}>
        <input type="checkbox" id="nike" />
        <label htmlFor="nike">Nike</label>
      </div>
      <div className={classes.input}>
        <input type="checkbox" id="converse" />
        <label htmlFor="converse">Converse</label>
      </div>
      <div className={classes.input}>
        <input type="checkbox" id="new-balance" />
        <label htmlFor="new-balance">New Balance</label>
      </div>
      <div className={classes.input}>
        <input type="checkbox" id="vans" />
        <label htmlFor="vans">Vans</label>
      </div>
    </fieldset>
  );
}

export default Brands;
