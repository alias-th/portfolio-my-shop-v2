import classes from "./Brands.module.css";
import { useNavigate } from "react-router-dom";

function Brands() {
  const navigate = useNavigate();

  const onChangeValue = (e) => {
    navigate({
      search: "?bands=" + e.target.value,
    });
  };

  const onClickReset = (e) => {
    navigate({
      search: "",
    });
  };

  return (
    <fieldset
      className={classes.fieldset}
      name="bands"
      onChange={onChangeValue}
    >
      <legend>Brands</legend>
      <hr />

      <div className={classes.input}>
        <input type="radio" id="nike" name="bands" value="nike" />
        <label htmlFor="nike">Nike</label>
      </div>

      <div className={classes.input}>
        <input type="radio" id="converse" name="bands" value="converse" />
        <label htmlFor="converse">Converse</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="new-balance" name="bands" value="new-balance" />
        <label htmlFor="new-balance">New Balance</label>
      </div>
      <div className={classes.input}>
        <input type="radio" id="vans" name="bands" value="vans" />
        <label htmlFor="vans">Vans</label>
      </div>
      <button type="reset" onClick={onClickReset}>
        reset
      </button>
    </fieldset>
  );
}

export default Brands;
