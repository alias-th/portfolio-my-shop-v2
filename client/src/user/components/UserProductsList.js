import { useEffect, useState } from "react";

import axios from "axios";

import classes from "./UserProductsList.module.css";

import UserProductItem from "./UserProductItem";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserProductsList() {
  const [yourProducts, setYourProducts] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get("/api/v1/products/seller", { cancelToken: source.token })
      .then((res) => {
        // console.log(res);
        setYourProducts(res.data.data);
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
  }, []);

  // console.log(yourProducts);

  if (yourProducts.length === 0) {
    return (
      <div className="centered">
        <LoadingSpinner />;
      </div>
    );
  }

  if (yourProducts) {
    return yourProducts.map((product) => {
      return (
        <UserProductItem
          key={product._id}
          imageCover={product.imageCover}
          name={product.name}
          quantity={product.quantity}
          id={product._id}
        />
      );
    });
  }

  return (
    <div className={classes["product__not-found"]}>
      <p>There is no product!</p>
    </div>
  );
}

export default UserProductsList;
