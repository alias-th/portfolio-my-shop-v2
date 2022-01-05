import { forwardRef, useEffect, useState } from "react";

import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import ProductsRate from "./ProductsRate";

import classes from "./ProductsUpdateReview.module.css";

import useInput from "../../shared/hooks/use-input";
import useHttp from "../../shared/hooks/use-http";

import { updateReviewWithId } from "../../shared/lib/api";
import { useSelector } from "react-redux";
import sortMyReview from "../../shared/helper/sortMyReview";

const ProductsUpdateReview = forwardRef((props, ref) => {
  const [myReview, setMyReview] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (props.reviewItems.data && user) {
      const myReview = sortMyReview(props.reviewItems.data.data.reviews, user);
      setMyReview(myReview[0]);
    }
  }, [props.reviewItems.data, user]);

  const [rating, setRating] = useState(0);

  const { sendRequest } = useHttp(
    updateReviewWithId,
    true,
    "Updated review successfully",
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

    sendRequest(myReview._id, {
      review: textareaValue,
      rating: rating,
    });

    setRating(0);
    textareaReset();
  };

  return (
    <Card ref={ref}>
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
        <div className={classes["container__button"]}>
          <Button inverse type="submit" disabled={!textareaIsValid}>
            Update
          </Button>
          <Button onClick={props.onClickHideFormEditHandler} type="button">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
});

export default ProductsUpdateReview;
