import { Outlet } from "react-router-dom";

import MainSidebar from "../../shared/components/Sidebar/MainSidebar";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import classes from "./UserProfile.module.css";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserProfile(props) {
  return (
    <div className={classes["profile-layout"]}>
      <MainSidebar />
      <div className={classes["content-layout"]}>
        <ProfileCard className={classes["content-layout-1"]}>
          <div className={classes["content-layout-2"]}>
            <p className="heading-style-1">About You</p>
            <hr />
            {!props.currentUser ? (
              <div className="centered">
                <LoadingSpinner />
              </div>
            ) : (
              <div className={classes["content-layout-3"]}>
                <div className={classes["content-layout-4"]}>
                  <p>
                    Name : <span>{`${props.currentUser.name}`}</span>
                  </p>
                  <p>Gender : Male</p>
                  <p>Birthday : 1 June 1997</p>
                </div>
                <div className={classes["content-layout-4"]}>
                  <p>Email : {`${props.currentUser.email}`}</p>
                  <p>Phone numbers : 091-0000000</p>
                  <p>Role : {`${props.currentUser.role}`}</p>
                </div>
              </div>
            )}
          </div>
          {props.currentUser && (
            <img
              src={`/uploads/images/${props.currentUser.photo}`}
              alt={`${props.currentUser.name}`}
            />
          )}
        </ProfileCard>
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
