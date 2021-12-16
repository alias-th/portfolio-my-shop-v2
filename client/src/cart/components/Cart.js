import { useState } from "react";

import Modal from "../../shared/components/UIElements/Modal";

import Button from "../../shared/components/FormElements/Button";

import CartItem from "./CartItem";

import CartCheckout from "./CartCheckout";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const isCheckoutHandler = () => {
    setIsCheckout(true);
  };

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
      {isCheckout && <CartCheckout />}
      {!isCheckout && (
        <div className={classes["total-amount-actions"]}>
          <Button danger onClick={props.onClose}>
            Cancel
          </Button>
          <Button inverse onClick={isCheckoutHandler}>
            Order
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
