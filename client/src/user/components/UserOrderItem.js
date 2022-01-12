import classes from "./UserOrderItem.module.css";

function UserOrderItem(props) {
  return (
    <li>
      <div className={classes["list__container"]}>
        <p className={classes["label"]}>{props.transaction}</p>
        <div className={classes["list__content"]}>
          <img
            src={`/uploads/images/products/${props.imageCover}`}
            alt="shoes"
            className={classes.img}
          />
          <p>{props.name}</p>
          <p>X {props.quantity}</p>
          <p>{props.price}</p>
          <p>{props.status}</p>
        </div>
      </div>
    </li>
  );
}

export default UserOrderItem;
