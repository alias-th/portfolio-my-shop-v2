import { useRef } from "react";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserEdit.module.css";

import UserUploadPhoto from "../components/UserUploadPhoto";

import Input from "../../shared/components/FormElements/Input";

import useInput from "../../shared/hooks/use-input";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { updateMe } from "../../shared/lib/api";

import useHttp from "../../shared/hooks/use-http";

function UserEdit(props) {
  // Use Ref
  const photoInputRef = useRef();
  const nameInputRef = useRef();
  const phoneNumInputRef = useRef();
  const genderInputRef = useRef();
  const birthDayInputRef = useRef();

  const { sendRequest } = useHttp(
    updateMe,
    true,
    "Updated your profile successfully"
  );

  // Custom Hooks
  const {
    value: photoValue,
    photoChangeHandler,
    inputBlurHandler: photoBlurHandler,
  } = useInput((value) => value.length > 0);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.length > 0);

  const {
    value: phoneNumValue,
    isValid: phoneNumIsValid,
    hasError: phoneNumHasError,
    valueChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: resetPhoneNum,
  } = useInput((value) => value.length === 10);

  const {
    valueChangeHandler: genderChangeHandler,
    inputBlurHandler: genderBlurHandler,
    reset: resetGender,
  } = useInput((value) => value.length > 0);

  const {
    value: birthDayValue,
    isValid: birthDayIsValid,
    hasError: birthDayHasError,
    valueChangeHandler: birthDayChangeHandler,
    inputBlurHandler: birthDayBlurHandler,
    reset: resetBirthDay,
  } = useInput((value) => value.length !== 0);

  // Validate Form Input
  let formIsValid;
  if (nameIsValid && phoneNumIsValid && birthDayIsValid) {
    formIsValid = true;
  }

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const enteredPhoto = photoInputRef.current.files[0];

    const enteredName = nameInputRef.current.value;
    const enteredPhoneNum = phoneNumInputRef.current.value;
    const enteredGender = genderInputRef.current.value;
    const enteredBirthDay = birthDayInputRef.current.value;

    const form = new FormData();
    form.append("photo", enteredPhoto);
    form.append("name", enteredName);
    form.append("phoneNumber", enteredPhoneNum);
    form.append("gender", enteredGender);
    form.append("birthDay", enteredBirthDay);

    sendRequest(form);

    resetName();
    resetPhoneNum();
    resetGender();
    resetBirthDay();
  };

  return (
    <ProfileCard className={classes["content-layout"]}>
      <form onSubmit={formSubmitHandler}>
        <p className="heading-style-1">Edit Your Profile</p>
        <hr />
        {props.currentUser ? (
          <UserUploadPhoto
            photoValue={photoValue}
            photoChangeHandler={photoChangeHandler}
            photoBlurHandler={photoBlurHandler}
            currentUser={props.currentUser}
            photoInputRef={photoInputRef}
          />
        ) : (
          <div className={`${classes.item} ${classes.alignItemCenter}`}>
            <LoadingSpinner />
          </div>
        )}
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
            ref={phoneNumInputRef}
            label="Phone numbers"
            input={{
              id: "phone-numbers-input",
              className: classes["input-custom__input"],
              value: phoneNumValue,
              onChange: phoneNumChangeHandler,
              onBlur: phoneNumBlurHandler,
              type: "number",
            }}
            classes={classes["input-custom__container"]}
            hasError={phoneNumHasError}
            errorText="Phone number must be 10 characters!"
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>Gender</p>
          </div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <Input
              label="Female"
              ref={genderInputRef}
              input={{
                id: "radio-Female",
                type: "radio",
                name: "gender",
                value: "female",
                onChange: genderChangeHandler,
                onBlur: genderBlurHandler,
              }}
              classes={classes["input-radio__container"]}
            />
            <Input
              label="Male"
              ref={genderInputRef}
              input={{
                id: "radio-Male",
                type: "radio",
                name: "gender",
                value: "male",
                onChange: genderChangeHandler,
                onBlur: genderBlurHandler,
              }}
              classes={classes["input-radio__container"]}
            />
            <Input
              label="Not Say"
              ref={genderInputRef}
              input={{
                id: "radio-not-say",
                type: "radio",
                name: "gender",
                value: "not-say",
                defaultChecked: "checked",
                onChange: genderChangeHandler,
                onBlur: genderBlurHandler,
              }}
              classes={classes["input-radio__container"]}
            />
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <Input
            ref={birthDayInputRef}
            label="Birth Day"
            input={{
              id: "birth-day-input",
              type: "date",
              className: classes["input-custom__input"],
              value: birthDayValue,
              onChange: birthDayChangeHandler,
              onBlur: birthDayBlurHandler,
            }}
            hasError={birthDayHasError}
            errorText={"Birth day must not be empty!"}
            classes={classes["input-custom__container"]}
          />
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}></div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <Button inverse type="submit" disabled={!formIsValid}>
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </ProfileCard>
  );
}
export default UserEdit;
