import classes from "./Cart.module.css";

import { AiOutlineShoppingCart } from "react-icons/ai";

function Cart(props) {
  return (
    <div className={classes["cart"]} onClick={props.onShowCart}>
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
