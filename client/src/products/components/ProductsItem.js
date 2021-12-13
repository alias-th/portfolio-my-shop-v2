import Card from "../../shared/components/UIElements/Card";

import classes from "./ProductsItem.module.css";

function ProductsItem(props) {
  return (
    <li>
      <Card className={classes["product-item__content"]}>
        <div className={classes.img}>
          <img src={props.imageCover} alt={props.imageCover}></img>
        </div>
        <p className={classes.title}>{props.name}</p>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{props.price} THB</p>
      </Card>
    </li>
  );
}

export default ProductsItem;
