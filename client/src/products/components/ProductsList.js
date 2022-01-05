import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProductsItem from "./ProductsItem";

import classes from "./ProductsList.module.css";

function ProductsList(props) {
  // console.log(props.AllProducts.data);
  return (
    <ul className={classes.grid}>
      {props.AllProducts.data ? (
        props.AllProducts.data.data.products.map((product) => (
          <ProductsItem
            key={product._id}
            id={product._id}
            imageCover={product.imageCover}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </ul>
  );
}

export default ProductsList;
