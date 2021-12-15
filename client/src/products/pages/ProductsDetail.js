import ProductsReviewsItem from "../components/ProductsReviewsItem";

import ProductDescription from "../components/ProductsDescription";

import classes from "./ProductsDetail.module.css";

function DetailProduct() {
  return (
    <div className={classes["detail-layout-1"]}>
      <img
        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80"
        alt="nike"
        className={classes.img}
      />
      <div className={classes["reviews-layout-1"]}>
        <ProductsReviewsItem />
        <ProductsReviewsItem />
        <ProductsReviewsItem />
        <ProductsReviewsItem />
      </div>
      <ProductDescription />
    </div>
  );
}

export default DetailProduct;
