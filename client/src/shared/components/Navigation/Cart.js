import classes from "./Cart.module.css";

import { AiOutlineShoppingCart } from "react-icons/ai";

function Cart() {
  return (
    <div className={classes["cart"]}>
      <AiOutlineShoppingCart
        style={{
          fontSize: "2.5rem",
        }}
      />
      <span className={classes["cart-num"]}>0</span>
    </div>
  );
}

export default Cart;
