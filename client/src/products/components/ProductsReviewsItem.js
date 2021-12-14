import Card from "../../shared/components/UIElements/Card";

import classes from "./ProductsReviewsItem.module.css";

function ReviewsItem() {
  return (
    <Card>
      <div className={classes["review-layout-1"]}>
        <img
          src="https://images.unsplash.com/photo-1639346865167-47a6c8cdc5f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="user-1"
          className={classes["review-img"]}
        />
        <div className={classes["review-layout-2"]}>
          <p>monton Oct 17, 2021</p>
          <p>4.5</p>
          <p className={classes["review-description"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ReviewsItem;
