import ProductsList from "../components/ProductsList";
import MainFilter from "../../shared/components/Filter/MainFilter";

import classes from "./Products.module.css";
import useHttp from "../../shared/hooks/use-http";
import { getAllProducts } from "../../shared/lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function Products() {
  const { sendRequest, data } = useHttp(getAllProducts);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (data) {
    return (
      <>
        <MainFilter />
        <div className={classes.product}>
          <ProductsList products={data.data.data.products} />
        </div>
      </>
    );
  }

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
}

export default Products;
