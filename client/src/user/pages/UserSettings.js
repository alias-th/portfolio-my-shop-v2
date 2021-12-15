import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserSettings.module.css";

function UserSettings() {
  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Account Settings</p>
      <hr />

      <div className={classes.cardOne}>
        <div className={classes.cardItemOne}>
          <div>
            <h3>Password</h3>
          </div>
          <div className={classes["password-content"]}>
            <div className={classes.flexRow}>
              <p className={classes.width}>Current Password : </p>
              <input className={classes.input} />
            </div>
            <div className={classes.flexRow}>
              <p className={classes.width}>New Password : </p>
              <input className={classes.input} />
            </div>
            <div className={`${classes.flexRow} ${classes.marginBottom}`}>
              <p className={classes.width}>Confirm Password : </p>
              <input className={classes.input} />
            </div>
          </div>
          <Button inverse>Change Password</Button>
        </div>
        <div className={classes.cardItemOne}>
          <div>
            <h3>Close Your Account</h3>
          </div>
          <div className={classes["close-your-account"]}>
            <p>What happens when you close your account?</p>
            <p>• Your account will be inactive, until you reopen it.</p>
            <p className={classes.marginBottom}>
              • Your profile will no longer appear anywhere on My-shop.
            </p>
          </div>
          <Button inverse>Close Your Account</Button>
        </div>
      </div>
    </ProfileCard>
  );
}

export default UserSettings;
