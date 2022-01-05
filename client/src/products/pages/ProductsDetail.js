import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductDescription from "../components/ProductsDescription";

import ProductsAddReview from "../components/ProductsAddReview";

import ProductReviewsList from "../components/ProductReviewsList";

import classes from "./ProductsDetail.module.css";

import axios from "axios";

function DetailProduct() {
  const [stateReviewsItem, stateSetReviewsItem] = useState([]);

  const { productId } = useParams();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`/api/v1/products/${productId}/reviews`, {
        cancelToken: source.token,
      })
      .then((res) => {
        // console.log(res);
        stateSetReviewsItem(res);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });

    return () => {
      source.cancel();
    };
  }, [productId]);

  let haveReview = false;
  if (stateReviewsItem.data && user) {
    stateReviewsItem.data.data.reviews.forEach((review) => {
      if (user.name === review.user.name) {
        haveReview = true;
      }
    });
  }

  return (
    <div className={classes["detail-layout-1"]}>
      <div className={classes["detail__container"]}>
        <img
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80"
          alt="nike"
          className={classes.img}
        />
        <div className={classes["reviews-layout-1"]}>
          {user && !haveReview && <ProductsAddReview productId={productId} />}
          <ProductReviewsList reviewItems={stateReviewsItem} />
        </div>
      </div>
      <ProductDescription />
    </div>
  );
}

export default DetailProduct;
