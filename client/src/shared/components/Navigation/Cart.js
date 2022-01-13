import classes from "./Cart.module.css";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Cart(props) {
  const [iconPlay, setIconPlay] = useState(false);

  const { totalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    if (totalQuantity === 0) {
      return;
    }

    setIconPlay(true);

    const timer = setTimeout(() => {
      setIconPlay(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalQuantity]);

  const iconClass = `${iconPlay ? classes.bump : ""}`;

  const styledContainer =
    props.isNotActive === false
      ? `${classes["display-cart"]}`
      : `${classes["cart"]}`;

  return (
    <div className={styledContainer} onClick={props.onShowCart}>
      <AiOutlineShoppingCart
        style={{
          fontSize: "2.5rem",
        }}
        className={iconClass}
      />
      <span className={classes["cart-num"]}>{totalQuantity}</span>
    </div>
  );
}

export default Cart;
