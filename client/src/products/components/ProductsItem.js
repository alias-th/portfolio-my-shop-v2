import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";

import classes from "./ProductsItem.module.css";

import capitalizeFirstLetter from "../../shared/helper/capitalizeFirstLetter";

function ProductsItem(props) {
  return (
    <li>
      <Link to={`/products/${props.id}`}>
        <Card className={classes["product-item__content"]}>
          <div className={classes.img}>
            <img
              src={`/uploads/images/products/${props.imageCover}`}
              alt={props.imageCover}
            ></img>
          </div>
          <p className={classes.title}>{capitalizeFirstLetter(props.name)}</p>
          <p className={classes.description}>{props.description}</p>
          <p className={classes.price}>{props.price} THB</p>
        </Card>
      </Link>
    </li>
  );
}

export default ProductsItem;
