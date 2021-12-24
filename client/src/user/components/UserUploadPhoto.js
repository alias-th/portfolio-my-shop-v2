import { useState, useEffect } from "react";
import classes from "../pages/UserEdit.module.css";

function UserUploadPhoto(props) {
  const [{ alt, src }, setImg] = useState({
    src: `/uploads/images/${props.currentUser.photo}`,
    alt: "Upload an Image",
  });

  useEffect(() => {
    console.log("this run");
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
        <p>Profile Picture</p>
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
          <label htmlFor="photo" className={classes["form-img__file-label"]}>
            <svg
              width="200"
              height="200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#56ceef"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
              <circle cx="12" cy="10" r="3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Upload
          </label>
          <p>Preview</p>
          <img
            src={src}
            alt={alt}
            className={classes["form-img__img-preview"]}
          />
        </div>
        <p>
          Must be a .jpg file smaller than 10 mb and at least 100px by 100px
        </p>
      </div>
    </div>
  );
}

export default UserUploadPhoto;
