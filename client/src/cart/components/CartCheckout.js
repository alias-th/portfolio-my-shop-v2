import Button from "../../shared/components/FormElements/Button";

import classes from "./CartCheckout.module.css";

function CartCheckout() {
  return (
    <form className={classes["form-layout-flex-1"]}>
      <div className={classes["form-layout-flex-2"]}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name"></input>
      </div>
      <div className={classes["form-layout-flex-2"]}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email"></input>
      </div>
      <div className={classes["form-layout-flex-2"]}>
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone"></input>
      </div>
      <div className={classes["form-layout-flex-2"]}>
        <label htmlFor="address">address</label>
        <textarea type="text" id="address"></textarea>
      </div>
      <div className={classes["form-layout-flex-2"]}>
        <label htmlFor="postal">postal</label>
        <input type="text" id="postal"></input>
      </div>
      <div className={classes["form-actions"]}>
        <Button danger>Cancel</Button>
        <Button inverse>Confirm</Button>
      </div>
    </form>
  );
}

export default CartCheckout;
