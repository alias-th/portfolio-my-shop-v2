import { useState } from "react";

import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import ProductsRate from "./ProductsRate";

import classes from "./ProductsAddReview.module.css";

function ProductsAddReview() {
  const [rating, setRating] = useState(0);

  console.log(rating);
  return (
    <Card>
      <div className={classes["add-review__container"]}>
        <label htmlFor="review" className={classes["add-review__label"]}>
          Review
        </label>
        <textarea id="review" name="review" rows="10" cols="50" />
        <div className={classes["add-review__star"]}>
          <ProductsRate rating={rating} onRating={(rate) => setRating(rate)} />
          <p>{rating}</p>
        </div>
        <div>
          <Button inverse>Add</Button>
        </div>
      </div>
    </Card>
  );
}

export default ProductsAddReview;
