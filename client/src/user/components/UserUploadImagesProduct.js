import { useState, useEffect } from "react";
import classes from "./UserUploadImagesProduct.module.css";

function UserUploadImagesProduct(props) {
  const [{ alt, src }, setImg] = useState({
    src: `/uploads/images/${props.currentPhoto}`,
    alt: "Upload an Image",
  });

  useEffect(() => {
    if (props.photoValue) {
      setImg({
        src: URL.createObjectURL(props.photoValue),
        alt: props.photoValue.name,
      });
    }
  }, [props.photoValue]);

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
          id="photo"
          onChange={props.photoChangeHandler}
          ref={props.photoInputRef}
        />
        <div className={classes["form__img-container"]}>
          <div className={classes["form__img-container--upload"]}>
            <label htmlFor="photo" className={classes["form-img__file-label"]}>
              <p> Upload Image 1</p>
            </label>
            <label htmlFor="photo" className={classes["form-img__file-label"]}>
              <p> Upload Image 2</p>
            </label>
            <label htmlFor="photo" className={classes["form-img__file-label"]}>
              <p> Upload Image 3</p>
            </label>
            <p>
              Must be a .jpg file smaller than 10 mb and at least 200px by 200px
            </p>
          </div>
          <div className={classes["form__img-container--upload"]}>
            <p className="padding-1">File 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUploadImagesProduct;
