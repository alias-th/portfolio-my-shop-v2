import ProductsList from "../components/ProductsList";
import MainFilter from "../../shared/components/Filter/MainFilter";

import classes from "./Products.module.css";

import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get("/api/v1/products/", { cancelToken: source.token })
      .then((res) => {
        setAllProducts(res.data.data.products);
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

  return (
    <>
      <MainFilter />
      <div className={classes.product}>
        <ProductsList allProducts={allProducts} />
      </div>
    </>
  );
}

export default Products;
