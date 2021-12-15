import { useState } from "react";

import Card from "../../shared/components/UIElements/Card";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserAuth.module.css";

function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <Card className={classes["content-layout-1"]}>
      <p className="heading-style-1">{isLogin ? "Login" : "Sing up"}</p>
      <form className={classes["content-layout-form"]}>
        <div>
          <label htmlFor="user-name">Email</label>
          <input type="text" id="user=name" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" />
          </div>
        )}
        {isLogin && <p>forgot your password?</p>}
        <Button primary>{isLogin ? "Login" : "Sign up"}</Button>
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
