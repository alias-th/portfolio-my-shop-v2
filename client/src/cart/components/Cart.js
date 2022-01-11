import { useState } from "react";

import Modal from "../../shared/components/UIElements/Modal";

import Button from "../../shared/components/FormElements/Button";

import CartItem from "./CartItem";

import CartCheckout from "./CartCheckout";

import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../../shared/store/cart-slice";
import thaiCurrency from "../../shared/helper/thaiCurrency";

import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [isCheckout, setIsCheckout] = useState(false);

  const isCheckoutHandler = () => {
    setIsCheckout(true);
  };

  // console.log(cart);

  const onAddToCartHandler = (item) => {
    dispatch(cartSliceActions.addItemToCart(item));
  };

  const onDeleteToCartHandler = (productId) => {
    dispatch(cartSliceActions.removeFormCart(productId));
  };

  const onClickNavigateToLogin = () => {
    navigate("/auth", { replace: true });
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose} cartIsShown={props.cartIsShown}>
      <p className="heading-style-1"> Your Cart</p>
      <ul>
        {cart.totalQuantity === 0 && <p>There are no products </p>}
        {cart.items.map((item) => (
          <CartItem
            key={item.productId}
            imageCover={item.imageCover}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onAddToCartHandler={onAddToCartHandler.bind(null, item)}
            onDeleteToCartHandler={onDeleteToCartHandler.bind(
              null,
              item.productId
            )}
          />
        ))}
      </ul>
      <hr />
      <div className={classes["total-amount"]}>
        <p className="heading-style-1">Total Amount</p>
        <p className="heading-style-2">{thaiCurrency(cart.totalAmount)} THB</p>
      </div>
      {isCheckout && user && <CartCheckout />}
      {isCheckout && !user && (
        <div className={classes["must-login"]}>
          <p>You must login before Checkout</p>
          <Button type="button" onClick={onClickNavigateToLogin}>
            Login
          </Button>
        </div>
      )}
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
