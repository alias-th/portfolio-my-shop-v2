import { useEffect, useRef, useState } from "react";

// import { useNavigate } from "react-router-dom";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import UserUploadPhoto from "../components/UserUploadPhoto";

import UserUploadImagesProduct from "../components/UserUploadImagesProduct";

import useInput from "../../shared/hooks/use-input";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import useHttp from "../../shared/hooks/use-http";
import { createProduct } from "../../shared/lib/api";

import classes from "./UserAddProduct.module.css";

function UserAddProduct(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const imagesInputRef = useRef();
  const photoInputRef = useRef();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();
  const priceInputRef = useRef();
  const bandInputRef = useRef();

  const { sendRequest: createNewProduct } = useHttp(
    createProduct,
    true, //notification
    "Created your product successfully",
    true // reload
  );

  const {
    value: photoValue,
    photoChangeHandler,
    inputBlurHandler: photoBlurHandler,
    reset: resetPhoto,
    hasError: photoHasError,
    isValid: photoIsValid,
  } = useInput((value) => value !== null, true);

  const {
    value: imagesValue,
    imagesChangeHandler,
    inputBlurHandler: imagesBlurHandler,
    reset: resetImages,
    hasError: imagesHasError,
    isValid: imagesIsValid,
  } = useInput((value) => value.length >= 3 && value.length <= 3, true);

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
    value: bandValue,
    isValid: bandIsValid,
    hasError: bandHasError,
    valueChangeHandler: bandChangeHandler,
    inputBlurHandler: bandBlurHandler,
    reset: resetBand,
  } = useInput((value) => value.length > 0, true, "nike");

  // debounce and cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        photoIsValid &&
          imagesIsValid &&
          nameIsValid &&
          descriptionIsValid &&
          quantityIsValid &&
          priceIsValid &&
          bandIsValid
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    photoIsValid,
    imagesIsValid,
    nameIsValid,
    descriptionIsValid,
    quantityIsValid,
    priceIsValid,
    bandIsValid,
  ]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const enteredImageCover = photoInputRef.current.files[0];
    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredBand = bandInputRef.current.value;
    const enteredSeller = props.currentUser._id;

    const form = new FormData();
    form.append("name", enteredName);
    form.append("description", enteredDescription);
    form.append("quantity", enteredQuantity);
    form.append("price", enteredPrice);
    form.append("imageCover", enteredImageCover);
    form.append("images", imagesInputRef.current.files[0]);
    form.append("images", imagesInputRef.current.files[1]);
    form.append("images", imagesInputRef.current.files[2]);
    form.append("seller", enteredSeller);
    form.append("bands", enteredBand);

    createNewProduct(form);

    resetPhoto();
    resetImages();
    resetName();
    resetDescription();
    resetQuantity();
    resetPrice();
    resetBand();

    window.scrollTo(0, 0);
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
          photoBlurHandler={photoBlurHandler}
          currentPhoto="no-image.jpg"
          photoInputRef={photoInputRef}
          photoHasError={photoHasError}
          categories="products"
        />
        <UserUploadImagesProduct
          imagesValue={imagesValue}
          title="Images product"
          imagesChangeHandler={imagesChangeHandler}
          imagesInputRef={imagesInputRef}
          imagesHasError={imagesHasError}
          imagesBlurHandler={imagesBlurHandler}
        />
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
              min: "1",
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
            ref={bandInputRef}
            label="band"
            input={{
              type: "selector",
              id: "band-input",
              value: bandValue,
              onChange: bandChangeHandler,
              onBlur: bandBlurHandler,
              className: classes["input-custom__input"],
            }}
            hasError={bandHasError}
            classes={classes["input-custom__container"]}
            options={
              <>
                <option value="nike">Nike</option>
                <option value="converse">Converse</option>
                <option value="new-balance">New Balance</option>
                <option value="vans">Vans</option>
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
