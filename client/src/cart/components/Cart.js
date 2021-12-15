import Modal from "../../shared/components/UIElements/Modal";

import Button from "../../shared/components/FormElements/Button";

import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = (props) => {
  return (
    <Modal onClose={props.onClose} cartIsShown={props.cartIsShown}>
      <p className="heading-style-1"> Your Cart</p>
      <ul>
        <CartItem />
      </ul>
      <hr />
      <div className={classes["total-amount"]}>
        <p className="heading-style-1">Total Amount</p>
        <p className="heading-style-2">1000 THB</p>
      </div>
      <div className={classes["total-amount-btn"]}>
        <Button danger>Cancel</Button>
        <Button inverse>Order</Button>
      </div>
    </Modal>
  );
};

export default Cart;
