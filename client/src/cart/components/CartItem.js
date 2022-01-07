import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./CartItem.module.css";
import thaiCurrency from "../../shared/helper/thaiCurrency";

const CartItem = (props) => {
  return (
    <li>
      <ProfileCard className={classes["content-layout-1"]}>
        <div className={classes["content-layout-2"]}>
          <img
            src={`/uploads/images/products/${props.imageCover}`}
            alt={props.name}
            className={classes.img}
          />
          <p>{props.name}</p>
          <p>X {props.quantity}</p>
          <p>{thaiCurrency(props.price)} THB</p>
        </div>
        <div className={classes["margin-button"]}>
          <Button danger type="button" onClick={props.onDeleteToCartHandler}>
            -
          </Button>
          <Button inverse type="button" onClick={props.onAddToCartHandler}>
            +
          </Button>
        </div>
      </ProfileCard>
    </li>
  );
};

export default CartItem;
