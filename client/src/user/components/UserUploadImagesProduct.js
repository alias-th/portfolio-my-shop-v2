import { useState, useEffect } from "react";
import classes from "./UserUploadImagesProduct.module.css";

function UserUploadImagesProduct(props) {
  const [{ imageOne, imageTwo, imageThree }, setImgName] = useState({
    imageOne: "",
    imageTwo: "",
    imageThree: "",
  });

  useEffect(() => {
    setImgName({
      imageOne: props.imagesValue[0],
      imageTwo: props.imagesValue[1],
      imageThree: props.imagesValue[2],
    });
  }, [props.imagesValue]);

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
            {!props.imagesHasError && (
              <>
                <p>{imageOne ? imageOne.name : ""}</p>
                <p>{imageTwo ? imageTwo.name : ""}</p>
                <p>{imageThree ? imageThree.name : ""}</p>
              </>
            )}
            {props.imagesHasError && <p>You must upload 3 images</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUploadImagesProduct;
