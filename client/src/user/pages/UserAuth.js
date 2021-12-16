import { useState } from "react";

import useInput from "../../shared/hooks/use-input";

import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserAuth.module.css";

function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);

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

    // console.log(emailValue, passwordValue, confirmPasswordValue);

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
        <div>
          <label htmlFor="user-email">Email</label>
          <div className={classes["form-input"]}>
            <input
              type="text"
              id="user-email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className={classes["input-is-invalid"]}>
                Email must include '@'!
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div className={classes["form-input"]}>
            <input
              type="password"
              id="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={classes["input-is-invalid"]}>
                Password must be at least 6 characters!
              </p>
            )}
          </div>
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className={classes["form-input"]}>
              <input
                type="password"
                id="confirm-password"
                value={confirmPasswordValue}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
              />
              {confirmPasswordHasError && (
                <p className={classes["input-is-invalid"]}>
                  Confirm password must be equal to password!
                </p>
              )}
            </div>
          </div>
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
