import { useState, useRef } from "react";

import { useDispatch } from "react-redux";

import { signupAction, loginAction } from "../../shared/store/auth-actions";

import useInput from "../../shared/hooks/use-input";

import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserAuth.module.css";

import Input from "../../shared/components/FormElements/Input";

import { Link } from "react-router-dom";

function UserAuth(props) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"), true);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.length !== 0, true);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().length >= 6,
    true
  );

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value === passwordValue, true);

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
    if (
      emailIsValid &&
      nameIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      // console.log(confirmPasswordIsValid);
      formIsValid = true;
    }
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    if (isLogin) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      dispatch(loginAction({ email: enteredEmail, password: enteredPassword }));
    } else if (!isLogin) {
      const enteredEmail = emailInputRef.current.value;
      const enteredName = nameInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      dispatch(
        signupAction({
          email: enteredEmail,
          name: enteredName,
          password: enteredPassword,
          passwordConfirm: enteredConfirmPassword,
        })
      );
    }

    resetEmail();
    resetName();
    resetPassword();
    resetConfirmPassword();
  };

  return (
    <main className={classes["container"]}>
      <Card className={classes["content-layout-1"]}>
        <p className="heading-style-1">{isLogin ? "Login" : "Sing up"}</p>
        <form
          className={classes["content-layout-form"]}
          onSubmit={formSubmitHandler}
        >
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
            }}
            hasError={emailHasError}
            errorText="Email must include '@'!"
          />

          {!isLogin && (
            <Input
              classLabel={classes["form-input__label"]}
              ref={nameInputRef}
              label="Name"
              input={{
                type: "text",
                id: "user-name",
                value: nameValue,
                onChange: nameChangeHandler,
                onBlur: nameBlurHandler,
              }}
              hasError={nameHasError}
              errorText="Name must not be empty!"
            />
          )}

          <Input
            classLabel={classes["form-input__label"]}
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
              classLabel={classes["form-input__label"]}
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
          {isLogin && <Link to="/resetPassword">forgot your password?</Link>}

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
      <div>
        <div>
          <p>admin-1@gmail.com</p>
          <p>mypassword1</p>
          <p>role : admin</p>
          <hr />
        </div>
        <br />
        <div>
          <p>user-1@gmail.com</p>
          <p>mypassword1</p>
          <p>role : user</p>
          <hr />
        </div>
        <br />
        <div>
          <p>seller-1@gmail.com</p>
          <p>mypassword1</p>
          <p>role : seller</p>
          <hr />
        </div>
      </div>
    </main>
  );
}

export default UserAuth;
