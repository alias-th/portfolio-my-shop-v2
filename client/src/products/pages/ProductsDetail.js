import ReviewsItem from "../components/ProductsReviewsItem";

import ProductDescription from "../components/ProductsDescription";

import classes from "./ProductsDetail.module.css";

function DetailProduct() {
  return (
    <div className={classes["detail-layout-1"]}>
      <div className={classes.img}>
        <img
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80"
          alt="nike"
        />
      </div>
      <div className={classes["detail-layout-2"]}>
        <div className={classes["reviews-layout-1"]}>
          <p>10 reviews</p>
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
        </div>
        <ProductDescription />
      </div>
    </div>
  );
}

export default DetailProduct;
