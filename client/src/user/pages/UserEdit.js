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

  const birthDayInputRef = useRef();

  const { sendRequest } = useHttp(
    updateMe,
    true, // notification
    "Updated your profile successfully",
    true // mustReload
  );

  // Custom Hooks
  const {
    value: photoValue,
    photoChangeHandler,
    inputBlurHandler: photoBlurHandler,
    reset: resetPhoto,
  } = useInput(() => {}, false);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.length > 0, true, props.currentUser.name);

  const {
    value: phoneNumValue,
    isValid: phoneNumIsValid,
    hasError: phoneNumHasError,
    valueChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: resetPhoneNum,
  } = useInput(
    (value) => value.length === 10,
    true, // validate
    props.currentUser.phoneNumber // initial value
  );

  const {
    value: genderValue,
    valueChangeHandler: genderChangeHandler,
    inputBlurHandler: genderBlurHandler,
    reset: resetGender,
  } = useInput((value) => value.length > 0, true, props.currentUser.gender);

  const {
    value: birthDayValue,
    isValid: birthDayIsValid,
    hasError: birthDayHasError,
    valueChangeHandler: birthDayChangeHandler,
    inputBlurHandler: birthDayBlurHandler,
    reset: resetBirthDay,
  } = useInput(
    (value) => value.length !== 0,
    true,
    new Date(props.currentUser.birthday).toISOString().slice(0, 10)
  );

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
    const enteredGender = genderValue;
    const enteredBirthDay = new Date(birthDayInputRef.current.value);

    const form = new FormData();
    form.append("photo", enteredPhoto);
    form.append("name", enteredName);
    form.append("phoneNumber", enteredPhoneNum);
    form.append("gender", enteredGender);
    form.append("birthday", enteredBirthDay);

    sendRequest(form);

    resetPhoto();
    resetName();
    resetPhoneNum();
    resetGender();
    resetBirthDay();

    window.scroll(0, 0);
  };

  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Edit Your Profile</p>
      <hr />
      <form onSubmit={formSubmitHandler}>
        {props.currentUser ? (
          <>
            <UserUploadPhoto
              title="Profile Picture"
              photoValue={photoValue}
              photoChangeHandler={photoChangeHandler}
              photoBlurHandler={photoBlurHandler}
              currentPhoto={props.currentUser.photo}
              photoInputRef={photoInputRef}
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
                ref={phoneNumInputRef}
                label="Phone numbers"
                input={{
                  id: "phone-numbers-input",
                  className: classes["input-custom__input"],
                  value: phoneNumValue,
                  onChange: phoneNumChangeHandler,
                  onBlur: phoneNumBlurHandler,
                  type: "tel",
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
                  input={{
                    id: "radio-Female",
                    type: "radio",
                    name: "gender",
                    value: "female",
                    defaultChecked:
                      props.currentUser.gender === "female" && "checked",
                    onChange: genderChangeHandler,
                    onBlur: genderBlurHandler,
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
                    defaultChecked:
                      props.currentUser.gender === "male" && "checked",
                    onChange: genderChangeHandler,
                    onBlur: genderBlurHandler,
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
                    defaultChecked:
                      props.currentUser.gender === "not-say" && "checked",
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
          </>
        ) : (
          <div className={`${classes.item} ${classes.alignItemCenter}`}>
            <LoadingSpinner />
          </div>
        )}
      </form>
    </ProfileCard>
  );
}
export default UserEdit;
