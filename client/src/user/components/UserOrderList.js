import { useEffect, useState } from "react";

import axios from "axios";

import classes from "./UserProductsList.module.css";

import UserOrderItem from "./UserOrderItem";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserOrderList() {
  const [yourOrder, setYourOrder] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get("/api/v1/orders/user", { cancelToken: source.token })
      .then((res) => {
        // console.log(res);
        setYourOrder(res.data.data);
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

  if (yourOrder.length === 0) {
    return (
      <div className={classes["product__not-found"]}>
        <p>There is no order!</p>
      </div>
    );
  }

  if (yourOrder) {
    return yourOrder.map((order) => {
      return (
        <UserOrderItem
          key={order._id}
          imageCover={order.imageCover}
          name={order.name}
          transaction={order.transaction}
          quantity={order.quantity}
          status={order.status}
          price={order.price}
          size={order.size}
          id={order._id}
        />
      );
    });
  }

  return (
    <div className="centered">
      <LoadingSpinner />;
    </div>
  );
}

export default UserOrderList;
