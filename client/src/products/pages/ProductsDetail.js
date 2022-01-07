import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductDescription from "../components/ProductsDescription";

import ProductsAddReview from "../components/ProductsAddReview";

import ProductReviewsList from "../components/ProductReviewsList";

import ProductImagesSlider from "../components/ProductImagesSlider";

import classes from "./ProductsDetail.module.css";

import axios from "axios";

import ProductsUpdateReview from "../components/ProductsUpdateReview";

import { CSSTransition } from "react-transition-group";

function DetailProduct() {
  const nodeRef = useRef(null);

  const [showFormEdit, setShowFormEdit] = useState(false);

  const [stateReviewsItem, stateSetReviewsItem] = useState([]);

  const [items, setItems] = useState([]);

  const [product, setProduct] = useState({});

  const { productId } = useParams();

  const user = useSelector((state) => state.auth.user);

  // get review on product
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

        if (err.response) {
          console.log(err.message);
        }
      });

    return () => {
      source.cancel();
    };
  }, [productId]);

  // get products
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`/api/v1/products/${productId}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        // console.log(res);
        const handleDragStart = (e) => e.preventDefault();
        setItems([
          <img
            src={`/uploads/images/products/${res.data.data.images[0]}`}
            onDragStart={handleDragStart}
            className={classes["size-image"]}
            alt={res.data.data.name}
          />,
          <img
            src={`/uploads/images/products/${res.data.data.images[1]}`}
            onDragStart={handleDragStart}
            className={classes["size-image"]}
            alt={res.data.data.name}
          />,
          <img
            src={`/uploads/images/products/${res.data.data.images[2]}`}
            onDragStart={handleDragStart}
            className={classes["size-image"]}
            alt={res.data.data.name}
          />,
        ]);

        setProduct(res.data.data);
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

  const onClickShowFormEditHandler = () => {
    setShowFormEdit((prev) => !prev);
  };

  const onClickHideFormEditHandler = () => {
    setShowFormEdit((prev) => !prev);
  };

  return (
    <div className={classes["detail-layout-1"]}>
      <div className={classes["detail__container"]}>
        <ProductImagesSlider productId={productId} items={items} />
        <div className={classes["reviews-layout-1"]}>
          {user && !haveReview && <ProductsAddReview productId={productId} />}
          <CSSTransition
            nodeRef={nodeRef}
            in={showFormEdit}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            <ProductsUpdateReview
              ref={nodeRef}
              reviewItems={stateReviewsItem}
              onClickHideFormEditHandler={onClickHideFormEditHandler}
            />
          </CSSTransition>
          <ProductReviewsList
            reviewItems={stateReviewsItem}
            onClickShowFormEditHandler={onClickShowFormEditHandler}
          />
        </div>
      </div>
      <ProductDescription product={product} />
    </div>
  );
}

export default DetailProduct;
