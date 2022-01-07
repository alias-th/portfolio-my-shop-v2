import ProductsList from "../components/ProductsList";
import MainFilter from "../../shared/components/Filter/MainFilter";

import classes from "./Products.module.css";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`/api/v1/products/${location.search}`, { cancelToken: source.token })
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
  }, [location]);

  if (allProducts.length === 0) {
    return (
      <div className="centered">
        <LoadingSpinner />;
      </div>
    );
  }

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
