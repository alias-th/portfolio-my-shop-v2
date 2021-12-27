import { useRef } from "react";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import UserUploadPhoto from "../components/UserUploadPhoto";

import UserUploadImagesProduct from "../components/UserUploadImagesProduct";

import useInput from "../../shared/hooks/use-input";

import Input from "../../shared/components/FormElements/Input";

import classes from "./UserAddProduct.module.css";

function UserAddProduct(props) {
  const photoInputRef = useRef();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();

  const {
    value: photoValue,
    photoChangeHandler,
    reset: resetPhoto,
  } = useInput(() => {}, false);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.length > 0, true);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((value) => value.length > 0, true);

  const {
    value: quantityValue,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    valueChangeHandler: quantityChangeHandler,
    inputBlurHandler: quantityBlurHandler,
    reset: resetQuantity,
  } = useInput((value) => value.length > 0, true);

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput((value) => value.length > 0, true);

  const {
    value: categoryValue,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategory,
  } = useInput((value) => value.length > 0, true, "shoes");

  let formIsValid;
  if (
    nameIsValid &&
    descriptionIsValid &&
    quantityIsValid &&
    priceIsValid &&
    categoryIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const enteredPhoto = photoInputRef.current.files[0];
    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredSeller = props.currentUser._id;

    console.log(
      enteredSeller,
      enteredPhoto,
      enteredName,
      enteredDescription,
      enteredQuantity,
      enteredPrice,
      enteredCategory
    );

    resetPhoto();
    resetName();
    resetDescription();
    resetQuantity();
    resetPrice();
    resetCategory();
  };

  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Add Product</p>
      <hr />
      <form onSubmit={formSubmitHandler}>
        <UserUploadPhoto
          title="Image cover"
          photoValue={photoValue}
          photoChangeHandler={photoChangeHandler}
          currentPhoto="no-image.jpg"
          photoInputRef={photoInputRef}
        />
        <UserUploadImagesProduct title="Images product" />
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
            ref={nameInputRef}
            label="Name"
            input={{
              type: "text",
              id: "name-input",
              value: nameValue,
              onChange: nameChangeHandler,
              onBlur: nameBlurHandler,
              className: classes["input-custom__input"],
            }}
            hasError={nameHasError}
            classes={classes["input-custom__container"]}
            errorText="Name must not be empty!"
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
            ref={descriptionInputRef}
            label="Description"
            input={{
              type: "textarea",
              id: "description-input",
              value: descriptionValue,
              onChange: descriptionChangeHandler,
              onBlur: descriptionBlurHandler,
              rows: "4",
              cols: "50",
              className: classes["input-custom__input"],
            }}
            hasError={descriptionHasError}
            classes={classes["input-custom__container"]}
            errorText="The description must not be empty!"
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
            ref={quantityInputRef}
            label="Quantity"
            input={{
              type: "number",
              id: "quantity-input",
              value: quantityValue,
              onChange: quantityChangeHandler,
              onBlur: quantityBlurHandler,
              className: classes["input-custom__input"],
            }}
            hasError={quantityHasError}
            classes={classes["input-custom__container"]}
            errorText="The Quantity must not be empty!"
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
            ref={priceInputRef}
            label="Price (Bath)"
            input={{
              type: "number",
              id: "price-input",
              value: priceValue,
              onChange: priceChangeHandler,
              onBlur: priceBlurHandler,
              className: classes["input-custom__input"],
            }}
            hasError={priceHasError}
            classes={classes["input-custom__container"]}
            errorText="The price must not be empty"
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
            ref={categoryInputRef}
            label="Category"
            input={{
              type: "selector",
              id: "category-input",
              value: categoryValue,
              onChange: categoryChangeHandler,
              onBlur: categoryBlurHandler,
              className: classes["input-custom__input"],
            }}
            hasError={categoryHasError}
            classes={classes["input-custom__container"]}
            options={
              <>
                <option value="shoes">Shoes</option>
                <option value="clothing">Clothing</option>
              </>
            }
          />
        </div>

        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}></div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <Button inverse type="submit" disabled={!formIsValid}>
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </ProfileCard>
  );
}

export default UserAddProduct;
