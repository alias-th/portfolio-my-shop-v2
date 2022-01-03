import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

import UserUploadPhoto from "../components/UserUploadPhoto";
import UserUploadImagesProduct from "../components/UserUploadImagesProduct";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";
import useInput from "../../shared/hooks/use-input";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import useHttp from "../../shared/hooks/use-http";
import { getProductWithId, updateProduct } from "../../shared/lib/api";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import classes from "./UserProductsEdit.module.css";

function UserProductsEdit() {
  const { productId } = useParams();

  const { sendRequest: getProductWithIdRequest, data: product } =
    useHttp(getProductWithId);

  const { sendRequest: updateProductWithRequest } = useHttp(
    updateProduct,
    true, //notification
    "Updated your product successfully",
    false // reload
  );

  useEffect(() => {
    getProductWithIdRequest(productId);
  }, [getProductWithIdRequest, productId]);

  const [formIsValid, setFormIsValid] = useState(false);

  const imagesInputRef = useRef();
  const photoInputRef = useRef();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();
  const priceInputRef = useRef();
  const bandInputRef = useRef();

  const {
    value: photoValue,
    photoChangeHandler,
    inputBlurHandler: photoBlurHandler,
    reset: resetPhoto,
    hasError: photoHasError,
  } = useInput((value) => {}, false);

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
  } = useInput(
    (value) => value.length > 0,
    true,
    product && product.data.data.name
  );

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(
    (value) => value.length > 0,
    true,
    product && product.data.data.description
  );

  const {
    value: quantityValue,

    hasError: quantityHasError,
    valueChangeHandler: quantityChangeHandler,
    inputBlurHandler: quantityBlurHandler,
    reset: resetQuantity,
  } = useInput(
    (value) => value.length > 0,
    false,
    product && product.data.data.quantity
  );

  const {
    value: priceValue,

    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(
    (value) => value.length > 0,
    false,
    product && product.data.data.price
  );

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
        imagesIsValid && nameIsValid && descriptionIsValid && bandIsValid
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [imagesIsValid, nameIsValid, descriptionIsValid, bandIsValid]);

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

    const form = new FormData();
    form.append("name", enteredName);
    form.append("description", enteredDescription);
    form.append("quantity", enteredQuantity);
    form.append("price", enteredPrice);
    form.append("imageCover", enteredImageCover);
    form.append("images", imagesInputRef.current.files[0]);
    form.append("images", imagesInputRef.current.files[1]);
    form.append("images", imagesInputRef.current.files[2]);

    form.append("categories", enteredBand);

    updateProductWithRequest(product.data.data._id, form);

    resetPhoto();
    resetImages();
    resetName();
    resetDescription();
    resetQuantity();
    resetPrice();
    resetBand();

    window.scrollTo(0, 0);
  };

  if (product) {
    return (
      <ProfileCard className={classes["content-layout"]}>
        <p className="heading-style-1">Edit Your Product</p>
        <hr />
        <form onSubmit={formSubmitHandler}>
          <UserUploadPhoto
            title="Image cover"
            photoValue={photoValue}
            photoChangeHandler={photoChangeHandler}
            photoBlurHandler={photoBlurHandler}
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
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </ProfileCard>
    );
  }

  return (
    <div>
      <LoadingSpinner centered />
    </div>
  );
}

export default UserProductsEdit;
