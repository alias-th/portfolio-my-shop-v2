import { forwardRef } from "react";
import classes from "./Card.module.css";

const Card = forwardRef((props, ref) => {
  return (
    <div className={`${classes.card} ${props.className}`} ref={ref}>
      {props.children}
    </div>
  );
});

export default Card;
