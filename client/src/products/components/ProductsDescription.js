import Card from "../../shared/components/UIElements/Card";

import classes from "./ProductsDescription.module.css";

function ProductDescription() {
  return (
    <Card className={classes["desc-layout-1"]}>
      <p>Title</p>
      <p>2000 THB</p>
      <form className={classes["desc-form"]}>
        <div>
          <label for="select-color">Primary color</label>
          <select name="colors" id="select-color">
            <option value="">--Please choose an option--</option>
            <option value="red">Red</option>
            <option value="White">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div>
          <label for="select-size">Size</label>
          <select name="sizes" id="select-size">
            <option value="">--Please choose an option--</option>
            <option value="red">Red</option>
            <option value="White">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div>
          <label for="select-quantity">Quantity</label>
          <input type="number" id="select-quantity" />
        </div>
        <div>
          <label for="description">Description</label>
          <p id="description" className="font-weight-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate
          </p>
        </div>
        <hr />
        <button className="button-style-1">Add to Cart</button>
      </form>
    </Card>
  );
}

export default ProductDescription;
