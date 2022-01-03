import { useState, useEffect } from "react";
import classes from "./UserUploadImagesProduct.module.css";

function UserUploadImagesProduct(props) {
  const [{ imageOne, imageTwo, imageThree }, setImgName] = useState({
    imageOne: props.currentImages ? props.currentImages[0] : "",
    imageTwo: props.currentImages ? props.currentImages[1] : "",
    imageThree: props.currentImages ? props.currentImages[2] : "",
  });

  useEffect(() => {
    if (!props.currentImages) {
      setImgName({
        imageOne: props.imagesValue[0],
        imageTwo: props.imagesValue[1],
        imageThree: props.imagesValue[2],
      });
    }
  }, [props.imagesValue, props.currentImages]);

  return (
    <div className={classes.item}>
      <div className={classes.itemName}>
        <p>{props.title}</p>
      </div>
      <div className={classes["form__img-input-container"]}>
        <input
          type="file"
          accept=".jpg, .jpeg"
          className={classes["visually-hidden"]}
          id="images"
          onChange={props.imagesChangeHandler}
          onBlur={props.imagesBlurHandler}
          ref={props.imagesInputRef}
          multiple
        />

        <div className={classes["form__img-container"]}>
          <div className={classes["form__img-container--upload"]}>
            <label htmlFor="images" className={classes["form-img__file-label"]}>
              <p> Upload 3 Images </p>
            </label>
            <p>
              Must be a .jpg or a .jpeg file smaller than 10 mb and at least
              200px by 200px
            </p>
          </div>
          <div className={classes["form__img-container--upload"]}>
            {!props.imagesHasError &&
              (!props.currentImages ? (
                <>
                  <p>{imageOne ? imageOne.name : ""}</p>
                  <p>{imageTwo ? imageTwo.name : ""}</p>
                  <p>{imageThree ? imageThree.name : ""}</p>
                </>
              ) : (
                <>
                  <p>{imageOne ? imageOne : ""}</p>
                  <p>{imageTwo ? imageTwo : ""}</p>
                  <p>{imageThree ? imageThree : ""}</p>
                </>
              ))}
            {props.imagesHasError && (
              <p
                style={{
                  color: "red",
                }}
              >
                You must upload 3 images
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUploadImagesProduct;
