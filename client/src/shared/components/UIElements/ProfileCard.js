import classes from "./ProfileCard.module.css";

function ProfileCard(props) {
  return (
    <div
      className={`${classes.card} ${props.className}`}
      onMouseOver={props.onMouseOver}
    >
      {props.children}
    </div>
  );
}

export default ProfileCard;
