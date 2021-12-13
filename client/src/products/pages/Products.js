import ProductsList from "../components/ProductsList";

import classes from "./Products.module.css";

const DUMMY_PRODUCT = [
  {
    id: "p1",
    imageCover:
      "https://images.unsplash.com/photo-1639380540776-1a8c1376b26d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    name: "Product-1",
    description: "Some description",
    price: 1000,
  },
  {
    id: "p2",
    imageCover:
      "https://images.unsplash.com/photo-1639380540776-1a8c1376b26d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    name: "Product-2",
    description: "Some description",
    price: 2000,
  },
  {
    id: "p3",
    imageCover:
      "https://images.unsplash.com/photo-1639380540776-1a8c1376b26d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    name: "Product-3",
    description: "Some description",
    price: 3000,
  },
];

function Products() {
  return (
    <div className={classes.product}>
      <ProductsList products={DUMMY_PRODUCT} />
    </div>
  );
}

export default Products;
