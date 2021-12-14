import SidebarNavLinks from "./SidebarNavLinks";

import classes from "./MainSidebar.module.css";

function MainSidebar() {
  return (
    <div className={classes["layout-sidebar"]}>
      <SidebarNavLinks />
    </div>
  );
}
export default MainSidebar;
