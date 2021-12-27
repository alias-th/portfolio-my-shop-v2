import { Outlet } from "react-router-dom";

import MainSidebar from "../../shared/components/Sidebar/MainSidebar";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import classes from "./UserProfile.module.css";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserProfile(props) {
  return (
    <div className={classes["profile__container"]}>
      <MainSidebar />
      <div className={classes["profile__contents--container"]}>
        <ProfileCard className={classes["profile__contents--card"]}>
          <div className={classes["profile__contents__form-container"]}>
            <p className="heading-style-1">About You</p>
            <hr />
            {!props.currentUser ? (
              <div className="centered">
                <LoadingSpinner />
              </div>
            ) : (
              <div className={classes["contents__form-container"]}>
                <div
                  className={
                    classes["contents__form-container--content-container"]
                  }
                >
                  <p>
                    Name :{" "}
                    <span
                      className={classes["contents__form-container--underline"]}
                    >{`${props.currentUser.name}`}</span>
                  </p>

                  <p>
                    Gender :{" "}
                    <span
                      className={classes["contents__form-container--underline"]}
                    >{`${props.currentUser.gender}`}</span>
                  </p>
                  <p>
                    Birthday :{" "}
                    <span
                      className={classes["contents__form-container--underline"]}
                    >{`${new Date(
                      props.currentUser.birthday
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    })} `}</span>
                  </p>
                </div>
                <div
                  className={
                    classes["contents__form-container--content-container"]
                  }
                >
                  <p>
                    Email :{" "}
                    <span
                      className={classes["contents__form-container--underline"]}
                    >{`${props.currentUser.email}`}</span>
                  </p>
                  <p>
                    Phone numbers :{" "}
                    <span
                      className={classes["contents__form-container--underline"]}
                    >{`${props.currentUser.phoneNumber}`}</span>
                  </p>
                  <p>
                    Role :{" "}
                    <span
                      className={classes["contents__form-container--underline"]}
                    >{`${props.currentUser.role}`}</span>
                  </p>
                </div>
                {/* {props.currentUser && (
                  <img
                    src={`/uploads/images/${props.currentUser.photo}`}
                    alt={`${props.currentUser.name}`}
                    className={classes["profile__contents--img"]}
                  />
                )} */}
              </div>
            )}
          </div>
        </ProfileCard>
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
