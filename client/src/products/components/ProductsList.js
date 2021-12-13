import ProductsItem from "./ProductsItem";

import classes from "./ProductsList.module.css";

function ProductsList(props) {
  return (
    <ul className={classes.grid}>
      {props.products.map((product) => (
        <ProductsItem
          key={product.id}
          id={product.id}
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
