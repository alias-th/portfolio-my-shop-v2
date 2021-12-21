import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserEdit.module.css";

import UserUploadPhoto from "../components/UserUploadPhoto";

function UserEdit() {
  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Edit Your Profile</p>
      <hr />
      <form>
        <UserUploadPhoto />
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>Name</p>
          </div>
          <div className={classes.itemContent}>
            <input className={classes.input} />
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>Phone Number</p>
          </div>
          <div className={classes.itemContent}>
            <input className={classes.input} />
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>Gender</p>
          </div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <div className={classes.itemRadio}>
              <input type="radio" />
              <label>Female</label>
            </div>
            <div className={classes.itemRadio}>
              <input type="radio" />
              <label>Male</label>
            </div>
            <div className={classes.itemRadio}>
              <input type="radio" />
              <label>Not say</label>
            </div>
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>Birthday</p>
          </div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <input type="date" id="start" name="trip-start" />
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}></div>
          <div className={`${classes.itemContent} ${classes.flexRow} `}>
            <Button inverse>Save Changes</Button>
          </div>
        </div>
      </form>
    </ProfileCard>
  );
}

export default UserEdit;
