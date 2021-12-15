import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`
    ${classes["button"]}   
    ${classes[`button--${props.size || "default"}`]}
    ${classes[`${props.inverse && "button--inverse"}`]}
    ${classes[`${props.danger && "button--danger"}`]}
    ${classes[`${props.white && "button--white"}`]}
    ${classes[`${props.primary && "button--primary"}`]}
    `}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
