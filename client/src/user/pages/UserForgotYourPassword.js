import classes from "./UserForgotYourPassword.module.css";
import Card from "../../shared/components/UIElements/Card";
import { useRef } from "react";
import useInput from "../../shared/hooks/use-input";
import { useDispatch } from "react-redux";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  resetPasswordAction,
  changePasswordWithTokenAction,
} from "../../shared/store/auth-actions";
import { useParams } from "react-router-dom";

function UserForgotYourPassword() {
  const { token } = useParams();

  // console.log(token);

  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const newPasswordInputRef = useRef();
  const newPasswordConfirmInputRef = useRef();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"), true);

  const {
    value: newPasswordValue,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useInput((value) => value.length >= 6, true);

  const {
    value: newPasswordConfirmValue,
    isValid: newPasswordConfirmIsValid,
    hasError: newPasswordConfirmHasError,
    valueChangeHandler: newPasswordConfirmChangeHandler,
    inputBlurHandler: newPasswordConfirmBlurHandler,
    reset: resetNewPasswordConfirm,
  } = useInput((value) => value === newPasswordValue, true);

  let formIsValid = false;
  if (!token && emailIsValid) {
    formIsValid = true;
  }
  if (token && newPasswordIsValid && newPasswordConfirmIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    if (!token) {
      const enteredEmail = emailInputRef.current.value;

      dispatch(resetPasswordAction({ email: enteredEmail }));

      resetEmail();
    }

    if (token) {
      const enteredNewPassword = newPasswordInputRef.current.value;
      const enteredNewPasswordConfirm =
        newPasswordConfirmInputRef.current.value;

      dispatch(
        changePasswordWithTokenAction(
          {
            password: enteredNewPassword,
            passwordConfirm: enteredNewPasswordConfirm,
          },
          token
        )
      );
      resetNewPassword();
      resetNewPasswordConfirm();
    }
  };

  return (
    <main className={classes["container"]}>
      <Card className={classes["content-layout-1"]}>
        <form
          className={classes["content-layout-form"]}
          onSubmit={formSubmitHandler}
        >
          <p className="heading-style-1"> Reset Your Password</p>
          {!token && (
            <Input
              classLabel={classes["form-input__label"]}
              ref={emailInputRef}
              label="Email"
              input={{
                type: "email",
                id: "user-email",
                value: emailValue,
                onChange: emailChangeHandler,
                onBlur: emailBlurHandler,
                required: true,
                className: classes["input"],
              }}
              hasError={emailHasError}
              errorText="Email must include '@'!"
            />
          )}

          {token && (
            <Input
              classLabel={classes["form-input__label"]}
              label="New Password"
              ref={newPasswordInputRef}
              input={{
                type: "password",
                id: "newPassword",
                value: newPasswordValue,
                onChange: newPasswordChangeHandler,
                onBlur: newPasswordBlurHandler,
                required: true,
              }}
              hasError={newPasswordHasError}
              errorText="New Password must be at least 6 characters"
            />
          )}
          {token && (
            <Input
              classLabel={classes["form-input__label"]}
              ref={newPasswordConfirmInputRef}
              label="Confirm New Password"
              input={{
                type: "password",
                id: "newPasswordConfirm",
                value: newPasswordConfirmValue,
                onChange: newPasswordConfirmChangeHandler,
                onBlur: newPasswordConfirmBlurHandler,
                required: true,
              }}
              hasError={newPasswordConfirmHasError}
              errorText="Confirm Password must be match New Password"
            />
          )}

          <Button primary type="submit">
            {token ? "Change Password" : "Send me reset password instruction"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

export default UserForgotYourPassword;
