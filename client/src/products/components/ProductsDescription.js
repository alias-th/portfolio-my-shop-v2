import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import classes from "./ProductsDescription.module.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../shared/store/cart-slice";
import thaiCurrency from "../../shared/helper/thaiCurrency";

function ProductDescription(props) {
  // console.log(props.product);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const colorRef = useRef();
  const sizeRef = useRef();

  const quantityChangeHandler = (e) => {
    setQuantity(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredColor = colorRef.current.value;
    const enteredSize = sizeRef.current.value;

    dispatch(
      cartSliceActions.addItemToCart({
        productId: props.product._id,
        name: props.product.name,
        price: props.product.price,
        imageCover: props.product.imageCover,
        sellerId: props.product.seller.id,
        color: enteredColor,
        size: enteredSize,
        quantity: quantity,
      })
    );
  };
  if (!props.product.name) {
    return <div></div>;
  }
  return (
    <Card className={classes["desc-layout-1"]}>
      <p className="heading-style-1">{props.product.name}</p>
      <p className="heading-style-2">{thaiCurrency(props.product.price)} THB</p>
      <form className={classes["desc-form"]} onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="select-color">Primary color</label>
          <select name="colors" id="select-color" ref={colorRef}>
            <option value="red">Red</option>
            <option value="White">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div>
          <label htmlFor="select-size">Size</label>
          <select name="sizes" id="select-size" ref={sizeRef}>
            <option value="42EUR">42 EUR</option>
            <option value="45EUR">45 EUR</option>
            <option value="47EUR">47 EUR</option>
          </select>
        </div>
        <div>
          <label htmlFor="select-quantity">Quantity</label>
          <input
            type="number"
            id="select-quantity"
            defaultValue={quantity}
            onChange={quantityChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <p id="description" className="font-weight-300">
            {props.product.description}
          </p>
        </div>
        <hr />
        <Button inverse type="submit">
          Add to Cart
        </Button>
      </form>
    </Card>
  );
}

export default ProductDescription;
