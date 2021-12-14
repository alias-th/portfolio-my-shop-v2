import classes from "./Card.module.css";

function ProfileCard(props) {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
}

export default ProfileCard;
