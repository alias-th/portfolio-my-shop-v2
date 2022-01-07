import { useEffect, useState } from "react";

import ProductsItem from "./ProductsItem";

import classes from "./ProductsList.module.css";

function ProductsList(props) {
  const [allProducts, setAllProducts] = useState([]);
  // console.log(props.AllProducts.data);

  useEffect(() => {
    if (props.allProducts) {
      setAllProducts(props.allProducts);
    }
  }, [props.allProducts]);

  return (
    <ul className={classes.grid}>
      {allProducts.map((product) => (
        <ProductsItem
          key={product._id}
          id={product._id}
          imageCover={product.imageCover}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
