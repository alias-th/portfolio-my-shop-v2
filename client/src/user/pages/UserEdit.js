import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserEdit.module.css";

import UserUploadPhoto from "../components/UserUploadPhoto";

import Input from "../../shared/components/FormElements/Input";

import useInput from "../../shared/hooks/use-input";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserEdit(props) {
  const {
    value: photoValue,
    isValid: photoIsValid,
    hasError: photoHasError,
    photoChangeHandler: photoChangeHandler,
    inputBlurHandler: photoBlurHandler,
    reset: resetPhoto,
  } = useInput((value) => value.length === 0);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    photoChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.length === 0 || value.length > 100);

  let formIsValid;
  if (photoIsValid && nameIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {};
  return (
    <ProfileCard className={classes["content-layout"]}>
      <form>
        <p className="heading-style-1">Edit Your Profile</p>
        <hr />
        {props.currentUser ? (
          <UserUploadPhoto
            photoValue={photoValue}
            photoChangeHandler={photoChangeHandler}
            photoBlurHandler={photoBlurHandler}
            currentUser={props.currentUser}
          />
        ) : (
          <div className={`${classes.item} ${classes.alignItemCenter}`}>
            <LoadingSpinner />
          </div>
        )}
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
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
            label="Phone numbers"
            input={{
              id: "phone-numbers-input",
              className: classes["input-custom__input"],
            }}
            classes={classes["input-custom__container"]}
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>Gender</p>
          </div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <Input
              label="Female"
              input={{
                id: "radio-Female",
                type: "radio",
                name: "gender",
                value: "female",
              }}
              classes={classes["input-radio__container"]}
            />
            <Input
              label="Male"
              input={{
                id: "radio-Male",
                type: "radio",
                name: "gender",
                value: "male",
              }}
              classes={classes["input-radio__container"]}
            />
            <Input
              label="Not Say"
              input={{
                id: "radio-not-say",
                type: "radio",
                name: "gender",
                value: "not-say",
              }}
              classes={classes["input-radio__container"]}
            />
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
            label="Birth Day"
            input={{
              id: "birth-day-input",
              type: "date",
              className: classes["input-custom__input"],
            }}
            classes={classes["input-custom__container"]}
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}></div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <Button inverse>Save Changes</Button>
          </div>
        </div>
      </form>
    </ProfileCard>
  );
}
export default UserEdit;
