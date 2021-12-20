import { useState, useRef } from "react";

import useInput from "../../shared/hooks/use-input";

import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserAuth.module.css";

import Input from "../../shared/components/FormElements/Input";

function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length >= 6);

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value === passwordValue);

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  let formIsValid = false;
  if (isLogin) {
    if (emailIsValid && passwordIsValid) {
      // console.log(emailIsValid, passwordIsValid);
      formIsValid = true;
    }
  } else if (!isLogin) {
    if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
      // console.log(confirmPasswordIsValid);
      formIsValid = true;
    }
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    console.log(enteredEmail, enteredPassword, enteredConfirmPassword);

    resetEmail();
    resetPassword();
    resetConfirmPassword();
  };

  return (
    <Card className={classes["content-layout-1"]}>
      <p className="heading-style-1">{isLogin ? "Login" : "Sing up"}</p>
      <form
        className={classes["content-layout-form"]}
        onSubmit={formSubmitHandler}
      >
        <Input
          ref={emailInputRef}
          label="Email"
          input={{
            type: "email",
            id: "user-email",
            value: emailValue,
            onChange: emailChangeHandler,
            onBlur: emailBlurHandler,
          }}
          hasError={emailHasError}
          errorText="Email must include '@'!"
        />

        <Input
          ref={passwordInputRef}
          label="Password"
          input={{
            type: "password",
            id: "password",
            value: passwordValue,
            onChange: passwordChangeHandler,
            onBlur: passwordBlurHandler,
          }}
          hasError={passwordHasError}
          errorText="Password must be at least 6 characters!"
        />

        {!isLogin && (
          <Input
            ref={confirmPasswordInputRef}
            label="Confirm Password"
            input={{
              type: "password",
              id: "confirm-password",
              value: confirmPasswordValue,
              onChange: confirmPasswordChangeHandler,
              onBlur: confirmPasswordBlurHandler,
            }}
            hasError={confirmPasswordHasError}
            errorText="Confirm password must be equal to password!"
          />
        )}
        {isLogin && <p>forgot your password?</p>}

        {isLogin && (
          <Button primary type="submit" disabled={!formIsValid}>
            Login
          </Button>
        )}

        {!isLogin && (
          <Button primary type="submit" disabled={!formIsValid}>
            Sing up
          </Button>
        )}
      </form>

      <div className={classes["content-layout-signup"]}>
        {isLogin ? (
          <p>Not a member?, Sign up now!</p>
        ) : (
          <p>You is a member? Login Now!</p>
        )}
        <Button inverse onClick={switchAuthModeHandler}>
          {isLogin ? "Sign up" : " Login"}
        </Button>
      </div>
    </Card>
  );
}

export default UserAuth;
