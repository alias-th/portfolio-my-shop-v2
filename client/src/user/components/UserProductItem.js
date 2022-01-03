import Button from "../../shared/components/FormElements/Button";

import classes from "./UserProductItem.module.css";

function UserProductItem(props) {
  return (
    <li key={props._id}>
      <div className={classes["list__container"]}>
        <div className={classes["list__content"]}>
          <img
            src={`/uploads/images/products/${props.imageCover}`}
            alt="shoes"
            className={classes.img}
          />
          <p>{props.name}</p>
          <p>X {props.quantity}</p>
        </div>
        <div className={classes["container__button"]}>
          <Button inverse>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </div>
    </li>
  );
}

export default UserProductItem;
