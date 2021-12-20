import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import classes from "./ProductsDescription.module.css";

function ProductDescription() {
  return (
    <Card className={classes["desc-layout-1"]}>
      <p className="heading-style-1">Some Product</p>
      <p className="heading-style-2">2000 THB</p>
      <form className={classes["desc-form"]}>
        <div>
          <label htmlFor="select-color">Primary color</label>
          <select name="colors" id="select-color">
            <option value="">--Please choose an option--</option>
            <option value="red">Red</option>
            <option value="White">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div>
          <label htmlFor="select-size">Size</label>
          <select name="sizes" id="select-size">
            <option value="">--Please choose an option--</option>
            <option value="red">Red</option>
            <option value="White">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div>
          <label htmlFor="select-quantity">Quantity</label>
          <input type="number" id="select-quantity" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <p id="description" className="font-weight-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate
          </p>
        </div>
        <hr />
        <Button inverse>Add to Cart</Button>
      </form>
    </Card>
  );
}

export default ProductDescription;
