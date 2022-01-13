import { Outlet } from "react-router-dom";

import MainSidebar from "../../shared/components/Sidebar/MainSidebar";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import classes from "./UserProfile.module.css";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { phoneFormat } from "../../shared/helper/phoneFormat";

function UserProfile(props) {
  return (
    <main className={classes["container"]}>
      <div className={classes["profile__container"]}>
        <MainSidebar />
        <div className={classes["profile__contents--container"]}>
          <Outlet />
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
                      <span className={classes["label"]}> Name : </span>
                      <span
                        className={
                          classes["contents__form-container--underline"]
                        }
                      >{`${props.currentUser.name}`}</span>
                    </p>

                    <p>
                      <span className={classes["label"]}>Gender : </span>
                      <span
                        className={
                          classes["contents__form-container--underline"]
                        }
                      >{`${props.currentUser.gender}`}</span>
                    </p>
                    <p>
                      <span className={classes["label"]}>Birthday : </span>
                      <span
                        className={
                          classes["contents__form-container--underline"]
                        }
                      >{`${
                        props.currentUser.birthday
                          ? new Date(
                              props.currentUser.birthday
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              year: "numeric",
                              day: "numeric",
                            })
                          : "not-defined"
                      } `}</span>
                    </p>

                    <p>
                      <span className={classes["label"]}>Email : </span>
                      <span
                        className={
                          classes["contents__form-container--underline"]
                        }
                      >{`${props.currentUser.email}`}</span>
                    </p>
                    <p>
                      <span className={classes["label"]}>Phone numbers : </span>
                      <span
                        className={
                          classes["contents__form-container--underline"]
                        }
                      >{`${
                        props.currentUser
                          ? phoneFormat(props.currentUser.phoneNumber)
                          : "not-defined"
                      }`}</span>
                    </p>
                    <p>
                      <span className={classes["label"]}>Role : </span>

                      <span
                        className={
                          classes["contents__form-container--underline"]
                        }
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
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
