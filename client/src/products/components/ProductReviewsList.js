import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import classes from "./ProductReviewsList.module.css";

import ProductsReviewsItem from "./ProductsReviewsItem";

function ProductReviewsList(props) {
  // console.log(props.reviewItems.data);
  return (
    <ul className={classes["review-list__container"]}>
      {props.reviewItems.data ? (
        props.reviewItems.data.data.reviews.map((review) => (
          <ProductsReviewsItem
            key={review._id}
            photo={review.user.photo}
            userName={review.user.name}
            createdAt={review.createdAt}
            rating={review.rating}
            review={review.review}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </ul>
  );
}

export default ProductReviewsList;
