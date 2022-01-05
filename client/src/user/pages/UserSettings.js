import { useState, useEffect } from "react";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import Input from "../../shared/components/FormElements/Input";

import classes from "./UserSettings.module.css";

import useInput from "../../shared/hooks/use-input";

import useHttp from "../../shared/hooks/use-http";

import { updatePassword, deleteMe } from "../../shared/lib/api";

function UserSettings() {
  const [formIsValid, setFormIsValid] = useState(false);

  const { sendRequest: updatePasswordRequest } = useHttp(
    updatePassword,
    true,
    "Updated your password successfully",
    true
  );

  const { sendRequest: deleteMeRequest } = useHttp(
    deleteMe,
    true,
    "Deleted your password successfully",
    true
  );

  const {
    value: currentPassword,
    isValid: currentPasswordIsValid,
    hasError: currentPasswordHasError,
    valueChangeHandler: currentPasswordChangeHandler,
    inputBlurHandler: currentPasswordBlurHandler,
    reset: resetCurrentPassword,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().length >= 6,
    true
  );
  const {
    value: newPassword,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().length >= 6,
    true
  );
  const {
    value: newPasswordConfirm,
    isValid: newPasswordConfirmIsValid,
    hasError: newPasswordConfirmHasError,
    valueChangeHandler: newPasswordConfirmChangeHandler,
    inputBlurHandler: newPasswordConfirmBlurHandler,
    reset: resetNewPasswordConfirm,
  } = useInput((value) => value === newPassword, true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        currentPasswordIsValid &&
          newPasswordIsValid &&
          newPasswordConfirmIsValid
      );
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPasswordIsValid, newPasswordIsValid, newPasswordConfirmIsValid]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    updatePasswordRequest({ currentPassword, newPassword, newPasswordConfirm });

    resetCurrentPassword();
    resetNewPassword();
    resetNewPasswordConfirm();
  };

  const deleteMeHandler = () => {
    deleteMeRequest();
  };
  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Account Settings</p>
      <hr />

      <div className={classes["content__container"]}>
        <form
          className={classes["password__container"]}
          onSubmit={formSubmitHandler}
        >
          <div>
            <h3>Password</h3>
          </div>
          <div className={classes["password__container--input"]}>
            <Input
              label="Current Password"
              input={{
                type: "password",
                value: currentPassword,
                onChange: currentPasswordChangeHandler,
                onBlur: currentPasswordBlurHandler,
                id: "current-password-input",
                className: classes["input-custom__input"],
              }}
              hasError={currentPasswordHasError}
              classes={classes["input-custom__container"]}
              errorText="Password must be at least 6 characters!"
            />

            <Input
              label="New Password"
              input={{
                type: "password",
                value: newPassword,
                onChange: newPasswordChangeHandler,
                onBlur: newPasswordBlurHandler,
                id: "new-password-input",
                className: classes["input-custom__input"],
              }}
              hasError={newPasswordHasError}
              classes={classes["input-custom__container"]}
              errorText="Password must be at least 6 characters!"
            />

            <Input
              label="Confirm Password"
              input={{
                type: "password",
                value: newPasswordConfirm,
                onChange: newPasswordConfirmChangeHandler,
                onBlur: newPasswordConfirmBlurHandler,
                id: "confirm-password-input",
                className: classes["input-custom__input"],
              }}
              hasError={newPasswordConfirmHasError}
              classes={classes["input-custom__container"]}
              errorText="Confirm password must be equal to password!"
            />
          </div>
          <div className={classes["button-submit__container"]}>
            <Button inverse disabled={!formIsValid}>
              Change Password
            </Button>
          </div>
        </form>

        <div className={classes["close-account__container"]}>
          <div>
            <h3>Close Your Account</h3>
          </div>
          <div className={classes["close-your-account"]}>
            <p>What happens when you close your account?</p>
            <p>• Your account will be inactive, until you reopen it.</p>
            <p className={classes.marginBottom}>
              • Your profile will no longer appear anywhere on My-shop.
            </p>
          </div>
          <div className={classes["button-submit__container"]}>
            <Button onClick={deleteMeHandler}>Close Your Account</Button>
          </div>
        </div>
      </div>
    </ProfileCard>
  );
}

export default UserSettings;
