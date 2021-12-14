import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserEdit.module.css";

function UserEdit() {
  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Edit Your Profile</p>
      <hr />
      <div>
        <div className={classes.item}>
          <div className={classes.itemName}>
            <p>Profile Picture</p>
          </div>
          <div className={classes.itemContent}>
            <button className={classes.btn}>Choose File</button>
            <div className={classes.circle}>
              <img
                src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
                alt="user-1"
                className={classes.img}
              />
            </div>
            <p>
              Must be a .jpg file smaller than 10 mb and at least 100px by 100px
            </p>
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>First Name</p>
          </div>
          <div className={classes.itemContent}>
            <input className={classes.input} />
          </div>
        </div>
        <div className={`${classes.item} ${classes.alignItemCenter}`}>
          <div className={classes.itemName}>
            <p>Last Name</p>
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
      </div>
    </ProfileCard>
  );
}

export default UserEdit;
