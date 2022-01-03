import { useEffect } from "react";

import useHttp from "../../shared/hooks/use-http";

import { getUserProducts } from "../../shared/lib/api";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import classes from "./UserProductsList.module.css";

import UserProductItem from "./UserProductItem";

function UserProductsList() {
  const { sendRequest, data } = useHttp(getUserProducts);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (data) {
    if (data.data.data.length > 0) {
      return data.data.data.map((product) => {
        return (
          <UserProductItem
            key={product._id}
            imageCover={product.imageCover}
            name={product.name}
            quantity={product.quantity}
          />
        );
      });
    } else {
      return (
        <div className={classes["product__not-found"]}>
          <p>There is no product!</p>
        </div>
      );
    }
  }

  if (!data) {
    return (
      <div className={classes["product__not-found"]}>
        <LoadingSpinner />
      </div>
    );
  }
}

export default UserProductsList;
