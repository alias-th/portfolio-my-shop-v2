import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ProductReviewsList.module.css";

import ProductsReviewsItem from "./ProductsReviewsItem";

import sortMyFirstReview from "../../shared/helper/sortMyFirstReview";

function ProductReviewsList(props) {
  const [myReviewFirst, setMyReviewFirst] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (props.reviewItems.data && user) {
      const myReviewFirst = sortMyFirstReview(
        props.reviewItems.data.data.reviews,
        user
      );
      setMyReviewFirst(myReviewFirst);
    } else if (props.reviewItems.data) {
      setMyReviewFirst(props.reviewItems.data.data.reviews);
    }
  }, [props.reviewItems.data, user]);

  return (
    <ul className={classes["review-list__container"]}>
      {myReviewFirst.map((review) => (
        <ProductsReviewsItem
          onClickShowFormEditHandler={props.onClickShowFormEditHandler}
          key={review._id}
          photo={review.user.photo}
          userName={review.user.name}
          createdAt={review.createdAt}
          rating={review.rating}
          review={review.review}
          id={review._id}
        />
      ))}
    </ul>
  );
}

export default ProductReviewsList;
