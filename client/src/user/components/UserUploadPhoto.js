import { useState, useEffect } from "react";
import classes from "./UserUploadPhoto.module.css";

function UserUploadPhoto(props) {
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
              <p> Upload</p>
              <img
                src="/uploads/images/upload.png"
                alt="upload"
                style={{
                  width: "200px",
                  height: "200px",

                  borderRadius: "50%",
                }}
              />
              <p>
                Must be a .jpg file smaller than 10 mb and at least 200px by
                200px
              </p>
            </label>
          </div>
          <div className={classes["form__img-container--upload"]}>
            <p>Preview</p>
            <img
              src={src}
              alt={alt}
              className={classes["form-img__img-preview"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUploadPhoto;
