import { Outlet } from "react-router-dom";

import MainSidebar from "../../shared/components/Sidebar/MainSidebar";

import classes from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={classes["profile-layout"]}>
      <MainSidebar />
      <Outlet />
    </div>
  );
}

export default UserProfile;
