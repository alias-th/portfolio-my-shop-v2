import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={props.classes}>
      <label htmlFor={props.input.id} className={props.classLabel}>
        {props.label}
      </label>
      <div className={classes["form-input"]}>
        {props.input.type === "textarea" && (
          <textarea ref={ref} {...props.input} />
        )}

        {props.input.type === "text" && <input ref={ref} {...props.input} />}
        {props.input.type === "email" && <input ref={ref} {...props.input} />}
        {props.input.type === "password" && (
          <input ref={ref} {...props.input} />
        )}

        {props.input.type === "number" && <input ref={ref} {...props.input} />}

        {props.input.type === "date" && <input ref={ref} {...props.input} />}

        {props.input.type === "radio" && <input ref={ref} {...props.input} />}

        {props.input.type === "selector" && (
          <select ref={ref} {...props.input}>
            {props.options}
          </select>
        )}

        {props.hasError && (
          <p className={classes["input-is-invalid"]}>{props.errorText}</p>
        )}
      </div>
    </div>
  );
});

export default Input;
