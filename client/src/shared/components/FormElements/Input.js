import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.input.id}>{props.label}</label>
      <div className={classes["form-input"]}>
        <input ref={ref} {...props.input} />
        {props.hasError && (
          <p className={classes["input-is-invalid"]}>{props.errorText}</p>
        )}
      </div>
    </div>
  );
});

export default Input;
