import ProfileCard from "../UIElements/ProfileCard";

import SidebarNavLinks from "../Sidebar/SidebarNavLinks";

import classes from "./ProfileMenu.module.css";

const ProfileMenu = (props) => {
  return (
    <ProfileCard
      className={classes["menu-profile"]}
      onMouseOver={props.onMouseOver}
    >
      <SidebarNavLinks />
    </ProfileCard>
  );
};

export default ProfileMenu;
