import { Outlet } from "react-router-dom";

import MainSidebar from "../../shared/components/Sidebar/MainSidebar";

import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import classes from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={classes["profile-layout"]}>
      <MainSidebar />
      <div className={classes["content-layout"]}>
        <ProfileCard className={classes["content-layout-1"]}>
          <div className={classes["content-layout-2"]}>
            <p className="heading-style-1">About You</p>
            <hr />
            <div className={classes["content-layout-3"]}>
              <div className={classes["content-layout-4"]}>
                <p>Name : Monton Onnom</p>
                <p>Gender : Male</p>
                <p>Birthday : 1 June 1997</p>
              </div>
              <div className={classes["content-layout-4"]}>
                <p>Email : monton.onnom1@gmail.com</p>
                <p>Phone Number : 091-0000000</p>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
            alt="user-1"
          />
        </ProfileCard>
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
