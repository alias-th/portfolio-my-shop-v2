import { useState } from "react";

import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import ProductsRate from "./ProductsRate";

import classes from "./ProductsAddReview.module.css";

import useInput from "../../shared/hooks/use-input";
import useHttp from "../../shared/hooks/use-http";

import { addReview } from "../../shared/lib/api";

function ProductsAddReview(props) {
  const [rating, setRating] = useState(0);

  const { sendRequest } = useHttp(
    addReview,
    true,
    "Added review successfully",
    true
  );

  const {
    value: textareaValue,
    isValid: textareaIsValid,
    hasError: textareaHasError,
    valueChangeHandler: textareaChangeHandler,
    inputBlurHandler: textareaBlurHandler,
    reset: textareaReset,
  } = useInput((value) => value.length > 0, true);

  const reviewFormSubmitHandler = (e) => {
    e.preventDefault();
    if (!textareaIsValid && rating > 0) {
      return;
    }

    sendRequest(props.productId, {
      review: textareaValue,
      rating: rating,
    });

    setRating(0);
    textareaReset();
  };

  return (
    <Card>
      <form
        className={classes["add-review__container"]}
        onSubmit={reviewFormSubmitHandler}
      >
        <label htmlFor="review" className={classes["add-review__label"]}>
          Review
        </label>
        <textarea
          id="review"
          name="review"
          rows="10"
          cols="50"
          onChange={textareaChangeHandler}
          onBlur={textareaBlurHandler}
          value={textareaValue}
        />
        {textareaHasError && <p>Review must not be empty!</p>}

        <div className={classes["add-review__star"]}>
          <ProductsRate rating={rating} onRating={(rate) => setRating(rate)} />
          <p>{rating}</p>
        </div>
        <div>
          <Button inverse type="submit" disabled={!textareaIsValid}>
            Add
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default ProductsAddReview;
